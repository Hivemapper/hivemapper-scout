import twStore, { cn } from "@utils/helpers";

export const buttonWrapper = () => cn({ "w-[200px] justify-between": !twStore.get() }, "hm-button-wrapper");

export const buttonChevron = () => cn({ "ml-2 h-4 w-4 shrink-0 opacity-50": !twStore.get() }, "hm-button-chevron");

export const buttonCheckmark = (isActive: boolean) => cn({ [`"mr-2 h-4 w-4", ${isActive ? "opacity-100" : "opacity-0"}`]: !twStore.get() }, "hm-button-checkmark");

export const buttonPopover = () => cn({ "w-[200px] p-0": !twStore.get() }, "hm-button-popover");