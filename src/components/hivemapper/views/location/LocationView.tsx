import React from "react";
import Location from "@components/hivemapper/scout/location";
import Container from "@components/hivemapper/ui/Container";
import { ViewLocationProps } from "types/view";

const LocationView: React.FC<ViewLocationProps> = ({
  dark,
  stripTailwindClasses,
  location,
}) => {
  return (
    <Container dark={dark} stripTailwindClasses={stripTailwindClasses}>
      <Location location={location} />
    </Container>
  );
};

export default LocationView;
