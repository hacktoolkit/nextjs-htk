'use client'

import Script from 'next/script'

export interface GoogleAnalyticsProps {
  /** Google Analytics Measurement ID (e.g., 'G-XXXXXXXXXX') */
  measurementId: string
  /** Load strategy (default: 'afterInteractive') */
  strategy?: 'afterInteractive' | 'lazyOnload' | 'beforeInteractive'
}

export function GoogleAnalytics({
  measurementId,
  strategy = 'afterInteractive'
}: GoogleAnalyticsProps) {
  // Don't render if no measurement ID or placeholder
  if (!measurementId || measurementId.startsWith('[PLACEHOLDER')) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy={strategy}
      />
      <Script id="google-analytics" strategy={strategy}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}
