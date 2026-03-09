import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

type Blog = {
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  slug?: string
}

const blogs: Blog[] = [
  // {
  //   title: 'Why I Switched from useEffect to useGSAP',
  //   excerpt:
  //     "Managing GSAP animations inside useEffect always felt fragile — cleanup was easy to forget and context scoping was messy. Here's why useGSAP changed how I think about animation lifecycle in React.",
  //   date: 'Feb 12, 2026',
  //   readTime: '5 min read',
  //   tags: ['GSAP', 'React', 'Animation'],
  //   slug: 'why-i-switched-to-usegsap',
  // },
  // {
  //   title: 'Tailwind CSS v4: What Actually Changed',
  //   excerpt:
  //     "Moving from a tailwind.config.ts file to CSS-based @theme blocks was a bigger mental shift than I expected. A breakdown of what's new, what's gone, and what I actually like about v4.",
  //   date: 'Jan 28, 2026',
  //   readTime: '7 min read',
  //   tags: ['Tailwind CSS', 'CSS', 'Frontend'],
  //   slug: 'tailwind-v4-what-changed',
  // },
  // {
  //   title: 'Fixing Scroll-on-Load Issues with GSAP ScrollTrigger',
  //   excerpt:
  //     "I kept running into a bug where the page would jump on load whenever ScrollTrigger.refresh() was called too early. Here's what caused it and how I fixed it for good.",
  //   date: 'Jan 10, 2026',
  //   readTime: '4 min read',
  //   tags: ['GSAP', 'ScrollTrigger', 'Debugging'],
  //   slug: 'fixing-scroll-on-load-gsap',
  // },
  // {
  //   title: 'clipPath vs overflow-hidden: When to Use Which',
  //   excerpt:
  //     "overflow: hidden clips all sides equally — but sometimes you only want to clip certain edges. clipPath gives you that control, and it's more powerful than most people realize.",
  //   date: 'Dec 22, 2025',
  //   readTime: '3 min read',
  //   tags: ['CSS', 'Frontend', 'Tips'],
  //   slug: 'clippath-vs-overflow-hidden',
  // },
]

export default function Blogs() {
  const heroRef = useRef<HTMLDivElement>(null)
  const blogsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.blogs-hero-item', {
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
      gsap.from('.blog-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: blogsRef.current,
          start: 'top 80%',
        },
      })
    },
    { scope: blogsRef },
  )

  return (
    <div className="border-t">
      {/* Hero */}
      <section className="border-b bg-background">
        <div
          ref={heroRef}
          className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 border-x px-6 sm:px-10 md:px-16 py-16 sm:py-20 md:py-24 flex flex-col gap-6"
        >
          <span className="blogs-hero-item text-sm text-secondary-foreground uppercase tracking-widest">
            Blogs
          </span>
          <h1 className="blogs-hero-item text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold leading-none max-w-3xl">
            Things I've learned.
          </h1>
          <p className="blogs-hero-item text-secondary-foreground text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
            Notes, thoughts, and write-ups on frontend development, design, and everything in
            between.
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="pb-12 sm:pb-16 md:pb-24 mt-12 sm:mt-16 md:mt-24 mx-4 sm:mx-8 md:mx-16 lg:mx-24 border-t">
        <div ref={blogsRef} className="border-x bg-background">
          {blogs.length === 0 ? (
            <div className="px-6 sm:px-10 md:px-16 py-24 sm:py-32 flex flex-col items-center gap-4 text-center border-b">
              <span className="text-4xl">✍️</span>
              <p className="text-secondary-foreground text-sm">Nothing here yet.</p>
              <p className="text-secondary-foreground text-xs max-w-xs leading-relaxed">
                I'm still drafting my first post. Check back soon — something's brewing.
              </p>
            </div>
          ) : (
            <div className="border-b">
              {blogs.map((blog, i) => (
                <a
                  key={blog.slug || blog.title}
                  href={blog.slug ? `/blog/${blog.slug}` : '#'}
                  className={`blog-card flex flex-col md:flex-row gap-6 px-6 sm:px-10 md:px-16 py-8 sm:py-10 group cursor-pointer hover:bg-muted/40 transition-colors ${i !== blogs.length - 1 ? 'border-b' : ''}`}
                >
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-secondary-foreground">{blog.date}</span>
                      <span className="text-secondary-foreground text-xs">·</span>
                      <span className="text-xs text-secondary-foreground">{blog.readTime}</span>
                    </div>
                    <h2 className="text-base font-semibold leading-snug group-hover:underline underline-offset-4 transition-all">
                      {blog.title}
                    </h2>
                    <p className="text-xs text-secondary-foreground leading-relaxed max-w-2xl">
                      {blog.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full border border-border text-xs text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center shrink-0">
                    <div className="relative h-4 w-20 overflow-hidden">
                      <span className="flex items-center gap-1 lg:justify-end text-xs text-secondary-foreground transition-transform duration-300 group-hover:-translate-y-full">
                        Read more
                      </span>
                      <span className="flex items-center gap-1 absolute top-full left-0 text-xs text-foreground whitespace-nowrap transition-transform duration-300 group-hover:-translate-y-full">
                        Read article <ArrowRight className="h-3.5 w-3.5 inline-block" />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
