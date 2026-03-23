import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Index', path: '/' },
    { name: 'Bibliothèque', path: '/bibliotheque' },
    { name: 'Solutions', path: '/#services' },
    { name: 'Méthode', path: '/#processus' },
    { name: 'Data', path: '/#impact' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-base/90 backdrop-blur-md border-b border-border">
      <div className="px-8 md:px-16">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display font-black text-2xl tracking-tighter uppercase">
              Alpha<span className="text-accent">.</span>i
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || location.hash === link.path.replace('/', '');
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-mono text-xs uppercase tracking-widest transition-colors hover:text-accent ${
                    isActive ? 'text-accent' : 'text-text-muted'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-muted hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-20 left-0 right-0 bg-bg-base border-b border-border py-4"
        >
          <nav className="flex flex-col items-start px-8 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="font-mono text-sm uppercase tracking-widest text-text-muted hover:text-accent transition-colors w-full border-b border-border pb-4"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
