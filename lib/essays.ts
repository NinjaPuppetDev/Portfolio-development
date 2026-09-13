export interface Essay {
  slug: string
  title: string
  dek: string
  date: string           // ISO, e.g. '2026-06-24'
  displayDate: string    // e.g. 'Jun 24, 2026'
  mediumUrl?: string      // set once imported to Medium with canonical pointed back here
  // Full essay body in Markdown. Paste your original text here — nothing
  // is pre-filled from Medium to avoid reproducing published text.
  body: string
  locales?: Partial<Record<'en' | 'es', Partial<Omit<Essay, 'locales'>>>>
}

export const essays: Essay[] = [
  {
    slug: 'i-thought-i-was-building-a-chatbot',
    title: 'I Thought I Was Building a Chatbot. I Ended Up Replacing Navigation.',
    dek: 'Menus are an answer to a problem we stopped questioning.',
    date: '2026-06-24',
    displayDate: 'Jun 24, 2026',
    mediumUrl: undefined,
    body: `
Menus are an answer to a problem we stopped questioning.

You land on a website and immediately have to learn its logic. Where they put things, what they decided to call things, how deep the rabbit hole goes before you find what you actually came for. The website makes you do the work.

I wasn’t trying to reinvent navigation. I was trying to finish my personal portfolio so I could stop doomscrolling. But somewhere between adding an AI chatbot that hallucinated experiences I don’t have and testing it with real people, something clicked.

The problem was never information. Websites have always had plenty of that. The problem is that we still navigate them like it’s 2005, clicking through menus someone else designed, learning someone else’s logic. AI doesn’t fix that by answering questions. It fixes it by becoming the guide.

---

### The Obvious First Attempt

So I built the obvious thing first. A chatbot. Got a Groq API key, added a route, fed it my resume, and told myself it was done.

It wasn’t done.

I sent the portfolio to some friends and my girlfriend and stood behind them watching. This is something I’d recommend to anyone building anything: **Don’t ask for feedback. Just watch.**

They asked the AI whatever they wanted, and at some point they stopped asking about me entirely. One of them asked if I could build a plastic recycling system. The chatbot said yes. It connected a microcasting process for silver jewelry to plastics and invented a solution I have never thought of and definitely cannot build.

Technically impressive. Completely useless.

The hallucinations weren’t the real problem though. I could tune the temperature, tighten the prompt, and add guardrails. What I couldn’t fix was the fundamental thing I had built: **a chatbot that sat there waiting to be asked questions.** That’s not an agent. That’s a FAQ page with a personality.

---

### From Answering Questions to Operating the Interface

I went back to the question I should have started with: *What does a recruiter or founder actually need when they land on a portfolio?* 

They don’t need answers. They need a path. They have two minutes, maybe less, and 200 other tabs open. They need someone to say: *here, this is what matters, let me show you.*

Instead of giving the model more context, I gave it more agency. I exposed my Next.js router and project schemas as tools. The model could now open projects, trigger guided tours, and move visitors through the portfolio. It wasn’t generating descriptions anymore. It was operating the interface.

That’s when it stopped being a chatbot.

---

### Replacing the Assumption of Learning UI

Here’s what I think is actually happening.

Menus exist because websites couldn’t know who you were or what you needed. So they built a map and made you navigate it. That was a reasonable solution in 1999. We just never stopped using it.

AI changes the premise. Not because it can answer questions—there are a thousand tools that can answer questions—but because it can understand context and act on it. That’s a different thing entirely. That’s the difference between a sign and a person who walks you there.

What I built is small. A portfolio with a guide instead of a nav bar. But the pattern scales:

* **Onboarding flows** that route themselves based on your role.
* **Documentation** that asks what you’re trying to do before showing you anything.
* **E-commerce** that doesn’t make you navigate categories and filters—you describe what you want, and it takes you directly to the solution.

We’re not replacing interfaces. We’re replacing the assumption that users should have to learn them.

I thought I was building a portfolio assistant. What I actually built was an argument against menus. Whether that’s the future of websites or just an interesting experiment, I don’t know yet. But I think we’re about to find out.
    `.trim(),
  },
  {
    slug: 'introducing-agentic-interfaces',
    title: 'How do we introduce agentic interfaces without abandoning the interaction patterns people already know?',
    dek: 'It’s not just the brand of milk, it’s the preference.',
    date: '2026-07-01',
    displayDate: 'Jul 01, 2026',
    mediumUrl: undefined,
    body: `
It’s not just the brand of milk, it’s the preference.

That sounds like it was lifted straight out of a textbook on consumer behavior. We could spend hours digging into the cognitive science of why people prefer what they prefer, but the truth is usually simpler and more environmental than that.

Take coffee. I remember a university professor sharing a case study about how, decades ago, companies had to systematically teach Japanese consumers to drink coffee. They had to cultivate a taste from absolute zero. Growing up in Colombia, I didn’t need a case study. I grew up with the physical smell of coffee permeating the morning air. You eventually acquire a taste for something that, on paper, isn’t actually that tasty. It’s bitter. It’s learned.

We can extend that exact thought to product design.

In 2005, the internet forced us to learn digital menus and navbars. It felt clunky then, but over two decades that structural scaffolding became a universal taste. We acquired it. It became our spatial memory.

Right now we’re being told to acquire a new taste: artificial intelligence. But look at most websites trying to integrate AI today, and interacting with them is a real pain. Designers are frantically stripping away the scrolling, the visual cards, the navigation, and replacing all of it with a stark, empty chatbox.

If I did that on my own portfolio, it would be a nightmare. It demands too much cognitive load from a human who just wants to see what I build.

So when I launched a new portfolio domain eight days ago, I deliberately kept both. You still get the navbar, the cards, the standard scrolling layout, but an AI agent is tightly integrated right alongside them. I kept the scaffolding because humans rely on what they’ve already learned to love. Balance, harmony, logos, none of this is innate. It was all learned.

I’ve watched Contra do the same thing. They added an agent that helps you draft your profile, build out services, even maintain your site for you. But they didn’t touch the rest of the site. The navbar’s still there, the post feed is still there, the whole scaffolding is untouched. They didn’t drop it for the agent. They put the agent next to it.

Right now, the way we connect with our projects is fracturing because we’re forcing users to drink a bitter interface with no training wheels.

---

### Agentic Websites: The Mechanics of the Funnel

A product can’t live purely on the builder’s desire. Any milk brand has its name because of a thousand different environmental factors, and it takes real, consistent effort to deliver content that appeals to the exact people you want to reach. If I want to reach UX/UI designers, I have to talk about the real, messy problems they face.

But there’s a deeper mechanical issue underneath that: websites don’t exist alone in a vacuum. They only exist because marketing funnels drive users there. Once a user arrives, it’s the designer’s job to make sure they interact with the things we want them to interact with, smoothly, without friction.

I’ve been tracking this closely. Over the eight days since launching my new site, when I check the telemetry, the behavioral pattern is plain. Some visitors arrive, show deep curiosity, and stay. Others click, hit a micro-moment of friction, and leave immediately.

That immediate bounce is the breaking point of the modern funnel. When you replace an intuitive, visual layout with a blank text input, you break the user’s momentum. If someone has to guess what to type just to figure out what a company or a product does, the funnel fails. The taste is too bitter, and they walk away.

This is the core challenge of agentic websites: **how do you keep the user engaged without demanding they acquire a taste on the spot?**

The old way left users entirely on their own, clicking through static pages. The immediate next step is an AI that optimizes for and actively frontruns the user’s wants, predicting the interface changes they need before they realize they need them.

The future of product design isn’t about choosing between human familiarity and machine intelligence. It’s about building hybrid architectures that respect the tastes we’ve already acquired, while figuring out what we’re going to learn to love next.

That question is bigger than interface design though. If the taste itself is learned, what happens once the thing doing the teaching is the website itself, not a designer, not a marketer, but the site watching its own visitors and deciding what to say next?
    `.trim(),
  },
]

export function getEssay(slug: string, locale: string = 'en') {
  const essay = essays.find(e => e.slug === slug)
  if (!essay) return undefined

  const localizedEssay = essay.locales?.[locale as 'en' | 'es']
  return localizedEssay ? { ...essay, ...localizedEssay } : essay
}