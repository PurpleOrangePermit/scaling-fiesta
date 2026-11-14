import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WalletAddressForm } from '@/components/myaml/WalletAddressForm';

const navigate = vi.hoisted(() => vi.fn());
vi.mock('@tanstack/react-router', () => ({ useNavigate: () => navigate }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe('Wallet demonstration', () => {
  it('navigates to the separate demonstration after a nonempty address without a network request', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    render(<WalletAddressForm />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '0x' + 'a'.repeat(40) } });
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(navigate).toHaveBeenCalledWith({ to: '/report' });
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('does not open the demonstration when the address is empty', () => {
    render(<WalletAddressForm />);
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(navigate).not.toHaveBeenCalled();
  });
  it('rejects an incomplete wallet address instead of navigating', () => {
    render(<WalletAddressForm />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '0x7a2' } });
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(navigate).not.toHaveBeenCalled();
  });
});