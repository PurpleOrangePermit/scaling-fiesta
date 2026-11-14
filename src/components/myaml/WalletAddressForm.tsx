// @ts-nocheck
import { useRef, useState } from 'react';
import { useT } from '@/lib/i18n';
import { useNavigate } from '@tanstack/react-router';
import { walletAddressSchema } from '@/lib/wallet-address';

export function WalletAddressForm({ onValidSubmit } = {}) {
  const t = useT();
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const timer = useRef(null);

  const show = (s) => { clearTimeout(timer.current); setStatus(s); requestAnimationFrame(() => setOpen(true)); };
  const hide = () => { if (!open) return; setOpen(false); clearTimeout(timer.current); timer.current = setTimeout(() => setStatus(null), 420); };

  function handleSubmit(event) {
    event.preventDefault();
    if (!value.trim()) { show('empty'); inputRef.current?.focus(); return; }
    if (!walletAddressSchema.safeParse(value).success) { show('invalid'); inputRef.current?.focus(); return; }
    hide();
    if (onValidSubmit) {
      onValidSubmit();
      return;
    }
    void navigate({ to: '/report' });
  }

  return (
    <>
    <form className="wallet-address-form" data-state={open ? status : undefined} onSubmit={handleSubmit} noValidate>
      <div className="wallet-address-control">
        <svg className="wallet-address-icon" viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="M12.6 12.6 17 17" />
        </svg>
        <input
          ref={inputRef}
          aria-label={t('Wallet address')}
          placeholder={t('Wallet address')}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={42}
          aria-invalid={open && (status === 'empty' || status === 'invalid')}
          value={value}
          onChange={(e) => { setValue(e.target.value); hide(); }}
        />
        <button type="submit" className="wallet-address-submit">{t('Check')}</button>
      </div>
      <div className="wallet-address-status" role="status" data-open={open}>
        <div>
          {status ? (
            <div className={`wallet-alert wallet-alert--${status}`}>
              <span className="wallet-alert-icon" aria-hidden="true">!</span>
              <div>
                {status === 'empty'
                  ? <><strong>{t('Enter a wallet address')}</strong><p>{t('Use an Ethereum / BNB or TRON wallet address.')}</p></>
                  : <><strong>{t('Invalid wallet address')}</strong><p>{t('0x + 40 hexadecimal characters, or T + 33 Base58 characters.')}</p></>}
              </div>
              <button type="button" className="wallet-alert-close" aria-label={t('Dismiss')} onClick={hide}>×</button>
            </div>
          ) : null}
        </div>
      </div>
    </form>
    </>
  );
}
