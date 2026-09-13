'use client'

import {
  SiNextdotjs,
  SiSupabase,
  SiFirebase,
  SiFigma,
  SiGoogle,
  SiSquarespace,
  SiSolidity,
  SiStripe,
  SiVitest,
} from 'react-icons/si'
import { useTranslations } from 'next-intl'
import type { IconType } from 'react-icons'

interface StackItem {
  name: string
  Icon?: IconType
}

const stack: StackItem[] = [
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'Stripe', Icon: SiStripe },
  { name: 'Solidity', Icon: SiSolidity },
  { name: 'Supabase', Icon: SiSupabase },
  { name: 'Firebase', Icon: SiFirebase },
  { name: 'Vitest', Icon: SiVitest },
  { name: 'Figma', Icon: SiFigma },
  { name: 'Google Stitch', Icon: SiGoogle },
  { name: 'Squarespace', Icon: SiSquarespace },
]

// Duplicated once for a seamless infinite loop.
const track = [...stack, ...stack]

export default function TechStackBanner() {
  const t = useTranslations('home')

  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '1.1rem 0',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.6rem',
          color: 'var(--accent)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          flexShrink: 0,
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          borderRight: '1px solid var(--border)',
          whiteSpace: 'nowrap',
        }}
      >
        {t('stackLabel')}
      </span>

      <div
        style={{
          overflow: 'hidden',
          width: '100%',
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'stack-marquee 30s linear infinite',
            willChange: 'transform',
          }}
        >
          {track.map(({ name, Icon }, i) => (
            <div
              key={`${name}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap',
                opacity: 0.75,
                marginRight: '3rem',
              }}
            >
              {Icon && <Icon size={14} color="var(--muted)" />}
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.7rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.05em',
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes stack-marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        div:hover > div[style*='animation'] {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}