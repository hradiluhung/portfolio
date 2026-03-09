import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

type Project = {
  name: string
  description: string
  image: string
  techStack: string[]
  year: string
  category: string
  link?: string
  github?: string
}

const projects: Project[] = [
  {
    name: 'Artifity Client',
    description:
      'A print shop management app — handles orders, payments, file uploads, and material tracking end to end.',
    image: '/images/works/artivity.png',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    year: '2025',
    category: 'Web App',
  },
  {
    name: 'This Portfolio',
    description: 'Personal portfolio site built with React, Tailwind CSS, and GSAP animations.',
    image: '/images/works/portfolio.png',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    year: '2026',
    category: 'Website',
    github: 'https://github.com/hradiluhung/portofolio',
  },
  {
    name: 'Indonesian International Latin Festival',
    description:
      'Event website for a Latin dance festival in Bali — features countdown, judges, instructors, and ticket info with GSAP animations.',
    image: '/images/works/salsa.png',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    year: '2026',
    category: 'Website',
    link: 'https://salsa-website-lime.vercel.app',
  },
  {
    name: 'SmartHR',
    description:
      'HR platform for finding top talent — features job listings, AI-powered candidate matching, and an HR chatbot.',
    image: '/images/works/smarthr.png',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    year: '2025',
    category: 'Web App',
    github: 'https://github.com/hradiluhung/smart-hr-2',
  },
  {
    name: 'Smart KM',
    description:
      'Knowledge management chatbot app — users can upload PDFs as knowledge base and ask questions powered by AI.',
    image: '/images/works/smartkm.png',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    year: '2025',
    category: 'Web App',
    github: 'https://github.com/hradiluhung/smart-km',
  },
  {
    name: "Rent n' Trace",
    description:
      'Mobile app for tracking car rentals — shows active bookings, live vehicle location, fuel cost estimates, and available cars.',
    image: '/images/works/rentntrace.png',
    techStack: ['Flutter', 'Dart'],
    year: '2024',
    category: 'Mobile App',
    github: 'https://github.com/hradiluhung/rent-n-trace',
  },
]

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

export default function Works() {
  const heroRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory)

  useGSAP(
    () => {
      gsap.from('.works-hero-item', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
      })
    },
    { scope: heroRef },
  )

  useGSAP(
    () => {
      gsap.from('.project-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 80%',
        },
      })
    },
    { scope: projectsRef, dependencies: [activeCategory] },
  )

  return (
    <div className="border-t">
      {/* Hero */}
      <section className="border-b bg-background">
        <div
          ref={heroRef}
          className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 border-x px-6 sm:px-10 md:px-16 py-16 sm:py-20 md:py-24 flex flex-col gap-6"
        >
          <span className="works-hero-item text-sm text-secondary-foreground uppercase tracking-widest">
            Works
          </span>
          <h1 className="works-hero-item text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold leading-none max-w-3xl">
            Things I've built.
          </h1>
          <p className="works-hero-item text-secondary-foreground text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
            A collection of projects — from client work to side experiments. Each one taught me
            something.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="mt-12 sm:mt-16 md:mt-24">
        <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 border-b border-t border-x px-6 sm:px-10 md:px-16 py-6 flex gap-2 flex-wrap bg-background">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs border transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-foreground text-background border-foreground'
                  : 'text-secondary-foreground border-border hover:border-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-12 sm:pb-16 md:pb-24">
        <div ref={projectsRef} className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 border-x bg-background">
          {filtered.length === 0 ? (
            <div className="p-16 text-center text-secondary-foreground text-sm">
              No projects in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {filtered
                .sort((a, b) => parseInt(b.year) - parseInt(a.year))
                .map((project, i) => {
                  // border-r: show for left col(s), hide for rightmost col per breakpoint
                  // sm (2 cols): even index gets border-r
                  // lg (4 cols): every item except 4th in row (i%4!==3) gets border-r
                  const borderR = [
                    i % 2 === 0 ? 'sm:border-r' : '',
                    i % 4 !== 3 ? 'lg:border-r' : 'lg:border-r-0',
                  ].join(' ')

                  return (
                    <a
                      key={project.name}
                      href={project.link || project.github || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`project-card flex flex-col border-b ${borderR} group cursor-pointer`}
                    >
                      {/* Image */}
                      <div className="aspect-video bg-muted w-full overflow-hidden">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-secondary-foreground">
                            No preview
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-3 p-6 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-medium leading-snug">{project.name}</span>
                          <span className="text-xs text-secondary-foreground shrink-0">
                            {project.year}
                          </span>
                        </div>
                        <p className="text-xs text-secondary-foreground leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-auto pt-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-full border border-border text-xs text-secondary-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-3 pt-2 border-t border-border mt-1">
                          {project.github && (
                            <div className="flex items-center gap-1.5 text-xs text-secondary-foreground">
                              <Github className="h-3.5 w-3.5 shrink-0" />
                              <div className="relative h-4 w-36 overflow-hidden">
                                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                                  Repository
                                </span>
                                <span className="block absolute top-full left-0 transition-transform duration-300 group-hover:-translate-y-full text-foreground whitespace-nowrap">
                                  View Project
                                  <ArrowRight className="h-3.5 w-3.5 inline-block" />
                                </span>
                              </div>
                            </div>
                          )}
                          {project.link && (
                            <div className="flex items-center gap-1.5 text-xs text-secondary-foreground">
                              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                              <div className="relative h-4 w-36 overflow-hidden">
                                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                                  Live Site
                                </span>
                                <span className="block absolute top-full left-0 transition-transform duration-300 group-hover:-translate-y-full text-foreground whitespace-nowrap">
                                  View Project
                                  <ArrowRight className="h-3.5 w-3.5 inline-block" />
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </a>
                  )
                })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
