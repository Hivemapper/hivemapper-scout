import twStore, { cn } from "@utils/helpers";

export const carouselWrapper = () =>
  cn({ "flex w-full relative": !twStore.get() }, "hm-carousel-wrapper");

export const carouselMaximize = () =>
  cn(
    { "absolute z-10 top-5 right-5 cursor-pointer": !twStore.get() },
    "hm-carousel-maximize",
  );

export const carouselDate = () =>
  cn(
    { "text-sm absolute z-10 bottom-5 left-5": !twStore.get() },
    "hm-carousel-date",
  );

export const carouselSequence = () =>
  cn(
    { "text-sm absolute font-semibold z-10 bottom-5 right-5": !twStore.get() },
    "hm-carousel-sequence",
  );

export const carouselLeftArrow = (isFirstFrame: boolean) =>
  cn(
    {
      [`absolute z-10 top-1/2 left-4 transform translate-y-[-50%]" cursor-${
        isFirstFrame ? "cursor-auto opacity-25" : "cursor-pointer opacity-100"
      }`]: !twStore.get(),
    },
    "hm-carousel-left-arrow",
  );

export const carouseRightArrow = (isLastFrame: boolean) =>
  cn(
    {
      [`absolute z-10 top-1/2 right-4 transform translate-y-[-50%]" ${
        isLastFrame ? "cursor-auto opacity-25" : "cursor-pointer opacity-100"
      }`]: !twStore.get(),
    },
    "hm-carousel-right-arrow",
  );

export const carouselSection = () =>
  cn(
    { "w-full rounded-md overflow-hidden": !twStore.get() },
    "hm-carousel-section",
  );

export const carouselFrame = (isActive: boolean) =>
  cn(
    {
      [`aspect-w-2 aspect-h-1 flex ${isActive ? "" : "hidden"}`]:
        !twStore.get(),
    },
    "hm-carousel-frame",
  );

export const carouselImg = () =>
  cn({ "object-cover w-full h-full": !twStore.get() }, "hm-carousel-img");
