'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const FIGMA_URL =
  'https://www.figma.com/design/vitqU8fVnqheh0gcxVjr4P/QIENeobank?node-id=0-1&t=eyZdLegUR4EbWgeY-1'
const LIVE_URL = 'https://qie-bank.vercel.app/'
const WALKTHROUGH_VIDEO_URL = '/work/qie/qie-walkthrough.mp4'

const CONTRACTS = [
  { name: 'QIEVault', spec: 'ERC-4626 Yield Vault', role: 'Manages deposits, withdrawals, and yield accrual' },
  { name: 'QIEIdentity', spec: 'Soulbound NFT', role: 'Establishes non-transferable on-chain identity' },
  { name: 'QIELending', spec: 'Lending Engine', role: 'Handles origination, repayments, collateral & health factor' },
  { name: 'CreditScore Engine', spec: 'Behavioral Scoring', role: 'Calculates 300–850 score using 5 weighted metrics' },
  { name: 'QIENeobank', spec: 'Protocol Orchestrator', role: 'Coordinates all contracts through a single banking interface' },
]

const SCORE_COMPONENTS = [
  { label: 'Repayment Accuracy', weight: '36.4%', note: 'Measures on-time loan repayments — highest weight' },
  { label: 'Deposit Volume', weight: '18.2%', note: 'Rewards long-term capital participation' },
  { label: 'Account Tenure', weight: '18.2%', note: 'Increases confidence through account history' },
  { label: 'Activity Frequency', weight: '18.2%', note: 'Encourages consistent protocol usage' },
  { label: 'Score Aging', weight: '9.1%', note: '7-day decay model prevents short-term manipulation' },
]

const LOAN_TIERS = [
  { tier: 'Bronze', score: '300–549', limit: '$1,000', apr: '25%' },
  { tier: 'Silver', score: '550–649', limit: '$5,000', apr: '18%' },
  { tier: 'Gold', score: '650–749', limit: '$20,000', apr: '12%' },
  { tier: 'Platinum', score: '750–850', limit: '$50,000', apr: '8%' },
]

const WHAT_IT_DOES = [
  { title: 'Behavioral Credit Score', detail: 'Generates a 300–850 credit score based on five weighted on-chain metrics.' },
  { title: 'Lending Dashboard', detail: 'Surfaces balances, borrowing power, loan exposure, health factor, and activity.' },
  { title: 'Loan Eligibility', detail: 'Calculates borrowing limits and interest rates dynamically according to behavioral score.' },
  { title: 'Tiered Lending System', detail: 'Supports four lending tiers, each with different borrowing limits and APRs.' },
  { title: 'Wallet Integration', detail: 'Users interact directly with deployed smart contracts through a familiar web application.' },
]

const HOW_WE_BUILT_IT = [
  { label: 'Smart Contract Architecture', description: 'Developed five interoperable Solidity contracts responsible for identity, vault management, lending, behavioral scoring, and protocol orchestration.' },
  { label: 'Behavioral Credit Engine', description: 'Designed a weighted scoring model that rewards long-term participation and responsible borrowing behavior instead of evaluating collateral alone.' },
  { label: 'Frontend Application', description: 'Built a responsive banking interface in Next.js using Wagmi and Viem for wallet connectivity and on-chain state management.' },
  { label: 'Wallet Experience', description: 'Integrated RainbowKit to simplify wallet onboarding while maintaining direct interaction with deployed contracts.' },
  { label: 'Security & Verification', description: 'Leveraged OpenZeppelin standards and Certora verification to improve contract reliability and adherence to established security practices.' },
]

const TECH_STACK = [
  'Solidity 0.8.24', 'OpenZeppelin', 'ERC-4626', 'Soulbound NFTs', 'Next.js', 'Wagmi', 'Viem', 'RainbowKit', 'Tailwind CSS', 'Figma', 'Certora'
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function QIENeobankCaseStudy() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const fadeIn = (delay = 0): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  })

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', position: 'relative' }}>

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
          Blockchain Protocol Design · Smart Contracts · Product UX
        </p>

        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(3rem, 7vw, 6.5rem)',
          fontWeight: 300,
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          marginBottom: '2rem',
          ...fadeIn(0.2)
        }}>
          QIE Neobank
          <br />
          <span style={{ fontStyle: 'italic', color: 'var(--text)', opacity: 0.9 }}>
            Designing trust for decentralized lending.
          </span>
        </h1>

        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
          color: 'var(--text)',
          maxWidth: '58ch',
          lineHeight: 1.6,
          fontWeight: 300,
          marginBottom: '2.5rem',
          ...fadeIn(0.3)
        }}>
          Built during the QIE Blockchain Hackathon, QIE Neobank explores how complex on-chain lending can become as intuitive as a traditional banking experience. The project combines smart contracts, behavioral credit scoring, and a modern financial interface to help users understand why they qualify for a loan, not just whether they do.
        </p>

        {/* Recognition Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          border: '1px solid var(--border)',
          background: 'rgba(255,255,255,0.02)',
          padding: '0.5rem 1rem',
          borderRadius: '2px',
          marginBottom: '2.5rem',
          ...fadeIn(0.35)
        }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Top 26 Project
          </span>
          <span style={{ color: 'var(--border)' }}>|</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>
            Selected out of 411 submissions
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', ...fadeIn(0.4) }}>
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--bg)',
              background: 'var(--text)',
              padding: '0.85rem 2rem',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            View Live App →
          </a>
          <a
            href={FIGMA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.65rem',
              color: 'var(--accent)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            View Figma Designs →
          </a>
        </div>
      </section>

      {/* ── CORE STRATEGY & PROBLEM ──────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: '4rem clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div>
          <Label>01 / The Challenge</Label>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', margin: '0.5rem 0 1rem', fontWeight: 300 }}>DeFi is transparent. Understanding it isn't.</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.65 }}>
            Most decentralized lending protocols expose users to collateral ratios, liquidation thresholds, vault mechanics, and smart contract interactions. While technically transparent, these systems often leave people wondering one simple question:
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--accent)', marginTop: '0.75rem', fontWeight: 400, fontStyle: 'italic' }}>
            "Why can I borrow this amount?"
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
            The challenge wasn't building another lending protocol. It was designing an experience that made complex financial logic understandable without hiding the blockchain mechanics that make the system trustworthy.
          </p>
        </div>

        <div>
          <Label>02 / The Solution</Label>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', margin: '0.5rem 0 1rem', fontWeight: 300 }}>A behavioral credit system instead of collateral alone.</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.65 }}>
            Rather than relying exclusively on collateral, QIE Neobank evaluates borrower behavior over time.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
            Five on-chain signals contribute to a dynamic credit score ranging from 300 to 850, directly influencing borrowing limits, loan tiers, and interest rates.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
            Instead of reading documentation or protocol specifications, users immediately understand what improves their financial reputation and borrowing power.
          </p>
        </div>
      </section>

      {/* ── WALKTHROUGH VIDEO ─────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <Label>Live Walkthrough</Label>
            <SectionTitle>Banking UX powered by smart contracts.</SectionTitle>
          </div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', maxWidth: '38ch', textAlign: 'right' }}>
            DEPLOYED ON QIE MAINNET · CONNECT WALLET TO INTERACT WITH CORE LENDING WORKFLOW.
          </p>
        </div>

        <div style={{
          position: 'relative',
          width: '100%',
          border: '1px solid var(--border)',
          background: '#0a0a0a',
          overflow: 'hidden',
          borderRadius: '4px',
        }}>
          <video
            controls
            playsInline
            preload="metadata"
            poster="/work/qie/qie-preview.png"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <source src={WALKTHROUGH_VIDEO_URL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* ── PRODUCT ARCHITECTURE ─────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>03 / Product Architecture</Label>
        <SectionTitle>Five smart contracts. One banking experience.</SectionTitle>
        <p style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: '60ch', marginTop: '1rem', fontWeight: 300 }}>
          The protocol is composed of specialized contracts that work together to provide lending, identity, and credit scoring through a single interface.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {CONTRACTS.map((c, i) => (
            <div key={c.name} style={{ border: '1px solid var(--border)', padding: '1.5rem', background: 'rgba(255,255,255,0.01)' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)' }}>0{i + 1} / {c.spec}</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 400, margin: '0.5rem 0', color: 'var(--text)' }}>{c.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, fontWeight: 300 }}>{c.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CREDIT SCORE COMPONENTS ────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>System Mechanics</Label>
        <SectionTitle>Credit Score Components</SectionTitle>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '60ch', marginTop: '1rem', fontWeight: 300 }}>
          The behavioral score is calculated from five weighted signals:
        </p>

        <div style={{ border: '1px solid var(--border)', marginTop: '2.5rem', overflow: 'hidden' }}>
          {SCORE_COMPONENTS.map((s, i) => (
            <div key={s.label} style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr 3fr',
              gap: '1.5rem',
              padding: '1.25rem 2rem',
              borderBottom: i < SCORE_COMPONENTS.length - 1 ? '1px solid var(--border)' : 'none',
              alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--text)' }}>
                {s.label}
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
                {s.weight}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 300 }}>
                {s.note}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIERED LENDING SYSTEM ────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>Risk Framework</Label>
        <SectionTitle>Tiered Lending System</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginTop: '2.5rem',
        }}>
          {LOAN_TIERS.map(t => (
            <div key={t.tier} style={{
              border: '1px solid var(--border)',
              padding: '1.75rem',
              background: 'rgba(255,255,255,0.01)',
              position: 'relative',
            }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {t.tier} Tier
              </p>
              <h4 style={{ fontFamily: 'var(--serif)', fontSize: '1.75rem', fontWeight: 300, margin: '0.5rem 0', color: 'var(--text)' }}>
                {t.limit}
              </h4>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text)', marginBottom: '0.25rem' }}>
                {t.apr} APR
              </p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>
                Score: {t.score}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DESIGN SYSTEM & PRODUCT VISION ───────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>Design System & Product Vision</Label>
        <SectionTitle>Designing consistency before features.</SectionTitle>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '65ch', marginTop: '1rem', lineHeight: 1.6, fontWeight: 300 }}>
          Before designing application screens, the project established a complete design system covering typography, spacing, semantic colors, component patterns, and interaction states. This foundation allowed complex financial information to remain visually consistent across dashboards, lending flows, and onboarding experiences.
        </p>

        <div style={{ marginTop: '3rem', border: '1px solid var(--border)', overflow: 'hidden', borderRadius: '4px' }}>
          <Image
            src="/work/qie/design-system.png"
            alt="QIE Neobank Design System"
            width={1300}
            height={700}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ marginTop: '4rem' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', color: 'var(--text)', fontWeight: 300, marginBottom: '1rem' }}>
            Beyond the hackathon prototype.
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '65ch', marginBottom: '2rem', fontWeight: 300, lineHeight: 1.6 }}>
            The deployed application demonstrates the working protocol. The accompanying Figma designs explore the broader product vision, including richer dashboards, credit explanations, lending flows, onboarding, and financial management features that extended beyond the hackathon timeline.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
            <div style={{ border: '1px solid var(--border)', overflow: 'hidden', borderRadius: '4px' }}>
              <Image
                src="/work/qie/dashboard.png"
                alt="QIE Neobank Dashboard Interface"
                width={650}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            {/* Right Card: Lending & Score */}
            <div style={{ 
              border: '1px solid var(--border)', 
              overflow: 'hidden', 
              borderRadius: '4px',
              alignSelf: 'start' // <--- Add this! Keeps it aligned to top without stretching empty height
            }}>
              <Image
                src="/work/qie/lending-score.png"
                alt="QIE Neobank Lending & Score Interface"
                width={650}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IT ACTUALLY DOES ────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>Protocol Capability</Label>
        <SectionTitle>What It Actually Does</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {WHAT_IT_DOES.map((item, idx) => (
            <div key={item.title} style={{ border: '1px solid var(--border)', padding: '1.5rem', background: 'rgba(255,255,255,0.01)' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)' }}>0{idx + 1}</span>
              <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 500, margin: '0.5rem 0', color: 'var(--text)' }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, fontWeight: 300 }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW WE BUILT IT ─────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>Full-Stack Execution</Label>
        <SectionTitle>How We Built It</SectionTitle>

        <div style={{ border: '1px solid var(--border)', marginTop: '2.5rem', overflow: 'hidden' }}>
          {HOW_WE_BUILT_IT.map((step, i) => (
            <div key={step.label} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '2rem',
              padding: '2rem',
              borderBottom: i < HOW_WE_BUILT_IT.length - 1 ? '1px solid var(--border)' : 'none',
              alignItems: 'start',
            }}>
              <div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  0{i + 1}
                </span>
                <p style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--text)', lineHeight: 1.3 }}>
                  {step.label}
                </p>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div style={{ marginTop: '3rem' }}>
          <Label>Technologies Used</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
            {TECH_STACK.map(tech => (
              <span key={tech} style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.65rem',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                padding: '0.35rem 0.75rem',
                borderRadius: '2px',
                background: 'rgba(255,255,255,0.02)',
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECOGNITION ────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>Recognition</Label>
        <SectionTitle>Top 26 of 411 hackathon submissions.</SectionTitle>
        <div style={{ maxWidth: '65ch', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.25rem' }}>
            Built during the QIE Blockchain Hackathon, the project was selected among the Top 26 submissions out of 411 teams, demonstrating both technical execution and product thinking under competitive time constraints.
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>
            Five smart contracts were deployed and verified on QIE Mainnet, providing a fully functional blockchain implementation beyond static prototypes.
          </p>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Ready to build products that make complex systems understandable?
        </p>

        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, color: 'var(--text)', marginBottom: '2.5rem', lineHeight: 1.05 }}>
          One Team. Zero Handoffs. Full-Stack Product Engineering.
        </h2>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/#contact"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--bg)',
              background: 'var(--text)',
              padding: '1rem 2.5rem',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'opacity 0.2s ease',
            }}
          >
            Start a Project →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <Link href="/" style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textDecoration: 'none' }}>
          ← Back to All Case Studies
        </Link>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
          © {new Date().getFullYear()} David Raigoza Studio
        </span>
      </footer>
    </main>
  )
}

// ─── SHARED HELPER COMPONENTS ──────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--mono)',
      fontSize: '0.65rem',
      color: 'var(--accent)',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      marginBottom: '0.75rem',
    }}>
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'var(--serif)',
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 300,
      color: 'var(--text)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    }}>
      {children}
    </h2>
  )
}