import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  )
}

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Pulse ring ───────────────────────────────────────────────────────────────

function PulseRing({ color }) {
  return (
    <>
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${color}` }}
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5 + i * 0.25, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
        />
      ))}
    </>
  )
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function Tooltip({ title, subtitle, badge, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute bottom-full mb-4 right-0 w-56 rounded-2xl select-none pointer-events-none"
          style={{
            background: 'rgba(10, 10, 16, 0.96)',
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 24px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
          initial={{ opacity: 0, y: 6, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.94 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <div className="px-4 py-3.5">
            <span
              className="text-[10px] font-black tracking-widest uppercase"
              style={{ color: '#818cf8' }}
            >
              {badge}
            </span>
            <p className="text-white text-sm font-semibold mt-0.5 leading-snug">{title}</p>
            <p className="text-white/45 text-xs mt-0.5">{subtitle}</p>
          </div>
          {/* Caret */}
          <div
            className="absolute right-7 bottom-0 translate-y-full"
            style={{
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '7px solid rgba(10,10,16,0.96)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function VideoModal({
  isOpen,
  onClose,
  videoSrc,
  posterSrc,
  title,
  description,
  subtitle,
  ctaText,
  ctaHref,
  brandName,
  gradientFrom,
  gradientTo,
  modalVideoRef,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9998]"
            style={{
              background: 'rgba(0,0,0,0.72)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed bottom-6 right-6 z-[9999] w-[340px] sm:w-[380px] rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(9, 9, 14, 0.98)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              boxShadow:
                '0 48px 96px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px rgba(129,140,248,0.07)',
              transformOrigin: 'bottom right',
            }}
            initial={{ scale: 0.72, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.72, opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3.5"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                    boxShadow: `0 4px 12px rgba(129,140,248,0.35)`,
                  }}
                >
                  {brandName[0].toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-semibold leading-none">{brandName}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-white/40 text-xs">{subtitle}</span>
                  </div>
                </div>
              </div>

              <motion.button
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 transition-colors hover:text-white hover:bg-white/10"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close video"
              >
                <IconClose />
              </motion.button>
            </div>

            {/* Video */}
            <div className="relative bg-black" style={{ aspectRatio: '16/9' }}>
              <video
                ref={modalVideoRef}
                muted
                controls
                playsInline
                loop
                poster={posterSrc}
                className="w-full h-full object-cover"
                preload="none"
              >
                {videoSrc && <source src={videoSrc} />}
              </video>
              {/* Bottom gradient */}
              <div
                className="absolute bottom-0 inset-x-0 h-10 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(9,9,14,0.7), transparent)' }}
              />
            </div>

            {/* Body */}
            <div className="px-5 pt-4 pb-5">
              <h3 className="text-white font-semibold text-[15px] leading-snug">{title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mt-1 mb-4">{description}</p>

              {/* CTA */}
              <motion.a
                href={ctaHref}
                target={ctaHref.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-white font-semibold text-sm cursor-pointer select-none"
                style={{
                  background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                  boxShadow: `0 8px 24px rgba(129,140,248,0.32)`,
                  textDecoration: 'none',
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 14px 36px rgba(129,140,248,0.48)`,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                {ctaText}
                <IconArrow />
              </motion.a>

              <p className="text-center text-white/22 text-xs mt-3">
                No credit card required · Cancel anytime
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Floating Bubble ──────────────────────────────────────────────────────────

function FloatingBubble({ onClick, videoSrc, posterSrc, gradientFrom, gradientTo, accentColor }) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef(null)

  return (
    <motion.button
      className="relative w-[76px] h-[76px] rounded-full overflow-visible cursor-pointer focus:outline-none shrink-0"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.93 }}
      aria-label="Open product demo video"
    >
      {/* Pulse rings */}
      <PulseRing color={accentColor} />

      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          filter: 'blur(0px)',
          opacity: 0,
        }}
        animate={{ opacity: isHovered ? 0.55 : 0.25, filter: isHovered ? 'blur(12px)' : 'blur(8px)' }}
        transition={{ duration: 0.3 }}
      />

      {/* Video circle */}
      <div
        className="absolute inset-[2px] rounded-full overflow-hidden"
        style={{
          background: '#0a0a0f',
          boxShadow: `0 0 0 2px rgba(255,255,255,0.1), 0 12px 32px rgba(0,0,0,0.55)`,
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          preload="auto"
        />

        {/* Vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* Play button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: isHovered ? 1 : 0.75 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-900"
            style={{
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
            animate={{ scale: isHovered ? 1.12 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <IconPlay />
          </motion.div>
        </motion.div>
      </div>
    </motion.button>
  )
}

// ─── Main Widget ──────────────────────────────────────────────────────────────

export default function FloatingVideoWidget({
  videoSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  posterSrc = '',
  title = 'See It in Action',
  subtitle = '2 min · No signup needed',
  description = 'Watch how our platform transforms your workflow in minutes. Used by 10,000+ teams worldwide.',
  ctaText = 'Start Free Trial',
  ctaHref = '#',
  brandName = 'Acme',
  badgeText = 'LIVE DEMO',
  accentColor = '#818cf8',
  gradientFrom = '#818cf8',
  gradientTo = '#c084fc',
  initialDelay = 1200,
  tooltipDuration = 5000,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const modalVideoRef = useRef(null)

  // Delayed entrance
  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), initialDelay)
    return () => clearTimeout(t)
  }, [initialDelay])

  // Auto tooltip after mount
  useEffect(() => {
    if (!isMounted) return
    const show = setTimeout(() => setTooltipVisible(true), 400)
    const hide = setTimeout(() => setTooltipVisible(false), tooltipDuration)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [isMounted, tooltipDuration])

  // Escape key to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && isOpen) handleClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen])

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    setTooltipVisible(false)
    setTimeout(() => {
      if (modalVideoRef.current) {
        modalVideoRef.current.src = videoSrc
        modalVideoRef.current.currentTime = 0
        modalVideoRef.current.play().catch(() => {})
      }
    }, 320)
  }, [videoSrc])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    if (modalVideoRef.current) {
      modalVideoRef.current.pause()
      modalVideoRef.current.src = ''
    }
  }, [])

  return (
    <>
      {/* Floating bubble + tooltip */}
      <AnimatePresence>
        {isMounted && !isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end"
            initial={{ scale: 0, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Tooltip
              title={title}
              subtitle={subtitle}
              badge={badgeText}
              visible={tooltipVisible || isHovered}
            />

            <FloatingBubble
              onClick={handleOpen}
              videoSrc={videoSrc}
              posterSrc={posterSrc}
              gradientFrom={gradientFrom}
              gradientTo={gradientTo}
              accentColor={accentColor}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <VideoModal
        isOpen={isOpen}
        onClose={handleClose}
        videoSrc={videoSrc}
        posterSrc={posterSrc}
        title={title}
        subtitle={subtitle}
        description={description}
        ctaText={ctaText}
        ctaHref={ctaHref}
        brandName={brandName}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        modalVideoRef={modalVideoRef}
      />
    </>
  )
}
