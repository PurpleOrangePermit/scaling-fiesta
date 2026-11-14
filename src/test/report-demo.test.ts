import { describe, expect, it } from 'vitest';
import { DEMO_DURATION_MS, DEMO_ERROR_PERCENT, demoProgress } from '@/lib/report-demo';

describe('Report demonstration timing', () => {
  it('uses a full loading duration within 37–45 seconds', () => {
    expect(DEMO_DURATION_MS).toBeGreaterThanOrEqual(37_000);
    expect(DEMO_DURATION_MS).toBeLessThanOrEqual(45_000);
  });
  it('stops with an error between 70 and 82 percent', () => {
    expect(DEMO_ERROR_PERCENT).toBeGreaterThanOrEqual(70);
    expect(DEMO_ERROR_PERCENT).toBeLessThanOrEqual(82);
    expect(demoProgress(30_000)).toBe(75);
    expect(demoProgress(30_400)).toBe(76);
    expect(demoProgress(100_000)).toBe(76);
  });
});