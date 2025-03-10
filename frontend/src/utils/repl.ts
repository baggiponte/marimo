/* Copyright 2023 Marimo. All rights reserved. */
import { Logger } from "./Logger";

declare global {
  interface Window {
    [key: string]: unknown;
  }
}

/**
 * Safely adds objects to the global scope for debugging.
 */
export function repl(item: unknown, name: string) {
  if (typeof window === "undefined") {
    return;
  }

  const fullName = `__marimo__${name}`;
  if (window[fullName]) {
    Logger.warn(`Overwriting existing debug object ${fullName}`);
  }
  window[fullName] = item;
}
