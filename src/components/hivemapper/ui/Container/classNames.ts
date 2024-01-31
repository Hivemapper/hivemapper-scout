import twStore, { cn } from "@utils/helpers";
import { Views } from "types/view";

export const container = (activeView: Views) =>
  cn(
    {
      [`w-full px-2 max-w-[1400px] mx-auto relative bg-background pt-8 ${
        activeView !== Views.Map ? "pb-8" : ""
      }`]: !twStore.get(),
    },
    "hm-container",
  );
