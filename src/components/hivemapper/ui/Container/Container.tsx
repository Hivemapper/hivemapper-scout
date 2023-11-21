import React from "react";
import { Views } from "types/view";
import * as cn from "./classNames";

export interface ContainerProps {
  activeView?: Views;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ activeView, children }) => {
  return <div className={cn.container(activeView)}>{children}</div>;
};

export default Container;
