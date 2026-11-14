export const DEMO_DURATION_MS = 40_000;
export const DEMO_ERROR_PERCENT = 76;
export function demoProgress(elapsed: number) {
  return Math.min(DEMO_ERROR_PERCENT, Math.max(0, Math.floor(elapsed / DEMO_DURATION_MS * 100)));
}