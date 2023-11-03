import React from "react";
import Simple from "./item/Simple";
import Detailed from "./item/Detailed";
import { ListType } from "types/list";
import { ScoutLocation } from "types/location";

export interface ListProps {
  type: ListType;
  locations: ScoutLocation[];
}

const List: React.FC<ListProps> = ({ type, locations }) => {
  switch (type) {
    case ListType.Info:
      return locations.map((location) => (
        <Simple key={location._id} location={location} />
      ));
    case ListType.Thumbnail:
      return locations.map((location) => (
        <Detailed key={location._id} location={location} />
      ));
    default:
      return <></>;
  }
};

export default List;
