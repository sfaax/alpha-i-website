import { motion } from 'motion/react';
import { ArrowUpRight, ArrowRight, Loader2, Check, AlertCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Home() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState('');

  async function handleContactSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus('loading');
    setFormError('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Erreur inconnue');
      setFormStatus('success');
      form.reset();
    } catch (err) {
      setFormStatus('error');
      setFormError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi');
    }
  }
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-end pb-20 px-8 md:px-16 pt-32 overflow-hidden -mt-24">
        {/* Background Image */}
        <img 
          src="/hero-bg.png"
          alt="AI Robot Background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-[70%_center] z-0 opacity-90"
        />
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-bg-base via-bg-base/40 to-bg-base/10" />

        <div className="relative z-10 font-mono text-accent mb-8 uppercase tracking-widest text-sm mt-32">
          [ Agence d'Intelligence Artificielle ]
        </div>
        <h1 className="relative z-10 text-[15vw] leading-[0.8] font-display font-black uppercase tracking-tighter">
          Alpha<span className="text-accent">.</span>i
        </h1>
        <div className="relative z-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-border pt-8">
          <p className="text-2xl md:text-4xl font-light text-text-muted leading-tight">
            L'Intelligence Artificielle <br />du futur.
          </p>
          <div className="flex flex-col justify-between">
            <p className="text-base text-text-muted max-w-md mb-8">
              Libérez la puissance de l'IA. Automatisez, innovez et transformez votre entreprise grâce à des solutions intelligentes sur mesure.
            </p>
            <button className="self-start flex items-center gap-4 font-mono uppercase tracking-widest text-sm hover:text-accent transition-colors group">
              Découvrir nos solutions
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-bg-base transition-all">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-border py-4 overflow-hidden bg-surface flex items-center">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap font-mono text-sm uppercase tracking-widest text-text-muted"
        >
          {Array(10).fill("INTELLIGENCE ARTIFICIELLE • AUTOMATISATION • MACHINE LEARNING • ").map((text, i) => (
            <span key={i} className="mx-4">{text}</span>
          ))}
        </motion.div>
      </div>

      {/* Solutions Section (Sticky Layout) */}
      <section id="services" className="px-8 md:px-16 py-32 flex flex-col lg:flex-row gap-16 relative">
        <div className="lg:w-1/3 relative">
          {/* Background Image restricted to the left column */}
          <div className="absolute -top-32 -bottom-32 -left-8 md:-left-16 right-0 lg:-right-8 z-0 opacity-90 pointer-events-none overflow-hidden">
            <img
              src="/bluewave.png"
              alt="Blue Wave"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-bg-base/30" />
            {/* Fade out on the right edge to blend with the services list */}
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-base to-transparent" />
            {/* Fade out on bottom for mobile */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-base to-transparent lg:hidden" />
          </div>

          <div className="sticky top-32 relative z-10">
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight leading-none">Nos<br/>Solutions</h2>
            <p className="mt-6 text-text-muted font-mono text-sm uppercase tracking-widest">01 // Services</p>
          </div>
        </div>
        <div className="lg:w-2/3 flex flex-col relative z-10">
          {[
            {
              title: "Automatisation Intelligente",
              desc: "Libérez le potentiel de vos équipes grâce à notre automatisation IA qui révolutionne vos processus métier.",
              features: ["RPA Intelligent", "Workflow Adaptatif", "Prédictions Avancées"]
            },
            {
              title: "Analyse intelligente IA",
              desc: "Création dashboard dynamique alimenté par IA, Surveillance et Monitoring de votre Business, plan d'action adapté par IA.",
              features: ["Dashboard Dynamique", "Monitoring Business", "Plan d'Action IA"]
            },
            {
              title: "Creation web et App",
              desc: "Créez des sites web et applications mobiles intelligents qui convertissent. Augmentation moyenne de 65%.",
              features: ["Personnalisation IA", "Optimisation Auto", "Intelligence Cross-Platform"]
            },
            {
              title: "Agents IA Argentic",
              desc: "Développez des agents IA spécialisés qui communiquent par texte et voix. Service client disponible 24h/24.",
              features: ["IA Custom Multi-Modal", "Communication Naturelle", "Disponibilité Totale"]
            },
            {
              title: "Créateur de Contenu IA",
              desc: "Automatisez votre création de contenu avec une IA qui respecte votre ton et vos valeurs. Production 10x plus rapide.",
              features: ["Génération Multi-Format", "Optimisation SEO", "Planification Intelligente"]
            },
            {
              title: "Consulting & Formation",
              desc: "Accompagnement personnalisé pour intégrer l'IA dans votre stratégie. 95% des entreprises accompagnées déploient en 3 mois.",
              features: ["Audit IA Complet", "Formation Sur-Mesure", "Accompagnement Stratégique"]
            }
          ].map((service, idx) => (
            <div key={idx} className="group border-b border-border py-12 hover:bg-surface transition-colors px-6 -mx-6 cursor-pointer">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="flex-1">
                  <h3 className="text-3xl font-display font-bold uppercase mb-4 group-hover:text-accent transition-colors">{service.title}</h3>
                  <p className="text-text-muted text-lg leading-relaxed max-w-xl">{service.desc}</p>
                </div>
                <div className="md:w-1/3">
                  <ul className="space-y-2 font-mono text-sm text-text-muted">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-accent">-</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section id="processus" className="px-8 md:px-16 py-32 border-t border-border">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight leading-none">Notre<br/>Méthode</h2>
          <p className="text-text-muted font-mono text-sm uppercase tracking-widest">02 // Processus</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          {[
            { step: "01", title: "Analyse & Découverte", desc: "Nous analysons vos besoins et identifions les opportunités d'automatisation IA dans vos processus métier." },
            { step: "02", title: "Conception & Prototypage", desc: "Nous concevons des solutions IA sur-mesure et créons des prototypes pour valider l'approche technique." },
            { step: "03", title: "Développement & Formation", desc: "Nos experts développent et entraînent vos modèles IA avec vos données pour une performance optimale." },
            { step: "04", title: "Déploiement & Optimisation", desc: "Nous déployons vos solutions IA et les optimisons en continu pour garantir des résultats exceptionnels." }
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -top-16 -left-8 text-[150px] font-display font-black text-white/10 group-hover:text-accent/20 transition-colors pointer-events-none leading-none">
                {item.step}
              </div>
              <div className="relative z-10 pt-8 border-t border-border">
                <h3 className="text-2xl font-display font-bold uppercase mb-4">{item.title}</h3>
                <p className="text-text-muted text-lg leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="relative px-8 md:px-16 py-32 border-t border-border overflow-hidden">
        {/* Background Image */}
        <img 
          src="/impact-bg.png"
          alt="Futuristic Network Background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-100"
        />
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 z-0 bg-bg-base/30" />

        <div className="relative z-10 mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight leading-none">Impact<br/>Mesurable</h2>
          <p className="text-text-muted font-mono text-sm uppercase tracking-widest">03 // Data</p>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {[
            { value: "400%", label: "Rentabilité 1ère année", sub: "ROI démontré sur 12 mois" },
            { value: "4 mois", label: "Récupération investissement", sub: "Retour rapide garanti" },
            { value: "200k€", label: "Gains moyens annuels", sub: "Pour 50k€ investis" },
            { value: "24/7", label: "Disponibilité service", sub: "Service client permanent" },
            { value: "+85%", label: "Productivité", sub: "Amélioration moyenne" },
            { value: "-75%", label: "Temps de traitement", sub: "Réduction moyenne" },
            { value: "-60%", label: "Coûts opérationnels", sub: "Économies réalisées" },
            { value: "99%", label: "Précision", sub: "Taux d'erreur réduit" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-surface/20 backdrop-blur-md p-10 flex flex-col justify-center items-start hover:bg-surface/40 transition-colors">
              <h3 className="text-5xl font-display font-bold text-accent mb-4">{stat.value}</h3>
              <p className="text-white font-mono text-sm uppercase tracking-wider mb-2">{stat.label}</p>
              <p className="text-text-muted text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="relative z-10 mt-32 max-w-4xl">
          <div className="font-mono text-accent mb-8 uppercase tracking-widest text-sm">[ Témoignage ]</div>
          <p className="text-3xl md:text-5xl font-light text-white leading-tight mb-8">
            "En 8 mois, notre PME a automatisé 80% de ses tâches répétitives, augmenté son CA de 30% et réduit ses coûts de 45%."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-border"></div>
            <div>
              <p className="font-bold uppercase tracking-wider">Directeur Général</p>
              <p className="text-text-muted text-sm font-mono">Secteur Logistique</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative px-8 md:px-16 py-32 border-t border-border overflow-hidden">
        {/* Background Image */}
        <img 
          src="/womanbots.png"
          alt="Woman bots background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-100"
        />
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 z-0 bg-bg-base/25" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight leading-none mb-8">Prêt à<br/>Transformer ?</h2>
            <p className="text-text-muted text-xl max-w-md mb-12">
              Contactez nos experts IA dès aujourd'hui et découvrez comment nous pouvons révolutionner vos processus métier.
            </p>
            <div className="space-y-6 font-mono text-sm uppercase tracking-widest">
              <div className="flex items-center gap-4">
                <span className="text-accent">Email //</span>
                <a href="mailto:julien@alphaintelligence.fr" className="hover:text-accent transition-colors">julien@alphaintelligence.fr</a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-accent">Dispo //</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div> Maintenant</span>
              </div>
            </div>
          </div>

          <div className="bg-surface/20 backdrop-blur-md p-8 md:p-12 border border-border">
            {formStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                  <Check size={32} className="text-accent" />
                </div>
                <h3 className="text-2xl font-display font-bold uppercase mb-2">Message envoyé</h3>
                <p className="text-text-muted">Nous vous répondrons sous 24h.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-8 font-mono text-xs uppercase tracking-widest text-accent hover:text-white transition-colors">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleContactSubmit}>
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-widest text-text-muted">Nom complet</label>
                  <input id="contact-name" name="name" type="text" required minLength={2} maxLength={100} className="w-full bg-transparent border-b border-border py-2 text-white placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-widest text-text-muted">Email</label>
                  <input id="contact-email" name="email" type="email" required maxLength={254} className="w-full bg-transparent border-b border-border py-2 text-white placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="font-mono text-xs uppercase tracking-widest text-text-muted">Message</label>
                  <textarea id="contact-message" name="message" rows={4} required minLength={10} maxLength={1000} className="w-full bg-transparent border-b border-border py-2 text-white placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Décrivez votre projet..."></textarea>
                </div>
                {formStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
                    <AlertCircle size={14} />
                    {formError}
                  </div>
                )}
                <button type="submit" disabled={formStatus === 'loading'} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-accent transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed">
                  {formStatus === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer
                      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
