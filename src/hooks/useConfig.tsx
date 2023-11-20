import { LngLatLike } from "maplibre-gl";
import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

export interface ContextState {
  credentials: string;
  setCredentials: Dispatch<SetStateAction<string>>;
  mapAccessToken: string;
  mapDefaultCoords: LngLatLike;
  stripTailwindClasses: boolean;
  darkMode: boolean;
}

interface CredentialsProps {
  apiKey: string;
  username: string;
  mapAccessToken: string;
  mapDefaultCoords: LngLatLike;
  stripTailwindClasses?: boolean;
  darkMode?: boolean;
  children: React.ReactNode;
}

export const ConfigContext = createContext<
  ContextState | Record<string, never>
>({});

const ConfigProvider: React.FC<CredentialsProps> = ({
  apiKey,
  username,
  mapAccessToken,
  mapDefaultCoords,
  stripTailwindClasses,
  darkMode,
  children,
}) => {
  const encodedCredentials = btoa(`${username}:${apiKey}`);
  const [credentials, setCredentials] = useState<string>(encodedCredentials);

  return (
    <ConfigContext.Provider
      value={{
        credentials,
        setCredentials,
        mapAccessToken,
        mapDefaultCoords,
        stripTailwindClasses,
        darkMode,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within the ConfigProvider");
  }

  return {
    credentials: context.credentials,
    mapAccessToken: context.mapAccessToken,
    mapDefaultCoords: context.mapDefaultCoords,
    stripTailwindClasses: context.stripTailwindClasses,
    darkMode: context.darkMode,
  };
};

export { ConfigProvider, useConfig };
