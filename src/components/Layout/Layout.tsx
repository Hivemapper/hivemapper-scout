import * as React from "react";
import classNames from "classnames";

export interface LayoutProps {
  dark?: boolean;
  stripTailwindClasses?: boolean;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  dark,
  stripTailwindClasses,
  children,
}) => {
  const layoutClasses = classNames(
    {
      "bg-white dark:bg-gray-800": !stripTailwindClasses,
      dark: dark,
    },
    "hm-layout"
  );

  return <div className={layoutClasses}>{children}</div>;
};

export default Layout;
