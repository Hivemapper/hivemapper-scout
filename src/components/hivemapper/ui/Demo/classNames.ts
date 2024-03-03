import twStore, { cn } from "@utils/helpers";

export const demoMapViewWrapper = (active: boolean) =>
  cn(
    { [`${active ? "flex" : "hidden"}`]: !twStore.get() },
    "hm-demo-map-view-wrapper",
  );

export const demoListViewWrapper = (active: boolean) =>
  cn(
    { [`${active ? "block" : "hidden"}`]: !twStore.get() },
    "hm-demo-list-view-wrapper",
  );

export const demoLocationViewWrapper = (active: boolean) =>
  cn(
    { [`${active ? "block" : "hidden"}`]: !twStore.get() },
    "hm-demo-location-view-wrapper",
  );
