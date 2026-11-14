import { createFileRoute, Link, useBlocker } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CircleAlert, LoaderCircle, RotateCcw, Check } from 'lucide-react';
import { Header } from '@/components/myaml/SiteChrome';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/i18n';
import { DEMO_ERROR_PERCENT, demoProgress } from '@/lib/report-demo';

const copy = {
  en: { loading: 'Generating report', note: 'AML screening demonstration. Free plan. This takes less than a minute.', error: 'An error occurred. Please try again.', retry: 'Check again', back: 'Go back', confirm: 'Leave this page?', warning: 'Returning will stop report generation and the results will not be saved. Are you sure?', stay: 'Stay', leave: 'Leave' },
  ru: { loading: 'Формирование отчёта', note: 'Демонстрация AML-проверки. Тариф Free. Это займёт менее минуты.', error: 'Произошла ошибка. Попробуйте ещё раз', retry: 'Проверить снова', back: 'Вернуться назад', confirm: 'Вернуться назад?', warning: 'При возвращении назад процесс формирования отчёта будет остановлен, а результаты не сохранятся. Вы уверены?', stay: 'Остаться', leave: 'Вернуться назад' },
  fr: { loading: 'Génération du rapport', note: 'Démonstration du contrôle AML. Offre Free. Cela prendra moins d’une minute.', error: 'Une erreur est survenue. Veuillez réessayer.', retry: 'Vérifier à nouveau', back: 'Retour', confirm: 'Quitter cette page ?', warning: 'Revenir en arrière arrêtera la génération du rapport et les résultats ne seront pas enregistrés. Êtes-vous sûr ?', stay: 'Rester', leave: 'Quitter' },
  es: { loading: 'Generando informe', note: 'Demostración del análisis AML. Plan Free. Tardará menos de un minuto.', error: 'Se produjo un error. Inténtalo de nuevo.', retry: 'Revisar de nuevo', back: 'Volver atrás', confirm: '¿Salir de esta página?', warning: 'Volver atrás detendrá la generación del informe y no se guardarán los resultados. ¿Estás seguro?', stay: 'Quedarme', leave: 'Salir' },
};

const stages = {
  en: ['Initializing screening', 'Collecting data', 'Analysis in progress', 'Preparing the result'],
  ru: ['Инициализация проверки', 'Сбор данных', 'Идёт анализ', 'Формирование результата'],
  fr: ['Initialisation du contrôle', 'Collecte des données', 'Analyse en cours', 'Préparation du résultat'],
  es: ['Inicializando el análisis', 'Recopilando datos', 'Análisis en curso', 'Preparando el resultado'],
};

export const Route = createFileRoute('/report')({
  head: () => ({ meta: [
    { title: 'AMLView | Report Demonstration' },
    { name: 'description', content: 'AMLView report loading and error demonstration. No wallet connection or address screening.' },
    { property: 'og:title', content: 'AMLView | Report Demonstration' },
    { property: 'og:description', content: 'Preview the AMLView report loading and error experience.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: ReportDemoPage,
});

export function ReportDemoPage() {
  const lang = useLang() as keyof typeof copy;
  const text = copy[lang] ?? copy.en;
  const [progress, setProgress] = useState(0);
  const failed = progress >= DEMO_ERROR_PERCENT;
  const currentStage = Math.min(3, Math.floor(progress / 20));
  const stageText = stages[lang] ?? stages.en;
  const blocker = useBlocker({ shouldBlockFn: () => !failed, withResolver: true, enableBeforeUnload: !failed });
  const dialog = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    document.documentElement.classList.add('report-demo-active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    const start = performance.now();
    const timer = setInterval(() => {
      const next = demoProgress(performance.now() - start);
      setProgress(next);
      if (next >= DEMO_ERROR_PERCENT) clearInterval(timer);
    }, 200);
    return () => { document.documentElement.classList.remove('report-demo-active'); clearInterval(timer); clearTimeout(closeTimer.current); };
  }, []);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (blocker.status !== 'blocked') { element.close(); setVisible(false); return; }
    if (!element.open) element.showModal();
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [blocker.status]);

  function resolveExit(leave: boolean) {
    if (closing || blocker.status !== 'blocked') return;
    setClosing(true);
    setVisible(false);
    const finish = leave ? blocker.proceed : blocker.reset;
    closeTimer.current = setTimeout(() => { dialog.current?.close(); setClosing(false); finish?.(); }, 350);
  }

  return (
    <div className="report-demo-page">
      <Header reportPage />
      <main className="report-demo-main wrap">
        <Button asChild variant="ghost" className="report-demo-back"><Link to="/"><ArrowLeft aria-hidden="true" />{text.back}</Link></Button>
        <section className="report-demo-content" aria-labelledby="report-demo-title">
          <div className="report-demo-state" key={failed ? 'error' : 'loading'}>
            {failed ? <CircleAlert className="report-demo-symbol report-demo-symbol--error" aria-hidden="true" /> : <LoaderCircle className="report-demo-symbol report-demo-spinner" aria-hidden="true" />}
            <h1 id="report-demo-title">{failed ? text.error : text.loading}</h1>
            <p className="report-demo-note">{text.note}</p>
            {failed ? <>
              <p className="report-demo-code">API_CONNECTION_ERROR_327</p>
              <Button asChild className="demo-error-return report-demo-retry"><Link to="/"><RotateCcw aria-hidden="true" />{text.retry}</Link></Button>
            </> : <div className="report-demo-progress">
              <div className="report-demo-progress-heading"><span key={currentStage} className="report-demo-stage-label" aria-live="polite">{stageText[currentStage]}</span><span>{progress}%</span></div>
              <progress aria-label={text.loading} max={100} value={progress} />
              <ol className="report-demo-stages">
                {stageText.map((stage, index) => <li key={stage} data-active={index === currentStage} data-done={index < currentStage}>
                  <span className="report-demo-stage-marker">{index < currentStage ? <Check aria-hidden="true" /> : <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}</span>
                  <span>{stage}</span>
                  {index === currentStage && <span className="report-demo-dots" aria-hidden="true"><i /><i /><i /></span>}
                </li>)}
              </ol>
            </div>}
          </div>
        </section>
        <div className="report-demo-footer">© 2026 OÜ AML Score Systems</div>
      </main>
      <dialog ref={dialog} className="demo-error-dialog" data-visible={visible} aria-labelledby="exit-title" aria-describedby="exit-warning" onCancel={event => { event.preventDefault(); resolveExit(false); }}>
        <h2 id="exit-title" className="demo-error-title">{text.confirm}</h2>
        <p id="exit-warning" className="demo-error-description">{text.warning}</p>
        <div className="report-demo-exit-actions">
          <Button variant="outline" disabled={closing} onClick={() => resolveExit(false)}>{text.stay}</Button>
          <Button className="demo-error-return" disabled={closing} onClick={() => resolveExit(true)}>{text.leave}<ArrowRight aria-hidden="true" /></Button>
        </div>
      </dialog>
    </div>
  );
}