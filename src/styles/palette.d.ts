interface ColorSettings {
  background?: string;
  foreground?: string;
  muted?: string;
  mutedForeground?: string;
  popover?: string;
  popoverForeground?: string;
  border?: string;
  input?: string;
  card?: string;
  cardForeground?: string;
  primary?: string;
  primaryForeground?: string;
  secondary?: string;
  secondaryForeground?: string;
  accent?: string;
  accentForeground?: string;
  destructive?: string;
  destructiveForeground?: string;
  ring?: string;
  radius?: string;
  fontSans?: string;
}

interface Palette {
  default: ColorSettings;
  dark: ColorSettings;
  map: {
    location: ColorSettings;
    frame: ColorSettings;
  };
}

declare const palette: Palette;
export = palette;
