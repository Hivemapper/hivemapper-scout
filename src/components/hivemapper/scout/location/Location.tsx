import React from "react";
import { ScoutLocation } from "types/location";

export interface LocationProps {
  location: ScoutLocation;
}

const Location: React.FC<LocationProps> = ({ location }) => {
  return <>Location</>;
};

export default Location;
