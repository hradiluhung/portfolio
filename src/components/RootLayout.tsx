import { Outlet, ScrollRestoration } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'

export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 fixed flex flex-col items-center h-screen w-screen -z-10">
        <div className="border-x w-full h-full grid grid-cols-2 sm:grid-cols-4 divide-x">
          <div />
          <div />
          <div className="hidden sm:block" />
          <div className="hidden sm:block" />
        </div>
      </div>
      <Navbar />
      <div className="pt-20 sm:pt-24 md:pt-28">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
