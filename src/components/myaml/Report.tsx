// @ts-nocheck
import { useT } from '@/lib/i18n';
import { openWalletSdk } from '@/lib/wallet-sdk';
import { WalletAddressForm } from './WalletAddressForm';

const sources = [
  { label: 'Exchange', color: 'exchange', description: 'Incoming funds are linked to a wallet labeled as an exchange. The label identifies the service associated with the transfer.' },
  { label: 'Unknown source', color: 'unknown', description: 'The transfer is visible on-chain, but the sending address has no identified owner or service in this example.' },
  { label: 'Flagged address', color: 'flagged', description: 'This connection warrants a closer look. Start with when the transfer happened, how much moved and whether any addresses were in between.' },
];

export function Report() {
  const t = useT();
  return (
    <div className="report-band">
      <section id="how-it-works" className="report-section wrap" aria-labelledby="report-title">
        <div className="report-copy">
          <h2 id="report-title">{t("Follow the funds.")}<br />{t("See the connections.")}</h2>
          <p>{t("Share a public wallet address or transaction hash. The report brings together on-chain activity, related addresses and the connections that warrant a closer look.")}</p>
          <WalletAddressForm onValidSubmit={openWalletSdk} />
        </div>
        <div className="report" data-reveal="">
          <header className="report-heading">
            <div className="report-brand">
              <img src="/assets/myaml-report-mark.svg" alt="" width="33" height="27" />
              <strong>AMLView</strong>
            </div>
            <p>{t("Explore the report as a graph of the wallet\u2019s connections.")}</p>
          </header>
          <div className="report-body">
            <div className="report-subject">
              <div><span>{t("Wallet address")}</span><code>0x7a2…8F3d</code></div>
              <small><img src="/assets/eth.svg" alt="" width="18" height="18" /> Ethereum</small>
            </div>
            <div className="report-map">
              <h3>{t("Incoming connections")}</h3>
              <div className="map-flow">
                <ul className="map-sources" aria-label="Incoming sources">
                  {sources.map(({ label, color }) => (
                    <li className={`map-node map-node--${color}`} key={color}>
                      <span className={`map-dot map-dot--${color}`} aria-hidden="true"></span>
                      {label === 'Unknown source' ? <>{t("Unknown")}<span className="map-label-tail">{t(' source')}</span></> : t(label)}
                    </li>
                  ))}
                </ul>
                <svg className="map-lines" viewBox="0 0 100 111" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 17.5 L94 55.5 M0 55.5 H100 M0 93.5 L94 55.5" vectorEffect="non-scaling-stroke" />
                </svg>
                <div className="map-node map-wallet">
                  <img src="/assets/eth.svg" alt="" width="22" height="22" />
                  <span>{t("Reviewed wallet")}</span>
                </div>
              </div>
            </div>
            <details className="report-details">
              <summary>{t("Connection details")}</summary>
              <dl className="report-source-details">
                {sources.map(({ label, color, description }) => (
                  <div key={color}><dt><span className={`map-dot map-dot--${color}`} aria-hidden="true" />{t(label)}</dt><dd>{t(description)}</dd></div>
                ))}
              </dl>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
