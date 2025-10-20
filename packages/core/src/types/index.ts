export interface SiteConfig {
  site: {
    name: string
    title: string
    description: string
    url: string
    author: string
  }
  navigation: NavItem[]
  footer: FooterConfig
  social?: SocialLinks
  theme?: ThemeConfig
  seo?: SEOConfig
  analytics?: AnalyticsConfig
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface FooterConfig {
  copyright: string
  links?: NavItem[]
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
