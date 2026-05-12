import FloatingVideoWidget from './components/FloatingVideoWidget'

export default function App() {
  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 60%), #080810',
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-sm font-medium"
          style={{
            background: 'rgba(129,140,248,0.12)',
            border: '1px solid rgba(129,140,248,0.25)',
            color: '#a5b4fc',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-indigo-400"
            style={{ boxShadow: '0 0 6px #818cf8' }}
          />
          Floating Video Widget · Demo
        </div>

        {/* Heading */}
        <h1
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 max-w-3xl"
          style={{
            background: 'linear-gradient(160deg, #fff 40%, rgba(255,255,255,0.4))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.08,
            margin: '0 0 24px',
          }}
        >
          Convert visitors with
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #818cf8, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            video that sells
          </span>
        </h1>

        <p
          className="text-lg sm:text-xl max-w-xl leading-relaxed mb-10"
          style={{ color: 'rgba(255,255,255,0.42)' }}
        >
          A premium floating video widget for modern SaaS — non-intrusive, beautifully animated,
          and purpose-built to drive conversions.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {[
            'Framer Motion',
            'Lazy-loaded video',
            'Mobile responsive',
            'Zero layout shift',
            'Fully customisable',
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Pointer hint */}
        <div
          className="flex items-center gap-2.5 text-sm"
          style={{ color: 'rgba(255,255,255,0.28)' }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-4 h-4"
          >
            <path
              d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.819m2.562-5.84a14.927 14.927 0 00-2.561 6.176m0 0a6 6 0 005.819 1.686m-3.258-6.86a14.927 14.927 0 00-6.175 2.562"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Click the bubble in the bottom-right corner
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-4 h-4"
          >
            <path d="M17 8l4 4-4 4M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* ─── WIDGET ──────────────────────────────────────────────────── */}
      <FloatingVideoWidget
        videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        title="See How It Works"
        subtitle="2 min · No signup needed"
        description="Watch how our platform eliminates busywork and helps your team ship 3× faster. Trusted by 12,000+ teams."
        ctaText="Start Free Trial"
        ctaHref="#"
        brandName="Acme"
        badgeText="LIVE DEMO"
        accentColor="#818cf8"
        gradientFrom="#818cf8"
        gradientTo="#c084fc"
        initialDelay={1200}
        tooltipDuration={5000}
      />
    </div>
  )
}
