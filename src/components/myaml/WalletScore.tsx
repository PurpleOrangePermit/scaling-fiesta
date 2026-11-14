// @ts-nocheck
import { useT } from '@/lib/i18n';

const examples = [
  { wallet: 'Wallet 17', network: 'Ethereum', icon: 'eth', address: '0x7a2…8F3d', score: 4, tone: 'mint' },
  { wallet: 'Wallet 32', network: 'TRON', icon: 'trx', address: 'TQn9Y…K4mP', score: 71, tone: 'rose' },
];

const reasons = [
  ['Check before funds move', 'An address alone tells you little about where the funds have been. Reviewing it before you send or accept a transfer gives you time to spot connections worth investigating.'],
  ['Understand what raised the score', 'Open the report to see which sources or patterns contributed to the result. A direct link to a flagged address may warrant a different response from a link through several intermediaries.'],
  ['Decide what to do next', 'Use the report to decide whether to ask for more context, escalate the transfer for review, or proceed after weighing the findings.'],
];

const lead = (t) => { const i = t.indexOf('. '); return i < 0 ? t : <><strong className="lead-in">{t.slice(0, i + 1)}</strong>{t.slice(i + 1)}</>; };

export function WalletScore() {
  const t = useT();
  return (
    <section id="why-check" className="wallet-score wrap" aria-labelledby="wallet-score-title">
      <div className="wallet-score-art">
      <div className="wallet-score-banner">
        <div className="wallet-score-copy">
          <h2 id="wallet-score-title">{t('Why it pays to know your')} <em>{t("AML score")}</em></h2>
          <ol className="wallet-score-reasons">
            <li><span aria-hidden="true">01</span><p>{t("Check a wallet against 50+ risk factors before sending or receiving funds.")}</p></li>
            <li><span aria-hidden="true">02</span><p>{t("Get one clear score and a detailed report showing how it was calculated.")}</p></li>
          </ol>
        </div>
        <ul className="wallet-score-examples" aria-label="Example wallet scores">
          {examples.map(({ wallet, network, icon, address, score, tone }) => (
            <li className={`wallet-score-card wallet-score-card--${tone}`} key={wallet}>
              <img src={`/assets/${icon}.svg`} alt="" width="43" height="43" />
              <div className="wallet-score-identity">
                <strong>{t(wallet)}</strong>
                <div><code>{address}</code><span>{network}</span></div>
              </div>
              <div className="wallet-score-value"><strong>{score}%</strong><span>{t("Risk score")}</span></div>
            </li>
          ))}
        </ul>
      </div>
      </div>
      <div className="wallet-score-note">
        <h3>{t("See what\u2019s behind the score.")}</h3>
        <ol className="wallet-score-guide">
          {reasons.map(([title, copy], index) => (
            <li key={title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div><h4>{t(title)}</h4><p>{lead(t(copy))}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
