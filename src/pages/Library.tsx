import { useState, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';

type Workflow = {
  title: string;
  category: string;
  desc: string;
  tags: string[];
};

const workflows: Workflow[] = [
  // Marketing & Contenu
  {
    title: "Transcription Vidéo IA",
    category: "Marketing & Contenu",
    desc: "Transcription automatique et génération de sous-titres pour vidéos, adaptée aux médias et créateurs de contenu.",
    tags: ["Speech-to-Text", "Média", "SEO"]
  },
  {
    title: "Descriptions pour Shorts",
    category: "Marketing & Contenu",
    desc: "Génération de descriptions optimisées SEO pour vidéos courtes sur TikTok, Reels et YouTube Shorts.",
    tags: ["Social", "SEO", "Copywriting"]
  },
  {
    title: "Générateur d'Articles News",
    category: "Communication",
    desc: "Rédaction automatisée d'articles d'actualité et de newsletters pour équipes éditoriales et relations publiques.",
    tags: ["Éditorial", "Newsletter", "LLM"]
  },
  {
    title: "Rédacteur SEO IA",
    category: "Marketing & Contenu",
    desc: "Création d'articles de blog optimisés SEO avec recherche de mots-clés et structure sémantique.",
    tags: ["SEO", "Blog", "Content"]
  },
  {
    title: "Générateur de Newsletters",
    category: "Marketing & Contenu",
    desc: "Production complète de newsletters avec templates personnalisables pour e-commerce, SaaS et associations.",
    tags: ["Email", "Template", "Marketing"]
  },
  {
    title: "Publication Multi-Réseaux",
    category: "Marketing & Contenu",
    desc: "Adaptation et publication automatique de contenus sur Instagram, TikTok et YouTube en un seul flux.",
    tags: ["Instagram", "TikTok", "YouTube"]
  },
  {
    title: "Idées Vidéos YouTube",
    category: "Marketing & Contenu",
    desc: "Génération d'idées de vidéos YouTube basées sur l'analyse des tendances et des audiences cibles.",
    tags: ["YouTube", "Trends", "Créa"]
  },
  {
    title: "Générateur Vidéos TikTok",
    category: "Marketing & Contenu",
    desc: "Production automatisée de vidéos TikTok avec templates Veo3 et formats optimisés pour la viralité.",
    tags: ["TikTok", "Veo3", "Vidéo"]
  },
  {
    title: "Rédacteur Posts LinkedIn",
    category: "Marketing & Contenu",
    desc: "Création de posts professionnels LinkedIn optimisés pour maximiser l'engagement B2B.",
    tags: ["LinkedIn", "B2B", "Engagement"]
  },
  {
    title: "Générateur de Miniatures",
    category: "Marketing & Contenu",
    desc: "Création automatique de miniatures accrocheuses pour vidéos à partir de templates personnalisables.",
    tags: ["Thumbnail", "Design", "Vidéo"]
  },
  {
    title: "Tutoriels Posts Sociaux",
    category: "Marketing & Contenu",
    desc: "Guide automatisé de bonnes pratiques pour community managers débutants, du brief à la publication.",
    tags: ["Formation", "Social", "CM"]
  },
  {
    title: "Messages d'Accroche",
    category: "Ventes",
    desc: "Génération de messages d'icebreaker personnalisés pour maximiser le taux de réponse en prospection.",
    tags: ["Prospection", "Copywriting", "Outbound"]
  },
  {
    title: "Générateur de Contenus UGC",
    category: "Marketing & Contenu",
    desc: "Création de contenus authentiques type UGC pour campagnes publicitaires e-commerce et marques.",
    tags: ["UGC", "Ads", "E-commerce"]
  },

  // IA & Tech
  {
    title: "Agent d'Optimisation Prompts",
    category: "IA & Tech",
    desc: "Optimisation de prompts IA avec intégration GPT-4, mémoire persistante et recherche web.",
    tags: ["GPT-4", "Memory", "Web Search"]
  },
  {
    title: "Agent Vocal IA",
    category: "Support Client",
    desc: "Agent vocal intelligent pour automatiser les conversations téléphoniques de support et télémarketing.",
    tags: ["Voice", "Téléphonie", "IA"]
  },
  {
    title: "Orchestration Multi-Agents",
    category: "IA & Tech",
    desc: "Coordination de plusieurs agents IA spécialisés pour exécuter des workflows complexes en parallèle.",
    tags: ["Multi-Agent", "Orchestration", "LLM"]
  },
  {
    title: "Système RAG",
    category: "IA & Tech",
    desc: "Retrieval Augmented Generation sur vos bases documentaires pour des réponses contextualisées et fiables.",
    tags: ["RAG", "Vector DB", "LLM"]
  },
  {
    title: "Validation Humaine IA",
    category: "IA & Tech",
    desc: "Intégration d'étapes de validation humaine dans les processus IA pour secteurs régulés (finance, santé).",
    tags: ["HITL", "Compliance", "Qualité"]
  },
  {
    title: "RAG Google Search",
    category: "IA & Tech",
    desc: "Recherche augmentée s'appuyant sur Google pour fournir des réponses contextuelles actualisées.",
    tags: ["Google", "RAG", "Search"]
  },
  {
    title: "Garde-fous Sécurité IA",
    category: "IA & Tech",
    desc: "Démonstration de contrôles et garde-fous automatisés pour sécuriser l'usage de modèles génératifs.",
    tags: ["Guardrails", "Sécurité", "Compliance"]
  },

  // Support Client
  {
    title: "Chatbot Support Client",
    category: "Support Client",
    desc: "Chatbot automatisé capable de résoudre une majorité de requêtes clients en autonomie, 24/7.",
    tags: ["Chatbot", "SaaS", "E-commerce"]
  },

  // Ventes
  {
    title: "Prospection Reddit",
    category: "Ventes",
    desc: "Identification automatisée de leads qualifiés sur Reddit pour équipes growth et B2B SaaS.",
    tags: ["Reddit", "Lead Gen", "B2B"]
  },
  {
    title: "Qualification de Leads",
    category: "Ventes",
    desc: "Scoring et priorisation automatiques des leads entrants selon des critères business personnalisés.",
    tags: ["Scoring", "CRM", "SDR"]
  },
  {
    title: "Prospection LinkedIn API",
    category: "Ventes",
    desc: "Automatisation de la prospection LinkedIn avec extraction et enrichissement de données profils.",
    tags: ["LinkedIn", "API", "Outbound"]
  },
  {
    title: "Extraction Profils LinkedIn",
    category: "Ventes",
    desc: "Scraping structuré de profils LinkedIn pour enrichir bases de données commerciales et recrutement.",
    tags: ["Scraping", "Data", "B2B"]
  },
  {
    title: "Capture de Leads Formulaires",
    category: "Ventes",
    desc: "Système de formulaires intelligents pour capturer et router automatiquement les leads entrants.",
    tags: ["Forms", "Inbound", "CRM"]
  },
  {
    title: "Leads depuis Calendly",
    category: "Ventes",
    desc: "Création automatique de leads dans le CRM à chaque prise de rendez-vous Calendly.",
    tags: ["Calendly", "CRM", "RDV"]
  },

  // Finance
  {
    title: "Gestion des Factures",
    category: "Finance",
    desc: "Gestion automatisée des factures avec tableaux de bord et suivi comptable temps réel.",
    tags: ["Invoice", "N8N", "Compta"]
  },
  {
    title: "Devis-Facturation V2",
    category: "Finance",
    desc: "Processus complet de devis à facture avec suivi automatisé des statuts et relances.",
    tags: ["Devis", "Facture", "B2B"]
  },
  {
    title: "Gestion Commerciale Complète",
    category: "Finance",
    desc: "Suite complète devis, factures, intégrations CRM et comptabilité pour PME et services.",
    tags: ["Sales Ops", "CRM", "Compta"]
  },
  {
    title: "Générateur de Devis Automatisé",
    category: "Finance",
    desc: "Génération, envoi et suivi de devis personnalisés avec conversion en facture en un clic et signature électronique.",
    tags: ["Devis", "Signature", "PDF"]
  },
  {
    title: "Générateur de Factures Intelligent",
    category: "Finance",
    desc: "Facturation automatique avec numérotation conforme, calculs TVA, rappels de paiement et export comptable.",
    tags: ["Facture", "TVA", "Export"]
  },

  // Ressources Humaines
  {
    title: "Analyse CV avec Scoring",
    category: "Ressources Humaines",
    desc: "Parsing intelligent de CV et scoring multicritères des candidats avec détection de red flags et shortlist.",
    tags: ["CV", "Scoring", "ATS"]
  },
  {
    title: "Détection de Potentiel Talents",
    category: "Ressources Humaines",
    desc: "Analyse psychométrique et prédictive du potentiel évolutif des candidats et collaborateurs internes.",
    tags: ["Talent", "Prédictif", "Soft Skills"]
  },

  // Communication
  {
    title: "Gestion Intelligente Emails",
    category: "Communication",
    desc: "Tri, priorisation et catégorisation automatiques de la boîte mail pour cadres et entrepreneurs.",
    tags: ["Email", "Inbox", "Productivité"]
  },
  {
    title: "Agent Email Contextuel",
    category: "Communication",
    desc: "Agent email intelligent générant des réponses contextuelles pour équipes à fort volume d'emails.",
    tags: ["Email", "RAG", "Support"]
  },

  // Analyse & Monitoring
  {
    title: "Analyse des Avis Google",
    category: "Analyse & Monitoring",
    desc: "Analyse automatique des avis Google avec alertes et rapports pour commerces et services locaux.",
    tags: ["Reviews", "Monitoring", "Local"]
  },

  // IT & DevOps
  {
    title: "Sauvegarde Workflows",
    category: "IT & DevOps",
    desc: "Sauvegarde automatique, versioning et restauration de vos workflows d'automatisation critiques.",
    tags: ["Backup", "Versioning", "DevOps"]
  }
];

const categories = ["Tous", ...Array.from(new Set(workflows.map(w => w.category)))];

export default function Library() {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  const filtered = useMemo(
    () => activeCategory === "Tous" ? workflows : workflows.filter(w => w.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="flex flex-col w-full min-h-screen pt-32 pb-24 px-8 md:px-16">
      {/* Header */}
      <section className="mb-20">
        <div className="font-mono text-accent mb-8 uppercase tracking-widest text-sm">
          [ Workflows & Agents IA ]
        </div>
        <h1 className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tight leading-none mb-8">
          La<br/>Bibliothèque
        </h1>
        <p className="text-xl text-text-muted max-w-2xl font-light leading-relaxed">
          Explorez notre catalogue d'automatisations et d'agents IA prêts à déployer. Des workflows testés en production pour transformer chaque service de votre entreprise.
        </p>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent max-w-2xl">
          * Liste non exhaustive — de nouveaux workflows sont ajoutés régulièrement.
        </p>
      </section>

      {/* Filters */}
      <section className="border-t border-border pt-12 mb-16">
        <div className="font-mono text-xs uppercase tracking-widest text-text-muted mb-6">
          Filtrer par service
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-mono uppercase tracking-widest px-4 py-2 border transition-all ${
                activeCategory === cat
                  ? "border-accent bg-accent text-bg-base"
                  : "border-border text-text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filtered.map((demo, idx) => (
            <div key={`${demo.title}-${idx}`} className="group flex flex-col border border-border p-6 hover:border-accent transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  {demo.category}
                </span>
                <span className="font-mono text-xs text-text-muted">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold uppercase mb-4 group-hover:text-accent transition-colors">
                {demo.title}
              </h3>

              <p className="text-text-muted text-sm mb-8 leading-relaxed flex-grow">
                {demo.desc}
              </p>

              <div className="mt-auto space-y-6">
                <div className="flex flex-wrap gap-2">
                  {demo.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-mono text-text-muted border border-border px-2 py-1 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full py-4 border border-border hover:border-accent hover:bg-accent hover:text-bg-base text-white font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 group/btn">
                  En Savoir Plus
                  <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
