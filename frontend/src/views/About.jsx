import React from "react";
import * as Icons from "lucide-react";

export default function About({ onBackToHome }) {
  const coreFeatures = [
    { title: "Intelligent Query Parsing", desc: "Our Express.js backend parses user search strings and extracts categories, price conditions, tags, and mobile filters dynamically to serve the most relevant software recommendations." },
    { title: "Real-Time Comparisons", desc: "Users can select up to 3 tools side-by-side to review their pricing structure, platforms, ease of use, highlighted advantages, and website links in a single unified table." },
    { title: "Universal Day/Night Theme", desc: "Configured with a custom-engineered Tailwind CSS v4 class variant that lets users transition seamlessly between a crisp, high-contrast Day theme and a sleek, flat pure-black Night theme." }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 relative z-10 text-left">
      <button onClick={onBackToHome} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-800 bg-gray-950/40 text-xs text-gray-400 hover:text-white transition duration-200 cursor-pointer mb-8"><Icons.ArrowLeft className="w-3.5 h-3.5" />Back to Home</button>

      <div className="mb-12 border-b border-gray-800/60 pb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-4"><Icons.Sparkles className="w-3.5 h-3.5" />The Platform Vision</span>
        <h2 className="font-display font-extrabold text-4xl text-white mb-4">About Findora</h2>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">Findora is a smart workflow and platform discovery system built to help creators, developers, designers, and students bypass search engine clutter and instantly find the best websites, tools, and digital setups.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="glass-card rounded-2xl p-6">
          <Icons.Eye className="w-8 h-8 text-indigo-400 mb-3" />
          <h3 className="font-display font-bold text-lg text-white mb-2">Our Mission</h3>
          <p className="text-sm text-gray-400 leading-relaxed">Finding software online shouldn't require reading pages of sponsored reviews and SEO bait. Our mission is to curate the internet's best digital resources into flat, easy-to-explore, and transparent specs grids that are 100% free of advertising bloat.</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <Icons.Zap className="w-8 h-8 text-pink-400 mb-3" />
          <h3 className="font-display font-bold text-lg text-white mb-2">Smart Workflows</h3>
          <p className="text-sm text-gray-400 leading-relaxed">Individual tools don't solve projects. The real magic happens when we connect tools together. Findora sequences tools into efficient integrated pipelines (e.g. YouTube Factory, Dev Loops) so that you can see exactly how tools fit together.</p>
        </div>
      </div>

      <div className="space-y-8 mb-16">
        <h3 className="font-display font-extrabold text-xl text-white border-b border-gray-900 pb-3">Core Engine Features</h3>
        {coreFeatures.map((feat, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <Icons.Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5 bg-indigo-500/10 rounded border border-indigo-500/20 p-0.5" />
            <div>
              <h4 className="font-display font-bold text-sm text-white">{feat.title}</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6 bg-zinc-950/20 text-center">
        <h4 className="font-display font-bold text-base text-white mb-2">Technical Architecture</h4>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-xs text-gray-400">
          <span className="flex items-center gap-2"><Icons.Code2 className="w-4 h-4 text-indigo-400" />React.js & Tailwind v4</span>
          <span className="flex items-center gap-2"><Icons.Server className="w-4 h-4 text-indigo-400" />Express & Node.js</span>
          <span className="flex items-center gap-2"><Icons.Database className="w-4 h-4 text-indigo-400" />Local JSON Datastore</span>
        </div>
      </div>
    </div>
  );
}