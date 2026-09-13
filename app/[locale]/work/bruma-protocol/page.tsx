'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const LIVE_URL = 'https://bruma-protocol.vercel.app/'
const WALKTHROUGH_VIDEO_URL = '/work/bruma/bruma.mp4'

const WORKFLOW_LAYERS = [
  { name: 'Chainlink Functions', spec: 'Oracle Layer', role: 'Prices premiums and settles positions by fetching and computing rainfall data on-chain' },
  { name: 'Chainlink Automation', spec: 'Automation Layer', role: 'Keepers monitor option expiry and trigger settlement — no claims process, no manual step' },
  { name: 'Chainlink CRE', spec: 'Workflow Layer', role: 'Vault Risk Guardian fetches 7-day forecasts and tightens utilization limits ahead of adverse rainfall' },
  { name: 'ERC-721 Position NFT', spec: 'Asset Layer', role: 'Every position is a transferable, self-custodied token — full ownership, no intermediary' },
  { name: 'ERC-4626 Vault', spec: 'Liquidity Layer', role: 'Standard vault with virtual share offset; 80% max utilization, 20% per-location cap' },
  { name: 'Pull Payment Pattern', spec: 'Security', role: 'CEI-pattern settlement with manual claim fallback if an auto-transfer fails' },
]

const HOW_IT_WORKS = [
  { label: 'Define the index', description: 'Choose location, observation window, strike rainfall in millimeters, spread, and Call or Put. The protocol takes no position on why you\u2019re entering the trade.' },
  { label: 'Receive a Chainlink-priced quote', description: 'Chainlink Functions computes a fair premium from 10 years of historical rainfall data for the exact coordinates. Pricing is deterministic — no human sets it, and the quote holds for one hour.' },
  { label: 'Pay the premium, hold the position', description: 'The position mints as an ERC-721 NFT. Collateral locks in the ERC-4626 vault at a maximum 80% utilization rate, with a 20% cap per location.' },
  { label: 'Settlement runs on its own', description: 'At expiry, Chainlink Automation fetches the actual rainfall reading and transfers the payout if the index condition is met. No adjuster, no claims form — the oracle decides.' },
]

const INSTRUMENTS = [
  { title: 'Call Option', tag: 'Long Rainfall', detail: 'Pays out when oracle-reported rainfall exceeds the strike during the observation window, scaling linearly up to the spread cap. Built for exposure to excess rainfall — harvest operations, event venues, infrastructure.' },
  { title: 'Put Option', tag: 'Short Rainfall', detail: 'Pays out when oracle-reported rainfall falls below the strike, scaling down to the spread cap. Built for exposure to dry conditions — irrigated farms, seasonal tourism, water-dependent production.' },
  { title: 'Liquidity Pool', tag: 'Risk Counterparty', detail: 'Depositors act as the counterparty to option buyers and earn a share of every premium collected, governed by the same utilization and per-location caps that protect the vault.' },
]

const HOW_WE_BUILT_IT = [
  { label: 'Parametric Pricing Engine', description: 'Chainlink Functions computes premiums from a decade of historical rainfall data at the moment of quote, so no party sets the price by hand.' },
  { label: 'Three-Workflow Orchestration', description: 'Settlement, a Vault Risk Guardian, and a Reinsurance Pool Monitor run as independent Chainlink CRE and Automation workflows, each on its own schedule.' },
  { label: 'Vault & Collateral Design', description: 'An ERC-4626 vault with virtual share offset protection backs every open position, capped at 80% utilization and 20% per location to keep the protocol solvent.' },
  { label: 'Position Ownership', description: 'Every option mints as an ERC-721 NFT — fully on-chain, self-custodied, and transferable, with transfers locked during the settlement window to prevent front-running.' },
  { label: 'Frontend Application', description: 'Built a full protocol console in Next.js — Create, Options, Pool, and Workflow views — for pricing positions, managing liquidity, and monitoring live automation runs.' },
]

const TECH_STACK = [
  'Solidity', 'Chainlink Functions', 'Chainlink Automation', 'Chainlink CRE', 'ERC-4626', 'ERC-721', 'Next.js', 'Wagmi', 'Viem', 'Ethereum Sepolia', 'Avalanche Fuji',
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function BrumaProtocolCaseStudy() {
  const locale = useLocale()
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
          Parametric Rainfall Derivatives · Smart Contracts · Product UX
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
          Bruma Protocol
          <br />
          <span style={{ fontStyle: 'italic', color: 'var(--text)', opacity: 0.9 }}>
            Price the rain. Transfer the risk.
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
          Built for the Chainlink Convergence hackathon in Medell&iacute;n, Bruma turns rainfall &mdash; the oldest unpriced risk in agriculture and outdoor business &mdash; into a structured financial position. Priced by Chainlink oracles against a decade of historical data, settled automatically, owned as an NFT. No counterparty negotiations, no intermediaries.
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
            Chainlink Convergence
          </span>
          <span style={{ color: 'var(--border)' }}>|</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>
            Medell&iacute;n, Colombia · 2026
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
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', margin: '0.5rem 0 1rem', fontWeight: 300 }}>Rainfall is the oldest risk nobody prices.</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.65 }}>
            Farmers, event operators, and anyone running an outdoor business absorb weather risk every season with no structured way to hedge it. Institutional weather derivatives exist, but they were never built for an individual operator.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--accent)', marginTop: '0.75rem', fontWeight: 400, fontStyle: 'italic' }}>
            The idea came from a conversation with a woman in Medell&iacute;n who checked the weather every morning &mdash; not as a ritual, but as a necessity.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
            The challenge wasn&rsquo;t building another DeFi protocol. It was turning that daily act of reading the sky into a financial instrument &mdash; priced transparently, with no intermediary standing between the risk and the person carrying it.
          </p>
        </div>

        <div>
          <Label>02 / The Solution</Label>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', margin: '0.5rem 0 1rem', fontWeight: 300 }}>An index, not an insurance claim.</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.65 }}>
            Bruma structures rainfall as a bilateral index contract instead of a policy. A Call or Put settles purely on what a Chainlink oracle reports against a chosen strike &mdash; never on an assessment of actual loss.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
            A buyer may be hedging real exposure, or simply taking a financial position on rainfall. The protocol doesn&rsquo;t distinguish between the two &mdash; it only reads the index.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
            Pricing, settlement, and payout all run through Chainlink Functions and Automation, so no one &mdash; including the protocol&rsquo;s own builder &mdash; holds discretion over the outcome.
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
            <SectionTitle>An index priced, held, and settled on-chain.</SectionTitle>
          </div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', maxWidth: '38ch', textAlign: 'right' }}>
            DEPLOYED ON ETHEREUM SEPOLIA & AVALANCHE FUJI · CONNECT WALLET TO PRICE A POSITION.
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
            poster="/work/bruma/pool-overview.png"
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
        <SectionTitle>Six layers. One verifiable settlement.</SectionTitle>
        <p style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: '60ch', marginTop: '1rem', fontWeight: 300 }}>
          Pricing, automation, and custody are split across independent layers so no single party &mdash; oracle, vault, or builder &mdash; can move an outcome alone.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {WORKFLOW_LAYERS.map((c, i) => (
            <div key={c.name} style={{ border: '1px solid var(--border)', padding: '1.5rem', background: 'rgba(255,255,255,0.01)' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)' }}>0{i + 1} / {c.spec}</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 400, margin: '0.5rem 0', color: 'var(--text)' }}>{c.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, fontWeight: 300 }}>{c.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>System Mechanics</Label>
        <SectionTitle>Four steps from exposure to position</SectionTitle>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '60ch', marginTop: '1rem', fontWeight: 300 }}>
          Fully automated via Chainlink Functions and Automation. Settlement is determined by oracle data, not by any assessment of actual loss.
        </p>

        <div style={{ border: '1px solid var(--border)', marginTop: '2.5rem', overflow: 'hidden' }}>
          {HOW_IT_WORKS.map((s, i) => (
            <div key={s.label} style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 3fr',
              gap: '1.5rem',
              padding: '1.25rem 2rem',
              borderBottom: i < HOW_IT_WORKS.length - 1 ? '1px solid var(--border)' : 'none',
              alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--text)' }}>
                {i + 1}. {s.label}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 300 }}>
                {s.description}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── INSTRUMENTS ──────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>Risk Framework</Label>
        <SectionTitle>Two instruments, one liquidity pool.</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginTop: '2.5rem',
        }}>
          {INSTRUMENTS.map(t => (
            <div key={t.title} style={{
              border: '1px solid var(--border)',
              padding: '1.75rem',
              background: 'rgba(255,255,255,0.01)',
              position: 'relative',
            }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {t.tag}
              </p>
              <h4 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 300, margin: '0.5rem 0 0.75rem', color: 'var(--text)' }}>
                {t.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>
                {t.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROTOCOL CONSOLE ─────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>Product Console</Label>
        <SectionTitle>Every position, priced and monitored in one place.</SectionTitle>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '65ch', marginTop: '1rem', lineHeight: 1.6, fontWeight: 300 }}>
          The console covers the full lifecycle of a position &mdash; from choosing a location and strike, to watching the historical rainfall context behind a quote, to tracking vault health and the automation runs that settle it.
        </p>

        <div style={{ marginTop: '3rem', border: '1px solid var(--border)', overflow: 'hidden', borderRadius: '4px' }}>
          <Image
            src="/work/bruma/create-protection.png"
            alt="Bruma Protocol — Create weather protection screen"
            width={1300}
            height={700}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ marginTop: '1.5rem', border: '1px solid var(--border)', overflow: 'hidden', borderRadius: '4px' }}>
          <Image
            src="/work/bruma/option-pricing.png"
            alt="Bruma Protocol — Option parameters and historical rainfall context"
            width={1300}
            height={700}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ marginTop: '4rem' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', color: 'var(--text)', fontWeight: 300, marginBottom: '1rem' }}>
            The machinery behind settlement, made visible.
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '65ch', marginBottom: '2rem', fontWeight: 300, lineHeight: 1.6 }}>
            A Pool view tracks vault TVL, utilization, and liquidity provider positions. A Workflow view surfaces the same three automation runs &mdash; settlement, vault risk guardian, reinsurance pool monitor &mdash; that operate the protocol on-chain, with a live execution log.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
            <div style={{ border: '1px solid var(--border)', overflow: 'hidden', borderRadius: '4px' }}>
              <Image
                src="/work/bruma/pool-overview.png"
                alt="Bruma Protocol — Vault and liquidity pool overview"
                width={650}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div style={{ border: '1px solid var(--border)', overflow: 'hidden', borderRadius: '4px', alignSelf: 'start' }}>
              <Image
                src="/work/bruma/workflow-monitor.png"
                alt="Bruma Protocol — Workflow monitor and execution log"
                width={650}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
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
        <SectionTitle>Built for the Chainlink Convergence.</SectionTitle>
        <div style={{ maxWidth: '65ch', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.25rem' }}>
            Bruma Protocol was conceived, designed, and built solo over an intense sprint for the Chainlink Convergence hackathon in Medell&iacute;n &mdash; with a little help from AI companions across architecture, interface, and code.
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>
            The protocol is designed to be autonomous: admin keys move to a timelock before any mainnet deployment, so the builder retains no ongoing discretion over settlement, pricing, or payouts &mdash; only the oracle and the vault parameters govern outcomes.
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
        <Link href={`/${locale}`} style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textDecoration: 'none' }}>
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