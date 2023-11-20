import twStore, { cn } from "@utils/helpers";

export const searchWrapper = () => cn({ "relative min-w-[30%]": !twStore.get() }, "hm-search-wrapper");
export const searchClear = (value: string) => cn({ [`absolute top-1/2 transform -translate-y-[50%] right-2 ${value ? "cursor-pointer" : "cursor-auto" }`]: !twStore.get()}, "hm-search-clear");
