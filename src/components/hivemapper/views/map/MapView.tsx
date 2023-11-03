import React from "react";
import Map from "@components/hivemapper/scout/map";
import Container from "@components/hivemapper/ui/Container";
import { MapViewLocationsProps } from "types/view";

const MapView: React.FC<MapViewLocationsProps> = ({
  dark,
  stripTailwindClasses,
  locations,
  defaultCoords,
  mapAccessToken,
  mapStyle,
}) => {
  return (
    <Container dark={dark} stripTailwindClasses={stripTailwindClasses}>
      <Map
        defaultCoords={defaultCoords}
        locations={locations}
        mapAccessToken={mapAccessToken}
        mapStyle={mapStyle}
      />
    </Container>
  );
};

export default MapView;
