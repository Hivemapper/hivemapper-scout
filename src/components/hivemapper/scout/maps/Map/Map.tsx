import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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

const MAP_GEOJSON_LAYER = "map-geojson-hm-layer";
const MAP_GEOJSON_STROKE = "map-geojson-hm-stroke";
const MAP_GEOJSON_SOURCE = "map-geojson-hm-source";

interface MapProps {
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
        mapStyle,
      });
    }
  }, [map, setMap]);

  useEffect(() => {
    if (map) {
      clearStaticLayersAndSources(
        map,
        [MAP_GEOJSON_LAYER, MAP_GEOJSON_STROKE],
        [MAP_GEOJSON_SOURCE]
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

      const sourceOptions: SourceOptions[] = [
        {
          id: MAP_GEOJSON_SOURCE,
          options: {
            type: "geojson",
            data: featureCollection,
            promoteId: "id",
          },
        },
      ];

      const mapLayersOptions: AddLayerObject[] = [
        {
          id: MAP_GEOJSON_LAYER,
          type: "fill",
          source: MAP_GEOJSON_SOURCE,
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
          layout: {},
          paint: {
            "line-color": palette.map.location.foreground,
            "line-width": 2,
          },
        },
      ];

      createLayersAndSources(map, mapLayersOptions, sourceOptions);
      handleBoundEvents(map, MAP_GEOJSON_LAYER, selectionCallback);
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
