import twStore, { cn } from "@utils/helpers";

export const listWrapper = () =>
  cn({ "bg-background": !twStore.get() }, "hm-list-wrapper");
