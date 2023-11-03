import React from "react";
import Container from "@components/hivemapper/ui/Container";
import { ViewLocationsProps } from "types/view";
import List from "@components/hivemapper/ui/List";
import { ListType } from "types/list";

const ThumbnailView: React.FC<ViewLocationsProps> = ({
  locations,
  dark,
  stripTailwindClasses,
}) => {
  return (
    <Container dark={dark} stripTailwindClasses={stripTailwindClasses}>
      <List type={ListType.Thumbnail} locations={locations} />
    </Container>
  );
};

export default ThumbnailView;
