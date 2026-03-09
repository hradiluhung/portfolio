import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router'

export default function ErrorPage() {
  const error = useRouteError()
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.error-item', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power3.out',
      })
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-screen gap-2">
      <p className="error-item text-sm text-secondary-foreground uppercase tracking-widest">
        {isRouteErrorResponse(error) ? error.status : 'Error'}
      </p>
      <h1 className="error-item text-4xl font-bold">
        {isRouteErrorResponse(error) ? error.statusText : 'Oops!'}
      </h1>
      <p className="error-item text-secondary-foreground text-sm">
        {isRouteErrorResponse(error)
          ? "The page you were looking for doesn't exist."
          : 'Something went wrong.'}
      </p>
      <a
        href="/"
        className="error-item mt-4 text-sm underline underline-offset-4 hover:text-secondary-foreground transition-colors"
      >
        ← Back to home
      </a>
    </div>
  )
}
