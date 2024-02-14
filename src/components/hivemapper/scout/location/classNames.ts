import twStore, { cn } from "@utils/helpers";

export const locationWrapper = () =>
  cn(
    { "bg-background rounded-md mx-1 px-3 py-3 mt-0": !twStore.get() },
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
    { "w-3/5 flex flex-col justify-between": !twStore.get() },
    "hm-location-section-top-right",
  );

export const locationLastMapped = () =>
  cn(
    { "flex items-center justify-end mt-2": !twStore.get() },
    "hm-location-last-mapped",
  );

export const locationLastMappedText = () =>
  cn(
    { "text-md font-bold ml-2": !twStore.get() },
    "hm-location-last-mapped-text",
  );

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
      [`relative h-[25vh] pb-3 w-full md:w-2/5 md:min-h-[60vh] md:pb-0 md:pr-3`]:
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
