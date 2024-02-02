import twStore, { cn } from "@utils/helpers";

export const uploadModalWrapper = () =>
  cn(
    {
      "w-full min-w-[620px] p-12 py-8 bg-background border rounded-xl":
        !twStore.get(),
    },
    "hm-upload-modal-wrapper",
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
