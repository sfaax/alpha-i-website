import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col relative bg-bg-base text-text-main font-sans">
      {/* Architectural Lines */}
      <div className="fixed top-0 bottom-0 left-8 md:left-16 w-px bg-border pointer-events-none z-0 hidden sm:block"></div>
      <div className="fixed top-0 bottom-0 right-8 md:right-16 w-px bg-border pointer-events-none z-0 hidden sm:block"></div>

      <Header />
      <main className="flex-grow relative z-10 pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
