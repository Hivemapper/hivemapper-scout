import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import * as turf from "@turf/turf";
import { Frame, ScoutLocation } from "types/location";
import Thumbnail from "@components/hivemapper/ui/Thumbnail";
import { useInView } from "react-intersection-observer";
import {
  filterFramesFresherThan14Days,
  getLastThreeMondays,
  prettyDate,
} from "@utils/dates";
import { getImagesForPolygon } from "@api/developer";
import { stitch } from "@utils/imagery";
import { sortSequencesByTimestamp } from "@utils/sort";
import Loader from "@components/icons/Loader";
import { Badge } from "@components/shadcn/Badge";
import * as cn from "./classNames";
import MoreOptionsMenu from "@components/hivemapper/ui/MoreOptionsMenu";
import RemoveLocation from "@components/hivemapper/ui/MoreOptionsMenu/RemoveLocation";

export interface DetailedProps {
  location: ScoutLocation;
  setLocations: Dispatch<SetStateAction<ScoutLocation[]>>;
  encodedCredentials: string | null;
  selectionCallback?: (id: string | number) => void;
}

const Detailed: React.FC<DetailedProps> = ({
  location,
  setLocations,
  encodedCredentials,
  selectionCallback,
}) => {
  const [sortedSequences, setSortedSequences] = useState<Frame[][] | null>([]);
  const [apiCallsComplete, setApiCallsComplete] = useState(false);
  const [framesLength, setFramesLength] = useState(0);
  const [requestCost, setRequestCost] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const latestSequence = sortedSequences[0] || [];
  const lastFrame: Frame | undefined =
    latestSequence[latestSequence.length - 1];
  const lastMapped = (lastFrame && lastFrame.timestamp) || null;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
  });

  const centroid = turf.centroid(location.geojson);

  useEffect(() => {
    if (inView) {
      const fetchImagery = async () => {
        setRequestCost(null);

        const allFrames = [];
        const weeks = getLastThreeMondays();
        let apiError = "";
        let totalCost = 0;

        for (const week of weeks) {
          const data = await getImagesForPolygon(
            location,
            week,
            encodedCredentials,
          );

          if ("error" in data) {
            apiError = data.error;
            continue;
          }

          const { frames, cost } = data;
          allFrames.push(...frames);
          totalCost += cost;
        }

        if (allFrames.length === 0 && apiError) {
          setError(apiError);
          setApiCallsComplete(true);
          setSortedSequences([]);
          return;
        }

        const framesFresherThan14Days =
          filterFramesFresherThan14Days(allFrames);

        if (framesFresherThan14Days.length > 0) {
          const stitched = stitch(framesFresherThan14Days);
          setSortedSequences(sortSequencesByTimestamp(stitched));
          setFramesLength(framesFresherThan14Days.length);
        }

        setRequestCost(totalCost);
        setApiCallsComplete(true);
      };

      fetchImagery();
    }
  }, [inView, location]);

  return (
    <div ref={ref} className={cn.detailedItemWrapper()}>
      <div className={cn.detailedItemLeftSection()}>
        <div
          className={cn.detailedItemLocation()}
          onClick={() => selectionCallback(location._id)}
        >
          {location.name}
        </div>
        <div className={cn.detailedItemDescription()}>
          {location.description}
        </div>
        <div className={cn.detailedItemTags()}>
          {location.tags?.map((tag, index) => (
            <Badge
              key={`${tag}_${index.toString()}`}
              className={cn.detailedItemTag()}
            >
              {tag}
            </Badge>
          ))}
        </div>
        {centroid && (
          <div className={cn.detailedItemCentroid()}>
            {`${centroid.geometry.coordinates[1].toFixed(
              5,
            )}, ${centroid.geometry.coordinates[0].toFixed(5)}`}
          </div>
        )}
        {sortedSequences.length > 0 && (
          <div className={cn.detailedItemSequence()}>
            {sortedSequences.length} collections, {framesLength} images
          </div>
        )}
        {lastMapped && (
          <div className={cn.detailedItemDateSection()}>
            <span className={cn.detailedItemDate()}>
              Mapped {prettyDate(lastMapped, true)}
            </span>
          </div>
        )}
      </div>
      <div className={cn.detailedItemImagery()}>
        <div className={cn.detailedItemOptions()}>
          {requestCost !== null && (
            <div className={cn.detailedItemOptionsCredits()}>
              {requestCost} credits
            </div>
          )}
          <MoreOptionsMenu
            elements={[
              <RemoveLocation id={location._id} setLocations={setLocations} />,
            ]}
          />
        </div>
        {!apiCallsComplete ? (
          <div className={cn.detailedItemLoader()}>
            <Loader />
          </div>
        ) : sortedSequences.length > 0 ? (
          <div className={cn.detailedItemThumbnailSection()} tabIndex={0}>
            {sortedSequences.map((sequence: Frame[], index) => {
              const { url, timestamp } = sequence[0];
              const isLast = index === sortedSequences.length - 1;

              return (
                <div key={url} className={cn.detailedItemThumbnail(isLast)}>
                  <Thumbnail
                    url={url}
                    timestamp={timestamp}
                    onClick={() => selectionCallback(location._id)}
                  />
                </div>
              );
            })}
          </div>
        ) : error ? (
          <div className={cn.detailedItemNullState()}>{error}</div>
        ) : (
          <div className={cn.detailedItemNullState()}>
            No imagery available in the last 14 days.
          </div>
        )}
      </div>
    </div>
  );
};

export default Detailed;
