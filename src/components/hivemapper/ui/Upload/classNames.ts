import twStore, { cn } from "@utils/helpers";

export const uploadWrapper = () =>
  cn(
    { "flex justify-center align-center px-32 py-24": !twStore.get() },
    "hm-upload-wrapper",
  );
