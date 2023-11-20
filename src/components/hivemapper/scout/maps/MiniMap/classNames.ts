import twStore, { cn } from "@utils/helpers";

export const miniMapWrapper = () => cn(
  { "relative w-full h-full rounded-md overflow-hidden": !twStore.get() },
  "hm-minimap-wrapper"
);

export const miniMapReset = () => cn(
  { "absolute top-4 right-4 z-10 cursor-pointer": !twStore.get() },
  "hm-minimap-reset"
);

