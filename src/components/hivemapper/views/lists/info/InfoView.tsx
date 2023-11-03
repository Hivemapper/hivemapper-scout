import React from "react";
import Container from "@components/hivemapper/ui/Container";
import Info from "@components/hivemapper/scout/lists/info";
import { ViewLocationsProps } from "types/view";

const InfoView: React.FC<ViewLocationsProps> = ({
  dark,
  stripTailwindClasses,
  locations,
}) => {
  return (
    <Container dark={dark} stripTailwindClasses={stripTailwindClasses}>
      <Info locations={locations} />
    </Container>
  );
};

export default InfoView;
