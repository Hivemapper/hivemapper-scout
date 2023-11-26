import React, { useEffect } from "react";
import { ConfigProvider } from "@hooks/useConfig";
import twStore from "@utils/helpers";

export interface ConfigProps {
  children: React.ReactNode;
  stripTailwindClasses?: boolean;
  darkMode?: boolean;
}

const Config: React.FC<ConfigProps> = ({
  stripTailwindClasses,
  darkMode = false,
  children = false,
}) => {
  twStore.set(stripTailwindClasses);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("hm-dark");
    }

    return () => {
      document.body.classList.remove("hm-dark");
    };
  }, [darkMode]);

  return (
    <ConfigProvider
      darkMode={darkMode}
      stripTailwindClasses={stripTailwindClasses}
    >
      {children}
    </ConfigProvider>
  );
};

export default Config;
