import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import { Link } from 'react-router'

gsap.registerPlugin(ScrollTrigger)

const techStack = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'REST API'],
  },
  {
    category: 'Tooling',
    items: ['Git', 'Vite', 'Webpack', 'ESLint', 'Prettier'],
  },
  {
    category: 'Design',
    items: ['Figma', 'Adobe Illustrator', 'Lightroom'],
  },
]

const stats = [
  { value: '3+', label: 'Years of Experience' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '5+', label: 'Clients Worked With' },
]

const currentlyBuilding = [
  {
    name: 'Indonesian International Latin Festival',
    description:
      'Event website for a Latin dance festival in Bali — features countdown, judges, instructors, and ticket info with GSAP animations.',
    status: 'In Progress',
  },
  {
    name: 'Artifity Client',
    description:
      'A print shop management app — handles orders, payments, file uploads, and material tracking end to end.',
    status: 'In Progress',
  },
]

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const aboutTextRef = useRef<HTMLDivElement>(null)
  const techStackRef = useRef<HTMLDivElement>(null)
  const currentlyBuildingRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.hero-item', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
      })
    },
    { scope: heroRef },
  )

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

  useGSAP(() => createScrollAnim(aboutTextRef, '.about-item'), { scope: aboutTextRef })
  useGSAP(() => createScrollAnim(techStackRef, '.tech-item'), { scope: techStackRef })
  useGSAP(() => createScrollAnim(currentlyBuildingRef, '.building-item'), {
    scope: currentlyBuildingRef,
  })
  useGSAP(() => createScrollAnim(statsRef, '.stat-item'), { scope: statsRef })
  useGSAP(() => createScrollAnim(ctaRef, '.cta-item'), { scope: ctaRef })

  return (
    <div className="border-t">
      {/* Hero */}
      <section ref={heroRef} className="border-b">
        <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 border-x flex flex-col items-center justify-center min-h-[calc(100vh-112px)] relative bg-background text-center z-0 px-6 sm:px-0">
          <div className="absolute inset-0 bg-[url('/images/home_hero.svg')] bg-cover bg-center bg-no-repeat opacity-15 dark:invert dark:opacity-10 -z-10" />
          <div className="hero-item border px-3 py-1 rounded-full flex gap-2 items-center text-sm text-secondary-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for work
          </div>
          <h1 className="hero-item text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold mt-4 leading-tight">
            Hakam Royhan Adiluhung
          </h1>
          <p className="hero-item mt-2 text-secondary-foreground text-base sm:text-lg md:text-xl max-w-2xl">
            I care about how it works. I care more about how it feels.
          </p>
          <div className="hero-item mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/works">
              <Button size="xl">Explore Works</Button>
            </Link>
            <a href="https://github.com/hradiluhung" target="_blank" rel="noopener noreferrer">
              <Button size="xl" variant="secondary">
                <ExternalLink />
                Github Profile
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* About + Tech Stack + Currently Building + Experience Stats */}
      <section className="my-12 sm:my-16 md:my-24 mx-4 sm:mx-8 md:mx-16 lg:mx-24 grid grid-cols-1 md:grid-cols-2 bg-background border">
        {/* About */}
        <div ref={aboutTextRef} className="p-6 sm:p-8 md:p-12 border-b md:border-r">
          <div className="about-item">
            <span className="text-sm text-secondary-foreground uppercase tracking-widest">
              About
            </span>
          </div>
          <div className="flex flex-col gap-8 max-w-2xl mt-6">
            <h2 className="about-item text-xl sm:text-2xl font-bold leading-snug">
              I build things that live on the web — and care deeply about how they feel to use.
            </h2>
            <p className="about-item text-secondary-foreground text-sm leading-relaxed">
              I'm <b>Adi</b>, a frontend developer based in Indonesia. I specialize in turning
              complex ideas into clean, performant interfaces. My background spans design systems,
              interactive experiences, and shipping products people actually enjoy.
            </p>
            <p className="about-item text-secondary-foreground text-sm leading-relaxed">
              When I'm not writing code, I'm designing visuals, shooting photos, or crafting them
              into something worth stopping for. I'm a visual person at heart — if it can be made to
              look better, I'll probably try.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div ref={techStackRef} className="p-6 sm:p-8 md:p-12 flex flex-col gap-8 border-b">
          <div className="tech-item">
            <span className="text-sm text-secondary-foreground uppercase tracking-widest">
              Tech Stack
            </span>
          </div>
          <div className="flex flex-col gap-6">
            {techStack.map((group) => (
              <div key={group.category} className="tech-item flex flex-col gap-2">
                <span className="text-xs text-secondary-foreground/60 uppercase tracking-widest">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full border border-border text-xs text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Currently Building */}
        <div
          ref={currentlyBuildingRef}
          className="p-6 sm:p-8 md:p-12 border-b md:border-b-0 md:border-r flex flex-col"
        >
          <div className="building-item">
            <span className="text-sm text-secondary-foreground uppercase tracking-widest">
              Currently Building
            </span>
          </div>

          <div className="flex flex-col gap-4 mt-6 flex-1">
            {currentlyBuilding.length === 0 ? (
              <div className="building-item flex flex-col gap-1 py-4">
                <span className="text-sm font-medium">Nothing at the moment</span>
                <span className="text-xs text-secondary-foreground leading-relaxed">
                  Between projects — exploring new ideas and open to opportunities.
                </span>
              </div>
            ) : (
              currentlyBuilding.map((project) => (
                <div
                  key={project.name}
                  className="building-item flex items-start justify-between gap-4 py-4 border-b border-border last:border-0"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{project.name}</span>
                    <span className="text-xs text-secondary-foreground leading-relaxed">
                      {project.description}
                    </span>
                  </div>
                  <span className="shrink-0 flex items-center gap-1.5 text-xs text-secondary-foreground border border-border rounded-full px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                    {project.status}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="building-item mt-6">
            <Link
              to="/works"
              className="text-sm underline underline-offset-4 hover:text-secondary-foreground transition-colors"
            >
              See all projects →
            </Link>
          </div>
        </div>

        {/* Experience Stats */}
        <div ref={statsRef} className="p-6 sm:p-8 md:p-12 flex flex-col">
          <div className="stat-item">
            <span className="text-sm text-secondary-foreground uppercase tracking-widest">
              Experience
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 flex-1 mt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item flex items-center gap-3 flex-col">
                <span className="text-4xl font-bold leading-none">{stat.value}</span>
                <span className="text-sm text-secondary-foreground mb-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="border-y mb-12 sm:mb-16 md:mb-24">
        <div
          ref={ctaRef}
          className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 bg-background border-x px-6 sm:px-10 md:px-12 py-16 sm:py-20 md:py-24 flex flex-col items-center text-center gap-6"
        >
          <div className="cta-item border px-3 py-1 rounded-full flex gap-2 items-center text-sm text-secondary-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Open to opportunities
          </div>
          <h2 className="cta-item text-3xl sm:text-4xl md:text-5xl font-bold max-w-xl leading-tight">
            Got something in mind? I'd love to hear it.
          </h2>
          <p className="cta-item text-secondary-foreground text-base sm:text-lg max-w-lg leading-relaxed">
            Whether it's a product you want to ship, an idea you want to explore, or just a good
            conversation about the web — my inbox is open.
          </p>
          <div className="cta-item mt-2">
            <Link to="/contact">
              <Button size="xl">Start a Conversation</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
