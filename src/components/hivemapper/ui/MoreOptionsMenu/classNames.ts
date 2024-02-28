import twStore, { cn } from "@utils/helpers";

  export const moreOptionsRemoveLocation = () =>
  cn(
    {
      "cursor-pointer text-destructive":
        !twStore.get(),
    },
    "hm-more-options-remove-location",
  );