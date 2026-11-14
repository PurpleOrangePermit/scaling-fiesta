// @ts-nocheck
import { useT } from '@/lib/i18n';
import { openWalletSdk } from '@/lib/wallet-sdk';

const plans = [
  {
    name: 'Free', price: '$0', allowance: '1 check per day', action: 'Start free',
    features: ['USDT on supported networks', 'Summary score for each factor', 'Watermarked reports'],
    unavailable: ['PDF export', 'Wallet statistics'],
  },
  {
    name: 'Pro', price: '$499', period: '/ month', allowance: '100 addresses per month', action: 'Choose Pro',
    features: ['All supported tokens', 'Full connection graph', 'Detailed factor breakdown', 'PDF report export', 'Wallet statistics'],
  },
  {
    name: 'Enterprise', price: 'On request', allowance: 'Custom request volume', action: 'Contact sales',
    features: ['Ongoing wallet monitoring', 'Passive data collection', 'Source analysis for incoming funds'],
  },
];

const Check = () => (<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.4 5.6 10.3 11.5 3.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Dash = () => (<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3.5 7h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);

export function Pricing() {
  const t = useT();
  return (
    <section className="pricing pricing--v2" id="pricing" aria-labelledby="pricing-title">
      <div className="pricing-content wrap">
        <div className="pricing-heading">
          <h2 id="pricing-title">{t("Pricing")}</h2>
          <p>{t("Start with a free daily check. Upgrade when screening becomes part of your workflow.")}</p>
        </div>
        <div className="pricing-grid">
          {plans.map(({ name, price, period, allowance, features, unavailable = [], action }) => (
            <article className={`pc pc--${name.toLowerCase()}`} key={name}>
              <header className="pc-head">
                <h3>{t(name)}</h3>
                <p className={price.startsWith('$') ? 'pc-price' : 'pc-price pc-price--text'}>{t(price)}{period ? <span>{t(period)}</span> : null}</p>
                <p className="pc-allow">{t(allowance)}</p>
              </header>
              {name === 'Free' ? (
                <button type="button" className="pc-cta" onClick={openWalletSdk}>{t(action)}</button>
              ) : (
                <a className="pc-cta" href="#contact">{t(action)}</a>
              )}
              <ul className="pc-list">
                {features.map(f => <li key={f}><Check />{t(f)}</li>)}
                {unavailable.map(f => <li className="is-off" key={f}><Dash />{t(f)}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
