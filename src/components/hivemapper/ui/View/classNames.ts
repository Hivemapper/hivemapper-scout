import twStore, { cn } from "@utils/helpers";

export const viewWrapper = () => cn({ "rounded-md border solid mt-3 overflow-hidden": !twStore.get() }, "hm-view-wrapper");
