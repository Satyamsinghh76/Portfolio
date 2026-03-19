import { type ClassValue, clsx } from "clsx";

/** Merge Tailwind classes safely. Install clsx: `npm i clsx` */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
