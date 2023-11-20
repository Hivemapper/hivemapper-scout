import twStore, { cn } from "@utils/helpers";

export const filterWrapper = () => cn({ "flex w-full justify-between": !twStore.get() }, "hm-filter-wrapper");

export const filterSection = () => cn({ "flex": !twStore.get() }, "hm-filter-section");

export const filterDropdown = () => cn({ "mr-2": !twStore.get() }, "hm-filter-dropdown");