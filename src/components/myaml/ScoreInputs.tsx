// @ts-nocheck
import { useT } from '@/lib/i18n';

const factors = [
  {
    title: 'Transaction history',
    summary: 'Patterns in how funds move.',
    description: 'The blockchain records when funds moved, which addresses sent or received them, and how much changed hands. Looking at that history can show whether a transfer was a one-off or part of a recurring pattern.',
    path: 'M3 7h17m-5-5 5 5-5 5M21 17H4m5-5-5 5 5 5',
  },
  {
    title: 'Counterparty exposure',
    summary: 'Who the address transacts with.',
    description: 'The same address may interact with exchanges, services and wallets whose owners are unknown. Address labels help put those interactions in context, while the transfer path shows whether a connection is direct or passes through other addresses.',
    path: 'M15 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m18 0v-2a4 4 0 0 0-3-3.9M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm4-3.9a4 4 0 0 1 0 7.8',
  },
  {
    title: 'Risk signals',
    summary: 'Links to flagged activity.',
    description: 'A link to flagged activity is worth investigating in context. How recently it occurred, how much value moved and how many addresses lie in between help explain why the connection deserves a closer look.',
    path: 'M10.3 3.8a2 2 0 0 1 3.4 0l8 14A2 2 0 0 1 20 21H4a2 2 0 0 1-1.7-3.2l8-14ZM12 9v4m0 4h.01',
  },
];

const sources = [
  ['TRONSCAN', 'trx.svg'],
  ['Arkham', 'source-arkham.svg'],
  ['Chainalysis', 'source-chainalysis.ico'],
  ['Binance', 'source-binance.svg'],
  ['Coinbase', 'source-coinbase.svg'],
];

function SourceCarousel() {
  const t = useT();
  return (
    <div className="score-sources">
      <h3 className="source-label">{t("Some data sources:")}</h3>
      <div className="source-viewport">
        <div className="source-track">
          {[false, true].map(duplicate => (
            <ul className="source-group" key={String(duplicate)} aria-hidden={duplicate ? true : undefined}>
              {sources.map(([name, image]) => (
                <li key={name}>
                  {name === 'Coinbase' ? (
                    <img className="source-wordmark" src={`/assets/${image}`} alt={name} width="115" height="27" loading="lazy" />
                  ) : (
                    <><img src={`/assets/${image}`} alt="" width="27" height="27" loading="lazy" />{name}</>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <p className="source-context">{t("These platforms illustrate where blockchain records and address labels can be found.")}</p>
    </div>
  );
}

const lead = (t) => { const i = t.indexOf('. '); return i < 0 ? t : <><strong className="lead-in">{t.slice(0, i + 1)}</strong>{t.slice(i + 1)}</>; };

export function ScoreInputs() {
  const t = useT();
  return (
    <section className="score-inputs" id="score-inputs" aria-labelledby="score-inputs-title">
      <div className="score-inputs-content wrap">
        <div className="score-inputs-heading">
          <h2 id="score-inputs-title">{t('What shapes an')} <em>{t("AML score?")}</em></h2>
          <p>{t("An address\u2019s activity and connections can reveal potential risk.")}</p>
        </div>
        <div className="score-factor-band">
          {factors.map(({ title, summary, path }) => (
            <article className="score-factor" key={title}>
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>
              <h3>{t(title)}</h3>
              <p>{t(summary)}</p>
            </article>
          ))}
        </div>
        <SourceCarousel />
        <div className="score-explanations">
          {factors.map(({ title, description }) => (
            <article key={title}><h3>{t(title)}</h3><p>{lead(t(description))}</p></article>
          ))}
        </div>
      </div>
    </section>
  );
}
