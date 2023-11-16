import React from "react";
import { MapIcon } from "lucide-react";

export interface MapProps {
  color?: string;
  width?: number;
  height?: number;
}

const Map: React.FC<MapProps> = ({ color, width, height }) => {
  return <MapIcon color={color} width={width} height={height} />;
};

export default Map;
