import twStore, { cn } from "@utils/helpers";
import { DateRange } from "react-day-picker";

export const dateRangePickerWrapper = () =>
  cn(
    {
      "grid gap-2": !twStore.get(),
    },
    "hm-drp-wrapper",
  );

export const dateRangePickerButton = (date: DateRange) =>
  cn(
    {
      [`w-[280px] justify-start text-left font-normal ${
        !date ? "text-muted-foreground" : ""
      }`]: !twStore.get(),
    },
    "hm-drp-button",
  );

export const dateRangePickerIcon = () =>
  cn(
    {
      "mr-2 h-4 w-4": !twStore.get(),
    },
    "hm-drp-icon",
  );

export const dateRangePickerPopover = () =>
  cn(
    {
      "w-auto p-0": !twStore.get(),
    },
    "hm-drp-popover",
  );
