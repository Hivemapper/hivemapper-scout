const fs = require("fs");
const palette = require("../styles/palette");

const cssContent = `/* This file is automatically generated by src/scripts/generate.ts */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: ${palette.default.background};
    --foreground: ${palette.default.foreground};

    --muted: ${palette.default.muted};
    --muted-foreground: ${palette.default.mutedForeground};

    --popover: ${palette.default.popover};
    --popover-foreground: ${palette.default.popoverForeground};

    --border: ${palette.default.border};
    --input: ${palette.default.input};

    --card: ${palette.default.card};
    --card-foreground: ${palette.default.cardForeground};

    --primary: ${palette.default.primary};
    --primary-foreground: ${palette.default.primaryForeground};

    --secondary: ${palette.default.secondary};
    --secondary-foreground: ${palette.default.secondaryForeground};

    --accent: ${palette.default.accent};
    --accent-foreground: ${palette.default.accentForeground};

    --destructive: ${palette.default.destructive};
    --destructive-foreground: ${palette.default.destructiveForeground};

    --ring: ${palette.default.ring};

    --radius: 0.6rem;
    --font-sans: "Lato", sans-serif;
  }

  .hm-dark {
    --background: ${palette.dark.background};
    --foreground: ${palette.dark.foreground};

    --muted: ${palette.dark.muted};
    --muted-foreground: ${palette.dark.mutedForeground};

    --popover: ${palette.dark.popover};
    --popover-foreground: ${palette.dark.popoverForeground};

    --border: ${palette.dark.border};
    --input: ${palette.dark.input};

    --card: ${palette.dark.card};
    --card-foreground: ${palette.dark.cardForeground};

    --primary: ${palette.dark.primary};
    --primary-foreground: ${palette.dark.primaryForeground};

    --secondary: ${palette.dark.secondary};
    --secondary-foreground: ${palette.dark.secondaryForeground};

    --accent: ${palette.dark.accent};
    --accent-foreground: ${palette.dark.accentForeground};

    --destructive: ${palette.dark.destructive};
    --destructive-foreground: ${palette.dark.destructiveForeground};

    --ring: ${palette.dark.ring};
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings:
      "rlig" 1,
      "calt" 1;
  }
}
`;

fs.writeFile("src/global.css", cssContent, (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("global.css file generated successfully.");
});
