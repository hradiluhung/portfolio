import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Instagram, Linkedin, Mail, MapPin, ChevronDown, ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hakamra107@gmail.com',
    href: 'mailto:hakamra107@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/hradiluhung',
    href: 'https://github.com/hradiluhung',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/hradiluhung',
    href: 'https://linkedin.com/in/hradiluhung',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@hradiluhung',
    href: 'https://instagram.com/hradiluhung',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Jakarta, Indonesia',
    href: null,
  },
]

const faqs = [
  {
    question: 'Are you available for freelance work?',
    answer:
      'Yes, currently open for freelance projects. I take on frontend development, fullstack web apps, and design-to-code work. Feel free to reach out with your project details.',
  },
  {
    question: "What's your typical response time?",
    answer:
      'Usually within 24 hours on weekdays. For urgent inquiries, email is the fastest way to reach me.',
  },
  {
    question: 'Do you work with international clients?',
    answer:
      "Absolutely. I've worked remotely with clients across different timezones. Communication is async-friendly.",
  },
  {
    question: 'What kind of projects do you enjoy most?',
    answer:
      'I enjoy projects with interesting UI challenges — things that involve animation, complex interactions, or thoughtful design systems. I also like building tools that solve real problems.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-6 sm:px-10 md:px-16 py-6 text-left group cursor-pointer"
      >
        <span className="text-sm font-medium group-hover:text-secondary-foreground transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-secondary-foreground shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40' : 'max-h-0'}`}
      >
        <p className="px-6 sm:px-10 md:px-16 pb-6 text-sm text-secondary-foreground leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useGSAP(
    () => {
      gsap.from('.contact-hero-item', {
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
      gsap.from('.contact-section', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bodyRef.current,
          start: 'top 80%',
        },
      })
    },
    { scope: bodyRef },
  )

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
  }

  return (
    <div className="border-t">
      {/* Hero */}
      <section className="border-b bg-background">
        <div
          ref={heroRef}
          className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 border-x px-6 sm:px-10 md:px-16 py-16 sm:py-20 md:py-24 flex flex-col gap-6"
        >
          <span className="contact-hero-item text-sm text-secondary-foreground uppercase tracking-widest">
            Contact
          </span>
          <h1 className="contact-hero-item text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold leading-none max-w-3xl">
            Let's work together.
          </h1>
          <p className="contact-hero-item text-secondary-foreground text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
            Have a project in mind, a question, or just want to say hi? My inbox is open.
          </p>
        </div>
      </section>

      <div
        ref={bodyRef}
        className="pb-12 sm:pb-16 md:pb-24 mt-12 sm:mt-16 md:mt-24 mx-4 sm:mx-8 md:mx-16 lg:mx-24 border-t"
      >
        {/* Form + Contacts */}
        <div className="border-x border-b grid grid-cols-1 md:grid-cols-3 bg-background">
          {/* Form */}
          <div className="contact-section md:col-span-2 border-b md:border-b-0 md:border-r p-6 sm:p-10 md:p-16 flex flex-col gap-6">
            <span className="text-xs text-secondary-foreground uppercase tracking-widest">
              Send a message
            </span>

            {submitted ? (
              <div className="flex flex-col gap-3 py-12">
                <span className="text-2xl">👋</span>
                <p className="font-medium">Message received!</p>
                <p className="text-sm text-secondary-foreground">
                  Thanks for reaching out, {form.name}. I'll get back to you soon.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: '', email: '', message: '' })
                  }}
                  className="text-xs cursor-pointer underline underline-offset-4 text-secondary-foreground hover:text-foreground transition-colors mt-2 text-left"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-secondary-foreground">Name</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors placeholder:text-secondary-foreground/50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-secondary-foreground">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors placeholder:text-secondary-foreground/50"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-secondary-foreground">Message</label>
                  <Textarea
                    placeholder="Tell me about your project or just say hi..."
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors resize-none placeholder:text-secondary-foreground/50 h-37.5"
                  />
                </div>
                <Button onClick={handleSubmit} className="self-start">
                  Send message <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Contacts */}
          <div className="contact-section p-6 sm:p-10 md:p-16 flex flex-col gap-6">
            <span className="text-xs text-secondary-foreground uppercase tracking-widest">
              Find me at
            </span>
            <div className="flex flex-col gap-5">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-xs text-secondary-foreground">{label}</span>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm flex items-center gap-2 hover:text-secondary-foreground transition-colors group"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="group-hover:underline underline-offset-4">{value}</span>
                    </a>
                  ) : (
                    <span className="text-sm flex items-center gap-2 text-secondary-foreground">
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-x border-b bg-background border-t mb-12 sm:mb-16 md:mb-24 mx-4 sm:mx-8 md:mx-16 lg:mx-24">
        <div className="px-6 sm:px-10 md:px-16 py-10 border-b">
          <span className="text-xs text-secondary-foreground uppercase tracking-widest">FAQ</span>
        </div>
        <div>
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  )
}
