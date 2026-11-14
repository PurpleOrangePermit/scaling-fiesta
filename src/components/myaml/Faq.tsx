// @ts-nocheck
import { useT } from '@/lib/i18n';

export function Faq() {
  const t = useT();
  return (
    <section className="faq wrap" id="faq" aria-labelledby="faq-title">
      <div className="faq-copy">
        <h2 id="faq-title">{t("Frequently asked questions")}</h2>
        <div className="questions">
        <details><summary>{t("How does a wallet check differ from a transaction check?")}</summary><p>{t("A wallet check looks at an address\u2019s activity over time. A transaction check focuses on one transfer and the connections around its sender and recipient.")}</p></details>
        <details><summary>{t("What does the report show?")}</summary><p>{t("It shows the wallet or transfer reviewed, the categories of related addresses, and the connections behind any risk signals. Those signals help you decide what to investigate further.")}</p></details>
        <details><summary>{t("What does a low AML score tell me?")}</summary><p>{t("It indicates fewer or weaker risk signals in the activity reviewed. Check the report for the connections behind the score and consider any information you have about the transfer.")}</p></details>
        <details><summary>{t("What should I prepare before reaching out?")}</summary><p>{t("Have the public wallet address or transaction hash ready, along with the network if you know it. Include any context about the transfer you\u2019d like to understand.")}</p></details>
        </div>
      </div>
      <img className="faq-brand" src="/assets/faq-brand.jpg" width="900" height="600" alt="" loading="lazy" />
    </section>
  );
}
