import type { Metadata } from 'next'
import Link from 'next/link'
import { ALL_PROJECTS, getProject } from '../../../data/projects'
import { notFound } from 'next/navigation'

const locales = ['en', 'es'] as const

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

// 1. Tell Next.js exactly what routes exist at build time for 100% SEO indexability
export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    Object.keys(ALL_PROJECTS).map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getProject(slug, locale)

  if (!project) return {}

  return {
    title: `${project.title} — David Raigoza`,
    description: project.subtitle,
    alternates: {
      canonical: `https://davidraigoza.design/${locale}/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — David Raigoza`,
      description: project.subtitle,
      url: `https://davidraigoza.design/${locale}/work/${project.slug}`,
      type: 'article',
    },
  }
}

// 2. Render normal, static, crawlable semantic HTML
export default async function WorkPage({ params }: Props) {
  const { locale, slug } = await params
  const project = getProject(slug, locale)

  if (!project) notFound()

  return (
    <main style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{project.title}</h1>
      <p className="subtitle">{project.subtitle}</p>
      <div className="tags">{project.tags.join(', ')}</div>
      
      <article>
        <h2>Project Overview</h2>
        <p>{project.overview || project.fullDescription}</p>

        {project.challenges?.length ? (
          <>
            <h2>Challenges</h2>
            <ul>{project.challenges.map((challenge) => <li key={challenge}>{challenge}</li>)}</ul>
          </>
        ) : null}

        {project.results?.length ? (
          <>
            <h2>Results</h2>
            <ul>{project.results.map((result) => <li key={result}>{result}</li>)}</ul>
          </>
        ) : null}
        
        <h2>Technical Architecture</h2>
        <p>{project.technicalBreakdown}</p>
      </article>

      <Link href={`/${locale}/work`}>← Back to All Projects</Link>
    </main>
  )
}