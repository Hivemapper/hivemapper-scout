import React from "react";
import { UploadIcon } from "lucide-react";

export interface UploadProps {
  width?: number;
  height?: number;
}

const Upload: React.FC<UploadProps> = ({ width, height }) => {
  return <UploadIcon width={width} height={height} />;
};

export default Upload;
