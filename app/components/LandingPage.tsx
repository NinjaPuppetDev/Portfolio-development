'use client'

import { useTranslations } from 'next-intl'
import HeroSection from './HeroSection'
import ProjectHorizontalTrack, { TrackSection } from './ProjectHorizontalTrack'
import type { ProjectCardProps } from './ProjectCard'
import ContactForm from './ContactForm'
import EssaySection from './EssaySection'
import TechStackBanner from './TechStackBanner'
import WhyOnePartner from './WhyOnePartner'
import Labs from './Labs'

// ── PROJECT TRACKS (unchanged content, metadata, tags, links, chronology) ─────

// Track 01: Rapid Validation & AI-Driven Products
const productProjects: ProjectCardProps[] = [
  {
    index: '01',
    year: '2026',
    title: 'Virtual Portfolio Hub',
    subtitle: 'An AI-powered portfolio that turns a static showcase into an interactive conversation.',
    tags: ['Next.js', 'Google AI', 'Tailwind CSS', 'UX Architecture'],
    description:
      'An interactive portfolio that turns project work into a searchable professional profile.',
    link: 'work/virtual-portfolio-hub',
    linkLabel: 'View case study',
    accent: 'var(--accent)',
    variant: 'product' as const,
    image: '/work/virtual-portfolio-hub/hub-preview.png',
  },
{
    index: '02',
    year: '2026',
    title: 'Common Ground',
    subtitle: 'Building a shared operational space for seamless alignment and real-time collaboration.',
    tags: ['Product Architecture', 'Next.js', 'Supabase', 'UX Architecture'],
    description:
      'A real-time workspace designed to align teams, information, and decisions in one place.',
    link: '/work/common-ground',
    linkLabel: 'View case study',
    accent: 'var(--accent)',
    variant: 'product' as const,
    image: '/work/common-ground/common-ground-preview.png',
  },
]

// Track 02: Friction-Free Financial Systems
const web3Projects: ProjectCardProps[] = [
  {
    index: '03',
    year: '2026',
    title: 'QIE Neobank',
    subtitle: 'Making decentralized finance feel understandable before it asks for trust.',
    tags: ['Product Design', 'UX Architecture', 'Solidity', 'Next.js'],
    description:
      'A DeFi banking experience that translates protocol complexity into a clearer product layer.',
    link: '/work/qie-neobank',
    linkLabel: 'View case study',
    accent: 'var(--accent)',
    variant: 'web3' as const,
    image: '/work/qie/qie-preview.png',
  },
  {
    index: '04',
    year: '2026',
    title: 'Bruma Protocol',
    subtitle: 'Making complex on-chain risk states understandable while markets move.',
    tags: ['UX Design', 'State Management', 'Solidity', 'Chainlink Oracles'],
    description:
      'An interface that translates smart-contract and oracle states into actionable signals.',
    link: '/work/bruma-protocol',
    linkLabel: 'View protocol',
    accent: 'var(--accent)',
    variant: 'web3' as const,
    image: '/work/bruma/pool-overview.png',
  },
]

// Track 03: Digital Experiences for Physical Products
const brandProjects: ProjectCardProps[] = [
  {
    index: '05',
    year: '2011–2016',
    title: 'Pepe Matilda',
    subtitle: 'Designing the connection between a physical product and the digital experience around it.',
    tags: ['Industrial Design', 'Lápiz de Acero', 'Brand Systems', 'E-commerce UI'],
    description:
      "A jewelry brand connecting custom manufacturing, product design, e-commerce, and brand systems.",
    link: '/work/pepe-matilda',
    linkLabel: 'View project',
    accent: 'var(--amber)',
    variant: 'brand' as const,
    image: '/work/pepe-matilda/PepeMatilda.png',
  },
  {
    index: '06',
    year: '2024',
    title: 'NextStep',
    subtitle: 'Exploring what happens when a shoe becomes a digital product.',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    description:
      'A 3D-printed footwear concept exploring customization through digital product design.',
    link: '/work/next-step',
    linkLabel: 'View case study',
    accent: 'var(--amber)',
    variant: 'brand' as const,
    image: '/work/nextstep/NextStep.png',
  },
  {
    index: '07',
    year: '2024',
    title: 'Marigold Bloom',
    subtitle: 'Building a digital ritual around a physical skincare product.',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    description:
      'A cosmetics concept connecting visual identity, product storytelling, and digital interaction.',
    link: '/work/marigold-bloom',
    linkLabel: 'View case study',
    accent: 'var(--amber)',
    variant: 'brand' as const,
    image: '/work/marigold/Marigold.png',
  },
  {
    index: '08',
    year: '2026',
    title: 'GitHub Core',
    subtitle: 'The code behind the systems, not just the screenshots.',
    tags: ['Solidity', 'Next.js', 'Smart Contracts', 'Web3'],
    description:
      'An open repository making the architecture behind selected projects inspectable.',
    link: 'https://github.com/NinjaPuppetDev',
    linkLabel: 'View on GitHub',
    accent: 'var(--accent)',
    variant: 'web3' as const,
    image: '/work/github/github-preview.png',
  },
]

const tracks: TrackSection[] = [
  {
    number: '01',
    title: 'Rapid Validation & AI-Driven Products',
    question: 'How do we reduce uncertainty before people commit?',
    support: 'Credentials reveal where someone has been. These projects reveal what can be built today.',
    accent: 'var(--accent)',
    projects: productProjects,
  },
  {
    number: '02',
    title: 'Friction-Free Financial Systems',
    question: 'How do strangers learn to trust complex financial systems?',
    support: 'Translating the strengths of institutions and code into products ordinary people can actually use.',
    accent: 'var(--accent)',
    projects: web3Projects,
  },
  {
    number: '03',
    title: 'Digital Experiences for Physical Products',
    question: 'How can craftsmanship survive the transition into digital experiences?',
    support: 'Preserving the character of a physical product instead of reducing it to a transaction.',
    accent: 'var(--amber)',
    projects: brandProjects,
  },
]

// ── LANDING PAGE MAIN COMPONENT ────────────────────────────────────────────
export default function LandingPage() {
  const t = useTranslations('home')

  const localizedTracks = t.raw('selectedWork.tracks') as Array<{
    number: string
    title: string
    question: string
    support: string
  }>
  const localizedProjects = t.raw('selectedWork.projects') as Array<{
    index: string
    title: string
    subtitle: string
    description: string
    linkLabel: string
  }>

  const translatedProjects = (projects: ProjectCardProps[]) => projects.map((project) => {
    const translation = localizedProjects.find((item) => item.index === project.index)
    return translation ? { ...project, ...translation } : project
  })

  const translatedTracks = tracks.map((track) => {
    const translation = localizedTracks.find((item) => item.number === track.number)
    const projects = track.number === '01'
      ? translatedProjects(productProjects)
      : track.number === '02'
        ? translatedProjects(web3Projects)
        : translatedProjects(brandProjects)

    return translation ? { ...track, ...translation, projects } : { ...track, projects }
  })

  return (
    <main
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg)',
        minHeight: '100dvh',
        zIndex: 10,
      }}
    >
      {/* Solid gradient mask matching global background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '220px',
          background: 'linear-gradient(180deg, var(--bg) 0%, rgba(8, 8, 8, 0.7) 60%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Subsurface ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '-180px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1300px',
          height: '450px',
          background:
            'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 60%, transparent 100%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <HeroSection />
      <TechStackBanner />
      <WhyOnePartner />

      {/* ── SELECTED WORK ──────────────────────────────────────────────── */}
      <section
        id="work"
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Header */}
        <div
          style={{
            padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem) 2rem',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              borderBottom: '1px solid var(--border)',
              paddingBottom: '2.5rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text)',
                marginBottom: '1.25rem',
              }}
            >
              {t('selectedWork.title')}
            </h2>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                color: 'var(--text)',
                lineHeight: 1.6,
                maxWidth: '60ch',
                fontWeight: 300,
              }}
            >
              {t('selectedWork.intro1')}
              <br />
              <br />
              {t('selectedWork.intro2')}
            </p>
          </div>
        </div>

        {/* Vertical scroll runway -> Sticky viewing frame -> Horizontal project track */}
        <ProjectHorizontalTrack tracks={translatedTracks} />
      </section>

      <Labs />

      {/* ── CONVERSIONS (CONTACT) ─────────────────────────────────────── */}
      <section
        id="contact-form"
        style={{
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(200,240,74,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '4rem',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.65rem',
                color: 'var(--accent)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              {t('contact.eyebrow')}
            </p>
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.05,
                marginBottom: '1.5rem',
              }}
            >
              {t('contact.heading1')}
              <br />
              {t('contact.heading2')}
            </h2>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '0.875rem',
                color: 'var(--muted)',
                lineHeight: 1.75,
                maxWidth: '36ch',
              }}
            >
              {t('contact.body')}
            </p>
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.6rem',
                color: 'var(--muted)',
                letterSpacing: '0.1em',
                marginTop: '1.5rem',
                opacity: 0.6,
              }}
            >
              raigoza.david.j@gmail.com
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <EssaySection />
    </main>
  )
}