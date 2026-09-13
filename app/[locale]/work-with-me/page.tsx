'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

// ─── CONTENT ─────────────────────────────────────────────────────────────────

const PROBLEMS = [
  'Product ambiguity — you know something should exist, not what it is yet.',
  'Slow development caused by too much coordination between specialists.',
  'Design and engineering handoffs that lose context every time work changes hands.',
  'Getting stuck between a prototype and something you can actually ship.',
  'Knowing what to build, but not having the person to carry it across the finish line.',
  'Having an existing team, but needing extra product/design/engineering capacity for one initiative.',
]

const WAYS = [
  {
    tag: '01',
    title: 'Find the Product',
    subtitle: 'You have an idea. Let’s figure out what’s actually worth building.',
    includes: [
      'Product strategy & problem framing',
      'UX research',
      'Technical direction',
      'AI opportunity assessment',
      'Interactive prototype',
      'Product roadmap',
    ],
    outcome: 'A clearer product direction and a concrete plan for what to build next.',
  },
  {
    tag: '02',
    title: 'Build the Product',
    subtitle: 'From product direction to a working MVP.',
    includes: [
      'Product strategy & UX/UI',
      'System architecture',
      'Full-stack development',
      'AI integrations',
      'Database & backend',
      'Deployment',
    ],
    outcome: 'A functional product that can reach real users and generate real learning.',
  },
  {
    tag: '03',
    title: 'Accelerate the Product',
    subtitle: 'Your team doesn’t need another pair of hands. It needs momentum.',
    includes: [
      'A new product or feature',
      'A prototype or redesign',
      'AI integration',
      'A complex technical interaction',
      'An initiative that has stalled',
      'Bridging product, design & engineering',
    ],
    outcome: 'An initiative that moves again, without waiting to hire and onboard.',
  },
  {
    tag: '04',
    title: 'Keep the Product Moving',
    subtitle: 'Ongoing product care and iteration without another full-time hire.',
    includes: [
      'Bug fixes & technical maintenance',
      'Dependency & infrastructure updates',
      'Performance & UX improvements',
      'Small feature iterations',
      'Analytics, SEO/AEO',
      'AI integrations',
    ],
    outcome: 'A product that keeps improving after launch, without staffing up to do it.',
  },
]

const CAPABILITIES = [
  'Product Strategy',
  'System Architecture',
  'Product Design',
  'Full-Stack Engineering',
  'AI-Native Workflows',
]

interface PricingTier {
  eyebrow: string
  title: string
  description: string
  price: string
  idealFor: string[]
  outcome: string
  cta: { label: string; href: string }
}

const PRICING: PricingTier[] = [
  {
    eyebrow: 'Start Here',
    title: 'Product Clarity',
    description: 'Not sure what to build, fix, or prioritize? Get a focused assessment before committing to a larger engagement.',
    price: '$300–$500',
    idealFor: [
      'Founders with an idea',
      'Teams unsure what to prioritize',
      'A second opinion before a bigger commitment',
    ],
    outcome: 'A clear view of what deserves attention and what to do next.',
    cta: { label: 'Start with Product Clarity →', href: '#discovery' },
  },
  {
    eyebrow: 'Define the Product',
    title: 'Discovery Sprint',
    description: 'Turn an ambiguous product idea into a defined direction, architecture and prototype.',
    price: 'Starting at $2,500',
    idealFor: [
      'Founders with an idea',
      'Product direction & validation',
      'Technical planning',
    ],
    outcome: 'A concrete product definition and roadmap ready for execution.',
    cta: { label: 'Start Discovery Questionnaire →', href: '#discovery' },
  },
  {
    eyebrow: 'Build the Product',
    title: 'MVP Partnership',
    description: 'Take a defined product from strategy and design through engineering and a working MVP.',
    price: 'Starting at $10,000',
    idealFor: [
      'Startups and small teams',
      'AI products, SaaS and internal tools',
      'A scoped product ready to build',
    ],
    outcome: 'A working product, built from strategy through deployment.',
    cta: { label: 'Book a Discovery Call →', href: 'https://cal.com/davidraigoza' },
  },
  {
    eyebrow: 'Accelerate the Product',
    title: 'Fractional Product Partner',
    description: 'Ongoing product strategy, design and engineering support without adding another full-time team.',
    price: 'Custom monthly engagement',
    idealFor: [
      'Teams that already have engineers',
      'A defined product initiative',
      'Teams that need senior product direction',
    ],
    outcome: 'Consistent product momentum without an agency-sized process.',
    cta: { label: 'Book a Discovery Call →', href: 'https://cal.com/davidraigoza' },
  },
]

const COMMITMENT_LADDER = [
  { label: 'Product Clarity', price: '$300–$500' },
  { label: 'Discovery Sprint', price: '$2,500+' },
  { label: 'MVP Partnership', price: '$10,000+' },
  { label: 'Fractional Partner', price: 'Custom' },
]

const PROCESS = [
  { step: 'Understand', description: 'Clarify the problem, the user, and the constraints before any solution takes shape.' },
  { step: 'Model', description: 'Map the system — data, logic, and technical architecture — so complexity is visible early.' },
  { step: 'Design', description: 'Shape the interface and experience around real usage, not assumptions.' },
  { step: 'Build', description: 'Ship production-grade code, iterating in the open as the product takes form.' },
  { step: 'Deploy', description: 'Release to real users with monitoring, security, and stability in place.' },
  { step: 'Learn', description: 'Study what the data and users reveal, then feed it back into the next cycle.' },
]

const PRODUCTS = [
  { name: 'Vera', description: 'AI interface for navigating products and portfolios.', status: 'In Development' },
  { name: 'Common Ground', description: 'Ontology-based market positioning analysis.', status: 'In Development' },
  { name: 'Web3 Builder', description: 'AI-assisted Web3 application builder with automated deployment and testing.', status: 'In Development' },
]

const WHY_MODEL = [
  {
    tag: 'Instead of a freelancer',
    title: 'You’re not hiring a specialist for one task.',
    body: 'You’re hiring one person who can carry the product across disciplines. A developer is the right call once a spec is finished and all that’s left is implementation. I’m strongest when the problem still needs product thinking.',
  },
  {
    tag: 'Instead of an agency',
    title: 'Not because agencies are slow. Because of the structure.',
    body: 'Traditional agency structures add coordination, handoffs and overhead that are often unnecessary for early-stage product work. The studio stays deliberately small: fewer handoffs, less context loss, shorter feedback loops, no account-management layer between you and the work.',
  },
  {
    tag: 'Instead of hiring internally',
    title: 'Hiring makes sense when you need permanent capacity.',
    body: 'I make sense when you need to test an idea before a major commitment, move a product forward before building a larger team, add senior cross-functional capability temporarily, or ship a defined initiative without hiring several specialists for one project.',
  },
]

const DIFFERENTIATORS = [
  'Continuity — one person carries context from problem to production.',
  'Cross-functional execution — strategy, design and engineering connected from day one.',
  'Lower coordination overhead — fewer handoffs, less interpretation, less rework.',
  'AI-native acceleration — part of how the studio works, not the pitch.',
  'Speed, as a consequence of the above — not the primary promise.',
]

const GOOD_FIT = [
  'You have a promising idea that needs to become a coherent, buildable product.',
  'Your AI or product concept is technically interesting but hard to understand, use, demonstrate or bring to market.',
  'You need product strategy, design and engineering connected — without coordinating multiple specialists.',
  'A technically complex product needs a clearer interface, workflow or user experience.',
  'You need senior product/design/engineering capability without building an agency or a full team.',
]

const NOT_FIT = [
  'You’re looking for the cheapest possible freelancer.',
  'You need a high-volume production agency or a generic web development shop.',
  'You need marketing production, not product work.',
  'You have a finished spec and only need implementation — a developer is the better fit.',
  'You need a large production team or a permanent full-time hire.',
]

const FAQS = [
  {
    q: 'Do you work internationally?',
    a: "Yes. I'm based in Medellín and work remotely with clients internationally.",
  },
  {
    q: 'Do you work with startups?',
    a: 'Yes — particularly founders and small product teams where product thinking and execution need to stay closely connected.',
  },
  {
    q: 'Can you join an existing team?',
    a: 'Yes. The role can be project-based or ongoing, depending on the product initiative.',
  },
  {
    q: 'Do you build the software yourself?',
    a: "Yes. I handle product, design and engineering work directly rather than handing the project across a large production team.",
  },
  {
    q: 'Do you use AI?',
    a: "Yes. AI-native tools and workflows are part of the studio's process, but AI doesn't replace product judgment, engineering decisions or human validation.",
  },
  {
    q: 'What if I only have an idea?',
    a: 'That’s a strong fit for the Discovery Sprint — figuring out what’s actually worth building comes first.',
  },
  {
    q: 'What if I already have a team?',
    a: 'I can join for a specific initiative where product, design and engineering need to move together.',
  },
  {
    q: 'Do you build Web3 products?',
    a: 'Yes, but complex Web3 and protocol work is treated as a specialized engagement. For smart contracts, formal verification and security-sensitive systems, reach out directly.',
  },
  {
    q: 'What is Product Clarity, exactly?',
    a: 'A paid diagnostic, not a discounted Discovery Sprint. It answers what’s actually going on and what to prioritize next — useful on its own, and it can lead into a Discovery Sprint if a deeper product definition turns out to be needed.',
  },
]

// ─── STYLES & HELPER COMPONENTS ──────────────────────────────────────────────

const primaryButtonStyle: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: '0.75rem',
  color: '#000000',
  background: 'var(--accent)',
  padding: '0.85rem 1.6rem',
  borderRadius: '2px',
  textDecoration: 'none',
  fontWeight: 600,
  letterSpacing: '0.05em',
  display: 'inline-block',
}

const secondaryButtonStyle: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: '0.75rem',
  color: 'var(--text)',
  border: '1px solid var(--border)',
  background: 'transparent',
  padding: '0.85rem 1.6rem',
  borderRadius: '2px',
  textDecoration: 'none',
  fontWeight: 400,
  letterSpacing: '0.05em',
  display: 'inline-block',
  cursor: 'pointer',
}

const cardStyle: React.CSSProperties = {
  borderTop: '1px solid var(--border)',
  padding: '1.5rem 0',
}

const offerCardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  borderTop: '1px solid var(--border)',
  paddingTop: '1.5rem',
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--mono)',
      fontSize: '0.65rem',
      color: 'var(--accent)',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      marginBottom: '1rem',
    }}>
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'var(--serif)',
      fontSize: 'clamp(2rem, 4vw, 3.25rem)',
      fontWeight: 300,
      lineHeight: 1.1,
      color: 'var(--text)',
      maxWidth: '25ch',
    }}>
      {children}
    </h2>
  )
}

// ─── DISCOVERY FORM COMPONENT ───────────────────────────────────────────────

const DISCOVERY_SECTIONS = [
  { id: 1, title: 'About You' },
  { id: 2, title: 'The Business' },
  { id: 3, title: 'Your Customers' },
  { id: 4, title: 'Current Experience' },
  { id: 5, title: 'Your Brand' },
  { id: 6, title: 'The Project' },
]

function DiscoveryForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessDesc: '',
    goals: '',
    importance: '',
    successCriteria: '',
    targetCustomer: '',
    customerGoals: '',
    customerObstacles: '',
    discoveryChannels: [] as string[],
    discoveryOtherText: '',
    workingWell: '',
    notWorkingWell: '',
    brandFeeling: '',
    brandAvoidFeeling: '',
    brandReferences: '',
    existingAssets: [] as string[],
    existingAssetsOtherText: '',
    requirementsAndDeadlines: '',
    additionalInfo: '',
  })

  useEffect(() => {
    const saved = localStorage.getItem('discovery_form_draft')
    if (saved) {
      try { setFormData(JSON.parse(saved)) } catch (_) {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('discovery_form_draft', JSON.stringify(formData))
  }, [formData])

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  }

  const validateStep = (currentStep: number): boolean => {
    setErrorMsg('')
    
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        setErrorMsg('Please enter your full name.')
        return false
      }
      if (!formData.email.trim()) {
        setErrorMsg('Please enter your email address.')
        return false
      }
      if (!isValidEmail(formData.email)) {
        setErrorMsg('Please enter a valid email address (e.g., name@company.com).')
        return false
      }
    }

    if (currentStep === 2) {
      if (!formData.businessDesc.trim() || !formData.goals.trim() || !formData.importance.trim() || !formData.successCriteria.trim()) {
        setErrorMsg('Please complete all required fields in this step.')
        return false
      }
    }

    if (currentStep === 3) {
      if (!formData.targetCustomer.trim() || !formData.customerGoals.trim() || !formData.customerObstacles.trim()) {
        setErrorMsg('Please complete all required fields in this step.')
        return false
      }
    }

    if (currentStep === 4) {
      if (formData.discoveryChannels.length === 0) {
        setErrorMsg('Please select at least one discovery channel.')
        return false
      }
      if (!formData.workingWell.trim() || !formData.notWorkingWell.trim()) {
        setErrorMsg('Please complete all required fields in this step.')
        return false
      }
    }

    if (currentStep === 5) {
      if (!formData.brandFeeling.trim() || !formData.brandAvoidFeeling.trim()) {
        setErrorMsg('Please complete all required fields in this step.')
        return false
      }
    }

    if (currentStep === 6) {
      if (formData.existingAssets.length === 0) {
        setErrorMsg('Please select at least one asset option.')
        return false
      }
      if (!formData.requirementsAndDeadlines.trim()) {
        setErrorMsg('Please detail any requirements or deadlines.')
        return false
      }
    }

    return true
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1)
    }
  }

  const handleCheckbox = (key: 'discoveryChannels' | 'existingAssets', value: string) => {
    setFormData((prev) => {
      const current = prev[key]
      const exists = current.includes(value)
      return {
        ...prev,
        [key]: exists ? current.filter((item) => item !== value) : [...current, value],
      }
    })
  }

  const handleSubmit = async () => {
    if (!validateStep(6)) return

    setLoading(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
        localStorage.removeItem('discovery_form_draft')
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Failed to submit questionnaire. Please try again.')
      }
    } catch (err) {
      setErrorMsg('A network error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div style={{
        border: '1px solid var(--border)',
        padding: '3rem 2rem',
        textAlign: 'center',
        background: 'rgba(255,255,255,0.01)',
      }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Submission Received
        </p>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: 300, marginBottom: '1.5rem', color: 'var(--text)' }}>
          Thank you.
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 300, maxWidth: '50ch', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          We have what we need to start understanding the project. We'll review your answers and follow up with the next step.
        </p>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border)',
    padding: '0.85rem 1rem',
    color: 'var(--text)',
    fontFamily: 'var(--sans)',
    fontSize: '0.9rem',
    borderRadius: '2px',
    outline: 'none',
    marginTop: '0.5rem',
  }

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: '110px',
    resize: 'vertical',
  }

  return (
    <div id="discovery" style={{ border: '1px solid var(--border)', padding: 'clamp(1.5rem, 4vw, 3rem)', background: 'rgba(0,0,0,0.2)' }}>
      {/* Progress header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '2.5rem' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Step {step} of 6 — {DISCOVERY_SECTIONS[step - 1].title}
        </span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>
          ~10–15 min completion
        </span>
      </div>

      {/* SECTION 1 */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              1. What's your name? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input
              type="text"
              required
              style={inputStyle}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              2. What's your email? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input
              type="email"
              required
              style={inputStyle}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@company.com"
            />
          </div>
        </div>
      )}

      {/* SECTION 2 */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              3. Tell us a little about your business. <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
              What do you do, what do you sell or provide, and how does the business work today?
            </p>
            <textarea
              required
              style={textareaStyle}
              value={formData.businessDesc}
              onChange={(e) => setFormData({ ...formData, businessDesc: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              4. What are you hoping to build, change, or improve? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
              Don't worry about describing the solution. Tell us what you're trying to make happen.
            </p>
            <textarea
              required
              style={textareaStyle}
              value={formData.goals}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              5. Why is this important right now? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <textarea
              required
              style={textareaStyle}
              value={formData.importance}
              onChange={(e) => setFormData({ ...formData, importance: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              6. What would make you say, "This project was successful"? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <textarea
              required
              style={textareaStyle}
              value={formData.successCriteria}
              onChange={(e) => setFormData({ ...formData, successCriteria: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* SECTION 3 */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              7. Who is this business primarily for? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
              Describe your typical customer or the people you most want to reach. If there are several groups, tell us which one matters most.
            </p>
            <textarea
              required
              style={textareaStyle}
              value={formData.targetCustomer}
              onChange={(e) => setFormData({ ...formData, targetCustomer: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              8. What are your customers usually trying to accomplish when they come to you? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <textarea
              required
              style={textareaStyle}
              value={formData.customerGoals}
              onChange={(e) => setFormData({ ...formData, customerGoals: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              9. What questions, doubts, or obstacles do customers usually have before choosing you? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <textarea
              required
              style={textareaStyle}
              value={formData.customerObstacles}
              onChange={(e) => setFormData({ ...formData, customerObstacles: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* SECTION 4 */}
      {step === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              10. How do people currently discover and interact with your business? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.6rem', marginTop: '0.8rem' }}>
              {[
                'Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'Google / Search',
                'Website', 'WhatsApp', 'Email', 'Physical location', 'Referrals / word of mouth',
                'Marketplace / third-party platform', 'Other'
              ].map((opt) => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.discoveryChannels.includes(opt)}
                    onChange={() => handleCheckbox('discoveryChannels', opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              10a. Anything else you'd like us to know about how customers currently find or contact you?
            </label>
            <textarea
              style={textareaStyle}
              value={formData.discoveryOtherText}
              onChange={(e) => setFormData({ ...formData, discoveryOtherText: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              11. What is working well today? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <textarea
              required
              style={textareaStyle}
              value={formData.workingWell}
              onChange={(e) => setFormData({ ...formData, workingWell: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              12. What isn't working, or feels harder than it should? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <textarea
              required
              style={textareaStyle}
              value={formData.notWorkingWell}
              onChange={(e) => setFormData({ ...formData, notWorkingWell: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* SECTION 5 */}
      {step === 5 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              13. If someone encountered your brand for the first time, what would you want them to feel? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <textarea
              required
              style={textareaStyle}
              value={formData.brandFeeling}
              onChange={(e) => setFormData({ ...formData, brandFeeling: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              14. What should the experience NOT feel like? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <textarea
              required
              style={textareaStyle}
              value={formData.brandAvoidFeeling}
              onChange={(e) => setFormData({ ...formData, brandAvoidFeeling: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              15. Are there brands, websites, products, artists, spaces, or other references that you love?
            </label>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
              Share links if you have them, and tell us what you like about each one.
            </p>
            <textarea
              style={textareaStyle}
              value={formData.brandReferences}
              onChange={(e) => setFormData({ ...formData, brandReferences: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* SECTION 6 */}
      {step === 6 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              16. What do you already have that we can work with? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.6rem', marginTop: '0.8rem' }}>
              {[
                'Logo / identity', 'Brand guidelines', 'Photography', 'Video',
                'Product images', 'Written content', 'Product / service information',
                'Existing website', 'Social media presence', 'Customer data / analytics',
                'Existing software or systems', 'Nothing yet', 'Other'
              ].map((opt) => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.existingAssets.includes(opt)}
                    onChange={() => handleCheckbox('existingAssets', opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              16a. If there's anything important you already have, tell us about it.
            </label>
            <textarea
              style={textareaStyle}
              value={formData.existingAssetsOtherText}
              onChange={(e) => setFormData({ ...formData, existingAssetsOtherText: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              17. Are there any requirements, limitations, or deadlines we should know about? <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
              Launch date, budget constraints, existing technology, integrations, approval process, etc.
            </p>
            <textarea
              required
              style={textareaStyle}
              value={formData.requirementsAndDeadlines}
              onChange={(e) => setFormData({ ...formData, requirementsAndDeadlines: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 400 }}>
              18. Is there anything else you think we should know before we start?
            </label>
            <textarea
              style={textareaStyle}
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
            />
          </div>
        </div>
      )}

      {errorMsg && (
        <p style={{ color: '#ff5555', fontSize: '0.8rem', marginTop: '1.25rem', fontFamily: 'var(--mono)' }}>
          ⚠ {errorMsg}
        </p>
      )}

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
        {step > 1 ? (
          <button type="button" onClick={() => { setErrorMsg(''); setStep(step - 1); }} style={secondaryButtonStyle}>
            ← Previous
          </button>
        ) : <div />}

        {step < 6 ? (
          <button type="button" onClick={handleNext} style={primaryButtonStyle}>
            Next Section →
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={loading} style={primaryButtonStyle}>
            {loading ? 'Submitting...' : 'Submit Discovery Questionnaire'}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function WorkWithMePage() {
  const [mounted, setMounted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const t = useTranslations('workWithMe')

  const problemList = (t.raw('problems') as string[]) || PROBLEMS
  const waysList = (t.raw('ways.items') as Array<{ tag: string; title: string; subtitle: string; includes: string[]; outcome: string }>) || WAYS
  const capabilityList = (t.raw('capabilities.items') as string[]) || CAPABILITIES
  const commitmentSteps = (t.raw('engagement.ladder') as Array<{ label: string; price: string }>) || COMMITMENT_LADDER
  const pricingList = (t.raw('engagement.pricing') as Array<{ eyebrow: string; title: string; description: string; price: string; idealFor: string[]; outcome: string; cta: string | { label: string; href: string } }>) || PRICING
  const processList = (t.raw('process.steps') as Array<{ step: string; description: string }>) || PROCESS
  const productList = (t.raw('products.items') as Array<{ name: string; description: string; status: string }>) || PRODUCTS
  const faqList = (t.raw('faqs.items') as Array<{ q: string; a: string }>) || FAQS

  useEffect(() => { setMounted(true) }, [])

  const fadeIn = (delay = 0): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  })

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100dvh', position: 'relative', zIndex: 10 }}>

      {/* Background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(rgba(200,240,74,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(200,240,74,0.02) 1px, transparent 1px)`,
        backgroundSize: '100px 100px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          color: 'var(--accent)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          ...fadeIn(0.1)
        }}>
          {t('eyebrow')}
        </p>

        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.75rem, 6.5vw, 5.5rem)',
          fontWeight: 300,
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          marginBottom: '2rem',
          maxWidth: '20ch',
          ...fadeIn(0.2)
        }}>
          {t('heroTitle')}
        </h1>

        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
          color: 'var(--text)',
          lineHeight: 1.6,
          fontWeight: 300,
          ...fadeIn(0.3)
        }}>
          {t('heroBody')}
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', ...fadeIn(0.4) }}>
          <a href="#discovery" style={primaryButtonStyle}>
            {t('primaryCta')}
          </a>
          <a href="https://cal.com/davidraigoza" target="_blank" rel="noopener noreferrer" style={secondaryButtonStyle}>
            {t('secondaryCta')}
          </a>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t('problem.label')}</Label>
        <SectionTitle>{t('problem.title')}</SectionTitle>

        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.95rem',
          color: 'var(--text)',
          fontWeight: 300,
          lineHeight: 1.7,
          maxWidth: '68ch',
          marginTop: '1.75rem',
        }}>
          {t('problem.body1')}
        </p>

        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.85rem',
          color: 'var(--muted)',
          fontWeight: 300,
          lineHeight: 1.7,
          maxWidth: '68ch',
          marginTop: '1rem',
        }}>
          {t('problem.body2')}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '0.5rem',
          marginTop: '2.5rem',
        }}>
          {problemList.map((p) => (
            <div key={p} style={{
              display: 'flex',
              gap: '0.75rem',
              padding: '1rem 0',
              borderTop: '1px solid var(--border)',
            }}>
              <span style={{ color: 'var(--accent)', flexShrink: 0 }}>—</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.55 }}>
                {p}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOUR WAYS TO WORK TOGETHER ──────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t('ways.label')}</Label>
        <SectionTitle>{t('ways.title')}</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {waysList.map((w) => (
            <div key={w.title} style={cardStyle}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)' }}>
                {w.tag}
              </span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', fontWeight: 400, margin: '0.5rem 0 0.6rem', color: 'var(--text)' }}>
                {w.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.55, fontWeight: 300, marginBottom: '1.25rem' }}>
                {w.subtitle}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem' }}>
                {w.includes.map((item) => (
                  <li key={item} style={{
                    fontSize: '0.8rem',
                    color: 'var(--text)',
                    fontWeight: 300,
                    padding: '0.5rem 0',
                    borderTop: '1px solid var(--border)',
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Outcome
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.5 }}>
                {w.outcome}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem, 6vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t('capabilities.label')}</Label>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 300, maxWidth: '55ch', marginBottom: '1.25rem' }}>
          {t('capabilities.intro')}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {capabilityList.map((c) => (
            <span key={c} style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.7rem',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              padding: '0.45rem 0.9rem',
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.02)',
            }}>
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ── PRICING / ENGAGEMENT MODELS ─────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t('engagement.label')}</Label>
        <SectionTitle>{t('engagement.title')}</SectionTitle>
        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.85rem',
          color: 'var(--muted)',
          fontWeight: 300,
          marginTop: '1rem',
          maxWidth: '60ch',
        }}>
          {t('engagement.body')}
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.6rem',
          marginTop: '2rem',
        }}>
          {commitmentSteps.map((step, i) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.15rem',
                border: '1px solid var(--border)',
                padding: '0.5rem 0.85rem',
                background: 'rgba(255,255,255,0.01)',
              }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text)', letterSpacing: '0.05em' }}>
                  {step.label}
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)' }}>
                  {step.price}
                </span>
              </div>
              {i < COMMITMENT_LADDER.length - 1 && (
                <span style={{ color: 'var(--accent)', fontSize: '0.85rem', flexShrink: 0 }}>→</span>
              )}
            </div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
          marginTop: '3rem',
        }}>
          {pricingList.map((m) => {
            const ctaLabel = typeof m.cta === 'string' ? m.cta : m.cta.label
            const ctaHref = typeof m.cta === 'string' ? '#discovery' : m.cta.href

            return (
              <div key={m.title} style={offerCardStyle}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                  {m.eyebrow}
                </p>

                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', fontWeight: 400, margin: '0 0 0.85rem', color: 'var(--text)' }}>
                  {m.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.55, marginBottom: '1.25rem', minHeight: '3.3rem' }}>
                  {m.description}
                </p>

                <p style={{ fontSize: '1.05rem', color: 'var(--text)', fontWeight: 300, marginBottom: '1.5rem' }}>
                  {m.price}
                </p>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.1rem', marginBottom: '1.1rem' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                    Ideal for
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {m.idealFor.map((item) => (
                      <li key={item} style={{ fontSize: '0.8rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.6 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.1rem', marginBottom: '1.5rem' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Outcome
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.5 }}>
                    {m.outcome}
                  </p>
                </div>

                <a
                  href={ctaHref}
                  target={ctaHref.startsWith('http') ? '_blank' : undefined}
                  rel={ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ ...secondaryButtonStyle, marginTop: 'auto', textAlign: 'center' }}
                >
                  {ctaLabel}
                </a>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t('process.label')}</Label>
        <SectionTitle>{t('process.title')}</SectionTitle>

        <div style={{ marginTop: '3rem', maxWidth: '640px' }}>
          {processList.map((p, i) => (
            <div key={p.step} style={{ display: 'flex', gap: '1.75rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '2rem' }}>
                <span style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  flexShrink: 0,
                }} />
                {i < PROCESS.length - 1 && (
                  <span style={{ width: '1px', flex: 1, background: 'var(--border)', minHeight: '3rem' }} />
                )}
              </div>
              <div style={{ paddingBottom: i < PROCESS.length - 1 ? '2rem' : 0 }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 400, margin: '0 0 0.4rem', color: 'var(--text)' }}>
                  {p.step}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6 }}>
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS I'M BUILDING ───────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t('products.label')}</Label>
        <SectionTitle>{t('products.title')}</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {productList.map((p) => (
            <div key={p.name} style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 400, margin: 0, color: 'var(--text)' }}>
                  {p.name}
                </h3>
                <span style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.6rem',
                  color: 'var(--accent)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: '1px solid var(--border)',
                  padding: '0.25rem 0.5rem',
                  whiteSpace: 'nowrap',
                }}>
                  {p.status}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLIENT DISCOVERY SECTION ────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t('discovery.label')}</Label>
        <SectionTitle>{t('discovery.title')}</SectionTitle>
        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.95rem',
          color: 'var(--muted)',
          fontWeight: 300,
          lineHeight: 1.6,
          maxWidth: '58ch',
          marginTop: '1rem',
          marginBottom: '2.5rem',
        }}>
          {t('discovery.body')}
        </p>

        <DiscoveryForm />
      </section>

      {/* ── FAQS ────────────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t('faqs.label')}</Label>
        <SectionTitle>{t('faqs.title')}</SectionTitle>

        <div style={{ marginTop: '3rem', maxWidth: '750px' }}>
          {faqList.map((faq, idx) => (
            <div key={faq.q} style={{ borderBottom: '1px solid var(--border)', padding: '1.25rem 0' }}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text)',
                  fontSize: '1rem',
                  fontWeight: 400,
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <span>{faq.q}</span>
                <span style={{ color: 'var(--accent)', marginLeft: '1rem' }}>
                  {openFaq === idx ? '−' : '+'}
                </span>
              </button>
              {openFaq === idx && (
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 300, marginTop: '0.75rem', lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}