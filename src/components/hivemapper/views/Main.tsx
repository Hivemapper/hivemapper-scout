import React from "react";
import App from "@components/hivemapper/ui/App";
import Config from "@components/hivemapper/hoc/Config";
import { MainViewProps } from "types/view";

const Main: React.FC<MainViewProps> = ({
  locations,
  darkMode,
  stripTailwindClasses,
  mapAccessToken,
  mapDefaultCoords,
  apiKey,
  username,
}) => {
  return (
    <Config
      darkMode={darkMode}
      stripTailwindClasses={stripTailwindClasses}
      mapAccessToken={mapAccessToken}
      mapDefaultCoords={mapDefaultCoords}
      apiKey={apiKey}
      username={username}
    >
      <App locations={locations} />
    </Config>
  );
};

export default Main;
