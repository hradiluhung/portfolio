import { createBrowserRouter } from 'react-router'
import Home from '../pages/Home'
import About from '../pages/About'
import RootLayout from '@/components/RootLayout'
import ErrorPage from '@/pages/Error'
import Works from '@/pages/Works'
import Blogs from '@/pages/Blogs'
import Contact from '@/pages/Contact'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/works', element: <Works /> },
      { path: '/blogs', element: <Blogs /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
])

export default router
