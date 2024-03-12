import twStore, { cn } from "@utils/helpers";

export const viewSelectorWrapper = (omitBottomBorder: boolean) =>
  cn(
    {
      [`flex justify-between w-full p-3 bg-background ${
        !omitBottomBorder ? "border-b border-solid" : ""
      }`]: !twStore.get(),
    },
    "hm-view-selector-wrapper",
  );
export const viewSelectorAndTags = () =>
  cn(
    {
      flex: !twStore.get(),
    },
    "hm-view-selector-and-tags",
  );
export const viewSelectorIconSection = () =>
  cn(
    { "flex rounded-md border border-solid mr-2": !twStore.get() },
    "hm-view-selector-icon-section",
  );
export const viewSelectorIcon = (isLast?: boolean) =>
  cn(
    {
      [`inline-block p-2 cursor-pointer ${
        !isLast ? "border-r border-solid" : ""
      }`]: !twStore.get(),
    },
    "hm-view-selector-icon",
  );
