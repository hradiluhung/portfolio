import { useRouteError, isRouteErrorResponse } from 'react-router'

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <h1 className="text-4xl font-bold">Oops!</h1>
      {isRouteErrorResponse(error) ? (
        <p className="text-gray-500">
          {error.status} - {error.statusText}
        </p>
      ) : (
        <p className="text-gray-500">Something went wrong.</p>
      )}
    </div>
  )
}
