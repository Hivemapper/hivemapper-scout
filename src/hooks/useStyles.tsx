import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type Styles = {
  stripTailwindClasses?: boolean;
};

export interface ContextState {
  styles: Styles;
  setStyles: Dispatch<SetStateAction<Styles>>;
}

interface StylesProps {
  stylesConfig: Styles;
  children: React.ReactNode;
}

export const StylesContext = createContext<
  ContextState | Record<string, never>
>({});

const StylesProvider: React.FC<StylesProps> = ({ children, stylesConfig }) => {
  const [styles, setStyles] = useState<Styles>(stylesConfig);

  return (
    <StylesContext.Provider value={{ styles, setStyles }}>
      {children}
    </StylesContext.Provider>
  );
};

const useStyles = () => {
  const context = useContext(StylesContext);
  if (context === undefined) {
    throw new Error("useStyles must be used within the StylesProvider");
  }
  return context.styles;
};

export { StylesProvider, useStyles };
