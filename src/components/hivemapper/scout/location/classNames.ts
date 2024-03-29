import twStore, { cn } from "@utils/helpers";

export const locationWrapper = () =>
  cn(
    { "bg-background rounded-b-md p-4 mt-0": !twStore.get() },
    "hm-location-wrapper",
  );

export const locationSectionTop = () =>
  cn({ "flex w-full": !twStore.get() }, "hm-location-section-top");

export const locationSectionTopLeft = () =>
  cn({ "w-2/5": !twStore.get() }, "hm-location-section-top-left");

export const locationName = () =>
  cn(
    { "text-3xl font-bold tracking-tight": !twStore.get() },
    "hm-location-name",
  );

export const locationDescription = () =>
  cn(
    {
      "text-primary text-2xl font-semibold tracking-tight mt-2": !twStore.get(),
    },
    "hm-location-description",
  );

export const locationCentroid = () =>
  cn(
    {
      "hidden md:flex text-md font-medium tracking-normal text-blue-400 mt-2":
        !twStore.get(),
    },
    "hm-location-centroid",
  );

export const locationSectionTopRight = () =>
  cn(
    { "relative w-3/5 flex flex-col justify-between": !twStore.get() },
    "hm-location-section-top-right",
  );

export const locationOptionsCredits = () =>
  cn(
    { "font-semibold mr-4": !twStore.get() },
    "hm-detailed-item-options-credit",
  );

export const locationLastMapped = () =>
  cn(
    { "flex items-center justify-end mt-2": !twStore.get() },
    "hm-location-last-mapped",
  );

export const locationLastMappedText = () =>
  cn({ "text-md font-bold": !twStore.get() }, "hm-location-last-mapped-text");

export const locationLastMappedDate = () =>
  cn(
    { "flex items-center justify-end mt-2": !twStore.get() },
    "hm-location-section-bottom",
  );

export const locationLastMappedDateText = () =>
  cn(
    { "text-primary text-sm font-medium tracking-normal": !twStore.get() },
    "hm-location-last-mapped-date-text",
  );

export const locationCollectionsImages = () =>
  cn(
    {
      "text-right md:text-left text-base font-bold tracking-normal":
        !twStore.get(),
    },
    "hm-location-collections-images",
  );

export const locationSectionBottom = () =>
  cn(
    { "flex flex-col w-full md:flex-row mt-2": !twStore.get() },
    "hm-location-section-bottom",
  );

export const locationMiniMap = () =>
  cn(
    {
      "relative h-[25vh] pb-3 w-full md:w-2/5 md:min-h-[60vh] md:pb-0 md:pr-3":
        !twStore.get(),
    },
    "hm-location-mini-map",
  );

export const locationImagery = () =>
  cn(
    {
      "flex h-[100%] md:min-h-[60vh] flex-wrap w-full md:w-3/5": !twStore.get(),
    },
    "hm-location-imagery",
  );

export const locationNullState = () =>
  cn(
    {
      "flex h-[100%] justify-center items-center text-primary": !twStore.get(),
    },
    "hm-location-null-state",
  );

export const locationMoreOptionsMenu = () =>
  cn(
    {
      "flex items-center absolute right-0 top-0": !twStore.get(),
    },
    "hm-location-more-options-menu",
  );
