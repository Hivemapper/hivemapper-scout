import React, { useEffect } from "react";
import { StylesProvider } from "@hooks/useStyles";
import { ConfigProvider } from "@hooks/useConfig";
import { LngLatLike } from "maplibre-gl";
import { DEFAULT_MAP_COORDS } from "@utils/map";

export interface ConfigProps {
  stripTailwindClasses?: boolean;
  darkMode?: boolean;
  mapAccessToken: string;
  mapDefaultCoords?: LngLatLike;
  apiKey: string;
  username: string;
  children: React.ReactNode;
}

const Config: React.FC<ConfigProps> = ({
  stripTailwindClasses,
  darkMode,
  mapAccessToken,
  mapDefaultCoords,
  apiKey,
  username,
  children,
}) => {
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("hm-dark");
    }

    return () => {
      document.body.classList.remove("hm-dark");
    };
  }, [darkMode]);

  return (
    <StylesProvider stylesConfig={{ stripTailwindClasses, darkMode }}>
      <ConfigProvider
        apiKey={apiKey}
        username={username}
        mapAccessToken={mapAccessToken}
        mapDefaultCoords={mapDefaultCoords || DEFAULT_MAP_COORDS}
      >
        {children}
      </ConfigProvider>
    </StylesProvider>
  );
};

export default Config;
