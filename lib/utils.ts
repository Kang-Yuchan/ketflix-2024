import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncatedStr = (str: string, length: number) =>
  str.length > length ? `${str.slice(0, length - 3)}...` : str;
