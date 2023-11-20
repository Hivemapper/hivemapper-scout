import twStore, { cn } from "@utils/helpers";

export const inputWrapper = () =>
  cn(
    {
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50":
        !twStore.get(),
    },
    "hm-input",
  );
