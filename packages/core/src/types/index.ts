export interface SiteConfig {
  site: {
    name: string
    title: string
    description: string
    url: string
    author: string
  }
  branding?: {
    logo?: string
    slogan?: string
    tagline?: string
  }
  business?: {
    location?: {
      address?: string
      city?: string
      state?: string
      zip?: string
      country?: string
      phone?: string
      email?: string
    }
    hours?: {
      [key: string]: {
        days: string
        display: string
      }
    }
    founding?: {
      year?: number
    }
  }
  navigation: Page[]
  footer: FooterConfig
  social?: SocialMediaLinks
  theme?: ThemeConfig
  seo?: SEOConfig
  analytics?: AnalyticsConfig
}

export interface Page {
  name: string
  path: string
  showInNav?: boolean
  openInNewTab?: boolean
}

export interface NavItem {
  label: string
  href: string
  target?: string
  rel?: string
  children?: NavItem[]
}

export interface FooterConfig {
  copyright?: string
  showLocation?: boolean
  showHours?: boolean
  showSocial?: boolean
  quickLinks?: NavItem[]
  links?: NavItem[]
}

export interface SocialMediaLink {
  url: string
  label: string
  icon: React.ReactNode
  title: string
}

export interface SocialMediaLinks {
  [key: string]: SocialMediaLink | undefined
}

export interface SocialLinks {
  twitter?: string
  github?: string
  linkedin?: string
  facebook?: string
  instagram?: string
  [key: string]: string | undefined
}

export interface ThemeConfig {
  defaultTheme?: 'light' | 'dark'
  colors?: {
    primary?: string
    secondary?: string
    [key: string]: string | undefined
  }
  fonts?: {
    body?: string
    heading?: string
    [key: string]: string | undefined
  }
}

export interface SEOConfig {
  formatTitle: (page?: string) => string
  description: {
    default: string
    [key: string]: string
  }
  defaultImage?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
}

export interface AnalyticsConfig {
  google?: string
  [key: string]: string | undefined
}

export function defineConfig(config: SiteConfig): SiteConfig {
  return config
}
