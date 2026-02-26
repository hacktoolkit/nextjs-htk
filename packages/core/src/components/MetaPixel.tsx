'use client'

import Script from 'next/script'

export interface MetaPixelProps {
  /** Meta (Facebook) Pixel ID (e.g., '1234567890123456') */
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
      {!disablePageView && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
    </>
  )
}

/**
 * Track a standard Meta Pixel event
 * Use this for Facebook's predefined standard events
 *
 * @see https://developers.facebook.com/docs/meta-pixel/reference#standard-events
 *
 * @example
 * trackMetaEvent('Lead')
 * trackMetaEvent('Purchase', { value: 99.99, currency: 'USD' })
 * trackMetaEvent('AddToCart', { content_ids: ['SKU123'], value: 29.99 })
 */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, params)
  }
}

/**
 * Track a custom Meta Pixel event
 * Use this for your own custom events (not Facebook's standard events)
 *
 * @see https://developers.facebook.com/docs/meta-pixel/reference#custom-events
 *
 * @example
 * trackMetaCustomEvent('StartTrial')
 * trackMetaCustomEvent('ShareContent', { content_type: 'article' })
 */
export function trackMetaCustomEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, params)
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    fbq: {
      (action: 'init', pixelId: string, options?: Record<string, unknown>): void
      (
        action: 'track' | 'trackCustom',
        eventName: string,
        params?: Record<string, unknown>
      ): void
      (action: string, ...args: unknown[]): void
    }
  }
}
