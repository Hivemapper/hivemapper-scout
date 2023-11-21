import twStore, { cn } from "@utils/helpers";
import { Views } from "types/view";

export const container = (activeView: Views) =>
  cn(
    {
      [`w-full max-w-7xl mx-auto relative font-sans pt-8 ${activeView !== Views.Map ? 'pb-8' : ''}`]: !twStore.get(),
    },
    "hm-container",
  );
