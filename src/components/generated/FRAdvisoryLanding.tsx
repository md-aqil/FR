import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import differentStagesBg from '../../assets/Differentstages-bg.png';
import frPortraitImg from '../../assets/faizal-rahman.jpg';
import frLogoImg from '../../assets/fr-logo.png';
type Route = 'Direct_FR' | 'Business_Advisor';
type Question = {
  id: number;
  label: string;
  kind: 'text' | 'textarea' | 'select';
  options?: string[];
};
type Outcome = {
  audit: string;
  name: string;
  company: string;
  description: string;
  figure: string;
  label: string;
};
type Stage = {
  number: string;
  badge: string;
  name: string;
  focus: string;
};
type MethodStep = {
  number: string;
  title: string;
  description: string;
};
const questions: Question[] = [{
  id: 1,
  label: '1. Full name',
  kind: 'text'
}, {
  id: 2,
  label: '2. Business email',
  kind: 'text'
}, {
  id: 3,
  label: '3. Phone / WhatsApp (include country code)',
  kind: 'text'
}, {
  id: 4,
  label: '4. Business name',
  kind: 'text'
}, {
  id: 5,
  label: '5. Which best describes your business?',
  kind: 'select',
  options: ['Accounting Firm', 'Other Professional Services', 'Non-Service Business', 'Other']
}, {
  id: 6,
  label: '6. In one sentence, what does your business do and who does it serve?',
  kind: 'textarea'
}, {
  id: 7,
  label: '7. Where is your business primarily based?',
  kind: 'text'
}, {
  id: 8,
  label: '8. Which stage best describes your business right now?',
  kind: 'select',
  options: ['Early Stage', 'Foundation', 'Stability', 'Growth', 'Scale', 'Enterprise', 'Not sure']
}, {
  id: 9,
  label: '9. Approximate annual revenue (USD equivalent)',
  kind: 'select',
  options: ['Pre-revenue', 'Under $100K', '$100K–$250K', '$250K–$500K', '$500K–$1M', '$1M–$3M', '$3M–$10M', '$10M–$25M', '$25M+', 'Prefer not to disclose']
}, {
  id: 10,
  label: '10. How long has your business existed?',
  kind: 'select',
  options: ['Less than 1 year', '1–3 years', '3–7 years', '7+ years']
}, {
  id: 11,
  label: '11. Team size, including you',
  kind: 'select',
  options: ['Just me', '2–5', '6–15', '16–50', '51–100', '101–250', '250+']
}, {
  id: 12,
  label: '12. How predictable is your monthly revenue?',
  kind: 'select',
  options: ['Highly variable', 'Somewhat unpredictable', 'Fairly steady', 'Very predictable', 'Not yet generating revenue']
}, {
  id: 13,
  label: '13. Where do most new customers or clients come from?',
  kind: 'select',
  options: ['Referrals / word of mouth', 'Founder relationships / outreach', 'Existing customers', 'Marketing or ads', 'Sales team', 'Partnerships / channels', 'Mixed sources', 'Inconsistent / not sure', 'Other']
}, {
  id: 14,
  label: '14. If you stepped away for four weeks, what would happen?',
  kind: 'select',
  options: ['Business would run well', 'Important decisions would wait', 'Performance would decline', 'Some areas would stop', 'I am not involved in day-to-day operations']
}, {
  id: 15,
  label: '15. What most needs your attention right now?',
  kind: 'select',
  options: ['Sales / lead generation', 'Sales conversion', 'Profit / cash flow', 'Pricing / positioning', 'Team / leadership', 'Founder time / exhaustion', 'Systems / operations', 'Capital / investment / wealth decisions', 'Expansion / new markets', 'A major strategic decision', 'An opportunity I want to pursue', 'I am not sure yet', 'Other']
}, {
  id: 16,
  label: '16. How long has this been important?',
  kind: 'select',
  options: ['Less than 3 months', '3–12 months', '1–3 years', 'Longer than 3 years', 'This is a new opportunity']
}, {
  id: 17,
  label: '17. What have you already tried, if anything?',
  kind: 'textarea'
}, {
  id: 18,
  label: '18. What do you believe is driving the issue or opportunity?',
  kind: 'textarea'
}, {
  id: 19,
  label: '19. How confident are you that you understand the real issue?',
  kind: 'select',
  options: ['1–2: Not sure', '3–4: Some idea', '5–6: Partly clear', '7–8: Mostly clear', '9–10: Very clear']
}, {
  id: 20,
  label: '20. How dependent is the business on you for important decisions?',
  kind: 'select',
  options: ['Very little — my team has clear authority', 'Some important decisions come to me', 'Most major decisions come to me', 'Nearly everything depends on me', 'I do not have a team yet', 'I am not involved in day-to-day decisions']
}, {
  id: 21,
  label: '21. If this issue or opportunity were addressed within 12 months, what would be different?',
  kind: 'textarea'
}, {
  id: 22,
  label: '22. What matters most for your next business move?',
  kind: 'select',
  options: ['More revenue and profit', 'More predictable sales', 'Stronger leadership and teams', 'Better systems and execution', 'More time and freedom', 'Capital / wealth / investment decisions', 'Expansion or new markets', 'Greater business value / exit readiness', 'Another outcome']
}, {
  id: 23,
  label: '23. Why are you looking at this now?',
  kind: 'textarea'
}, {
  id: 24,
  label: '24. If nothing changes over the next 6–12 months, what is most likely?',
  kind: 'select',
  options: ['Little will change', 'The issue may get harder to manage', 'We may lose revenue or opportunities', 'A major decision will be delayed', 'Not applicable — pursuing an opportunity', 'Not sure']
}, {
  id: 25,
  label: '25. Who decides on this type of business investment?',
  kind: 'select',
  options: ['I make the decision', 'I decide with a partner', 'Leadership / board approval required', 'Someone else makes the decision']
}, {
  id: 26,
  label: '26. If there is a strong business case, how would you approach external strategic support?',
  kind: 'select',
  options: ['Prepared to invest in the right solution', 'Open if value and fit are clear', 'Need to discuss with another decision-maker', 'Only exploring free information for now']
}, {
  id: 27,
  label: '27. How ready are you to act on a clear recommendation?',
  kind: 'select',
  options: ['Ready to move now', 'Within 30 days', 'Within 90 days', 'Need time to assess the recommendation', 'Just exploring']
}];
const stepTitles = ['Your business', 'Where you are now', 'What is happening', 'Your main issue or opportunity', 'Decision-making', 'Where you want to go', 'Timing and readiness'];
const stepRanges = [[1, 7], [8, 11], [12, 14], [15, 19], [20, 20], [21, 22], [23, 27]];
const outcomes: Outcome[] = [{
  audit: 'Audit #048',
  name: 'Faisal Banjara',
  company: 'CEO, Banjara Lensers',
  description: "7× the previous year's net profit in 2 months.",
  figure: '7×',
  label: 'NET PROFIT INCREASE'
}, {
  audit: 'Audit #072',
  name: 'Althaf Hussain',
  company: 'IDesign Advertising LLC',
  description: "Net profit doubled. Highest-ever turnover in the company's 7-year history.",
  figure: '2×',
  label: 'BOTTOM-LINE GROWTH'
}, {
  audit: 'Audit #091',
  name: 'Amal Hussain',
  company: 'CEO, Vesseltech Chillers',
  description: '10× net profit expansion over 9 months. Highest revenue in 14 years of operation.',
  figure: '10×',
  label: 'NET PROFIT EXPANSION'
}];
const stages: Stage[] = [{
  number: '01',
  badge: 'DISCOVERY',
  name: 'Early Stage',
  focus: 'Offer validation, unit economics and first repeatable revenue.'
}, {
  number: '02',
  badge: 'STRUCTURE',
  name: 'Foundation',
  focus: 'Pipeline cadence, delivery repeatability and margin discipline.'
}, {
  number: '03',
  badge: 'CONSOLIDATION',
  name: 'Stability',
  focus: 'Cash conversion cycles, P&L precision and operating control.'
}, {
  number: '04',
  badge: 'EXPANSION',
  name: 'Growth',
  focus: 'Departmental scale, acquisition systems and growth capital.'
}, {
  number: '05',
  badge: 'SCALE',
  name: 'Scale',
  focus: 'C-Suite autonomy, leadership delegation and enterprise value growth.'
}, {
  number: '06',
  badge: 'SOVEREIGNTY',
  name: 'Enterprise',
  focus: 'M&A positioning, board strategy and wealth sovereignty.'
}];
const methodSteps: MethodStep[] = [{
  number: '01 / MAP',
  title: 'What is the business telling us?',
  description: 'Establish where value is created or lost, and which opportunities or risks demand attention right now.'
}, {
  number: '02 / MODEL',
  title: 'Which direction creates the right value?',
  description: 'Evaluate strategic choices against your objectives, financial implications, capabilities and risk tolerance.'
}, {
  number: '03 / MOVE',
  title: 'What must happen to make it real?',
  description: 'Define the next move: priorities, decisions, resources and the executive accountabilities that drive execution.'
}];

const clientLogos = [
  {
    name: 'Unilever',
    sub: 'Middle East & Gulf',
    icon: (
      <svg className="fr-client-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 4C6 10 7 19 12 19C17 19 18 10 18 4" strokeLinecap="round" />
        <circle cx="9" cy="8" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="15" cy="8" r="1.5" fill="currentColor" stroke="none" />
        <path d="M12 12C13 13.5 13 15 12 16.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'EMAAR',
    sub: 'Properties & Hospitality',
    icon: (
      <svg className="fr-client-icon" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
      </svg>
    )
  },
  {
    name: 'Al Ghandi Group',
    sub: 'Automotive & Commercial',
    icon: (
      <svg className="fr-client-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M3 12h18M12 3v18M7 7l10 10" />
      </svg>
    )
  },
  {
    name: 'SEDCO Holding',
    sub: 'Investment & Wealth',
    icon: (
      <svg className="fr-client-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12 2 21 7 21 17 12 22 3 17 3 7" strokeLinejoin="round" />
        <polyline points="12 22 12 12 21 7" />
        <line x1="12" y1="12" x2="3" y2="7" />
      </svg>
    )
  },
  {
    name: 'Hotpack Global',
    sub: 'Packaging & FMCG',
    icon: (
      <svg className="fr-client-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: 'DSF',
    sub: 'Dubai Festivals & Retail',
    icon: (
      <svg className="fr-client-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    )
  },
  {
    name: 'Cipla',
    sub: 'Healthcare & Life Sciences',
    icon: (
      <svg className="fr-client-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 9 9M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'IPA Group',
    sub: 'Consulting & Projects',
    icon: (
      <svg className="fr-client-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  },
  {
    name: 'Park Point',
    sub: 'Development & Real Estate',
    icon: (
      <svg className="fr-client-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z" strokeLinejoin="round" />
        <path d="M12 6v12M8 10l8 4M8 14l8-4" />
      </svg>
    )
  },
  {
    name: 'Kiltons Group',
    sub: 'Business Setup UAE',
    icon: (
      <svg className="fr-client-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="19" r="1.5" fill="currentColor" />
      </svg>
    )
  }
];
const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
function SectionHeading({
  label,
  title,
  accent
}: {
  label: string;
  title: string;
  accent: string;
}) {
  return <header className="fr-section-heading">
    <p className="fr-eyebrow"><span>{label}</span></p>
    <h2>
      <span>{title}</span>
      <em>{accent}</em>
    </h2>
  </header>;
}
function DiagnosticModal({
  route,
  onClose
}: {
  route: Route;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const range = stepRanges[step];
  const visibleQuestions = questions.filter(question => question.id >= range[0] && question.id <= range[1]);
  const routeLabel = route === 'Direct_FR' ? 'Direct FR · Private Strategic Access' : 'Business Advisor · Discovery Audit';
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      const firstFocusable = modalRef.current?.querySelector<HTMLElement>(focusableSelector);
      firstFocusable?.focus();
    }, 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !modalRef.current) {
        return;
      }
      const focusableElements = Array.from(modalRef.current.querySelectorAll<HTMLElement>(focusableSelector)).filter(element => !element.hasAttribute('disabled'));
      if (focusableElements.length === 0) {
        return;
      }
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);
  const handleNext = () => {
    if (!formRef.current?.reportValidity()) {
      return;
    }
    setStep(currentStep => Math.min(currentStep + 1, 6));
  };
  return <div className="fr-modal-overlay" role="presentation">
    <div className="fr-modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="diagnostic-title">
      <button className="fr-modal-close" type="button" aria-label="Close diagnostic application" onClick={onClose}>
        <span>×</span>
      </button>
      {submitted ? <section className="fr-confirmation" aria-labelledby="confirmation-title">
        <p className="fr-eyebrow"><span>APPLICATION RECEIVED</span></p>
        <h2 id="confirmation-title"><span>Your next move is now in review.</span></h2>
        <p><span>Thank you for sharing the context behind your business. FR's team will review your application and route the right next conversation.</span></p>
        <button className="fr-primary-dark" type="button" onClick={onClose}>
          <span>Return to the page →</span>
        </button>
      </section> : <section aria-labelledby="diagnostic-title">
        <h2 id="diagnostic-title"><span>Tell us where your business is today.</span></h2>
        <p className="fr-modal-sub"><span>One application for both pathways. Your answers help the team prepare a relevant conversation.</span></p>
        <div className="fr-route-chip" aria-label="Selected pathway">
          <span>{routeLabel}</span>
        </div>
        <div className="fr-step-line">
          <span>Step {step + 1} of 7</span>
          <span>{stepTitles[step]}</span>
        </div>
        <div className="fr-progress" aria-hidden="true">
          <span style={{
            width: `${(step + 1) / 7 * 100}%`
          }} />
        </div>
        <form ref={formRef} onSubmit={event => {
          event.preventDefault();
          if (formRef.current?.reportValidity()) {
            setSubmitted(true);
          }
        }}>

          <fieldset>
            <legend><span>{stepTitles[step]}</span></legend>
            {visibleQuestions.map(question => <label className="fr-field" htmlFor={`question-${question.id}`} key={question.id}>
              <span>{question.label}</span>
              {question.kind === 'textarea' ? <textarea id={`question-${question.id}`} name={`question-${question.id}`} required={question.id !== 17 && question.id !== 18} placeholder="A few specific sentences are enough." /> : question.kind === 'select' ? <select id={`question-${question.id}`} name={`question-${question.id}`} required defaultValue="">
                <option value="">Choose an option</option>
                {question.options?.map(option => <option value={option} key={option}>{option}</option>)}
              </select> : <input id={`question-${question.id}`} name={`question-${question.id}`} type={question.id === 2 ? 'email' : question.id === 3 ? 'tel' : 'text'} required />}
            </label>)}
          </fieldset>
          <div className="fr-form-actions">
            {step > 0 && <button className="fr-back" type="button" onClick={() => setStep(currentStep => currentStep - 1)}>
              <span>Back</span>
            </button>}
            {step < 6 ? <button className="fr-submit" type="button" onClick={handleNext}>
              <span>Continue →</span>
            </button> : <button className="fr-submit" type="submit">
              <span>Submit Application →</span>
            </button>}
          </div>
        </form>
      </section>}
    </div>
  </div>;
}
export function FRAdvisoryLanding() {
  const [modalRoute, setModalRoute] = useState<Route | null>(null);
  const openModal = (route: Route) => setModalRoute(route);
  return <main className="fr-page">
    <style>{styles}</style>
    <motion.nav
      className="fr-nav"
      aria-label="Primary navigation"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="fr-container fr-nav-inner">
        <a className="fr-wordmark" href="#top" aria-label="Go ToFR Home">
          <img src={frLogoImg} alt="FR" className="fr-logo-img" />
        </a>
        <div className="fr-nav-links">
          <a href="#fork"><span>Protocol</span></a>
          <a href="#method"><span>How It Works</span></a>
          <a href="#proof"><span>Outcomes</span></a>
          <a href="#about"><span>The Strategist</span></a>
          <a href="https://grow.profitfr.com/podcast" target="_blank" rel="noreferrer"><span>Podcast</span></a>
        </div>
        <button
          className="fr-nav-cta"
          type="button"
          onClick={() => openModal('Direct_FR')}
        >
          <span className="fr-pulse-dot">●</span>
          <span>Apply Now</span>
          <span className="fr-cta-arrow">→</span>
        </button>
      </div>
    </motion.nav>

    <section className="fr-hero" id="top" aria-labelledby="hero-title">
      <div className="fr-hero-ambient-glow fr-glow-1" aria-hidden="true" />
      <div className="fr-hero-ambient-glow fr-glow-2" aria-hidden="true" />
      <div className="fr-container fr-hero-inner">

        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>Your Next Move in Business Starts </span>
          <em>Here.</em>
        </motion.h1>

        <motion.div
          className="fr-hero-lede"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <p><span>
            Every business reaches a point where the next decision matters. It may be about sales, profit, people, capital, expansion — or an opportunity you are not yet sure how to approach.
          </span></p>
          <p><span>
            You may already know what needs attention. Or you may need help identifying it first. Choose the conversation that fits where you are today.
          </span></p>
        </motion.div>

        <div className="fr-fork-grid" id="fork">
          <motion.article
            className="fr-fork-card fr-fork-card-dark"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              y: -8,
              transition: { duration: 0.28, ease: 'easeOut' }
            }}
          >
            <div className="fr-card-top">
              <span className="fr-vector fr-vector-gold">VECTOR 01 // DIRECT ENGAGEMENT</span>
              <span className="fr-card-arrow" aria-hidden="true">↗</span>
            </div>
            <div className="fr-card-body">
              <p className="fr-route"><span>I know what I need</span></p>
              <h2><span>Go Straight to FR</span></h2>
              <p className="fr-card-copy"><span>You already know the decision or opportunity you want to address. Work directly with FR in a focused 45-minute private advisory session.</span></p>
            </div>
            <button className="fr-gold-button" type="button" onClick={() => openModal('Direct_FR')}>
              <span>Apply to Work With FR →</span>
            </button>
          </motion.article>

          <motion.article
            className="fr-fork-card fr-fork-card-light"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              y: -8,
              transition: { duration: 0.28, ease: 'easeOut' }
            }}
          >
            <div className="fr-card-top">
              <span className="fr-vector fr-vector-muted">VECTOR 02 // DISCOVERY AUDIT</span>
              <span className="fr-card-arrow" aria-hidden="true">↗</span>
            </div>
            <div className="fr-card-body">
              <p className="fr-route"><span>I need clarity first</span></p>
              <h2><span>Start With a Business Advisor</span></h2>
              <p className="fr-card-copy"><span>Understand where your business stands, what deserves attention, and whether a deeper conversation with FR is the right next step.</span></p>
            </div>
            <button className="fr-outline-button" type="button" onClick={() => openModal('Business_Advisor')}>
              <span>Meet a Business Advisor →</span>
            </button>
          </motion.article>
        </div>
        <motion.p
          className="fr-footnote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span>The FR session is paid; the initial Business Advisor assessment is complimentary.</span>
        </motion.p>
      </div>
    </section>

    <section className="fr-trusted" aria-label="Trusted By">
      <div className="fr-container fr-trusted-inner">
        <motion.div
          className="fr-trusted-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="fr-trusted-heading"><span>Trusted By</span></h2>
          <blockquote className="fr-merged-quote">
            <p><span>“The business decisions that compound — the ones that define whether you plateau or ascend — rarely need more information. They need the right perspective.”</span></p>
            <cite><span>— FR</span></cite>
          </blockquote>
        </motion.div>
      </div>

      <div className="fr-marquee-wrapper" aria-hidden="true">
        <div className="fr-marquee-track">
          {clientLogos.concat(clientLogos).map((client, idx) => <div className="fr-client-card" key={`${client.name}-${idx}`}>
            <span className="fr-client-icon-wrap">{client.icon}</span>
            <div className="fr-client-info">
              <span className="fr-client-name-text">{client.name}</span>
              <span className="fr-client-sub">{client.sub}</span>
            </div>
          </div>)}
        </div>
      </div>
    </section>

    <section className="fr-section fr-proof" id="proof" aria-labelledby="proof-title">
      <div className="fr-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading label="CLIENT RESULTS · AUDITED OUTCOMES" title="Real businesses." accent="Measurable change." />
        </motion.div>
        <div className="fr-heading-rule" aria-hidden="true" />
        <div className="fr-outcome-list">
          {outcomes.map((outcome, idx) => <motion.article
            className="fr-outcome-row"
            key={outcome.audit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.5,
              delay: idx * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <p className="fr-audit"><span>{outcome.audit}</span></p>
            <div className="fr-client-name">
              <h3><span>{outcome.name}</span></h3>
              <p><span>{outcome.company}</span></p>
            </div>
            <p className="fr-outcome-copy"><span>{outcome.description}</span></p>
            <div className="fr-figure">
              <strong>{outcome.figure}</strong>
              <span>{outcome.label}</span>
            </div>
          </motion.article>)}
        </div>
      </div>
    </section>

    <section className="fr-section fr-matrix" style={{ backgroundImage: `url(${differentStagesBg})` }} aria-labelledby="matrix-title">
      <div className="fr-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading label="Who this is for" title="Different stages." accent="Different decisions." />
        </motion.div>
        <div className="fr-stage-grid" id="matrix-title">
          {stages.map((stage, idx) => <motion.article
            className="fr-stage-cell"
            key={stage.number}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.5,
              delay: idx * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{
              y: -6,
              transition: { duration: 0.25, ease: 'easeOut' }
            }}
          >
            <div className="fr-stage-top">
              <span>{stage.number}</span>
              <b>{stage.badge}</b>
            </div>
            <h3><span>{stage.name}</span></h3>
            <p><span>{stage.focus}</span></p>
          </motion.article>)}
        </div>
      </div>
    </section>

    <section className="fr-section fr-about" id="about" aria-labelledby="about-title">
      <div className="fr-container fr-about-grid">
        <aside className="fr-portrait-column" aria-label="Strategist credentials">
          <div className="fr-portrait-frame">
            <img
              src={frPortraitImg}
              alt="FR - Faizal Rahman, Strategic Business Advisor"
              className="fr-portrait-image"
              loading="lazy"
            />
            <i className="fr-portrait-border-accent" aria-hidden="true" />
          </div>
          <div className="fr-stat-rows">
            <div>
              <strong>$100M+</strong>
              <span>Enterprise value created</span>
            </div>
            <div>
              <strong>100+</strong>
              <span>Boardroom diagnostics</span>
            </div>
            <div>
              <strong>20+</strong>
              <span>Years commercial directorship</span>
            </div>
          </div>
        </aside>
        <article className="fr-bio">
          <p className="fr-eyebrow"><span>THE STRATEGIST</span></p>
          <h2 id="about-title">
            <span>FR</span>
            <small>(Faizal Rahman)</small>
          </h2>
          <div className="fr-gold-rule" aria-hidden="true" />
          <p className="fr-credential"><span>Strategic Business Advisor · Founder, Go ToFR</span></p>
          <p><span>With 20+ years spanning finance, accounting, CFO roles and business ownership, FR brings a financial and commercial perspective to the decisions that shape a business. His work addresses profitability, growth, leadership, capital, expansion and long-term enterprise value.</span></p>
          <p><span>He founded Go ToFR as a destination for business owners at every stage — from first revenue to final exit — bringing together strategic direction and the commercial capabilities needed for their next move.</span></p>
        </article>
      </div>
    </section>

    <section className="fr-method" id="method" aria-labelledby="method-title">
      <div className="fr-container">
        <p className="fr-eyebrow"><span>PRIVATE STRATEGIC ACCESS</span></p>
        <h2 id="method-title">
          <span>45 Minutes With FR.</span>
          <em>Focused on your next business decision.</em>
        </h2>
        <p className="fr-method-sub"><span>FR reviews your application in advance. Your private session focuses on the decision, challenge or opportunity that matters most to your business right now.</span></p>
        <div className="fr-dark-rule" aria-hidden="true" />
        <div className="fr-method-intro">
          <p className="fr-eyebrow"><span>THE FR NEXT MOVE METHOD</span></p>
          <h3><span>Business Intelligence. Strategic Choices. Decisive Action.</span></h3>
        </div>
        <div className="fr-method-grid">
          {methodSteps.map(step => <article className="fr-method-step" key={step.number}>
            <strong>{step.number}</strong>
            <h4><span>{step.title}</span></h4>
            <p><span>{step.description}</span></p>
          </article>)}
        </div>
        <div className="fr-dark-rule" aria-hidden="true" />
        <div className="fr-price-grid">
          <div>
            <p className="fr-price-kicker"><span>FR's standard private advisory rate (per hour)</span></p>
            <strong className="fr-old-price">$997</strong>
            <p className="fr-price-note"><span>Executive engagements and retained advisory.</span></p>
          </div>
          <div>
            <p className="fr-price-kicker fr-price-kicker-bright"><span>Your focused 45-minute session</span></p>
            <strong className="fr-new-price">$97</strong>
            <p className="fr-price-note fr-price-note-gold"><span>One-time session. Application first; payment and booking follow.</span></p>
            <button className="fr-gold-button fr-price-button" type="button" onClick={() => openModal('Direct_FR')}>
              <span>Apply for My $97 FR Session →</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <footer className="fr-footer">
      <div className="fr-container fr-footer-inner">
        <a className="fr-wordmark" href="#top" aria-label="Go ToFR Home">
          <img src={frLogoImg} alt="FR" className="fr-logo-img" />
        </a>
        <button className="fr-footer-apply" type="button" onClick={() => openModal('Direct_FR')}>
          <span>Apply Now →</span>
        </button>
        <p><span>© 2025 Go ToFR. All rights reserved.</span></p>
      </div>
    </footer>

    {modalRoute && <DiagnosticModal route={modalRoute} onClose={() => setModalRoute(null)} />}
  </main>;
}
const styles = `
.fr-page {
  --canvas: #FAFAF8;
  --canvas-raised: #F3F3F1;
  --canvas-sunken: #EDEDE9;
  --obsidian: #0A0A0B;
  --obsidian-60: #555550;
  --obsidian-30: #A8A8A2;
  --obsidian-10: #E5E5EA;
  --gold: #C5A880;
  --gold-deep: #8C7355;
  --gold-light: #E7BF69;
  --border: #E2E2DC;
  --serif: 'Newsreader', Georgia, serif;
  --sans: 'Instrument Sans', system-ui, sans-serif;
  background: var(--canvas);
  color: var(--obsidian-60);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 26px;
  min-height: 100vh;
  scroll-behavior: smooth;
}

.fr-page * {
  box-sizing: border-box;
}

.fr-page a,
.fr-page button,
.fr-page input,
.fr-page select,
.fr-page textarea {
  transition: all 0.22s cubic-bezier(0.25, 0, 0, 1);
}

.fr-page button {
  font-family: var(--sans);
  cursor: pointer;
}

.fr-container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 80px);
}

.fr-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  min-height: 76px;
  background: rgba(250, 250, 248, 0.88);
  border-bottom: 1px solid rgba(226, 226, 220, 0.85);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
}

.fr-nav-inner {
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.fr-wordmark {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.fr-logo-img {
  height: 54px;
  width: 54px;
  display: block;
  object-fit: contain;
}

.fr-nav-links {
  display: flex;
  align-items: center;
  gap: 36px;
}

.fr-nav-links a {
  position: relative;
  color: var(--obsidian-60);
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;
  padding: 6px 2px;
  transition: color 0.22s ease;
}

.fr-nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.fr-nav-links a:hover {
  color: var(--obsidian);
}

.fr-nav-links a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.fr-footer a:not(.fr-wordmark) {
  color: var(--obsidian-60);
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
}

.fr-footer a:not(.fr-wordmark):hover {
  color: var(--obsidian);
}

.fr-nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 42px;
  padding: 10px 22px;
  border-radius: 100px;
  background: var(--obsidian);
  border: 1px solid rgba(197, 168, 128, 0.35);
  color: #ffffff;
  font-family: var(--sans);
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.03em;
  line-height: 1;
  text-decoration: none;
  box-shadow: 0 4px 14px -2px rgba(0, 0, 0, 0.16);
  transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.fr-nav-cta:hover {
  background: #18181B;
  border-color: var(--gold);
  color: #ffffff;
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.28), 0 0 16px rgba(197, 168, 128, 0.25);
}

.fr-cta-arrow {
  display: inline-block;
  font-size: 13px;
  color: var(--gold-light);
  transition: transform 0.25s ease;
}

.fr-nav-cta:hover .fr-cta-arrow {
  transform: translate(2px, -2px);
}

.fr-pulse-dot {
  display: inline-block;
  font-size: 9px;
  color: var(--gold-light);
  animation: pulse 2s infinite;
}

.fr-hero {
  position: relative;
  min-height: calc(100vh - 72px);
  background: var(--canvas);
  overflow: hidden;
}

.fr-hero-ambient-glow {
  position: absolute;
  width: 650px;
  height: 650px;
  border-radius: 50%;
  filter: blur(140px);
  pointer-events: none;
  opacity: 0.55;
  z-index: 0;
}

.fr-glow-1 {
  top: -120px;
  right: -80px;
  background: radial-gradient(circle, rgba(231, 191, 105, 0.35) 0%, rgba(197, 168, 128, 0.15) 50%, transparent 70%);
  animation: floatGlow 14s ease-in-out infinite alternate;
}

.fr-glow-2 {
  bottom: 0%;
  left: -120px;
  background: radial-gradient(circle, rgba(197, 168, 128, 0.25) 0%, rgba(10, 10, 11, 0.05) 50%, transparent 70%);
  animation: floatGlow 18s ease-in-out infinite alternate-reverse;
}

@keyframes floatGlow {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(40px, -30px) scale(1.1);
  }
  100% {
    transform: translate(-30px, 35px) scale(0.95);
  }
}

.fr-hero-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding-top: clamp(70px, 9vw, 120px);
  padding-bottom: clamp(70px, 9vw, 110px);
}

.fr-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  margin-bottom: 28px;
  padding: 6px 16px;
  border-radius: 100px;
  background: rgba(197, 168, 128, 0.12);
  border: 1px solid rgba(197, 168, 128, 0.35);
  color: var(--gold-deep);
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.fr-hero h1 {
  max-width: 1120px;
  margin: 0 0 28px;
  color: var(--obsidian);
  font-family: var(--serif);
  font-size: clamp(52px, 6.6vw, 92px);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.02;
}

.fr-hero h1 em {
  color: var(--gold);
  font-weight: 300;
  font-style: italic;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #C5A880 0%, #E7BF69 50%, #A0825E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.fr-hero-lede {
  max-width: 85ch;
  margin: 0 0 52px;
  color: var(--obsidian-60);
  font-family: var(--serif);
  font-size: 21px;
  font-weight: 300;
  line-height: 35px;
}

.fr-hero-lede p {
  margin: 0 0 12px;
}

.fr-fork-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.fr-fork-card {
  position: relative;
  min-height: 360px;
  padding: 44px 38px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: border-color 0.35s ease, box-shadow 0.35s ease;
}

.fr-fork-card-dark {
  background: radial-gradient(circle at 100% 0%, #1c1c22 0%, #0A0A0B 100%);
  border: 1px solid rgba(197, 168, 128, 0.3);
  color: #ffffff;
  box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.fr-fork-card-dark::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(231, 191, 105, 0.75), transparent);
  opacity: 0.6;
  transition: opacity 0.35s ease;
}

.fr-fork-card-dark:hover {
  border-color: rgba(231, 191, 105, 0.6);
  box-shadow: 0 28px 60px -14px rgba(0, 0, 0, 0.55), 0 0 32px rgba(197, 168, 128, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.22);
}

.fr-fork-card-dark:hover::before {
  opacity: 1;
}

.fr-fork-card-light {
  background: #FFFFFF;
  border: 1px solid rgba(226, 226, 220, 0.95);
  color: var(--obsidian);
  box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.06), inset 0 1px 0 #FFFFFF;
}

.fr-fork-card-light:hover {
  border-color: rgba(197, 168, 128, 0.6);
  box-shadow: 0 28px 60px -14px rgba(0, 0, 0, 0.12), 0 0 24px rgba(197, 168, 128, 0.16);
}

.fr-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.fr-vector {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 1.3;
}

.fr-vector-gold {
  background: rgba(197, 168, 128, 0.18);
  border: 1px solid rgba(197, 168, 128, 0.35);
  color: #F8E7BE;
}

.fr-vector-muted {
  background: var(--canvas-sunken);
  border: 1px solid var(--border);
  color: var(--obsidian-60);
}

.fr-card-arrow {
  color: var(--gold);
  font-size: 18px;
  line-height: 1;
  transition: transform 0.25s ease;
}

.fr-fork-card:hover .fr-card-arrow {
  transform: translate(3px, -3px);
}

.fr-route {
  margin: 0 0 8px;
  color: var(--gold-deep);
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.05em;
  line-height: 1.4;
  text-transform: uppercase;
}

.fr-fork-card-dark .fr-route {
  color: var(--gold-light);
}

.fr-fork-card h2 {
  margin: 0 0 14px;
  color: inherit;
  font-family: var(--serif);
  font-size: 30px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.fr-card-copy {
  min-height: 64px;
  margin: 0 0 28px;
  color: var(--obsidian-60);
  font-size: 15px;
  line-height: 24px;
}

.fr-fork-card-dark .fr-card-copy {
  color: rgba(255, 255, 255, 0.78);
}

.fr-gold-button,
.fr-outline-button,
.fr-primary-dark,
.fr-secondary-light,
.fr-submit,
.fr-back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  text-decoration: none;
  font-family: var(--sans);
  cursor: pointer;
}

.fr-gold-button {
  width: 100%;
  margin-top: 24px;
  padding: 16px 28px;
  border: 1px solid var(--gold);
  background: linear-gradient(135deg, #C5A880 0%, #B8966B 100%);
  color: #0A0A0B;
  font-size: 14.5px;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: 0 6px 20px -4px rgba(197, 168, 128, 0.4);
  transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.fr-gold-button:hover {
  background: linear-gradient(135deg, #D4B992 0%, #C5A880 100%);
  box-shadow: 0 10px 28px -4px rgba(197, 168, 128, 0.6);
  transform: translateY(-2px);
}

.fr-outline-button {
  width: 100%;
  margin-top: 24px;
  padding: 16px 28px;
  border: 1.5px solid var(--obsidian);
  background: transparent;
  color: var(--obsidian);
  font-size: 14.5px;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.fr-outline-button:hover {
  background: var(--obsidian);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.2);
}

.fr-footnote {
  margin: 20px 0 0;
  color: var(--obsidian-30);
  font-size: 13px;
  font-weight: 400;
  line-height: 22px;
}

.fr-trusted {
  position: relative;
  padding: 72px 0 76px;
  background: var(--canvas-raised);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.fr-trusted-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fr-trusted-header {
  text-align: center;
  max-width: 940px;
  margin: 0 auto 52px;
}

.fr-trusted-heading {
  margin: 0 0 24px;
  color: var(--obsidian);
  font-family: var(--serif);
  font-size: clamp(32px, 3.8vw, 44px);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.15;
}

.fr-merged-quote {
  margin: 0;
  padding: 0;
  border: none;
}

.fr-merged-quote p {
  margin: 0;
  color: var(--obsidian);
  font-family: var(--serif);
  font-size: clamp(24px, 3.2vw, 34px);
  font-style: italic;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.015em;
}

.fr-merged-quote cite {
  display: inline-block;
  margin-top: 20px;
  color: var(--gold-deep);
  font-family: var(--sans);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.fr-marquee-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
}

.fr-marquee-track {
  display: flex;
  align-items: center;
  gap: 20px;
  width: max-content;
  animation: marqueeScroll 34s linear infinite;
}

.fr-marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marqueeScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.fr-client-card {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 14px 26px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 226, 220, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 14px -3px rgba(0, 0, 0, 0.04);
  transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  white-space: nowrap;
  user-select: none;
}

.fr-client-card:hover {
  background: #FFFFFF;
  border-color: rgba(197, 168, 128, 0.7);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.08), 0 0 20px rgba(197, 168, 128, 0.2);
}

.fr-client-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fr-client-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  color: var(--gold-deep);
  transition: transform 0.25s ease, color 0.25s ease;
}

.fr-client-card:hover .fr-client-icon {
  transform: scale(1.1);
  color: var(--gold);
}

.fr-client-info {
  display: flex;
  flex-direction: column;
}

.fr-client-name-text {
  font-family: var(--sans);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--obsidian);
  text-transform: uppercase;
}

.fr-client-sub {
  font-family: var(--sans);
  font-size: 10.5px;
  font-weight: 500;
  color: var(--obsidian-30);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  display: block;
  margin-top: 1px;
}

.fr-divider,
.fr-heading-rule {
  height: 1px;
  background: var(--border);
}

.fr-section {
  padding: clamp(80px, 10vw, 140px) 0;
}

.fr-section-heading {
  margin: 0 0 36px;
}

.fr-eyebrow {
  margin: 0;
  color: var(--gold);
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  line-height: 1.5;
  text-transform: uppercase;
}

.fr-section-heading h2 {
  margin: 16px 0 0;
  color: var(--obsidian);
  font-family: var(--serif);
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.05;
}

.fr-section-heading h2 span,
.fr-section-heading h2 em,
.fr-method h2 span,
.fr-method h2 em,
.fr-bio h2 span,
.fr-bio h2 small {
  display: block;
}

.fr-section-heading h2 em {
  color: var(--obsidian-60);
  font-weight: 300;
  font-style: italic;
}

.fr-outcome-row {
  display: flex;
  align-items: center;
  gap: 34px;
  padding: 40px 0;
  border-bottom: 1px solid var(--border);
}

.fr-audit {
  width: 110px;
  margin: 0;
  flex-shrink: 0;
  color: var(--obsidian-30);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.4;
}

.fr-client-name {
  width: 190px;
  flex-shrink: 0;
}

.fr-client-name h3 {
  margin: 0;
  color: var(--obsidian);
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
}

.fr-client-name p {
  margin: 6px 0 0;
  color: var(--obsidian-30);
  font-size: 13px;
  line-height: 18px;
}

.fr-outcome-copy {
  max-width: 36ch;
  margin: 0;
  color: var(--obsidian-60);
  font-size: 15px;
  line-height: 24px;
}

.fr-figure {
  margin-left: auto;
  flex-shrink: 0;
  text-align: right;
}

.fr-figure strong {
  display: block;
  color: var(--obsidian);
  font-family: var(--serif);
  font-size: clamp(48px, 5vw, 72px);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.95;
}

.fr-figure span {
  display: block;
  margin-top: 7px;
  color: var(--gold);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1.3;
}

.fr-matrix {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

.fr-matrix::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 30%, rgba(10, 10, 12, 0.45) 0%, rgba(8, 8, 10, 0.8) 100%);
  pointer-events: none;
  z-index: 1;
}

.fr-matrix > .fr-container {
  position: relative;
  z-index: 2;
}

.fr-matrix .fr-section-heading {
  margin-bottom: 48px;
}

.fr-matrix .fr-section-heading h2 {
  color: #FFFFFF;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
}

.fr-matrix .fr-section-heading h2 em {
  color: var(--gold-light);
  font-weight: 400;
}

.fr-matrix .fr-eyebrow {
  color: var(--gold-light);
  letter-spacing: 0.14em;
}

.fr-stage-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  border: none;
}

.fr-stage-cell {
  position: relative;
  min-height: 230px;
  padding: 38px 32px;
  background: rgba(16, 16, 22, 0.68);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
              border-color 0.35s ease,
              box-shadow 0.35s ease,
              background 0.35s ease;
  cursor: default;
  overflow: hidden;
}

.fr-stage-cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(231, 191, 105, 0.7), transparent);
  opacity: 0;
  transition: opacity 0.35s ease;
}

.fr-stage-cell:hover {
  background: rgba(22, 22, 30, 0.85);
  border-color: rgba(231, 191, 105, 0.45);
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.75), 0 0 32px rgba(197, 168, 128, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.fr-stage-cell:hover::before {
  opacity: 1;
}

.fr-stage-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.fr-stage-top > span {
  color: var(--gold-light);
  font-family: var(--serif);
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.fr-stage-top b {
  padding: 4px 12px;
  border-radius: 100px;
  background: rgba(197, 168, 128, 0.16);
  border: 1px solid rgba(197, 168, 128, 0.35);
  color: #F8E7BE;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  line-height: 1.4;
  text-transform: uppercase;
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

.fr-stage-cell:hover .fr-stage-top b {
  background: rgba(197, 168, 128, 0.3);
  border-color: rgba(231, 191, 105, 0.7);
  color: #FFFFFF;
}

.fr-stage-cell h3 {
  margin: 0 0 10px;
  color: #FFFFFF;
  font-family: var(--sans);
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.3;
}

.fr-stage-cell p {
  max-width: 100%;
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 15px;
  line-height: 24px;
}

.fr-about-grid {
  display: grid;
  grid-template-columns: 420px minmax(0, 1fr);
  gap: 80px;
  align-items: start;
}

.fr-portrait-frame {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(197, 168, 128, 0.45);
  background: var(--canvas-sunken);
  box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.12);
}

.fr-portrait-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
  display: block;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.fr-portrait-frame:hover .fr-portrait-image {
  transform: scale(1.035);
}

.fr-portrait-border-accent {
  position: absolute;
  inset: 12px;
  border: 1px solid rgba(231, 191, 105, 0.4);
  border-radius: 8px;
  pointer-events: none;
  transition: inset 0.35s ease, border-color 0.35s ease;
}

.fr-portrait-frame:hover .fr-portrait-border-accent {
  inset: 15px;
  border-color: rgba(231, 191, 105, 0.75);
}

.fr-stat-rows div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}

.fr-stat-rows strong {
  color: var(--obsidian);
  font-family: var(--serif);
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}

.fr-stat-rows span {
  color: var(--obsidian-60);
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  text-align: right;
}

.fr-bio {
  padding-top: 28px;
}

.fr-bio h2 {
  margin: 16px 0 0;
  color: var(--obsidian);
  font-family: var(--serif);
  font-size: clamp(48px, 6vw, 80px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
}

.fr-bio h2 small {
  margin-top: 8px;
  color: var(--obsidian-30);
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 1.2;
}

.fr-gold-rule {
  width: 48px;
  height: 2px;
  margin: 24px 0;
  background: var(--gold);
}

.fr-credential {
  margin: 0;
  color: var(--gold-deep);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1.6;
}

.fr-bio p:not(.fr-eyebrow):not(.fr-credential) {
  max-width: 54ch;
  margin: 24px 0 0;
  color: var(--obsidian-60);
  font-size: 16px;
  line-height: 28px;
}

.fr-method {
  padding: clamp(80px, 10vw, 140px) 0;
  background: var(--obsidian);
  color: #ffffff;
}

.fr-method h2 {
  margin: 18px 0 0;
  font-family: var(--serif);
  letter-spacing: -0.025em;
}

.fr-method h2 span {
  color: #ffffff;
  font-size: clamp(44px, 5.5vw, 80px);
  font-weight: 700;
  line-height: 1;
}

.fr-method h2 em {
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.45);
  font-size: clamp(28px, 3.5vw, 52px);
  font-weight: 300;
  font-style: italic;
  line-height: 1.2;
}

.fr-method-sub {
  max-width: 58ch;
  margin: 28px 0 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  line-height: 28px;
}

.fr-dark-rule {
  height: 1px;
  margin: 56px 0;
  background: rgba(255, 255, 255, 0.08);
}

.fr-method-intro h3 {
  margin: 12px 0 0;
  color: #ffffff;
  font-family: var(--sans);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.35;
}

.fr-method-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 28px;
}

.fr-method-step {
  padding: 40px 40px 0 0;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.fr-method-step + .fr-method-step {
  padding-left: 40px;
}

.fr-method-step:last-child {
  border-right: 0;
}

.fr-method-step strong {
  display: block;
  color: var(--gold);
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
}

.fr-method-step h4 {
  margin: 12px 0 8px;
  color: #ffffff;
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}

.fr-method-step p {
  margin: 0;
  color: rgba(255, 255, 255, 0.45);
  font-size: 14px;
  line-height: 24px;
}

.fr-price-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.fr-price-grid > div:first-child .fr-price-kicker {
  color: #ffffff;
}

.fr-price-grid > div:first-child .fr-price-note {
  color: #ffffff;
}

.fr-price-kicker {
  margin: 0;
  color: rgba(255, 255, 255, 0.35);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1.5;
  text-transform: uppercase;
}

.fr-price-kicker-bright {
  color: rgba(255, 255, 255, 0.5);
}

.fr-old-price,
.fr-new-price {
  display: block;
  margin-top: 8px;
  font-family: var(--serif);
  letter-spacing: -0.04em;
  line-height: 1;
}

.fr-old-price {
  color: #ffffff;
  font-size: clamp(56px, 6vw, 88px);
  font-weight: 300;
}

.fr-new-price {
  color: var(--gold-light);
  font-size: clamp(72px, 8vw, 120px);
  font-weight: 700;
}

.fr-price-note {
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.25);
  font-size: 13px;
  line-height: 20px;
}

.fr-price-note-gold {
  color: var(--gold-deep);
}

.fr-price-button {
  width: auto;
  margin-top: 28px;
  padding: 18px 36px;
  font-size: 15px;
  letter-spacing: 0.02em;
}

.fr-price-button:hover {
  transform: scale(1.01);
}

.fr-ready {
  padding: 100px 0;
  background: var(--canvas);
}

.fr-ready h2 {
  margin: 0;
  color: var(--obsidian);
  font-family: var(--serif);
  font-size: clamp(40px, 5vw, 68px);
  font-weight: 700;
  font-style: italic;
  letter-spacing: -0.025em;
  line-height: 1.05;
}

.fr-ready p {
  max-width: 48ch;
  margin: 16px 0 40px;
  color: var(--obsidian-60);
  font-size: 18px;
  line-height: 30px;
}

.fr-ready-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.fr-primary-dark {
  padding: 16px 28px;
  border: 1px solid var(--obsidian);
  background: var(--obsidian);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
}

.fr-primary-dark:hover {
  transform: translateY(-1px);
}

.fr-secondary-light {
  padding: 16px 28px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--obsidian);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
}

.fr-secondary-light:hover {
  border-color: var(--obsidian);
}

.fr-footer {
  border-top: 1px solid var(--border);
  background: var(--canvas);
}

.fr-footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-top: 40px;
  padding-bottom: 40px;
}

.fr-footer .fr-wordmark {
  font-size: 18px;
}

.fr-footer p {
  margin: 0;
  color: var(--obsidian-30);
  font-size: 12px;
  line-height: 18px;
}

.fr-footer-apply {
  background: transparent;
  border: 0;
  color: var(--obsidian-60);
  font-family: var(--sans);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 100px;
  transition: all 0.22s ease;
}

.fr-footer-apply:hover {
  color: var(--obsidian);
  background: rgba(0, 0, 0, 0.04);
}

.fr-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(10, 10, 11, 0.75);
  backdrop-filter: blur(12px);
}

.fr-modal {
  position: relative;
  width: min(100%, 760px);
  max-height: 92dvh;
  overflow-y: auto;
  background: var(--canvas);
  padding: clamp(28px, 5vw, 52px);
  outline: none;
}

.fr-modal-close {
  position: absolute;
  top: 18px;
  right: 20px;
  border: 0;
  background: transparent;
  color: var(--obsidian);
  font-size: 24px;
  font-weight: 300;
  line-height: 1;
}

.fr-modal h2,
.fr-confirmation h2 {
  margin: 0;
  padding-right: 40px;
  color: var(--obsidian);
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 700;
  line-height: 1.1;
}

.fr-modal-sub {
  margin: 8px 0 24px;
  color: var(--obsidian-60);
  font-size: 15px;
  line-height: 24px;
}

.fr-route-chip {
  margin-bottom: 24px;
  padding: 12px 16px;
  border: 1px solid var(--border);
  color: var(--obsidian);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.fr-step-line {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 9px;
  color: var(--obsidian-30);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.4;
  text-transform: uppercase;
}

.fr-progress {
  height: 2px;
  margin-bottom: 28px;
  background: var(--border);
}

.fr-progress span {
  display: block;
  height: 100%;
  background: var(--gold);
}

.fr-modal fieldset {
  margin: 0;
  padding: 0;
  border: 0;
}

.fr-modal legend {
  margin: 0 0 20px;
  padding: 0;
  color: var(--obsidian);
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
}

.fr-field {
  display: block;
  margin-bottom: 18px;
}

.fr-field > span {
  display: block;
  margin-bottom: 8px;
  color: var(--obsidian);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}

.fr-field input,
.fr-field select,
.fr-field textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 3px;
  background: var(--canvas);
  color: var(--obsidian);
  font-family: var(--sans);
  font-size: 15px;
  line-height: 22px;
  outline: none;
}

.fr-field textarea {
  min-height: 104px;
  resize: vertical;
}

.fr-field input:focus,
.fr-field select:focus,
.fr-field textarea:focus {
  border-color: var(--gold);
}

.fr-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
}

.fr-back {
  padding: 12px 24px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--obsidian-60);
  font-size: 14px;
  font-weight: 500;
}

.fr-submit {
  padding: 12px 28px;
  border: 1px solid var(--obsidian);
  background: var(--obsidian);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
}

.fr-confirmation {
  padding: 44px 0 20px;
}

.fr-confirmation h2 {
  margin-top: 16px;
}

.fr-confirmation p:not(.fr-eyebrow) {
  max-width: 54ch;
  margin: 16px 0 28px;
  color: var(--obsidian-60);
  font-size: 16px;
  line-height: 28px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 900px) {
  .fr-nav-links {
    display: none;
  }

  .fr-hero-inner {
    padding-top: 96px;
  }

  .fr-fork-grid,
  .fr-about-grid,
  .fr-method-grid,
  .fr-price-grid {
    grid-template-columns: 1fr;
  }

  .fr-stage-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .fr-about-grid {
    gap: 52px;
  }

  .fr-method-step,
  .fr-method-step + .fr-method-step {
    padding: 32px 0;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .fr-method-step:last-child {
    border-bottom: 0;
  }

  .fr-outcome-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 18px 24px;
    align-items: end;
  }

  .fr-audit,
  .fr-client-name {
    width: auto;
  }

  .fr-outcome-copy {
    grid-column: 1 / -1;
    max-width: 46ch;
  }

  .fr-figure {
    grid-row: 1 / span 2;
    grid-column: 2;
  }
}

@media (max-width: 640px) {
  .fr-container {
    padding: 0 24px;
  }

  .fr-nav-inner {
    gap: 14px;
  }

  .fr-nav-cta {
    padding: 8px 16px;
    font-size: 12.5px;
    min-height: 36px;
  }

  .fr-ribbon {
    align-items: flex-start;
    border-color: var(--border);
    font-size: 10px;
    line-height: 1.5;
  }

  .fr-fork-card {
    padding: 32px 24px;
  }

  .fr-outcome-row {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 34px 0;
  }

  .fr-figure {
    grid-row: auto;
    grid-column: auto;
    margin-left: 0;
    text-align: left;
  }

  .fr-stage-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .fr-stage-cell {
    min-height: auto;
    padding: 30px 24px;
  }

  .fr-about-grid {
    grid-template-columns: 1fr;
  }

  .fr-ready-actions,
  .fr-footer-inner,
  .fr-form-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .fr-footer-inner {
    align-items: flex-start;
  }

  .fr-primary-dark,
  .fr-secondary-light,
  .fr-submit,
  .fr-back {
    width: 100%;
  }

  .fr-step-line {
    flex-direction: column;
    gap: 6px;
  }

  .fr-modal-overlay {
    align-items: flex-end;
    padding: 0;
  }

  .fr-modal {
    width: 100%;
    max-height: 94dvh;
  }
}
`;