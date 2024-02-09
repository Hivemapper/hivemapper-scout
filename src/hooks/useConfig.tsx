import React, { createContext, useContext } from "react";

export interface ContextState {
  stripTailwindClasses: boolean;
  darkMode: boolean;
  mapAccessToken: string;
}

interface CredentialsProps {
  stripTailwindClasses: boolean;
  darkMode: boolean;
  mapAccessToken: string;
  children: React.ReactNode;
}

export const ConfigContext = createContext<
  ContextState | Record<string, never>
>({});

const ConfigProvider: React.FC<CredentialsProps> = ({
  stripTailwindClasses,
  darkMode,
  mapAccessToken,
  children,
}) => {
  return (
    <ConfigContext.Provider
      value={{
        stripTailwindClasses,
        darkMode,
        mapAccessToken,
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
    stripTailwindClasses: context.stripTailwindClasses,
    darkMode: context.darkMode,
    mapAccessToken: context.mapAccessToken,
  };
};

export { ConfigProvider, useConfig };
