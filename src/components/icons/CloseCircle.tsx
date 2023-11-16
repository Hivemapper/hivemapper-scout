import React from "react";
import { XCircleIcon } from "lucide-react";

export interface CloseCircleProps {
  color?: string;
  width?: number;
  height?: number;
}

const CloseCircle: React.FC<CloseCircleProps> = ({ color, width, height }) => {
  return <XCircleIcon color={color} width={width} height={height} />;
};

export default CloseCircle;
