/**
 * Floating Video Widget — embeddable entry point.
 *
 * Loaded as a self-executing IIFE. Mounts React into a Shadow DOM so that
 * host-site CSS never leaks in or out. All Tailwind utilities are injected
 * as an inline <style> into the shadow root via the ?inline import.
 *
 * Usage on any site:
 *   <script>
 *     window.VideoWidgetConfig = { videoSrc: '...', ctaHref: '...' }
 *   </script>
 *   <script src="https://your-cdn.com/widget.js"></script>
 */
import React from 'react'
import { createRoot } from 'react-dom/client'
import FloatingVideoWidget from '../components/FloatingVideoWidget'
import widgetStyles from './widget.css?inline'

;(function () {
  'use strict'

  // Guard — one host element per page, keyed on this attribute
  const HOST_ID = '__fvw_root__'

  function mount() {
    // ── Idempotency ─────────────────────────────────────────────────────────
    if (document.getElementById(HOST_ID)) return

    const cfg = window.VideoWidgetConfig || {}

    // ── Host element ─────────────────────────────────────────────────────────
    // Zero-size fixed anchor at bottom-right.
    // overflow:visible lets shadow children paint outside the 0×0 box.
    // No transform/filter/perspective → position:fixed children remain
    // viewport-relative (not host-relative). This means the widget's own
    // `fixed` positions work exactly as they would in a normal document.
    const host = document.createElement('div')
    host.id = HOST_ID
    host.setAttribute('data-fvw', '1')
    host.style.cssText =
      'position:fixed;bottom:0;right:0;width:0;height:0;' +
      'overflow:visible;z-index:2147483647;'
    document.body.appendChild(host)

    // ── Shadow DOM ───────────────────────────────────────────────────────────
    // 'open' mode is fine for a public widget; use 'closed' only when you
    // need to prevent host-page JS from reaching inside.
    const shadow = host.attachShadow({ mode: 'open' })

    // Inject processed Tailwind CSS into the shadow root.
    // This is the ONLY place styles are injected — nothing touches document.head.
    const styleEl = document.createElement('style')
    styleEl.textContent = widgetStyles
    shadow.appendChild(styleEl)

    // React mount point — sits inside the shadow root
    const mountEl = document.createElement('div')
    shadow.appendChild(mountEl)

    // ── React ────────────────────────────────────────────────────────────────
    const reactRoot = createRoot(mountEl)

    function renderWidget(config) {
      reactRoot.render(
        React.createElement(FloatingVideoWidget, {
          videoSrc: config.videoSrc,
          posterSrc: config.posterSrc,
          title: config.title,
          subtitle: config.subtitle,
          description: config.description,
          ctaText: config.ctaText,
          ctaHref: config.ctaHref,
          brandName: config.brandName,
          badgeText: config.badgeText,
          accentColor: config.accentColor,
          gradientFrom: config.gradientFrom,
          gradientTo: config.gradientTo,
          initialDelay: config.initialDelay !== undefined ? Number(config.initialDelay) : 1200,
          tooltipDuration:
            config.tooltipDuration !== undefined ? Number(config.tooltipDuration) : 5000,
        })
      )
    }

    renderWidget(cfg)

    // ── Public API ───────────────────────────────────────────────────────────
    // Exposed on window so host-page code can control the widget.
    // Namespaced under __VideoWidget to minimise collision risk.
    window.__VideoWidget = {
      /** Fully tear down the widget and release all resources. */
      destroy() {
        reactRoot.unmount()
        host.remove()
        delete window.__VideoWidget
      },

      /** Live-update config props without a full remount. */
      update(patch) {
        Object.assign(cfg, patch)
        renderWidget(cfg)
      },

      /** Unmount + remount with a fresh config (use for SPA soft-navs). */
      reinit(newCfg) {
        this.destroy()
        window.VideoWidgetConfig = newCfg || {}
        mount()
      },
    }
  }

  // ── Auto-initialize ────────────────────────────────────────────────────────
  // Handles both sync (script at bottom) and async (script in <head>) loading.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true })
  } else {
    mount()
  }
})()
