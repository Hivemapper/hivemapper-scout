import { clsx, type ClassValue } from "clsx";
import { useEffect, useLayoutEffect } from "react";
import { twMerge } from "tailwind-merge";

let stripTailwindClasses: boolean = false;

const twStore = {
  set: (value: boolean) => (stripTailwindClasses = value),
  get: () => stripTailwindClasses,
};

Object.freeze(twStore);
export default twStore;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
);

export const useIsomorphicLayoutEffect = canUseDOM
  ? useLayoutEffect
  : useEffect;
