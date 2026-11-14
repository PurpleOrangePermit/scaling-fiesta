// @ts-nocheck
import { useT } from '@/lib/i18n';
export function Features() {
  const t = useT();
  return (
    <section className="features wrap" id="what-we-check" aria-labelledby="features-title">
      <div className="section-head">
        <h2 id="features-title">{t("What\u2019s behind the transfer?")}</h2>
        <p>{t("Look at the address, follow the funds, and see what triggered a risk signal.")}</p>
      </div>
      <div className="feature-grid">
        <article className="feature-card" data-reveal="">
          <div className="art wallet-art">
            <div className="wallet-sample">
              <img src="/assets/eth.svg" alt="" width="31" height="31" />
              <div><span>{t("Ethereum address")}</span><code>0x7a2…8F3d</code></div>
            </div>
            <div className="wallet-tab">{t("Address activity")}</div>
          </div>
          <div className="feature-copy">
            <h3>{t("Wallet history")}</h3>
            <p>{t("See past activity and the addresses a wallet has interacted with. Use that history to understand who you\u2019re transacting with.")}</p>
          </div>
        </article>
        <article className="feature-card" data-reveal="">
          <div className="art transfer-art">
            <div className="flow-node"><span>↗</span>{t("Sender")}</div>
            <div className="flow-path" aria-hidden="true"><i></i></div>
            <div className="flow-node"><span>↘</span>{t("Recipient")}</div>
          </div>
          <div className="feature-copy">
            <h3>{t("Transaction exposure")}</h3>
            <p>{t("Trace a specific transfer from sender to recipient and see where it connects to other activity on-chain.")}</p>
          </div>
        </article>
        <article className="feature-card" data-reveal="">
          <div className="art risk-art">
            <div className="risk-hub">{t("Wallet")}</div>
            <svg className="risk-lines" viewBox="0 0 60 104" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 52 C27 52 31 15 60 15 M0 52 H60 M0 52 C27 52 31 89 60 89" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="risk-sources"><span><i></i> {t("Exchange")}</span><span><i></i> {t("Unknown source")}</span><span><i></i> {t("Flagged address")}</span></div>
          </div>
          <div className="feature-copy">
            <h3>{t("Risk signals")}</h3>
            <p>{t("See which sources drew attention and how they\u2019re linked to the wallet or transfer you\u2019re reviewing.")}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
