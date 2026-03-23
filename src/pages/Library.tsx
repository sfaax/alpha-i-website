import { ArrowUpRight } from 'lucide-react';

export default function Library() {
  const demos = [
    {
      title: "Agent IA Support Client",
      category: "NLP & Chatbot",
      desc: "Un agent conversationnel capable de résoudre 80% des requêtes clients en autonomie avec analyse de sentiment.",
      tags: ["GPT-4", "Vector DB", "React"]
    },
    {
      title: "Générateur de Visuels Produits",
      category: "Computer Vision",
      desc: "Système de génération d'images photoréalistes pour e-commerce à partir de simples descriptions textuelles.",
      tags: ["Stable Diffusion", "Python", "FastAPI"]
    },
    {
      title: "Analyseur de Contrats Juridiques",
      category: "Document Processing",
      desc: "Extraction automatique des clauses clés et détection d'anomalies dans les documents juridiques complexes.",
      tags: ["OCR", "LLM", "Node.js"]
    },
    {
      title: "Moteur de Recommandation Prédictif",
      category: "Machine Learning",
      desc: "Algorithme d'analyse comportementale pour personnaliser l'expérience utilisateur en temps réel.",
      tags: ["TensorFlow", "Redis", "Go"]
    },
    {
      title: "Assistant Code Copilot Custom",
      category: "DevTools",
      desc: "Un assistant de codage entraîné sur la base de code interne de l'entreprise pour des suggestions hyper-contextualisées.",
      tags: ["LLM Fine-tuning", "VS Code API", "TypeScript"]
    },
    {
      title: "Dashboard Analytics IA",
      category: "Data Visualization",
      desc: "Tableau de bord intelligent qui génère automatiquement des insights narratifs à partir de données brutes.",
      tags: ["D3.js", "OpenAI API", "Next.js"]
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen pt-32 pb-24 px-8 md:px-16">
      {/* Header */}
      <section className="mb-20">
        <div className="font-mono text-accent mb-8 uppercase tracking-widest text-sm">
          [ Démos & Expérimentations ]
        </div>
        <h1 className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tight leading-none mb-8">
          La<br/>Bibliothèque
        </h1>
        <p className="text-xl text-text-muted max-w-2xl font-light leading-relaxed">
          Explorez nos systèmes d'intelligence artificielle en action. Découvrez comment nos solutions transforment la théorie en résultats concrets.
        </p>
      </section>

      {/* Grid */}
      <section className="border-t border-border pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {demos.map((demo, idx) => (
            <div key={idx} className="group flex flex-col">
              <div className="mb-6 overflow-hidden bg-surface aspect-video border border-border relative flex items-center justify-center">
                <div className="absolute inset-0 bg-bg-base/50 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <span className="font-mono text-text-muted text-xs uppercase tracking-widest z-0 opacity-50">Preview_{idx + 1}</span>
                {/* Placeholder for actual demo image/video */}
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  {demo.category}
                </span>
                <span className="font-mono text-xs text-text-muted">
                  0{idx + 1}
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
                  Lancer la Démo
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
