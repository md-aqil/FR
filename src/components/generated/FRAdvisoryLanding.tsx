import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import differentStagesBg from '../../assets/Differentstages-bg.png';
import frPortraitImg from '../../assets/faizal-rahman.jpg';
import frLogoImg from '../../assets/fr-logo.png';
import unileverImg from '../../assets/unilever.jpeg';
import ciplaLogoSvg from '../../assets/Cipla_logo.svg';
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

const EmaarLogo = () => (
  <svg viewBox="0 0 1267.96 272.78" className="fr-brand-logo emaar-logo" aria-label="EMAAR">
    <path d="m235.47 174.8-20.89-1.58-6.4 52.49h.01c-2.79 22.14-4.42 28.11-10.23 41.55h30.23c-1.4-8.21-.93-27.86.93-43.54l6.35-48.92Zm98.74 1.21h-45.46l44.56 91.25h16.28l1.86-3.7v-52.27l-17.24-35.28z" fill="#0A0A0B" />
    <path d="M197.96 239.37s-16.75 10.21-33.97 9.96H62.54V145.49h107.11l5.43-20.42H62.54V21.49h96.02c8.73 0 16.99 2.49 23.36 4.98 1.52.64 3.14 1.39 4.99 2.24 1.01.47 2.1.96 3.27 1.49l-.24-26.89H14.88c6.89 16.66 6.87 27.58 6.85 39.41v185.7c.03 12.14.05 22.2-6.85 39.33h179.3l3.77-26.39v-1.99Z" fill="#c8102e" />
    <path fill="#00843d" d="M463.79 3.31h-10.7L413.9 83.5h60.2L463.79 3.31z" />
    <path d="M451.23 220.99c1.86 15.18 1.86 33.58-.47 46.52v.25h52.33c-5.81-13.43-7.91-19.9-10.7-42.04l-6.39-49.7h-40.48l5.71 44.98Zm356.91 9.95c-7.06 16.92-10.47 23.14-20.26 36.82h31.42l37.35-91.75h-26.03l-22.47 54.93Zm170.78 36.82h53.06c-14.12-14.93-18.67-21.64-28.46-43.29l-20.11-48.46h-42.27l37.78 91.75Z" fill="#0A0A0B" />
    <path fill="#00843d" d="m899.44 64.34 7.26 19.16h38.32L911.75 3.31h-10.47L868.47 83.5h23.86l7.11-19.16zm-264.45 0 7.26 19.16h38.47L647.54 3.31h-10.48L604.25 83.5h23.63l7.11-19.16z" />
    <path d="M714.48 267.76h53.05c-13.89-14.93-18.67-21.64-28.46-43.29l-20.06-48.46H676.7l37.78 91.75Zm-170.55-36.82c-7.06 16.92-10.48 23.14-20.5 36.82h31.43l37.35-91.75h-25.8l-22.47 54.93h-.01Zm660.42 36.82h51.4c-3.31-3.44-54.93-56.23-89.66-91.75h-48.26c35.23 42.18 63.97 70.1 86.51 91.75h.01Zm-165.43-40.4v.9c.03 12.12.05 22.15-6.93 39.25h55.46c-6.68-16.89-7.14-27.1-7.17-38.86v-52.64h-41.36v51.35Z" fill="#0A0A0B" />
    <path fill="#00843d" d="M1072.67 23.81c73.22-2.9 80.67 34.13 81.33 51.08.1 2.8-.02 5.7-.34 8.6h57.71c.25-2.46.39-4.98.39-7.6 0-73-81.08-72.72-120.56-72.58h-59.22c6.98 16.63 6.96 27.52 6.93 39.33v40.83h33.75V23.81h.01Z" />
    <path d="m368.69 176.01-17.23 35.28v52.27l43.95-87.55h-26.72z" fill="#0A0A0B" />
    <path d="M945.02 83.5H906.7l23.57 62.21h-61.03l23.08-62.21h-23.86l-37.85 92.51h26.03l2.05-5.03h80.38l2.07 5.03h42.27L945.02 83.5zm-264.3 0h-38.47l23.58 62.21H604.8l23.08-62.21h-23.63l-37.85 92.51h25.8l2.05-5.03h80.38l2.07 5.03h42.31L680.72 83.5zm530.66.01h-57.71c-1.69 15.36-9.66 31.29-27.72 38.23 0 0-.44.22-1.1.45-5.97 2.57-20 3.18-32.01 3.18-10.92 0-20.16-.51-20.16-.51V83.5h-33.75v92.51h41.36v-31.27c5.26.25 13.62 2.24 25.34 16.4 4.16 5.16 8.22 10.08 12.22 14.87h48.26L1134.8 144l10.76-.99c33.52-5.11 62.23-24.34 65.83-59.5ZM474.1 83.5h-60.2l-45.21 92.51h26.72l40-79.66 10.11 79.66H486L474.1 83.5zm-185.13 0h-63.26l-11.13 89.72 20.89 1.58 10.63-86.16 42.65 87.37h45.46L288.97 83.5z" fill="#0A0A0B" />
    <path fill="#00843d" d="M225.71 83.5h63.26L249.76 3.31h-14.13l-9.92 80.19z" />
  </svg>
);

const clientLogos = [
  {
    name: 'Unilever',
    logo: <img src={unileverImg} alt="Unilever" className="fr-brand-logo-img unilever-logo-img" />
  },
  {
    name: 'EMAAR',
    logo: <EmaarLogo />
  },
  {
    name: 'Cipla',
    logo: <img src={ciplaLogoSvg} alt="Cipla" className="fr-brand-logo-img cipla-logo-img" />
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openModal = (route: Route) => {
    setMobileMenuOpen(false);
    setModalRoute(route);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return <main className="fr-page">
    <style>{styles}</style>
    <header className="fr-nav" role="banner">
      <div className="fr-container fr-nav-inner">
        <a className="fr-wordmark" href="#top" aria-label="Go ToFR Home" onClick={closeMobileMenu}>
          <img src={frLogoImg} alt="FR" className="fr-logo-img" />
        </a>
        <div className="fr-nav-links">
          <a href="#fork"><span>Protocol</span></a>
          <a href="#method"><span>How It Works</span></a>
          <a href="#proof"><span>Outcomes</span></a>
          <a href="#about"><span>The Strategist</span></a>
        </div>
        <div className="fr-nav-right">
          <button
            className="fr-nav-cta"
            type="button"
            onClick={() => openModal('Direct_FR')}
          >
            <span className="fr-pulse-dot">●</span>
            <span>Apply Now</span>
            <span className="fr-cta-arrow">→</span>
          </button>
          <button
            className={`fr-menu-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="fr-toggle-bar bar-1" />
            <span className="fr-toggle-bar bar-2" />
            <span className="fr-toggle-bar bar-3" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fr-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeMobileMenu}
          >
            <motion.div
              className="fr-mobile-menu"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="fr-mobile-links">
                <a href="#fork" onClick={closeMobileMenu} className="fr-mobile-link">
                  <span className="fr-link-num">01</span>
                  <span className="fr-link-label">Protocol</span>
                  <span className="fr-link-arrow">→</span>
                </a>
                <a href="#method" onClick={closeMobileMenu} className="fr-mobile-link">
                  <span className="fr-link-num">02</span>
                  <span className="fr-link-label">How It Works</span>
                  <span className="fr-link-arrow">→</span>
                </a>
                <a href="#proof" onClick={closeMobileMenu} className="fr-mobile-link">
                  <span className="fr-link-num">03</span>
                  <span className="fr-link-label">Outcomes</span>
                  <span className="fr-link-arrow">→</span>
                </a>
                <a href="#about" onClick={closeMobileMenu} className="fr-mobile-link">
                  <span className="fr-link-num">04</span>
                  <span className="fr-link-label">The Strategist</span>
                  <span className="fr-link-arrow">→</span>
                </a>
              </div>

              <div className="fr-mobile-actions">
                <button
                  className="fr-mobile-cta-primary"
                  type="button"
                  onClick={() => openModal('Direct_FR')}
                >
                  <span>Apply to Work With FR →</span>
                </button>
                <button
                  className="fr-mobile-cta-secondary"
                  type="button"
                  onClick={() => openModal('Business_Advisor')}
                >
                  <span>Meet a Business Advisor (Complimentary)</span>
                </button>
              </div>

              <div className="fr-mobile-footer">
                <p><span>Strategic Advisory with FR · Confidential & Direct</span></p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

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
          {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => (
            <div className="fr-client-card" key={`${client.name}-${idx}`} title={client.name}>
              {client.logo}
            </div>
          ))}
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
          <h3><span>Strategic Insight. Executive Choices. Decisive Action.</span></h3>
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
        <p><span>© 2026 Go ToFR. All rights reserved.</span></p>
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
  z-index: 9999;
  min-height: 76px;
  background: rgba(250, 250, 248, 0.94);
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

.fr-nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fr-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 42px;
  height: 42px;
  padding: 8px;
  background: var(--canvas-raised);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.fr-menu-toggle:hover {
  background: var(--canvas-sunken);
  border-color: var(--gold);
}

.fr-toggle-bar {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--obsidian);
  border-radius: 2px;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
}

.fr-menu-toggle.is-active .bar-1 {
  transform: translateY(7px) rotate(45deg);
}

.fr-menu-toggle.is-active .bar-2 {
  opacity: 0;
  transform: scaleX(0);
}

.fr-menu-toggle.is-active .bar-3 {
  transform: translateY(-7px) rotate(-45deg);
}

.fr-mobile-overlay {
  position: fixed;
  top: 76px;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  height: 100dvh;
  background: rgba(10, 10, 11, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 9998;
  display: flex;
  flex-direction: column;
  padding: 16px 20px 24px;
  overflow-y: auto;
}

.fr-mobile-menu {
  background: var(--canvas);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 24px 20px;
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.fr-mobile-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fr-mobile-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 16px;
  border-radius: 12px;
  text-decoration: none;
  background: transparent;
  transition: all 0.22s ease;
}

.fr-mobile-link:hover,
.fr-mobile-link:active {
  background: var(--canvas-raised);
}

.fr-link-num {
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 700;
  color: var(--gold-deep);
  letter-spacing: 0.08em;
}

.fr-link-label {
  font-family: var(--sans);
  font-size: 16px;
  font-weight: 600;
  color: var(--obsidian);
  letter-spacing: -0.01em;
  flex: 1;
}

.fr-link-arrow {
  color: var(--obsidian-30);
  font-size: 16px;
  transition: transform 0.2s ease, color 0.2s ease;
}

.fr-mobile-link:hover .fr-link-arrow {
  color: var(--gold);
  transform: translateX(4px);
}

.fr-link-badge {
  padding: 4px 10px;
  border-radius: 100px;
  background: rgba(197, 168, 128, 0.18);
  border: 1px solid rgba(197, 168, 128, 0.4);
  color: var(--gold-deep);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.fr-mobile-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.fr-mobile-cta-primary {
  width: 100%;
  padding: 15px 24px;
  border-radius: 100px;
  background: var(--obsidian);
  border: 1px solid var(--obsidian);
  color: #FFFFFF;
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  transition: all 0.25s ease;
}

.fr-mobile-cta-primary:active {
  transform: scale(0.98);
}

.fr-mobile-cta-secondary {
  width: 100%;
  padding: 13px 20px;
  border-radius: 100px;
  background: transparent;
  border: 1.5px solid var(--border);
  color: var(--obsidian);
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.22s ease;
}

.fr-mobile-cta-secondary:active {
  background: var(--canvas-sunken);
  border-color: var(--obsidian);
}

.fr-mobile-footer {
  text-align: center;
  padding-top: 4px;
}

.fr-mobile-footer p {
  margin: 0;
  color: var(--obsidian-30);
  font-size: 11px;
  line-height: 1.4;
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
  gap: 32px;
  width: max-content;
  animation: marqueeScroll 28s linear infinite;
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
  justify-content: center;
  height: 88px;
  padding: 16px 48px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 226, 220, 0.95);
  border-radius: 16px;
  box-shadow: 0 6px 20px -4px rgba(0, 0, 0, 0.05);
  transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  white-space: nowrap;
  user-select: none;
  flex-shrink: 0;
}

.fr-client-card:hover {
  background: #FFFFFF;
  border-color: rgba(197, 168, 128, 0.75);
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.1), 0 0 24px rgba(197, 168, 128, 0.25);
}

.fr-brand-logo-img {
  max-width: 190px;
  width: auto;
  object-fit: contain;
  display: block;
}

.unilever-logo-img {
  height: 64px;
  max-width: 180px;
  object-fit: contain;
}

.cipla-logo-img {
  height: 48px;
  max-width: 180px;
  object-fit: contain;
}

.fr-brand-logo {
  max-width: 220px;
  width: auto;
  display: block;
}

.emaar-logo {
  height: 50px;
  max-width: 220px;
  width: auto;
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
  background: var(--canvas-raised);
}

.fr-footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding-top: 36px;
  padding-bottom: 36px;
}

.fr-footer .fr-logo-img {
  height: 46px;
  width: 46px;
}

.fr-footer-apply {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 22px;
  border-radius: 100px;
  background: var(--obsidian);
  color: #FFFFFF;
  border: 1px solid var(--obsidian);
  font-family: var(--sans);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.fr-footer-apply:hover {
  background: var(--gold-deep);
  border-color: var(--gold-deep);
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(140, 115, 85, 0.3);
}

.fr-footer p {
  margin: 0;
  color: var(--obsidian-60);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
}

.fr-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 20000;
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

  .fr-menu-toggle {
    display: flex;
  }

  .fr-hero-inner {
    padding-top: 56px;
    padding-bottom: 64px;
  }

  .fr-vector {
    display: none !important;
  }

  .fr-card-top {
    justify-content: flex-end;
    margin-bottom: 12px;
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
    gap: 40px;
  }

  .fr-method-step,
  .fr-method-step + .fr-method-step {
    padding: 28px 0;
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
    padding: 0 20px;
  }

  .fr-nav {
    min-height: 60px;
  }

  .fr-nav-inner {
    min-height: 60px;
    padding-top: 6px;
    padding-bottom: 6px;
    gap: 12px;
  }

  .fr-logo-img {
    height: 40px;
    width: 40px;
  }

  .fr-nav-cta {
    padding: 7px 14px;
    font-size: 11.5px;
    min-height: 32px;
    gap: 6px;
  }

  .fr-menu-toggle {
    width: 38px;
    height: 38px;
    padding: 7px;
  }

  .fr-hero-inner {
    padding-top: 36px;
    padding-bottom: 48px;
  }

  .fr-hero-badge {
    margin-bottom: 16px;
    padding: 5px 12px;
    font-size: 10px;
    letter-spacing: 0.1em;
  }

  .fr-hero h1 {
    font-size: clamp(34px, 8.5vw, 46px);
    line-height: 1.08;
    letter-spacing: -0.03em;
    margin-bottom: 18px;
  }

  .fr-hero-lede {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 28px;
  }

  .fr-hero-lede p {
    margin-bottom: 10px;
  }

  .fr-fork-grid {
    gap: 16px;
  }

  .fr-fork-card {
    min-height: auto;
    padding: 26px 20px;
    border-radius: 14px;
  }

  .fr-card-top {
    margin-bottom: 8px;
    justify-content: flex-end;
  }

  .fr-fork-card h2 {
    font-size: 24px;
    line-height: 1.2;
    margin: 0 0 10px;
  }

  .fr-route {
    font-size: 12px;
    margin-bottom: 6px;
  }

  .fr-card-copy {
    font-size: 14px;
    line-height: 1.55;
    margin-bottom: 22px;
  }

  .fr-gold-button,
  .fr-outline-button {
    width: 100%;
    padding: 13px 20px;
    font-size: 14px;
    border-radius: 100px;
  }

  .fr-footnote {
    margin-top: 14px;
    font-size: 12px;
    line-height: 1.5;
    text-align: center;
  }

  .fr-section {
    padding: 56px 0;
  }

  .fr-section-heading {
    margin: 0 0 24px;
  }

  .fr-eyebrow {
    font-size: 10px;
    letter-spacing: 0.12em;
    margin-bottom: 6px;
  }

  .fr-section-heading h2 {
    font-size: clamp(28px, 7vw, 38px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-top: 8px;
  }

  .fr-trusted {
    padding: 44px 0 48px;
  }

  .fr-trusted-header {
    margin-bottom: 28px;
  }

  .fr-trusted-heading {
    font-size: 26px;
    margin-bottom: 14px;
  }

  .fr-merged-quote p {
    font-size: clamp(18px, 4.8vw, 22px);
    line-height: 1.48;
  }

  .fr-merged-quote cite {
    margin-top: 12px;
    font-size: 12px;
  }

  .fr-client-card {
    height: 72px;
    padding: 12px 30px;
    border-radius: 12px;
  }

  .unilever-logo-img {
    height: 50px;
    max-width: 140px;
  }

  .cipla-logo-img {
    height: 38px;
    max-width: 140px;
  }

  .emaar-logo {
    height: 40px;
    max-width: 170px;
  }

  .fr-ribbon {
    align-items: flex-start;
    border-color: var(--border);
    font-size: 10px;
    line-height: 1.5;
  }

  .fr-outcome-row {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 28px 0;
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
    padding: 26px 20px;
  }

  .fr-about-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .fr-ready {
    padding: 64px 0;
  }

  .fr-ready h2 {
    font-size: clamp(32px, 8vw, 44px);
    line-height: 1.1;
  }

  .fr-ready p {
    font-size: 15.5px;
    line-height: 1.6;
    margin: 14px 0 28px;
  }

  .fr-ready-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .fr-primary-dark,
  .fr-secondary-light,
  .fr-submit,
  .fr-back {
    width: 100%;
    text-align: center;
    justify-content: center;
    padding: 14px 20px;
  }

  .fr-footer-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    padding-top: 36px;
    padding-bottom: 36px;
  }

  .fr-footer .fr-logo-img {
    height: 44px;
    width: 44px;
  }

  .fr-footer-apply {
    width: 100%;
    max-width: 260px;
    justify-content: center;
    padding: 12px 20px;
    font-size: 13.5px;
  }

  .fr-footer p {
    font-size: 12px;
    color: var(--obsidian-60);
    text-align: center;
  }

  .fr-mobile-overlay {
    top: 60px;
    height: 100vh;
    height: 100dvh;
    padding: 12px 16px 20px;
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
    padding: 28px 20px;
  }
}
`;