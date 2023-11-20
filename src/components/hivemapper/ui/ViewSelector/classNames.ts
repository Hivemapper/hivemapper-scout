import twStore, { cn } from "@utils/helpers";

export const viewSelectorWrapper = () => cn({ "flex w-full border-b border-solid p-3 bg-background": !twStore.get() }, "hm-view-selector-wrapper");
export const viewSelectorIconSection = () => cn({ "flex rounded-md border border-solid": !twStore.get() }, "hm-view-selector-icon-section");
export const viewSelectorIcon = (isLast?: boolean) => cn({ [`inline-block p-2 cursor-pointer ${!isLast ? "border-r border-solid" : ''}` ]: !twStore.get() }, "hm-view-selector-icon");