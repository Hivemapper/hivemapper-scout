import * as turf from "@turf/turf";
import geographiclib from "geographiclib-geodesic";
import { Frame } from "types/location";

const DEFAULT_STITCH_MAX_DISTANCE = 20;
const DEFAULT_STITCH_MAX_LAG = 300;
const DEFAULT_STITCH_MAX_ANGLE = 30;

const WGS84 = geographiclib.Geodesic.WGS84;

export const absAngularDelta = (a: number, b: number): number => {
  const delta = Math.abs(a - b);
  return delta <= 180 ? delta : 360 - delta;
};

export const boundariesIntersect = (a: Frame[], b: Frame[]): boolean => {
  const a0 = new Date(a[0].timestamp);
  const a1 = new Date(a[a.length - 1].timestamp);
  const b0 = new Date(b[0].timestamp);
  const b1 = new Date(b[b.length - 1].timestamp);

  const latestStart = new Date(Math.max(a0.getTime(), b0.getTime()));
  const earliestEnd = new Date(Math.min(a1.getTime(), b1.getTime()));

  return latestStart < earliestEnd;
};

export const stitch = (
  frames: Frame[],
  maxDistance = DEFAULT_STITCH_MAX_DISTANCE,
  maxLag = DEFAULT_STITCH_MAX_LAG,
  maxAzimuthDelta = DEFAULT_STITCH_MAX_ANGLE,
) => {
  if (frames.length === 0) return [[]];

  const sequences: Record<string, Frame[]> = {};

  frames.forEach((frame) => {
    const sequence = frame.sequence;
    if (!sequences[sequence]) sequences[sequence] = [];
    sequences[sequence].push(frame);
  });

  const skipStitching: Frame[][] = [];
  const seqs = Object.values(sequences)
    .filter((seq) => {
      if (seq.length > 1) {
        return true;
      } else {
        skipStitching.push(seq);
        return false;
      }
    })
    .map((seq) => seq.sort((a, b) => a.idx - b.idx))
    .sort(
      (a, b) =>
        new Date(a[0].timestamp).getTime() - new Date(b[0].timestamp).getTime(),
    );

  const firstSeq = seqs.shift() || [];
  const collections: Frame[][][] = [[firstSeq]];

  let currentCollection: Frame[][] = collections[collections.length - 1] || [];
  let remaining: Frame[][] = [];

  while (seqs.length > 0) {
    const seq = seqs.shift() || [];

    if (
      boundariesIntersect(currentCollection[currentCollection.length - 1], seq)
    ) {
      remaining.push(seq);

      if (seqs.length === 0) {
        const firstRemaining = remaining.shift() || [];
        collections.push([firstRemaining]);
        currentCollection = collections[collections.length - 1] || [];
        seqs.push(...remaining);
        remaining = [];
      }

      continue;
    }

    const last2DElement = currentCollection[currentCollection.length - 1] || [];
    const last3DElement = last2DElement[last2DElement.length - 1];
    const secondToLast3DElement = last2DElement[last2DElement.length - 2];

    const t0 = new Date(last3DElement.timestamp).getTime();
    const t1 = new Date(seq[0].timestamp).getTime();

    if ((t1 - t0) / 1000 > maxLag) {
      // ☝️ Convert milliseconds to seconds
      remaining.push(seq);

      if (seqs.length === 0) {
        const firstRemaining = remaining.shift() || [];
        collections.push([firstRemaining]);
        currentCollection = collections[collections.length - 1];
        seqs.push(...remaining);
        remaining = [];
      }

      continue;
    }

    const { lat: lat_a0, lon: lon_a0 } = secondToLast3DElement.position;
    const { lat: lat_a1, lon: lon_a1 } = last3DElement.position;
    const { lat: lat_b0, lon: lon_b0 } = seq[0].position;
    const { lat: lat_b1, lon: lon_b1 } = seq[1].position;

    const from = turf.point([lon_a1, lat_a1]);
    const to = turf.point([lon_b0, lat_b0]);
    const meters = turf.distance(from, to, { units: "meters" });

    if (meters > maxDistance) {
      remaining.push(seq);

      if (seqs.length === 0) {
        const firstRemaining = remaining.shift() || [];
        collections.push([firstRemaining]);
        currentCollection = collections[collections.length - 1];
        seqs.push(...remaining);
        remaining = [];
      }

      continue;
    }

    const azi_a = WGS84.Inverse(lat_a0, lon_a0, lat_a1, lon_a1).azi2;
    const azi_b = WGS84.Inverse(lat_b0, lon_b0, lat_b1, lon_b1).azi2;
    const delta_azi = absAngularDelta(azi_a!, azi_b!);

    if (delta_azi > maxAzimuthDelta) {
      remaining.push(seq);

      if (seqs.length === 0) {
        const firstRemaining = remaining.shift() || [];
        collections.push([firstRemaining]);
        currentCollection = collections[collections.length - 1];
        seqs.push(...remaining);
        remaining = [];
      }

      continue;
    }

    currentCollection.push(seq);

    if (seqs.length === 0 && remaining.length > 0) {
      const firstRemaining = remaining.shift() || [];
      collections.push([firstRemaining]);
      currentCollection = collections[collections.length - 1];
      seqs.push(...remaining);
      remaining = [];
    }
  }

  const stitched = collections.map((coll) => coll.flat());
  const skipped = skipStitching.map((coll) => coll.flat());

  return [...stitched, ...skipped];
};
