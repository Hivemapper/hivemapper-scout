import React from "react";
import { SquareIcon } from "lucide-react";

export interface SquareProps {
  color?: string;
  width?: number;
  height?: number;
}

const Square: React.FC<SquareProps> = ({ color, width, height }) => {
  return <SquareIcon color={color} width={width} height={height} />;
};

export default Square;
