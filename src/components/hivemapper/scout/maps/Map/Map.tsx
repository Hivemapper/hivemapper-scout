import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import turf from "@turf/centroid";
import maplibre, {
  AddLayerObject,
  LngLatLike,
  Map as MlMap,
} from "maplibre-gl";
import {
  setMapAccessToken,
  initializeMap,
  handleBoundEvents,
  clearStaticLayersAndSources,
  createLayersAndSources,
} from "@utils/map";
import palette from "@styles/palette";
import { ScoutLocation } from "types/location";
import { SourceOptions } from "types/map";
import * as cn from "./classNames";

const MAP_CENTROID_LAYER = "map-centroid-hm-layer";
const MAP_CENTROID_SOURCE = "map-centroid-hm-source";
const MAP_GEOJSON_LAYER = "map-geojson-hm-layer";
const MAP_GEOJSON_STROKE = "map-geojson-hm-stroke";
const MAP_GEOJSON_SOURCE = "map-geojson-hm-source";

export interface MapProps {
  locations: ScoutLocation[];
  mapAccessToken: string;
  mapDefaultCoords?: LngLatLike;
  mapStyle?: string;
  selectionCallback?: (id: string | number) => void;
}

const Map: React.FC<MapProps> = ({
  locations,
  mapAccessToken,
  mapDefaultCoords,
  mapStyle,
  selectionCallback = () => {},
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MlMap | null>(null);
  const [distanceFromTop, setDistanceFromTop] = useState(0);

  setMapAccessToken(mapAccessToken);

  useLayoutEffect(() => {
    if (mapContainer.current) {
      const rect = mapContainer.current.getBoundingClientRect();
      setDistanceFromTop(Math.floor(rect.top));
    }
  }, []);

  useEffect(() => {
    // @ts-ignore
    maplibre.accessToken = mapAccessToken;

    if (!map && mapContainer.current) {
      initializeMap({
        mapContainer: mapContainer.current,
        mapDefaultCoords,
        onLoadCallback: (newMap) => setMap(newMap),
        zoom: 3,
        mapStyle,
      });
    }
  }, [map, setMap]);

  useEffect(() => {
    if (map) {
      clearStaticLayersAndSources(
        map,
        [MAP_GEOJSON_LAYER, MAP_GEOJSON_STROKE, MAP_CENTROID_LAYER],
        [MAP_GEOJSON_SOURCE, MAP_CENTROID_SOURCE],
      );

      const featureCollection = {
        type: "FeatureCollection",
        features: locations.map((location) => ({
          type: "Feature",
          properties: {
            id: location._id,
          },
          geometry: location.geojson,
        })),
      };

      const centroidCollection = {
        type: "FeatureCollection",
        features: locations.map((location) => {
          const centroid = turf(location.geojson);
          return {
            type: "Feature",
            properties: {
              id: location._id,
            },
            geometry: {
              type: "Point",
              coordinates: [
                centroid.geometry.coordinates[0],
                centroid.geometry.coordinates[1],
              ],
            },
          };
        }),
      };

      const sourceOptions: SourceOptions[] = [
        {
          id: MAP_GEOJSON_SOURCE,
          options: {
            type: "geojson",
            data: featureCollection,
            promoteId: "id",
          },
        },
        {
          id: MAP_CENTROID_SOURCE,
          options: {
            type: "geojson",
            data: centroidCollection,
            promoteId: "id",
          },
        },
      ];

      const mapLayersOptions: AddLayerObject[] = [
        {
          id: MAP_GEOJSON_LAYER,
          type: "fill",
          source: MAP_GEOJSON_SOURCE,
          minzoom: 13,
          layout: {},
          paint: {
            "fill-color": palette.map.location.foreground,
            "fill-opacity": 0.5,
          },
        },
        {
          id: MAP_GEOJSON_STROKE,
          type: "line",
          source: MAP_GEOJSON_SOURCE,
          minzoom: 13,
          layout: {},
          paint: {
            "line-color": palette.map.location.foreground,
            "line-width": 2,
          },
        },
        {
          id: MAP_CENTROID_LAYER,
          type: "circle",
          source: MAP_CENTROID_SOURCE,
          minzoom: 0,
          maxzoom: 13,
          layout: {},
          paint: {
            "circle-color": palette.map.location.foreground,
            "circle-radius": 4,
            "circle-opacity": 0.75,
            "circle-pitch-scale": "viewport",
          },
        },
      ];

      createLayersAndSources(map, mapLayersOptions, sourceOptions);
      handleBoundEvents(
        map,
        [MAP_GEOJSON_LAYER, MAP_CENTROID_LAYER],
        selectionCallback,
      );
    }
  }, [map, locations]);

  return (
    <div
      ref={mapContainer}
      className={cn.mapWrapper()}
      style={{ height: `calc(95vh - ${distanceFromTop}px)` }}
    />
  );
};

export default Map;
