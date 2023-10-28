const Theme = {
  light: "light",
  dark: "dark"
} as const;

export type Theme = typeof Theme[keyof typeof Theme];