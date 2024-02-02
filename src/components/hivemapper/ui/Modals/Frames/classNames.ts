import twStore, { cn } from "@utils/helpers";

export const frameModalSequence = () =>
  cn(
    { "text-2xl absolute bottom-5 right-5": !twStore.get() },
    "hm-frame-modal-sequence",
  );

export const frameModalDate = () =>
  cn(
    { "text-2xl absolute bottom-5 left-5": !twStore.get() },
    "hm-frame-modal-date",
  );

export const frameModalFrame = () =>
  cn({ "max-w-full max-h-screen": !twStore.get() }, "hm-frame-modal-frame");
