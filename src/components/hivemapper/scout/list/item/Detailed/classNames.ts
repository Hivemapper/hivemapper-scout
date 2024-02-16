import twStore, { cn } from "@utils/helpers";

export const detailedItemWrapper = () =>
  cn(
    {
      "flex bg-background p-4 border-b border-b-1 min-h-[222px] text-left":
        !twStore.get(),
    },
    "hm-detailed-item-wrapper",
  );
export const detailedItemLeftSection = () =>
  cn({ "w-1/3": !twStore.get() }, "hm-detailed-item-left-section");
export const detailedItemLocation = () =>
  cn(
    { "text-2xl font-semibold tracking-tight cursor-pointer": !twStore.get() },
    "hm-detailed-item-location",
  );
export const detailedItemDescription = () =>
  cn(
    {
      "text-primary text-lg font-semibold tracking-tight mt-2": !twStore.get(),
    },
    "hm-detailed-item-description",
  );
export const detailedItemTags = () =>
  cn({ "mt-2": !twStore.get() }, "hm-detailed-item-tags");
export const detailedItemTag = () =>
  cn({ "mr-1": !twStore.get() }, "hm-detailed-item-tag");
export const detailedItemCentroid = () =>
  cn(
    {
      "text-sm font-medium tracking-normal text-blue-400 mt-2": !twStore.get(),
    },
    "hm-detailed-item-centroid",
  );
export const detailedItemSequence = () =>
  cn(
    { "text-sm font-bold tracking-normal mt-2": !twStore.get() },
    "hm-detailed-item-sequence",
  );
export const detailedItemDateSection = () =>
  cn(
    { "flex items-center mt-2": !twStore.get() },
    "hm-detailed-item-date-section",
  );
export const detailedItemDate = () =>
  cn({ "text-md font-bold": !twStore.get() }, "hm-detailed-item-date");
export const detailedItemImagery = () =>
  cn({ "flex flex-row w-2/3": !twStore.get() }, "hm-detailed-item-imagery");
export const detailedItemLoader = () =>
  cn(
    { "flex w-full justify-center items-center": !twStore.get() },
    "hm-detailed-item-loader",
  );
export const detailedItemThumbnailSection = () =>
  cn(
    {
      "flex flex-row w-full overflow-x-scroll mt-3 focus:outline-none":
        !twStore.get(),
    },
    "hm-detailed-item-thumbnail-section",
  );
export const detailedItemThumbnail = (isLast: boolean) =>
  cn(
    {
      [`min-w-[60%] md:min-w-[30%] ${isLast ? "mr-0" : "mr-2"}`]:
        !twStore.get(),
    },
    "hm-detailed-item-thumbnail",
  );
export const detailedItemNullState = () =>
  cn(
    {
      "flex w-full items-center justify-center text-base pb-2": !twStore.get(),
    },
    "hm-detailed-item-null-state",
  );
