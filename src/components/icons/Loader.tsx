import React from "react";
import { Loader2Icon } from "lucide-react";

export interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return <Loader2Icon className={`animate-spin-slow ${className}`} />;
};

export default Loader;
