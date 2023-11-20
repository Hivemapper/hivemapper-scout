import React, { useEffect } from "react";
import { ConfigProvider } from "@hooks/useConfig";
import { LngLatLike } from "maplibre-gl";
import { DEFAULT_MAP_COORDS } from "@utils/map";
import twStore from "@utils/helpers";

export interface ConfigProps {
  mapAccessToken: string;
  mapDefaultCoords?: LngLatLike;
  apiKey: string;
  username: string;
  children: React.ReactNode;
  stripTailwindClasses: boolean;
  darkMode: boolean;
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
      apiKey={apiKey}
      username={username}
      mapAccessToken={mapAccessToken}
      mapDefaultCoords={mapDefaultCoords || DEFAULT_MAP_COORDS}
      darkMode={darkMode}
    >
      {children}
    </ConfigProvider>
  );
};

export default Config;
