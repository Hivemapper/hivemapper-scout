import twStore, { cn } from "@utils/helpers";

export const thumbnailWrapper = () => cn({ "flex flex-col cursor-pointer": !twStore.get() }, "hm-thumbnail-wrapper");
export const thumbnailImgSection = () => cn({ "flex w-full aspect-w-2 aspect-h-1": !twStore.get() }, "hm-thumbnail-img-section");
export const thumbnailImg = (isActive: boolean, darkMode: boolean) => cn({ [`${
  isActive ? 'border-2 border-primary' : "border-2 border-transparent"
} rounded-md`]: !twStore.get() }, "hm-thumbnail-img-section");
export const thumbnailDate = () => cn({ "text-primary text-sm font-medium tracking-normal mt-1": !twStore.get() }, "hm-thumbnail-date");
export const thumbnailPrettyDate = () => cn({ "flex items-center text-md font-bold tracking-normal": !twStore.get() }, "hm-thumbnail-pretty-date");
export const thumbnailPrettyDateSpan = () => cn({ "ml-2": !twStore.get() }, "hm-thumbnail-pretty-date-span");
