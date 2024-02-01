import React, { RefObject, useEffect, useRef, useState } from "react";
import maplibre, {
  AddLayerObject,
  LngLatLike,
  Map as MlMap,
} from "maplibre-gl";
import {
  clearAllDynamicLayersAndSources,
  clearStaticLayersAndSources,
  createLayersAndSources,
  getBounds,
  initializeMap,
  setMapAccessToken,
} from "@utils/map";
import { Frame } from "types/location";
import Reset from "@components/icons/Reset";
import { SourceOptions } from "types/map";
import palette from "@styles/palette";
import * as cn from "./classNames";
import { Coordinates } from "types/geojson";

const MINIMAP_GEOJSON_LAYER = "minimap-geojson-hm-layer";
const MINIMAP_GEOJSON_STROKE = "minimap-geojson-hm-stroke";
const MINIMAP_GEOJSON_SOURCE = "minimap-geojson-hm-source";

const MINIMAP_DYNAMIC_LINES_LAYER = "minimap-dynamic-hm-lines-layer";
const MINIMAP_DYNAMIC_LINES_SOURCE = "minimap-dynamic-hm-lines-source";

const MINIMAP_DOTS_LAYER = "minimap-dots-hm-layer";
const MINIMAP_DOTS_SOURCE = "minimap-dots-hm-source";

const MINIMAP_ACTIVE_DOTS_LAYER = "minimap-active-dots-hm-layer";
const MINIMAP_ACTIVE_DOTS_SOURCE = "minimap-active-dots-hm-source";
const MINIMAP_ACTIVE_LINE_LAYER = "minimap-active-line-hm-layer";
const MINIMAP_ACTIVE_LINE_SOURCE = "minimap-active-line-hm-source";

const MINIMAP_ACTIVE_FRAME_LAYER = "minimap-active-frame-hm-layer";
const MINIMAP_ACTIVE_FRAME_OUTLINE = "minimap-active-frame-hm-outline";
const MINIMAP_ACTIVE_FRAME_SOURCE = "minimap-active-frame-hm-source";

interface MiniMapProps {
  mapStyle?: string;
  mapAccessToken: string;
  center: number[];
  geometry: {
    type: "Feature";
    geometry: {
      type: "Polygon" | "MultiPolygon";
      coordinates: Coordinates[] | Coordinates[][];
    };
  };
  sortedSequences: Frame[][] | null;
  activeSequence: Frame[] | null;
  activeSequenceIndex: number;
  activeFrameIndex: { value: number };
  apiCallsComplete: boolean;
}

const MiniMap: React.FC<MiniMapProps> = ({
  mapStyle,
  mapAccessToken,
  center,
  geometry,
  sortedSequences,
  activeSequence,
  activeSequenceIndex,
  activeFrameIndex,
  apiCallsComplete,
}) => {
  const mapContainer: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MlMap | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);

  setMapAccessToken(mapAccessToken);

  useEffect(() => {
    // @ts-ignore
    maplibre.accessToken = mapAccessToken;

    if (!map && mapContainer.current) {
      initializeMap({
        mapContainer: mapContainer.current,
        mapDefaultCoords: center as LngLatLike,
        onLoadCallback: (newMap) => setMap(newMap),
        zoom: 13,
        mapStyle,
      });
    }

    if (map) {
      map.keyboard.disable();

      clearStaticLayersAndSources(
        map,
        [MINIMAP_GEOJSON_LAYER, MINIMAP_GEOJSON_STROKE],
        [MINIMAP_GEOJSON_SOURCE],
      );

      const sourceOptions: SourceOptions[] = [
        {
          id: MINIMAP_GEOJSON_SOURCE,
          options: {
            type: "geojson",
            data: geometry,
          },
        },
      ];

      const mapLayersOptions: AddLayerObject[] = [
        {
          id: MINIMAP_GEOJSON_STROKE,
          type: "line",
          source: MINIMAP_GEOJSON_SOURCE,
          layout: {},
          paint: {
            "line-color": palette.map.location.background,
            "line-width": 4,
          },
        },
        {
          id: MINIMAP_GEOJSON_LAYER,
          type: "line",
          source: MINIMAP_GEOJSON_SOURCE,
          layout: {},
          paint: {
            "line-color": palette.map.location.foreground,
            "line-width": 2,
          },
        },
      ];

      createLayersAndSources(map, mapLayersOptions, sourceOptions);
    }

    return () => {
      if (map) {
        try {
          map.remove();
        } catch (error) {
          console.error("Error removing the map:", error);
        }
      }
    };
  }, [map]);

  useEffect(() => {
    // Create a layer for all sequences of frames
    if (!map || !sortedSequences || !apiCallsComplete) return;

    clearAllDynamicLayersAndSources(map, "dynamic");

    const allCoordinates: [number, number][] = [];
    const dots = [];

    sortedSequences.forEach((sequence: Frame[]) => {
      const { sequence: sequenceId } = sequence[0];
      const lines = [];

      sequence.forEach((frame: Frame) => {
        lines.push([frame.position.lon, frame.position.lat]);
        dots.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [frame.position.lon, frame.position.lat],
          },
          id: `${frame.sequence}_${frame.idx}`,
        });
      });

      allCoordinates.push(...lines);

      const linesGeoJSON = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: lines,
            },
          },
        ],
      };

      const source = `${sequenceId}_${MINIMAP_DYNAMIC_LINES_SOURCE}`;
      const layer = `${sequenceId}_${MINIMAP_DYNAMIC_LINES_LAYER}`;

      const lineSourceOptions: SourceOptions[] = [
        {
          id: source,
          options: {
            type: "geojson",
            data: linesGeoJSON,
          },
        },
      ];

      const lineLayersOptions: AddLayerObject[] = [
        {
          id: layer,
          type: "line",
          source: source,
          layout: {},
          paint: {
            "line-color": palette.map.frame.default.background,
            "line-width": 2,
            "line-opacity": 0.5,
          },
        },
      ];

      createLayersAndSources(map, lineLayersOptions, lineSourceOptions);
    });

    clearStaticLayersAndSources(
      map,
      [MINIMAP_DOTS_LAYER],
      [MINIMAP_DOTS_SOURCE],
    );

    const dotsGeoJSON = {
      type: "FeatureCollection",
      features: dots,
    };

    const dotsSourceOptions: SourceOptions[] = [
      {
        id: MINIMAP_DOTS_SOURCE,
        options: {
          type: "geojson",
          data: dotsGeoJSON,
        },
      },
    ];

    const dotsLayersOptions: AddLayerObject[] = [
      {
        id: MINIMAP_DOTS_LAYER,
        type: "circle",
        source: MINIMAP_DOTS_SOURCE,
        layout: {},
        paint: {
          "circle-color": palette.map.frame.default.foreground,
          "circle-radius": 3,
          "circle-stroke-width": 2,
          "circle-stroke-color": palette.map.frame.default.background,
        },
      },
    ];

    createLayersAndSources(map, dotsLayersOptions, dotsSourceOptions);

    if (allCoordinates.length > 0) {
      map.fitBounds(getBounds(allCoordinates), {
        padding: 20, // Optional padding around the bounds
      });
    }

    setCoordinates(allCoordinates);
  }, [map, sortedSequences, apiCallsComplete]);

  useEffect(() => {
    // Create a layer for the active sequence of frames
    if (!map || !activeSequence || !apiCallsComplete) return;

    clearStaticLayersAndSources(
      map,
      [MINIMAP_ACTIVE_LINE_LAYER, MINIMAP_ACTIVE_DOTS_LAYER],
      [MINIMAP_ACTIVE_DOTS_SOURCE, MINIMAP_ACTIVE_LINE_SOURCE],
    );

    const activeLine = [];
    const activeDots = activeSequence.map((frame: Frame) => {
      activeLine.push([frame.position.lon, frame.position.lat]);
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [frame.position.lon, frame.position.lat],
        },
        id: `${frame.sequence}_${frame.idx}`,
      };
    });

    const dotsGeoJSON = {
      type: "FeatureCollection",
      features: activeDots,
    };

    const activeLineGeoJSON = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: activeLine,
          },
        },
      ],
    };

    const activeSourceOptions: SourceOptions[] = [
      {
        id: MINIMAP_ACTIVE_LINE_SOURCE,
        options: {
          type: "geojson",
          data: activeLineGeoJSON,
        },
      },
      {
        id: MINIMAP_ACTIVE_DOTS_SOURCE,
        options: {
          type: "geojson",
          data: dotsGeoJSON,
        },
      },
    ];

    const activeLayersOptions: AddLayerObject[] = [
      {
        id: MINIMAP_ACTIVE_LINE_LAYER,
        type: "line",
        source: MINIMAP_ACTIVE_LINE_SOURCE,
        layout: {},
        paint: {
          "line-color": palette.map.frame.active.background,
          "line-width": 2,
        },
      },
      {
        id: MINIMAP_ACTIVE_DOTS_LAYER,
        type: "circle",
        source: MINIMAP_ACTIVE_DOTS_SOURCE,
        layout: {},
        paint: {
          "circle-color": palette.map.frame.active.foreground,
          "circle-radius": 3,
          "circle-stroke-width": 2,
          "circle-stroke-color": palette.map.frame.active.background,
        },
      },
    ];

    createLayersAndSources(map, activeLayersOptions, activeSourceOptions);
  }, [map, apiCallsComplete, activeSequence, activeSequenceIndex]);

  useEffect(() => {
    // Create a layer for the active frame
    if (!map || !activeSequence || !apiCallsComplete) return;

    clearStaticLayersAndSources(
      map,
      [MINIMAP_ACTIVE_FRAME_LAYER, MINIMAP_ACTIVE_FRAME_OUTLINE],
      [MINIMAP_ACTIVE_FRAME_SOURCE],
    );

    const activeFrame = activeSequence[activeFrameIndex.value];

    const activeDot = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [activeFrame.position.lon, activeFrame.position.lat],
      },
    };

    const dotsGeoJSON = {
      type: "FeatureCollection",
      features: [activeDot],
    };

    const activeFrameSourceOptions: SourceOptions[] = [
      {
        id: MINIMAP_ACTIVE_FRAME_SOURCE,
        options: {
          type: "geojson",
          data: dotsGeoJSON,
        },
      },
    ];

    const activeFrameLayersOptions: AddLayerObject[] = [
      {
        id: MINIMAP_ACTIVE_FRAME_OUTLINE,
        type: "circle",
        source: MINIMAP_ACTIVE_FRAME_SOURCE,
        layout: {},
        paint: {
          "circle-color": palette.map.frame.active.background,
          "circle-radius": 8,
        },
      },
      {
        id: MINIMAP_ACTIVE_FRAME_LAYER,
        type: "circle",
        source: MINIMAP_ACTIVE_FRAME_SOURCE,
        layout: {},
        paint: {
          "circle-color": palette.map.frame.active.background,
          "circle-radius": 4,
          "circle-stroke-width": 2,
          "circle-stroke-color": palette.map.frame.active.foreground,
        },
      },
    ];

    createLayersAndSources(
      map,
      activeFrameLayersOptions,
      activeFrameSourceOptions,
    );
  }, [map, apiCallsComplete, activeSequence, activeFrameIndex]);

  return (
    <div ref={mapContainer} className={cn.miniMapWrapper()}>
      <div
        className={cn.miniMapReset()}
        onClick={() => {
          if (map && coordinates.length > 0) {
            map.fitBounds(getBounds(coordinates), {
              padding: 20,
            });
          }
        }}
      >
        {map && <Reset />}
      </div>
    </div>
  );
};

export default MiniMap;
