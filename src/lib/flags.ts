// Feature flags for the Profits Not Pixels website
// This is a simple client-side feature flag system that can be enhanced with Vercel flags later

// Feature flag definitions
export const flagDefinitions = {
  'hero-cta-variant': {
    key: 'hero-cta-variant',
    defaultValue: 'coming-soon' as const,
    description: 'Test different CTA button text and styling variants',
    options: ['coming-soon', 'pre-order', 'early-access'] as const
  },

  'apple-cards-enabled': {
    key: 'apple-cards-enabled',
    defaultValue: true,
    description: 'Enable/disable the Apple Cards carousel section',
    options: [true, false] as const
  },

  'faq-default-state': {
    key: 'faq-default-state',
    defaultValue: 'collapsed' as const,
    description: 'Control default state of FAQ accordion items',
    options: ['collapsed', 'first-expanded', 'all-expanded'] as const
  },

  'hero-book-cover': {
    key: 'hero-book-cover',
    defaultValue: 'updated' as const,
    description: 'Test different book cover images in hero section',
    options: ['updated', 'minimalist', 'landing-page'] as const
  },

  'testimonials-layout': {
    key: 'testimonials-layout',
    defaultValue: 'carousel' as const,
    description: 'Test different testimonials presentation layouts',
    options: ['carousel', 'grid', 'single'] as const
  },

  'value-proposition-style': {
    key: 'value-proposition-style',
    defaultValue: 'standard' as const,
    description: 'Test different value proposition presentations',
    options: ['standard', 'emphasis', 'minimal'] as const
  }
};

// Type definitions for better TypeScript support
export type FlagValues = {
  'hero-cta-variant': 'coming-soon' | 'pre-order' | 'early-access';
  'apple-cards-enabled': boolean;
  'faq-default-state': 'collapsed' | 'first-expanded' | 'all-expanded';
  'hero-book-cover': 'updated' | 'minimalist' | 'landing-page';
  'testimonials-layout': 'carousel' | 'grid' | 'single';
  'value-proposition-style': 'standard' | 'emphasis' | 'minimal';
};

// Helper function to get flag values with type safety
export const getFlagValue = <K extends keyof FlagValues>(
  key: K,
  overrideValue?: FlagValues[K]
): FlagValues[K] => {
  // Check for override value first (for testing)
  if (overrideValue !== undefined) {
    return overrideValue;
  }
  
  // Check localStorage for development overrides
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(`flag-${key}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed;
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }
  
  // Return default value
  const flagDef = flagDefinitions[key];
  return flagDef?.defaultValue as FlagValues[K];
};

// Helper function to set flag values (for development/testing)
export const setFlagValue = <K extends keyof FlagValues>(
  key: K,
  value: FlagValues[K]
): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`flag-${key}`, JSON.stringify(value));
  }
};