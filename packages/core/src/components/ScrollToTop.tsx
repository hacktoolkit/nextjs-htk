'use client'

import { useEffect, useState } from 'react'

export interface ScrollToTopProps {
  /** Custom className for styling */
  className?: string
  /** Scroll threshold in pixels (default: 300) */
  threshold?: number
  /** Show scroll to top button */
  showButton?: boolean
}

const defaultStyles: React.CSSProperties = {
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  width: '3rem',
  height: '3rem',
  borderRadius: '50%',
  border: 'none',
  background: 'var(--color-primary, #007bff)',
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  transition: 'opacity 0.3s, transform 0.3s',
  opacity: 1,
  zIndex: 1000,
}

export function ScrollToTop({
  className,
  threshold = 300,
  showButton = true
}: ScrollToTopProps = {}) {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > threshold) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [threshold])

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!showButton || !isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className={className}
      style={className ? undefined : defaultStyles}
      aria-label="Scroll to top"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  )
}
