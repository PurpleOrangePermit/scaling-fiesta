// @ts-nocheck
import { useSyncExternalStore } from 'react';

export const LANGS = [
  ['en', 'English', '/assets/flags/gb.svg'],
  ['ru', 'Русский', '/assets/flags/ru.svg'],
  ['fr', 'Français', '/assets/flags/fr.svg'],
  ['es', 'Español', '/assets/flags/es.svg'],
];

let current = 'en';
const subs = new Set<() => void>();
let booted = false;
function boot() {
  if (booted || typeof window === 'undefined') return;
  booted = true;
  const v = localStorage.getItem('amlview-lang');
  if (v && v !== current && LANGS.some(l => l[0] === v)) { current = v; document.documentElement.lang = v; queueMicrotask(() => subs.forEach(f => f())); }
}
export function setLang(v) {
  if (v === current) return;
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const apply = () => {
    current = v; root.lang = v; localStorage.setItem('amlview-lang', v);
    subs.forEach(f => f());
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('lang-fade')));
  };
  if (reduce) return apply();
  root.classList.add('lang-fade');
  setTimeout(apply, 260);
}
const subscribe = (f) => { subs.add(f); boot(); return () => subs.delete(f); };
export const useLang = () => useSyncExternalStore(subscribe, () => current, () => 'en');
export function useT() {
  const lang = useLang();
  return (s) => (lang === 'en' ? s : D[lang]?.[s] ?? s);
}

const T = {
  'How it works': ['Как это работает', 'Fonctionnement', 'Cómo funciona'],
  'What we check': ['Что проверяем', 'Ce que nous vérifions', 'Qué revisamos'],
  'Why check': ['Зачем проверять', 'Pourquoi vérifier', 'Por qué revisar'],
  'Pricing': ['Тарифы', 'Tarifs', 'Precios'],
  'FAQ': ['FAQ', 'FAQ', 'FAQ'],
  'Check address': ['Проверить адрес', 'Vérifier une adresse', 'Revisar dirección'],
  'Login': ['Войти', 'Connexion', 'Entrar'],
  'Account access is currently unavailable.': ['Вход в аккаунт сейчас недоступен.', 'L’accès au compte est momentanément indisponible.', 'El acceso a la cuenta no está disponible por ahora.'],
  'Contact us': ['Связаться с нами', 'Nous contacter', 'Contáctanos'],
  'Product': ['Продукт', 'Produit', 'Producto'],
  'Company': ['Компания', 'Société', 'Empresa'],
  'Enterprise': ['Enterprise', 'Entreprise', 'Empresas'],
  'AML screening for crypto wallets and transactions on BNB, Ethereum, TRON and Solana.': ['AML-проверка криптокошельков и транзакций в BNB, Ethereum, TRON и Solana.', 'Contrôle AML des portefeuilles et transactions crypto sur BNB, Ethereum, TRON et Solana.', 'Análisis AML de billeteras y transacciones cripto en BNB, Ethereum, TRON y Solana.'],
  'All rights reserved.': ['Все права защищены.', 'Tous droits réservés.', 'Todos los derechos reservados.'],

  'Check crypto wallets': ['Проверяйте криптокошельки', 'Vérifiez les portefeuilles crypto', 'Revisa billeteras cripto'],
  'before you transact': ['перед взаимодействием с адресом', 'avant d’effectuer une transaction', 'antes de operar'],
  'Review a wallet’s history and see which connections deserve a closer look before you move funds.': ['Изучите историю кошелька и узнайте, какие связи стоит проверить, перед взаимодействием с адресом.', 'Consultez l’historique d’un portefeuille et repérez les liens à examiner avant de déplacer vos fonds.', 'Revisa el historial de una billetera y descubre qué conexiones merecen atención antes de mover fondos.'],
  'See how it works': ['Как это работает', 'Voir le fonctionnement', 'Ver cómo funciona'],
  'Wallet screening': ['Проверка кошелька', 'Contrôle du portefeuille', 'Análisis de billetera'],
  'Transaction exposure': ['Риски транзакции', 'Exposition de la transaction', 'Exposición de la transacción'],
  'Source': ['Источник', 'Source', 'Origen'],
  'Recipient': ['Получатель', 'Destinataire', 'Destinatario'],
  'Sender': ['Отправитель', 'Expéditeur', 'Remitente'],
  'Wallet address': ['Адрес кошелька', 'Adresse du portefeuille', 'Dirección de billetera'],
  'Check': ['Проверить', 'Vérifier', 'Revisar'],
  'Enter a wallet address': ['Введите адрес кошелька', 'Saisissez une adresse', 'Introduce una dirección'],
  'Use an Ethereum / BNB or TRON wallet address.': ['Введите адрес кошелька Ethereum / BNB или TRON.', 'Saisissez une adresse Ethereum / BNB ou TRON.', 'Introduce una dirección Ethereum / BNB o TRON.'],
  'Invalid wallet address': ['Неверный формат адреса', 'Format d’adresse incorrect', 'Formato de dirección incorrecto'],
  '0x + 40 hexadecimal characters, or T + 33 Base58 characters.': ['0x и 40 символов (0–9, a–f) или T и 33 символа Base58.', '0x et 40 caractères hexadécimaux, ou T et 33 caractères Base58.', '0x y 40 caracteres hexadecimales, o T y 33 caracteres Base58.'],
  'Paste a public address or transaction hash to start.': ['Вставьте публичный адрес или хеш транзакции.', 'Collez une adresse publique ou un hash de transaction.', 'Pega una dirección pública o un hash de transacción.'],
  'Screening is temporarily unavailable': ['Проверка временно недоступна', 'Le contrôle est momentanément indisponible', 'El análisis no está disponible por ahora'],
  'We’re working on it.': ['Мы уже работаем над этим.', 'Nous y travaillons.', 'Estamos trabajando en ello.'],
  'for a manual check.': ['для ручной проверки.', 'pour une vérification manuelle.', 'para una revisión manual.'],
  'Dismiss': ['Закрыть', 'Fermer', 'Cerrar'],

  'What’s behind the transfer?': ['Что стоит за переводом?', 'Que cache le transfert ?', '¿Qué hay detrás de la transferencia?'],
  'Look at the address, follow the funds, and see what triggered a risk signal.': ['Изучите адрес, проследите движение средств и узнайте, что вызвало сигнал риска.', 'Examinez l’adresse, suivez les fonds et voyez ce qui a déclenché un signal de risque.', 'Revisa la dirección, sigue los fondos y descubre qué activó una señal de riesgo.'],
  'Ethereum address': ['Адрес Ethereum', 'Adresse Ethereum', 'Dirección Ethereum'],
  'Address activity': ['Активность адреса', 'Activité de l’adresse', 'Actividad de la dirección'],
  'Wallet history': ['История кошелька', 'Historique du portefeuille', 'Historial de la billetera'],
  'See past activity and the addresses a wallet has interacted with. Use that history to understand who you’re transacting with.': ['Посмотрите прошлую активность и адреса, с которыми взаимодействовал кошелёк. Эта история поможет понять, с кем вы имеете дело.', 'Consultez l’activité passée et les adresses avec lesquelles le portefeuille a interagi. Cet historique vous aide à savoir avec qui vous traitez.', 'Consulta la actividad pasada y las direcciones con las que ha interactuado la billetera. Ese historial te ayuda a saber con quién operas.'],
  'Trace a specific transfer from sender to recipient and see where it connects to other activity on-chain.': ['Отследите конкретный перевод от отправителя к получателю и посмотрите, с какой ончейн-активностью он связан.', 'Suivez un transfert de l’expéditeur au destinataire et voyez où il se relie à d’autres activités on-chain.', 'Rastrea una transferencia del remitente al destinatario y mira dónde se conecta con otra actividad on-chain.'],
  'Wallet': ['Кошелёк', 'Portefeuille', 'Billetera'],
  'Exchange': ['Биржа', 'Plateforme d’échange', 'Exchange'],
  'Unknown source': ['Неизвестный источник', 'Source inconnue', 'Origen desconocido'],
  'Unknown': ['Неизвестный', 'Inconnue', 'Desconocido'],
  ' source': [' источник', '', ''],
  'Flagged address': ['Помеченный адрес', 'Adresse signalée', 'Dirección marcada'],
  'Risk signals': ['Сигналы риска', 'Signaux de risque', 'Señales de riesgo'],
  'See which sources drew attention and how they’re linked to the wallet or transfer you’re reviewing.': ['Узнайте, какие источники привлекли внимание и как они связаны с проверяемым кошельком или переводом.', 'Voyez quelles sources ont attiré l’attention et comment elles sont liées au portefeuille ou au transfert examiné.', 'Descubre qué orígenes llamaron la atención y cómo se vinculan con la billetera o transferencia que revisas.'],

  'Why it pays to know your': ['Почему важно знать свой', 'Pourquoi connaître votre', 'Por qué conviene conocer tu'],
  'AML score': ['AML-рейтинг', 'score AML', 'puntuación AML'],
  'Check a wallet against 50+ risk factors before sending or receiving funds.': ['Проверьте кошелёк по 50+ факторам риска до отправки или получения средств.', 'Vérifiez un portefeuille sur plus de 50 facteurs de risque avant d’envoyer ou de recevoir des fonds.', 'Revisa una billetera con más de 50 factores de riesgo antes de enviar o recibir fondos.'],
  'Get one clear score and a detailed report showing how it was calculated.': ['Получите понятный итоговый рейтинг и подробный отчёт о том, как он рассчитан.', 'Obtenez un score clair et un rapport détaillé expliquant son calcul.', 'Obtén una puntuación clara y un informe detallado de cómo se calculó.'],
  'Wallet 17': ['Кошелёк 17', 'Portefeuille 17', 'Billetera 17'],
  'Wallet 32': ['Кошелёк 32', 'Portefeuille 32', 'Billetera 32'],
  'Risk score': ['Уровень риска', 'Score de risque', 'Riesgo'],
  'See what’s behind the score.': ['Узнайте, что стоит за рейтингом.', 'Voyez ce qui se cache derrière le score.', 'Descubre qué hay detrás de la puntuación.'],
  'Check before funds move': ['Проверяйте до перевода', 'Vérifiez avant tout mouvement', 'Revisa antes de mover fondos'],
  'An address alone tells you little about where the funds have been. Reviewing it before you send or accept a transfer gives you time to spot connections worth investigating.': ['Сам по себе адрес мало говорит о том, где побывали средства. Проверка до отправки или приёма перевода даёт время заметить подозрительные связи.', 'Une adresse seule en dit peu sur le parcours des fonds. L’examiner avant d’envoyer ou d’accepter un transfert vous laisse le temps de repérer les liens à creuser.', 'Una dirección por sí sola dice poco sobre dónde estuvieron los fondos. Revisarla antes de enviar o aceptar una transferencia te da tiempo para detectar conexiones a investigar.'],
  'Understand what raised the score': ['Поймите, что повысило рейтинг', 'Comprenez ce qui a fait monter le score', 'Entiende qué elevó la puntuación'],
  'Open the report to see which sources or patterns contributed to the result. A direct link to a flagged address may warrant a different response from a link through several intermediaries.': ['Откройте отчёт и посмотрите, какие источники или паттерны повлияли на результат. Прямая связь с помеченным адресом требует иной реакции, чем связь через несколько посредников.', 'Ouvrez le rapport pour voir quelles sources ou tendances ont pesé sur le résultat. Un lien direct avec une adresse signalée n’appelle pas la même réponse qu’un lien via plusieurs intermédiaires.', 'Abre el informe para ver qué orígenes o patrones influyeron en el resultado. Un vínculo directo con una dirección marcada puede requerir una respuesta distinta a uno a través de varios intermediarios.'],
  'Decide what to do next': ['Решите, что делать дальше', 'Décidez de la suite', 'Decide qué hacer después'],
  'Use the report to decide whether to ask for more context, escalate the transfer for review, or proceed after weighing the findings.': ['По отчёту решите: запросить больше контекста, передать перевод на проверку или продолжить, взвесив выводы.', 'Servez-vous du rapport pour demander plus de contexte, escalader le transfert ou poursuivre après analyse.', 'Usa el informe para pedir más contexto, escalar la transferencia a revisión o continuar tras valorar los hallazgos.'],

  'What shapes an': ['Из чего складывается', 'Qu’est-ce qui forme un', 'Qué define una'],
  'AML score?': ['AML-рейтинг?', 'score AML ?', 'puntuación AML?'],
  'An address’s activity and connections can reveal potential risk.': ['Активность и связи адреса могут указать на потенциальный риск.', 'L’activité et les liens d’une adresse peuvent révéler un risque potentiel.', 'La actividad y las conexiones de una dirección pueden revelar un riesgo potencial.'],
  'Transaction history': ['История транзакций', 'Historique des transactions', 'Historial de transacciones'],
  'Patterns in how funds move.': ['Паттерны движения средств.', 'Les schémas de circulation des fonds.', 'Patrones de movimiento de fondos.'],
  'Counterparty exposure': ['Связи с контрагентами', 'Exposition aux contreparties', 'Exposición a contrapartes'],
  'Who the address transacts with.': ['С кем взаимодействует адрес.', 'Avec qui l’adresse traite.', 'Con quién opera la dirección.'],
  'Links to flagged activity.': ['Связи с подозрительной активностью.', 'Liens avec une activité signalée.', 'Vínculos con actividad marcada.'],
  'The blockchain records when funds moved, which addresses sent or received them, and how much changed hands. Looking at that history can show whether a transfer was a one-off or part of a recurring pattern.': ['Блокчейн хранит, когда двигались средства, какие адреса их отправляли и получали и сколько было переведено. Эта история показывает, был ли перевод разовым или частью повторяющейся схемы.', 'La blockchain enregistre quand les fonds ont circulé, quelles adresses les ont envoyés ou reçus et quels montants ont changé de mains. Cet historique montre si un transfert était ponctuel ou récurrent.', 'La blockchain registra cuándo se movieron los fondos, qué direcciones los enviaron o recibieron y cuánto cambió de manos. Ese historial muestra si una transferencia fue puntual o parte de un patrón recurrente.'],
  'The same address may interact with exchanges, services and wallets whose owners are unknown. Address labels help put those interactions in context, while the transfer path shows whether a connection is direct or passes through other addresses.': ['Один адрес может взаимодействовать с биржами, сервисами и кошельками неизвестных владельцев. Метки адресов дают этим связям контекст, а путь перевода показывает, прямая связь или через другие адреса.', 'Une même adresse peut interagir avec des plateformes, des services et des portefeuilles aux propriétaires inconnus. Les étiquettes donnent du contexte, et le chemin du transfert montre si le lien est direct ou passe par d’autres adresses.', 'Una misma dirección puede interactuar con exchanges, servicios y billeteras de dueños desconocidos. Las etiquetas aportan contexto y la ruta muestra si la conexión es directa o pasa por otras direcciones.'],
  'A link to flagged activity is worth investigating in context. How recently it occurred, how much value moved and how many addresses lie in between help explain why the connection deserves a closer look.': ['Связь с подозрительной активностью стоит изучать в контексте. Давность, объём переведённых средств и число адресов-посредников объясняют, почему связь требует внимания.', 'Un lien avec une activité signalée mérite d’être replacé dans son contexte. Son ancienneté, le montant déplacé et le nombre d’adresses intermédiaires expliquent pourquoi il faut s’y intéresser.', 'Un vínculo con actividad marcada merece analizarse en contexto. Qué tan reciente fue, cuánto valor se movió y cuántas direcciones hay en medio explican por qué merece atención.'],
  'Some data sources:': ['Некоторые источники данных:', 'Quelques sources de données :', 'Algunas fuentes de datos:'],
  'These platforms illustrate where blockchain records and address labels can be found.': ['Эти платформы показывают, где можно найти записи блокчейна и метки адресов.', 'Ces plateformes illustrent où trouver les données blockchain et les étiquettes d’adresses.', 'Estas plataformas muestran dónde encontrar registros de blockchain y etiquetas de direcciones.'],

  'Follow the funds.': ['Следите за средствами.', 'Suivez les fonds.', 'Sigue los fondos.'],
  'See the connections.': ['Видьте связи.', 'Voyez les liens.', 'Mira las conexiones.'],
  'Share a public wallet address or transaction hash. The report brings together on-chain activity, related addresses and the connections that warrant a closer look.': ['Укажите публичный адрес кошелька или хеш транзакции. Отчёт объединит ончейн-активность, связанные адреса и связи, требующие внимания.', 'Indiquez une adresse publique ou un hash de transaction. Le rapport rassemble l’activité on-chain, les adresses liées et les connexions à examiner.', 'Comparte una dirección pública o un hash de transacción. El informe reúne la actividad on-chain, las direcciones relacionadas y las conexiones que merecen atención.'],
  'Explore the report as a graph of the wallet’s connections.': ['Изучайте отчёт как граф связей кошелька.', 'Explorez le rapport sous forme de graphe des liens du portefeuille.', 'Explora el informe como un grafo de conexiones de la billetera.'],
  'Incoming connections': ['Входящие связи', 'Connexions entrantes', 'Conexiones entrantes'],
  'Reviewed wallet': ['Проверяемый кошелёк', 'Portefeuille examiné', 'Billetera revisada'],
  'Connection details': ['Подробнее о связях', 'Détails des connexions', 'Detalles de conexiones'],
  'Incoming funds are linked to a wallet labeled as an exchange. The label identifies the service associated with the transfer.': ['Входящие средства связаны с кошельком с меткой биржи. Метка указывает сервис, связанный с переводом.', 'Les fonds entrants sont liés à un portefeuille étiqueté comme plateforme d’échange. L’étiquette identifie le service associé.', 'Los fondos entrantes se vinculan a una billetera etiquetada como exchange. La etiqueta identifica el servicio asociado.'],
  'The transfer is visible on-chain, but the sending address has no identified owner or service in this example.': ['Перевод виден в блокчейне, но у адреса-отправителя в этом примере нет известного владельца или сервиса.', 'Le transfert est visible on-chain, mais l’adresse d’envoi n’a ni propriétaire ni service identifié dans cet exemple.', 'La transferencia es visible on-chain, pero la dirección emisora no tiene dueño ni servicio identificado en este ejemplo.'],
  'This connection warrants a closer look. Start with when the transfer happened, how much moved and whether any addresses were in between.': ['Эта связь требует внимания. Начните с того, когда был перевод, какая сумма и были ли адреса-посредники.', 'Ce lien mérite un examen. Commencez par la date du transfert, le montant et la présence d’adresses intermédiaires.', 'Esta conexión merece atención. Empieza por cuándo ocurrió, cuánto se movió y si hubo direcciones intermedias.'],

  'Start with a free daily check. Upgrade when screening becomes part of your workflow.': ['Начните с бесплатной ежедневной проверки. Переходите на платный тариф, когда проверки станут частью работы.', 'Commencez par une vérification gratuite par jour. Passez à l’offre supérieure quand le contrôle devient routinier.', 'Empieza con una revisión gratuita al día. Mejora tu plan cuando el análisis sea parte de tu trabajo.'],
  'Free': ['Free', 'Gratuit', 'Gratis'],
  'On request': ['По запросу', 'Sur demande', 'A consultar'],
  '/ month': ['/ мес', '/ mois', '/ mes'],
  '1 check per day': ['1 проверка в день', '1 vérification par jour', '1 revisión al día'],
  '100 addresses per month': ['100 адресов в месяц', '100 adresses par mois', '100 direcciones al mes'],
  'Custom request volume': ['Индивидуальный объём', 'Volume sur mesure', 'Volumen a medida'],
  'Start free': ['Начать бесплатно', 'Commencer gratuitement', 'Empezar gratis'],
  'Choose Pro': ['Выбрать Pro', 'Choisir Pro', 'Elegir Pro'],
  'Contact sales': ['Связаться с отделом продаж', 'Contacter les ventes', 'Contactar ventas'],
  'USDT on supported networks': ['USDT в поддерживаемых сетях', 'USDT sur les réseaux pris en charge', 'USDT en redes compatibles'],
  'Summary score for each factor': ['Итоговый скор по каждому фактору', 'Score global par facteur', 'Puntuación resumida por factor'],
  'Watermarked reports': ['Отчёты с водяным знаком', 'Rapports filigranés', 'Informes con marca de agua'],
  'PDF export': ['Экспорт в PDF', 'Export PDF', 'Exportación PDF'],
  'Wallet statistics': ['Статистика кошелька', 'Statistiques du portefeuille', 'Estadísticas de billetera'],
  'All supported tokens': ['Все поддерживаемые токены', 'Tous les tokens pris en charge', 'Todos los tokens compatibles'],
  'Full connection graph': ['Полный граф связей', 'Graphe complet des connexions', 'Grafo completo de conexiones'],
  'Detailed factor breakdown': ['Подробная разбивка по факторам', 'Détail par facteur', 'Desglose detallado por factor'],
  'PDF report export': ['Экспорт отчёта в PDF', 'Export du rapport en PDF', 'Exportar informe en PDF'],
  'Ongoing wallet monitoring': ['Постоянный мониторинг кошельков', 'Surveillance continue des portefeuilles', 'Monitoreo continuo de billeteras'],
  'Passive data collection': ['Пассивный сбор данных', 'Collecte passive de données', 'Recolección pasiva de datos'],
  'Source analysis for incoming funds': ['Анализ источников входящих средств', 'Analyse de l’origine des fonds entrants', 'Análisis del origen de fondos entrantes'],

  'Frequently asked questions': ['Частые вопросы', 'Questions fréquentes', 'Preguntas frecuentes'],
  'How does a wallet check differ from a transaction check?': ['Чем проверка кошелька отличается от проверки транзакции?', 'Quelle différence entre vérifier un portefeuille et une transaction ?', '¿En qué se diferencia revisar una billetera de revisar una transacción?'],
  'A wallet check looks at an address’s activity over time. A transaction check focuses on one transfer and the connections around its sender and recipient.': ['Проверка кошелька смотрит на активность адреса за всё время. Проверка транзакции фокусируется на одном переводе и связях отправителя и получателя.', 'La vérification d’un portefeuille examine l’activité d’une adresse dans le temps. Celle d’une transaction se concentre sur un transfert et les liens autour de l’expéditeur et du destinataire.', 'La revisión de una billetera analiza la actividad de una dirección en el tiempo. La de una transacción se centra en una transferencia y las conexiones del remitente y destinatario.'],
  'What does the report show?': ['Что показывает отчёт?', 'Que montre le rapport ?', '¿Qué muestra el informe?'],
  'It shows the wallet or transfer reviewed, the categories of related addresses, and the connections behind any risk signals. Those signals help you decide what to investigate further.': ['Он показывает проверенный кошелёк или перевод, категории связанных адресов и связи, стоящие за сигналами риска. Эти сигналы помогают решить, что изучить дальше.', 'Il présente le portefeuille ou le transfert examiné, les catégories d’adresses liées et les connexions derrière chaque signal de risque. Ces signaux vous aident à décider quoi approfondir.', 'Muestra la billetera o transferencia revisada, las categorías de direcciones relacionadas y las conexiones detrás de cada señal de riesgo. Esas señales te ayudan a decidir qué investigar.'],
  'What does a low AML score tell me?': ['О чём говорит низкий AML-рейтинг?', 'Que signifie un score AML faible ?', '¿Qué indica una puntuación AML baja?'],
  'It indicates fewer or weaker risk signals in the activity reviewed. Check the report for the connections behind the score and consider any information you have about the transfer.': ['Он означает, что в проверенной активности меньше или слабее сигналов риска. Посмотрите в отчёте связи, стоящие за рейтингом, и учтите всё, что знаете о переводе.', 'Il indique des signaux de risque moins nombreux ou plus faibles. Consultez le rapport pour voir les liens derrière le score et tenez compte de ce que vous savez du transfert.', 'Indica menos señales de riesgo o más débiles. Revisa en el informe las conexiones detrás de la puntuación y considera lo que sepas de la transferencia.'],
  'What should I prepare before reaching out?': ['Что подготовить перед обращением?', 'Que préparer avant de nous contacter ?', '¿Qué preparo antes de contactar?'],
  'Have the public wallet address or transaction hash ready, along with the network if you know it. Include any context about the transfer you’d like to understand.': ['Подготовьте публичный адрес кошелька или хеш транзакции и сеть, если знаете её. Добавьте любой контекст о переводе, который хотите понять.', 'Préparez l’adresse publique ou le hash de transaction, ainsi que le réseau si vous le connaissez. Ajoutez tout contexte utile sur le transfert.', 'Ten lista la dirección pública o el hash de la transacción y la red si la conoces. Añade cualquier contexto sobre la transferencia.'],

  'Have a question about wallet screening or an AMLView plan?': ['Есть вопрос о проверке кошельков или тарифах AMLView?', 'Une question sur le contrôle des portefeuilles ou une offre AMLView ?', '¿Tienes dudas sobre el análisis de billeteras o un plan de AMLView?'],
  'Name': ['Имя', 'Nom', 'Nombre'],
  'Company ': ['Компания ', 'Société ', 'Empresa '],
  '(optional)': ['(необязательно)', '(facultatif)', '(opcional)'],
  'Email': ['Email', 'E-mail', 'Correo'],
  'Get in touch': ['Отправить', 'Envoyer', 'Enviar'],
  'Online submissions are currently unavailable.': ['Онлайн-заявки сейчас недоступны.', 'Les demandes en ligne sont momentanément indisponibles.', 'Las solicitudes en línea no están disponibles por ahora.'],
};
const D = { ru: {}, fr: {}, es: {} };
for (const [k, [ru, fr, es]] of Object.entries(T)) { D.ru[k] = ru; D.fr[k] = fr; D.es[k] = es; }
