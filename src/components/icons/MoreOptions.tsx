import React from "react";
import { MoreHorizontal } from "lucide-react";

export interface MoreOptionsProps {
  width?: number;
  height?: number;
}

const MoreOptions: React.FC<MoreOptionsProps> = ({ width, height }) => {
  return <MoreHorizontal width={width} height={height} />;
};

export default MoreOptions;
