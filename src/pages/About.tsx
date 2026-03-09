import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    year: '2024 — Present',
    role: 'Frontend Developer',
    company: 'PT Bank CIMB Niaga Tbk',
    description:
      'Building an internal HR application to support employee needs and benefits across CIMB Niaga.',
  },
  {
    year: '2023 — Present',
    role: 'Fullstack Developer',
    company: 'Freelance',
    description:
      'Taking on client projects end to end — from scoping and design to development and delivery.',
  },
  {
    year: '2023',
    role: 'Low Code Developer',
    company: 'PT Bank Central Asia Tbk',
    description:
      'Developed a budgeting design application for multiple divisions at BCA using the OutSystems low-code platform.',
  },
]

const interests = [
  {
    title: 'Frontend Craft',
    description:
      'I obsess over the details — transitions, spacing, micro-interactions. The difference between good and great is usually invisible.',
  },
  {
    title: 'Photography',
    description:
      'I shoot with intention — every frame is a story. Post-processing in Lightroom is where the real mood gets crafted.',
  },
  {
    title: 'Visual Design',
    description:
      'Illustrator is my playground for anything that needs to be composed, shaped, or made to look deliberate.',
  },
  {
    title: 'Video Editing',
    description:
      'I edit with a storytelling lens — pacing, cuts, and color are just as intentional as the footage itself.',
  },
]

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const expRef = useRef<HTMLDivElement>(null)
  const interestsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const createScrollAnim = (ref: React.RefObject<HTMLDivElement | null>, selector: string) => {
    gsap.from(ref.current?.querySelectorAll(selector) ?? [], {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
      },
    })
  }

  useGSAP(
    () => {
      gsap.from('.about-hero-item', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
      })
    },
    { scope: heroRef },
  )

  useGSAP(() => createScrollAnim(bioRef, '.bio-item'), { scope: bioRef })
  useGSAP(() => createScrollAnim(expRef, '.exp-item'), { scope: expRef })
  useGSAP(() => createScrollAnim(interestsRef, '.interest-item'), { scope: interestsRef })
  useGSAP(() => createScrollAnim(ctaRef, '.cta-item'), { scope: ctaRef })

  return (
    <div className="border-t">
      {/* Hero */}
      <section className="border-b">
        <div
          ref={heroRef}
          className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 border-x px-6 sm:px-10 md:px-16 py-16 sm:py-20 md:py-24 flex flex-col gap-6 bg-background"
        >
          <span className="about-hero-item text-sm text-secondary-foreground uppercase tracking-widest">
            About
          </span>
          <h1 className="about-hero-item text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold leading-none max-w-3xl">
            Developer. Visual thinker. Detail obsessed.
          </h1>
          <p className="about-hero-item text-secondary-foreground text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
            I'm Adi — I build interfaces that feel as good as they look, and I care about both in
            equal measure.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 mt-12 sm:mt-16 md:mt-24 border-t">
        <div
          ref={bioRef}
          className="border-b border-x grid grid-cols-1 md:grid-cols-2 bg-background"
        >
          <div className="p-6 sm:p-8 md:p-12 border-b md:border-b-0 md:border-r flex flex-col gap-6">
            <span className="bio-item text-sm text-secondary-foreground uppercase tracking-widest">
              Background
            </span>
            <p className="bio-item text-sm leading-relaxed">
              I'm a frontend developer based in Indonesia with a deep interest in the intersection
              of engineering and design. I believe great software isn't just functional — it should
              feel effortless to use and satisfying to look at.
            </p>
            <p className="bio-item text-sm leading-relaxed text-secondary-foreground">
              My approach to building is deliberate. I think carefully about structure, hierarchy,
              and motion before writing a single line of code. The result is interfaces that are
              coherent from the inside out.
            </p>
            <p className="bio-item text-sm leading-relaxed text-secondary-foreground">
              Outside of code, I channel the same visual sensibility into photography and
              illustration — two practices that keep me honest about composition and craft.
            </p>
          </div>
          <div className="p-6 sm:p-8 md:p-12 flex flex-col gap-6">
            <span className="bio-item text-sm text-secondary-foreground uppercase tracking-widest">
              The Details
            </span>
            <div className="bio-item flex flex-col gap-4">
              {[
                { label: 'Based in', value: 'South Tangerang, Indonesia' },
                { label: 'Focused on', value: 'Frontend Development' },
                { label: 'Currently building', value: 'Artifity Client, This Portfolio' },
                { label: 'Open to', value: 'Freelance' },
                { label: 'Languages', value: 'Indonesian, English' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-start py-3 border-b border-border last:border-0"
                >
                  <span className="text-xs text-secondary-foreground uppercase tracking-widest">
                    {label}
                  </span>
                  <span className="text-sm text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mx-4 sm:mx-8 md:mx-16 lg:mx-24">
        <div
          ref={expRef}
          className="border-b border-x p-6 sm:p-8 md:p-12 flex flex-col gap-10 bg-background"
        >
          <span className="exp-item text-sm text-secondary-foreground uppercase tracking-widest">
            Experience
          </span>
          <div className="flex flex-col">
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className="exp-item grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-8 py-8 border-b border-border last:border-0"
              >
                <span className="text-xs text-secondary-foreground leading-relaxed pt-0.5">
                  {exp.year}
                </span>
                <div className="sm:col-span-3 flex flex-col gap-2">
                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                    <span className="text-sm font-medium">{exp.role}</span>
                    <span className="text-xs text-secondary-foreground">— {exp.company}</span>
                  </div>
                  <p className="text-xs text-secondary-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="mx-4 sm:mx-8 md:mx-16 lg:mx-24">
        <div
          ref={interestsRef}
          className="border-b border-x grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-background"
        >
          {interests.map((item, i) => (
            <div
              key={item.title}
              className={`interest-item p-6 sm:p-8 md:p-12 flex flex-col gap-4 border-b lg:border-b-0 ${
                i < interests.length - 1 ? 'sm:border-r' : ''
              }`}
            >
              <span className="text-xs text-secondary-foreground uppercase tracking-widest">
                0{i + 1}
              </span>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-xs text-secondary-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-y my-12 sm:my-16 md:my-24">
        <div
          ref={ctaRef}
          className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 border-x px-6 sm:px-10 md:px-12 py-16 sm:py-20 md:py-24 flex flex-col items-center text-center gap-6 bg-background"
        >
          <h2 className="cta-item text-3xl sm:text-4xl font-bold">Want to work together?</h2>
          <p className="cta-item text-secondary-foreground text-base sm:text-lg max-w-md leading-relaxed">
            I'm always open to interesting projects and good conversations.
          </p>
          <div className="cta-item flex flex-wrap justify-center gap-4 mt-2">
            <Link to="/contact">
              <Button size="xl">Get in Touch</Button>
            </Link>
            <Link to="/works">
              <Button size="xl" variant="secondary">
                See My Works
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
