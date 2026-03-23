import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Loader2, Check, AlertCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';

type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Footer() {
  const [status, setStatus] = useState<NewsletterStatus>('idle');
  const [error, setError] = useState('');

  async function handleNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const form = e.currentTarget;
    const email = (form.elements.namedItem('newsletter-email') as HTMLInputElement).value;

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Erreur inconnue');
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'inscription');
    }
  }

  return (
    <footer className="relative z-10 border-t border-border bg-bg-base pt-24 pb-12 overflow-hidden px-8 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        {/* Brand */}
        <div className="col-span-1 lg:col-span-2">
          <Link to="/" className="inline-block mb-8">
            <span className="font-display font-black text-4xl tracking-tighter uppercase">
              Alpha<span className="text-accent">.</span>i
            </span>
          </Link>
          <p className="text-text-muted text-lg max-w-md font-light leading-relaxed mb-8">
            L'agence IA de référence pour transformer votre entreprise avec l'intelligence artificielle du futur.
          </p>

          {/* Newsletter */}
          <div className="max-w-md">
            <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4">Newsletter IA</h4>
            {status === 'success' ? (
              <div className="flex items-center gap-2 text-accent font-mono text-sm">
                <Check size={16} />
                Inscription confirmée !
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  name="newsletter-email"
                  type="email"
                  required
                  maxLength={254}
                  placeholder="votre@email.com"
                  className="flex-1 bg-transparent border border-border px-4 py-2 text-white text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-4 py-2 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-accent transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <ArrowRight size={14} />
                  )}
                </button>
              </form>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs mt-2">
                <AlertCircle size={12} />
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Services */}
        <div className="col-span-1">
          <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-8">Solutions</h4>
          <ul className="space-y-4">
            {['Automatisation Intelligente', 'Analyse intelligente IA', 'Creation web et App', 'Agents IA Argentic', 'Créateur de Contenu IA', 'Consulting & Formation'].map((service) => (
              <li key={service}>
                <Link to="/#services" className="text-white hover:text-accent transition-colors text-sm flex items-center gap-2 group">
                  {service}
                  <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-1">
          <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-8">Contact</h4>
          <ul className="space-y-4">
            <li>
              <a href="mailto:julien@alphaintelligence.fr" className="text-white hover:text-accent transition-colors text-sm flex items-center gap-2 group">
                julien@alphaintelligence.fr
                <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-text-muted text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} Alpha.i // Tous droits réservés
        </p>
        <div className="flex gap-8">
          <Link to="#" className="font-mono text-text-muted hover:text-white text-xs uppercase tracking-widest transition-colors">Légal</Link>
          <Link to="#" className="font-mono text-text-muted hover:text-white text-xs uppercase tracking-widest transition-colors">Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
