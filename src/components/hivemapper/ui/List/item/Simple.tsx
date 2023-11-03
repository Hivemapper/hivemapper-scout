import React from "react";
import { ScoutLocation } from "types/location";

export interface SimpleProps {
  location: ScoutLocation;
}

const Simple: React.FC<SimpleProps> = ({ location }) => {
  return <div>Simple</div>;
};

export default Simple;
