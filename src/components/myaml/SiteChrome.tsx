// @ts-nocheck
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LANGS, setLang, useLang, useT } from '@/lib/i18n';
import { Link, useNavigate } from '@tanstack/react-router';
import { openWalletSdk } from '@/lib/wallet-sdk';

function LangList({ lang, onPick }) {
  return (
    <ul className="lang-list" role="listbox" aria-label="Language">
      {LANGS.map(([code, name, flag]) => (
        <li key={code}>
          <button type="button" role="option" aria-selected={lang === code} className="lang-option" data-active={lang === code} onClick={() => onPick(code)}>
            <img className="lang-flag" src={flag} alt="" width="20" height="15" />
            <span className="lang-name">{name}</span>
            <svg className="lang-check" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5 6.5 11.5 12.5 4.5" /></svg>
          </button>
        </li>
      ))}
    </ul>
  );
}

const sections = [
  ['how-it-works', 'How it works'],
  ['what-we-check', 'What we check'],
  ['why-check', 'Why check'],
  ['pricing', 'Pricing'],
  ['faq', 'FAQ'],
];

function Brand({ size }) {
  return (
    <a className="brand" href="#top">
      <span className="brand-orb"><img src="/assets/myaml-report-mark.svg" alt="" width={size} height={size} /></span>
      AMLView
    </a>
  );
}

function ContactLink({ className }) {
  return (
    <a className={className} href="#contact">
      Contact us
    </a>
  );
}

function Navigation({ footer = false, reportPage = false }) {
  const t = useT();
  return (
    <nav aria-label={footer ? 'Footer navigation' : 'Main navigation'}>
      {sections.map(([id, label]) => <Link key={id} to="/" hash={id}>{t(label)}</Link>)}
      {footer ? <ContactLink /> : null}
    </nav>
  );
}

export function Header({ reportPage = false }) {
  const navigate = useNavigate();
  const [floating, setFloating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenu = useRef(null);
  const lang = useLang();
  const t = useT();
  const [langOpen, setLangOpen] = useState(false);
  const current = LANGS.find(l => l[0] === lang) || LANGS[0];
  const closeMenu = (after) => {
    const d = mobileMenu.current;
    if (!d?.open || d.dataset.closing) return;
    d.dataset.closing = 'true';
    setTimeout(() => { delete d.dataset.closing; d.close(); setLangOpen(false); after?.(); }, 320);
  };

  useLayoutEffect(() => {
    const update = () => setFloating(window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 961px)');
    const closeOnDesktop = () => {
      if (desktop.matches) mobileMenu.current?.close();
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  const openMenu = () => {
    mobileMenu.current.showModal();
    setMenuOpen(true);
  };
  const goToSection = event => {
    event.preventDefault();
    const hash = event.currentTarget.hash;
    closeMenu(() => {
      if (reportPage) { void navigate({ to: '/', hash: hash.slice(1) }); return; }
      if (window.location.hash === hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = hash;
      }
    });
  };

  return (
    <header className="header-shell" data-floating={floating}>
      <div className="site-header wrap">
        <Link className="header-logo" to="/" hash="top" aria-label="AMLView">
          <img src="/assets/header-symbol.svg" alt="" width="76" height="51" />
          <span className="header-wordmark" aria-hidden="true">AMLView</span>
        </Link>
        <button className="header-control mobile-trigger" type="button" aria-label="Open menu" aria-haspopup="dialog" aria-controls="mobile-menu" aria-expanded={menuOpen} onClick={openMenu}>
          <span aria-hidden="true"></span>
        </button>
        <Navigation />
        <div className="header-actions">
          <button className="header-control header-language" type="button" popoverTarget="header-languages" aria-label={`Language: ${current[1]}`}><img className="lang-flag" src={current[2]} alt="" width="20" height="15" /></button>
          <div className="header-popover header-popover--lang" id="header-languages" popover="auto">
            <LangList lang={lang} onPick={(c) => { setLang(c); document.getElementById('header-languages').hidePopover(); }} />
          </div>
          {reportPage ? (
            <Link className="header-control header-check" to="/report">{t('Check address')}</Link>
          ) : (
            <button type="button" className="header-control header-check" onClick={openWalletSdk}>{t('Check address')}</button>
          )}
          <button className="header-control" type="button" popoverTarget="header-login">{t('Login')}</button>
          <div className="header-popover" id="header-login" popover="auto">
            <p>{t('Account access is currently unavailable.')}</p>
            <Link to="/" hash="contact" onClick={() => document.getElementById('header-login').hidePopover()}>{t('Contact us')}</Link>
          </div>
        </div>
      </div>
      <dialog ref={mobileMenu} className="mobile-menu" id="mobile-menu" aria-label="Navigation menu"
        onClose={() => setMenuOpen(false)} onCancel={(e) => { e.preventDefault(); closeMenu(); }} onClick={event => {
          if (event.target === event.currentTarget) closeMenu();
        }}>
        <div className="mobile-menu-panel">
          <div className="mobile-menu-top">
            <a href="#top" onClick={goToSection} aria-label="AMLView"><img src="/assets/header-symbol.svg" alt="" width="76" height="51" /></a>
            <button className="mobile-menu-close" type="button" aria-label="Close menu" autoFocus onClick={() => closeMenu()}>×</button>
          </div>
          <nav aria-label="Mobile navigation">
            {sections.map(([id, label]) => <a key={id} href={`#${id}`} onClick={goToSection}>{t(label)}</a>)}
          </nav>
          <div className="mobile-menu-bottom">
            <div className="mobile-lang" data-open={langOpen}>
              <button type="button" className="mobile-lang-trigger" aria-expanded={langOpen} onClick={() => setLangOpen(v => !v)}>
                <img className="lang-flag" src={current[2]} alt="" width="20" height="15" />{current[1]}
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" /></svg>
              </button>
              <div className="mobile-lang-panel"><div><LangList lang={lang} onPick={(c) => { setLang(c); setLangOpen(false); }} /></div></div>
            </div>
            {reportPage ? (
              <Link to="/report" onClick={() => closeMenu()} className="mobile-menu-check">{t('Check address')}</Link>
            ) : (
              <button type="button" className="mobile-menu-check" onClick={() => closeMenu(openWalletSdk)}>{t('Check address')}</button>
            )}
          </div>
        </div>
      </dialog>
    </header>
  );
}

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer-v2">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="header-logo" href="#top" aria-label="AMLView">
              <img src="/assets/header-symbol.svg" alt="" width="76" height="51" />
              <span className="header-wordmark">AMLView</span>
            </a>
            <p>{t('AML screening for crypto wallets and transactions on BNB, Ethereum, TRON and Solana.')}</p>
          </div>
          <div className="footer-col">
            <h3>{t('Product')}</h3>
            {sections.slice(0, 4).map(([id, label]) => <a key={id} href={`#${id}`}>{t(label)}</a>)}
          </div>
          <div className="footer-col">
            <h3>{t('Company')}</h3>
            <a href="#faq">{t('FAQ')}</a>
            <a href="#contact">{t('Contact us')}</a>
            <a href="#contact">{t('Enterprise')}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} OÜ AML Score Systems. {t('All rights reserved.')}</span>
        </div>
      </div>
    </footer>
  );
}
