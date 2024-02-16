import twStore, { cn } from "@utils/helpers";

export const dropzoneWrapper = () =>
  cn(
    { "flex flex-col justify-center align-center": !twStore.get() },
    "hm-dropzone-wrapper",
  );
export const dropzoneMarginTop = () =>
  cn({ "mt-4": !twStore.get() }, "hm-dropzone-margin-top");
export const dropzoneError = (hasError: boolean) =>
  cn(
    {
      [`mt-4 text-destructive max-w-[500px] text-center h-[24px] ${hasError ? "visible" : "invisible"}`]:
        !twStore.get(),
    },
    "hm-dropzone-error",
  );
export const dropzoneFileBadgeWrapper = () =>
  cn({ "flex h-[24px]": !twStore.get() }, "hm-dropzone-file-badge-wrapper");
export const dropzoneFileBadge = () =>
  cn(
    { "max-w-max mt-3 mr-2 text-sm py-2": !twStore.get() },
    "hm-dropzone-file-badge",
  );
export const dropzoneFileBadgeCloseButton = () =>
  cn(
    { "ml-2 w-2 h-5 flex items-center justify-center": !twStore.get() },
    "hm-dropzone-file-badge-close-button",
  );
