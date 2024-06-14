/// <reference types="vite/client" />

declare module 'tailwind-merge' {
  export function twMerge(...classes: string[]): string;
}
