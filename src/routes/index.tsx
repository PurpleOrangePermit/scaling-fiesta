import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Header, Footer } from "@/components/myaml/SiteChrome";
import { Hero } from "@/components/myaml/Hero";
import { Features } from "@/components/myaml/Features";
import { WalletScore } from "@/components/myaml/WalletScore";
import { ScoreInputs } from "@/components/myaml/ScoreInputs";
import { Report } from "@/components/myaml/Report";
import { Pricing } from "@/components/myaml/Pricing";
import { Faq } from "@/components/myaml/Faq";
import { Contact } from "@/components/myaml/Contact";

const title = "AMLView | Crypto Wallet & Transaction Screening";
const description =
  "Review crypto wallet history, trace transfers, and understand the connections behind AML risk signals.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "link_id", content: "QocQc6AcAnzz" },
    ],
    scripts: [
      { src: "/notpublished/js/build.js", type: "module", defer: true, crossOrigin: "anonymous" },
    ],
  }),
  component: Index,
});

function Index() {
  const main = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView({ behavior: "instant" });
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;
    const sel = [
      "[data-reveal]", ".section-head", "h2", ".feature-grid > *", ".score-explanations > *",
      ".wallet-score-guide li", ".wallet-score-art", ".pc", ".report-copy", ".report-card, .report-window",
      ".questions details", ".faq-brand", ".contact > *", ".asset-strip li",
    ].join(",");
    const els = Array.from(main.current?.querySelectorAll<HTMLElement>(sel) ?? []).filter(
      (el) => !el.closest(".hero") && el.getBoundingClientRect().top > window.innerHeight * 0.9,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue;
          observer.unobserve(target);
          const el = target as HTMLElement;
          const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("rv")) : [];
          el.style.setProperty("--rv-delay", `${Math.min(sibs.indexOf(el), 5) * 90}ms`);
          el.classList.add("rv-in");
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => { el.classList.add("rv"); observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <div className="opening">
        <main ref={main}>
          <Hero />
          <div className="features-background">
            <Features />
          </div>
          <WalletScore />
          <ScoreInputs />
          <Report />
          <Pricing />
          <Faq />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  );
}
