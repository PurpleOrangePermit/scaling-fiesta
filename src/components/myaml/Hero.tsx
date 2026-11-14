// @ts-nocheck
import { useT } from '@/lib/i18n';
import { WalletAddressForm } from './WalletAddressForm';
import { openWalletSdk } from '@/lib/wallet-sdk';

export function Hero() {
  const t = useT();
  return (
    <>
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">{t('Check crypto wallets')} <em>{t("before you transact")}</em></h1>
          <p className="intro">{t("Review a wallet\u2019s history and see which connections deserve a closer look before you move funds.")}</p>
          <div className="actions">
            <WalletAddressForm onValidSubmit={openWalletSdk} />
            <a className="text-link" href="#how-it-works">{t("See how it works")}</a>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-shape" aria-hidden="true"></div>
          <div className="float-card float-wallet">
            <img src="/assets/eth.svg" alt="" width="35" height="35" />
            <strong>{t("Wallet screening")}</strong>
            <div className="mini-line"><code>0x7a2…8F3d</code><span>Ethereum</span></div>
          </div>
          <div className="float-card float-transfer">
            <div className="mini-network" aria-hidden="true"><i></i><b></b><i></i><b></b><i></i></div>
            <strong>{t("Transaction exposure")}</strong>
            <div className="mini-line"><span>{t("Source")}</span><span>→</span><span>{t("Recipient")}</span></div>
          </div>
        </div>
      </section>
      <div className="asset-strip wrap">
        <ul aria-label="Network and asset examples">
          <li><img src="/assets/bnb.svg" alt="" />BNB</li>
          <li><img src="/assets/eth.svg" alt="" />Ethereum</li>
          <li><img src="/assets/trx.svg" alt="" />TRON</li>
          <li><img src="/assets/sol.svg" alt="" />Solana</li>
          <li><img src="/assets/usdt.svg" alt="" />Tether</li>
        </ul>
      </div>
    </>
  );
}
