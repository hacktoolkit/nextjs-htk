'use client';

import { ReactNode } from 'react';

export interface BasicPageLayoutProps {
  title: string;
  heading: string;
  intro?: string | ReactNode;
  children?: ReactNode;
  /**
   * Wrapper component for the entire page (e.g., your Layout component)
   * Will receive children and title prop
   */
  Layout: React.ComponentType<{ children: ReactNode; title: string }>;
  /**
   * Optional className for the h1 heading
   */
  headingClassName?: string;
  /**
   * Optional className for the page wrapper
   */
  pageClassName?: string;
  /**
   * Optional className for the container
   */
  containerClassName?: string;
  /**
   * Optional className for the intro text
   */
  introClassName?: string;
  /**
   * Optional className for the content grid
   */
  contentGridClassName?: string;
}

/**
 * A reusable page layout component for basic content pages.
 * Provides a standard structure with title, heading, intro text, and content area.
 *
 * @example
 * ```tsx
 * <BasicPageLayout
 *   Layout={MyLayout}
 *   title="About Us"
 *   heading="About Our Company"
 *   intro="Learn more about who we are"
 *   headingClassName={myFont.className}
 * >
 *   <p>Page content here</p>
 * </BasicPageLayout>
 * ```
 */
export function BasicPageLayout({
  title,
  heading,
  intro,
  children,
  Layout,
  headingClassName,
  pageClassName = 'basic-page',
  containerClassName = 'basic-page-container',
  introClassName = 'basic-page-intro',
  contentGridClassName = 'basic-page-content-grid',
}: BasicPageLayoutProps) {
  return (
    <Layout title={title}>
      <div className={pageClassName}>
        <div className={containerClassName}>
          <h1 className={headingClassName}>{heading}</h1>
          {intro && <div className={introClassName}>{intro}</div>}
          {children && <div className={contentGridClassName}>{children}</div>}
        </div>
      </div>
    </Layout>
  );
}
