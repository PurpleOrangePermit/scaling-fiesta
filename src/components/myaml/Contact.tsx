// @ts-nocheck
import { useT } from '@/lib/i18n';
export function Contact() {
  const t = useT();
  return (
    <section className="contact wrap" id="contact" aria-labelledby="contact-title">
      <div>
        <h2 id="contact-title">{t("Contact us")}</h2>
        <p>{t('Have a question about wallet screening or an AMLView plan?')}</p>
      </div>
      <form className="contact-form" aria-describedby="contact-status" onSubmit={event => event.preventDefault()}>
        <label>{t("Name")}<input name="name" autoComplete="name" required /></label>
        <label>{t('Company ')}<span>{t("(optional)")}</span><input name="company" autoComplete="organization" /></label>
        <label className="contact-email">{t("Email")}<input name="email" type="email" autoComplete="email" required /></label>
        <div className="contact-form-actions">
          <button type="submit" disabled>{t("Get in touch")}</button>
          <p id="contact-status">{t("Online submissions are currently unavailable.")}</p>
        </div>
      </form>
    </section>
  );
}
