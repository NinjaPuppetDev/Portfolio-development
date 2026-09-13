'use client'

import { useVeraMode } from '../../hooks/useVeraMode'

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  useVeraMode('dock')
  return <>{children}</>
}
