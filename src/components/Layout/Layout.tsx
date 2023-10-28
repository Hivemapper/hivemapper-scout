import React from "react";
import { Theme } from "./Layout.types";

export interface LayoutProps {
  theme: Theme;
}

const Layout: React.FC<LayoutProps> = ({ theme }) => {
  return <div className="layout-container">Responsive layout container </div>;
};

export default Layout;
