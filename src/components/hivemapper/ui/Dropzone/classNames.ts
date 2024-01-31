import twStore, { cn } from "@utils/helpers";

export const dropzoneWrapper = () =>
  cn(
    { "flex flex-col justify-center align-center": !twStore.get() },
    "hm-dropzone-wrapper",
  );
