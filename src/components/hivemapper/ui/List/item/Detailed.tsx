import React from "react";
import { ScoutLocation } from "types/location";

export interface DetailedProps {
  location: ScoutLocation;
}

const Detailed: React.FC<DetailedProps> = ({ location }) => {
  return <div>Detailed</div>;
};

export default Detailed;
