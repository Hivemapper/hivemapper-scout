import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { StylesProvider } from "@hooks/useStyles";

export interface ContainerProps {
  dark?: boolean;
  stripTailwindClasses?: boolean;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  dark,
  stripTailwindClasses,
  children,
}) => {
  const [isDomReady, setIsDomReady] = useState(false);
  const containerClasses = classNames(
    {
      "w-full h-full max-w-7xl mx-auto relative": !stripTailwindClasses,
    },
    "hm-container"
  );

  useEffect(() => {
    setIsDomReady(true); // eliminates flicker when going from light to dark mode, negates SSR

    if (dark) {
      document.body.classList.add("hm-dark");
    }

    return () => {
      document.body.classList.remove("hm-dark");
    };
  }, [dark]);

  return (
    <StylesProvider stylesConfig={{ stripTailwindClasses }}>
      {isDomReady && <div className={containerClasses}>{children}</div>}
    </StylesProvider>
  );
};

export default Container;
