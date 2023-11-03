import React, { useEffect, useRef, useState } from "react";
import maplibre, { LngLatLike, Map as MlMap } from "maplibre-gl";
import { setMapAccessToken, handleMapLayers, initializeMap } from "@utils/map";
import { ScoutLocation } from "types/location";
import "./map.css";

interface MapProps {
  locations: ScoutLocation[];
  mapAccessToken: string;
  defaultCoords: LngLatLike;
  mapStyle?: string;
}

const Map: React.FC<MapProps> = ({
  locations,
  mapAccessToken,
  defaultCoords,
  mapStyle,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MlMap | null>(null);

  setMapAccessToken(mapAccessToken);

  useEffect(() => {
    // @ts-ignore
    maplibre.accessToken = mapAccessToken;

    if (!map && mapContainer.current) {
      initializeMap(
        mapContainer.current,
        defaultCoords,
        (newMap) => setMap(newMap),
        mapStyle
      );
    }
  }, [map, setMap]);

  useEffect(() => {
    if (map) {
      handleMapLayers(map, locations);
    }
  }, [map, locations]);

  return (
    <div
      ref={mapContainer}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        width: "100%",
      }}
    >
      <div
        style={{
          zIndex: 0,
          backgroundColor: "black",
          opacity: 0.7,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </div>
  );
};

export default Map;
