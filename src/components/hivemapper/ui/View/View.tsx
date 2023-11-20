import React from "react";
import * as cn from "./classNames";

export interface ViewProps {
  children: React.ReactNode;
}

const View: React.FC<ViewProps> = ({ children }) => {
  return <div className={cn.viewWrapper()}>{children}</div>;
};

export default View;
