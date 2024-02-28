import twStore, { cn } from "@utils/helpers";

export const uploadModalWrapper = () =>
  cn(
    {
      "w-full min-w-[620px] p-12 py-8 bg-background border rounded-xl":
        !twStore.get(),
    },
    "hm-upload-modal-wrapper",
  );
export const uploadModalCloseButton = (isLoading: boolean) =>
  cn(
    {
      [`absolute top-[8px] right-[8px] ${
        isLoading ? "cursor-wait" : "cursor-pointer"
      }`]: !twStore.get(),
    },
    "hm-upload-modal-close-button",
  );
export const uploadModalHeader = () =>
  cn(
    {
      "flex justify-between mb-3": !twStore.get(),
    },
    "hm-upload-modal-header",
  );
export const uploadModalBold = () =>
  cn(
    {
      "font-medium font-bold": !twStore.get(),
    },
    "hm-upload-modal-bold",
  );
export const uploadModalLink = () =>
  cn({ "underline cursor-pointer": !twStore.get() }, "hm-upload-modal-link");
