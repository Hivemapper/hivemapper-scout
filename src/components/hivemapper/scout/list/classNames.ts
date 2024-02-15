import twStore, { cn } from "@utils/helpers";

export const listWrapper = () =>
  cn({ "bg-background": !twStore.get() }, "hm-list-wrapper");
  export const listNullState = () =>
  cn({ "flex h-[100%] justify-center items-center text-primary": !twStore.get() }, "hm-list-wrapper");