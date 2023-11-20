import twStore, { cn } from "@utils/helpers";

export const paginationWrapper = () => cn({ "flex justify-center p-4"
: !twStore.get() }, "hm-pagination-wrapper");
