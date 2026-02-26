'use client'

import Script from 'next/script'

export interface MetaPixelProps {
  /** Meta (Facebook) Pixel ID (e.g., '1275259234564588') */
  pixelId: string
  /** Load strategy (default: 'afterInteractive') */
  strategy?: 'afterInteractive' | 'lazyOnload' | 'beforeInteractive'
  /** Disable automatic PageView tracking (default: false) */
  disablePageView?: boolean
}

const PIXEL_ID_PATTERN = /^\d{15,16}$/

export function MetaPixel({
  pixelId,
  strategy = 'afterInteractive',
  disablePageView = false
}: MetaPixelProps) {
  // Don't render if no pixel ID or invalid format
  if (!pixelId || !PIXEL_ID_PATTERN.test(pixelId)) {
    return null
  }

  const pageViewScript = disablePageView ? '' : `fbq('track', 'PageView');`

  return (
    <>
      <Script id="meta-pixel-init" strategy={strategy}>
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          ${pageViewScript}
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

/**
 * Track a Meta Pixel event
 * Call this function to track custom events after the pixel is loaded
 *
 * @example
 * // Standard event
 * trackMetaEvent('Lead')
 * trackMetaEvent('Purchase', { value: 99.99, currency: 'USD' })
 *
 * // Custom event
 * trackMetaEvent('CustomEvent', { custom_param: 'value' })
 */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (params) {
      window.fbq('track', eventName, params)
    } else {
      window.fbq('track', eventName)
    }
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    fbq: (
      action: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void
  }
}
