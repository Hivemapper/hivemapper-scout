import twStore, { cn } from "@utils/helpers";

export const modalWrapper = () =>
  cn(
    {
      "flex items-center justify-center w-full h-screen overflow-hidden":
        !twStore.get(),
    },
    "hm-modal-wrapper",
  );

export const modalSection = () =>
  cn({ relative: !twStore.get() }, "hm-modal-section");

export const modalCloseButton = () =>
  cn(
    { "absolute top-5 right-5 cursor-pointer": !twStore.get() },
    "hm-modal-close-button",
  );
