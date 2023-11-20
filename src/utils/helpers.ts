import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

let stripTailwindClasses: boolean = false;

const twStore = {
  set: (value: boolean) => (stripTailwindClasses = value),
  get: () => stripTailwindClasses,
};

Object.freeze(twStore);
export default twStore;
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}