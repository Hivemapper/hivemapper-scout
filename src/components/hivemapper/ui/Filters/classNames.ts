import twStore, { cn } from "@utils/helpers";

export const filterWrapper = () =>
  cn({ "flex w-full justify-end": !twStore.get() }, "hm-filter-wrapper");

export const filterSection = () =>
  cn({ "flex flex-col md:flex-row": !twStore.get() }, "hm-filter-section");

export const filterDropdown = () =>
  cn({ "pb-3 mr-2 md:pb-0": !twStore.get() }, "hm-filter-dropdown");
