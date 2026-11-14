import { describe, expect, it } from 'vitest';
import { walletAddressSchema } from '@/lib/wallet-address';

describe('Wallet format filter', () => {
  it('accepts 0x with exactly 40 hexadecimal characters', () => {
    expect(walletAddressSchema.safeParse('0x' + 'a1'.repeat(20)).success).toBe(true);
    for (const value of ['0x' + 'a'.repeat(39), '0x' + 'a'.repeat(41), '0x' + 'g'.repeat(40)]) expect(walletAddressSchema.safeParse(value).success).toBe(false);
  });
  it('accepts T with exactly 33 Base58 characters', () => {
    expect(walletAddressSchema.safeParse('T' + 'a'.repeat(33)).success).toBe(true);
    for (const value of ['T' + 'a'.repeat(32), 'T' + 'a'.repeat(34), 'T' + '0'.repeat(33), 'A' + 'a'.repeat(33)]) expect(walletAddressSchema.safeParse(value).success).toBe(false);
  });
  it('rejects transaction hashes, scripts, and blank input', () => {
    for (const value of ['0x' + 'a'.repeat(64), '<script>alert(1)</script>', '', '   ']) expect(walletAddressSchema.safeParse(value).success).toBe(false);
  });
});