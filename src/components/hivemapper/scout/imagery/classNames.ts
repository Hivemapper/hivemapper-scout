import twStore, { cn } from "@utils/helpers";

export const imageryWrapper = () => cn(
  { "flex flex-col w-full h-auto": !twStore.get() },
  "hm-location-wrapper"
);

export const imageryLoader = () => cn(
  { "flex w-full h-full justify-center items-center": !twStore.get() },
  "hm-location-loader"
);

export const imageryThumbnails = () => cn(
  { "flex flex-row overflow-x-scroll mt-3 focus:outline-none": !twStore.get() },
  "hm-location-thumbnails"
);

export const imageryThumbnail = (isLast: boolean) => cn(
  { [`min-w-[30%] ${isLast ? 'mr-0' : 'mr-2'}`]: !twStore.get() },
  "hm-location-thumbnails"
);

export const imageryNullState = () => cn(
  { "flex w-full h-full items-center justify-center text-base pb-2": !twStore.get() },
  "hm-location-null-state"
);
