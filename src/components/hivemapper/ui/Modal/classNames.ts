import twStore, { cn } from "@utils/helpers";

export const modalWrapper = () => cn(
  { "flex items-center justify-center h-screen overflow-hidden": !twStore.get() },
  "hm-modal-wrapper"
);

export const modalSection = () => cn(
  { "relative": !twStore.get() },
  "hm-modal-section"
);

export const modalCloseButton = () => cn(
  { "absolute top-5 right-5 cursor-pointer": !twStore.get() },
  "hm-modal-close-button"
);

export const modalSequence = () => cn(
  { "text-2xl absolute bottom-5 right-5": !twStore.get() },
  "hm-modal-sequence"
);  

export const modalDate = () => cn(
  { "text-2xl absolute bottom-5 left-5": !twStore.get() },
  "hm-modal-date"
)

export const modalFrame = () => cn(
  { "max-w-full max-h-screen": !twStore.get() },
  "hm-modal-frame"
)

