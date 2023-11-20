import twStore, { cn } from "@utils/helpers";

export const mapWrapper = () => cn(
  { "relative w-full overflow-hidden": !twStore.get() },
  "hm-map-wrapper"
);

