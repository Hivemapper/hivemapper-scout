import React from "react";
import { AlignJustifyIcon } from "lucide-react";

export interface ListProps {
  color?: string;
  width?: number;
  height?: number;
}

const List: React.FC<ListProps> = ({ color, width, height }) => {
  return <AlignJustifyIcon color={color} width={width} height={height} />;
};

export default List;
