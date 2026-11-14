import { z } from 'zod';

export const walletAddressSchema = z.string().trim().max(42).refine(
  value => /^0x[0-9a-fA-F]{40}$/.test(value) || /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value),
  'Invalid wallet address format',
);