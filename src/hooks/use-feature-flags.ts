import { useEffect, useState } from 'react';
import { track } from '@vercel/analytics';
import { getFlagValue, FlagValues } from '@/lib/flags';

// Custom hook for using feature flags with analytics integration
export const useFeatureFlag = <K extends keyof FlagValues>(
  key: K,
  trackEvent: boolean = true
): FlagValues[K] => {
  const [value, setValue] = useState<FlagValues[K]>(getFlagValue(key));

  useEffect(() => {
    const currentValue = getFlagValue(key);
    setValue(currentValue);

    // Track flag usage for analytics
    if (trackEvent) {
      track('feature_flag_viewed', {
        flag_key: key,
        flag_value: String(currentValue),
        timestamp: new Date().toISOString()
      });
    }

    // Listen for localStorage changes (for development flag changes)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `flag-${key}`) {
        const newValue = getFlagValue(key);
        setValue(newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, trackEvent]);

  return value;
};

// Hook for tracking feature flag interactions
export const useFeatureFlagTracking = () => {
  const trackFlagInteraction = (
    flagKey: keyof FlagValues,
    action: string,
    additionalData?: Record<string, any>
  ) => {
    const flagValue = getFlagValue(flagKey);
    
    track('feature_flag_interaction', {
      flag_key: flagKey,
      flag_value: String(flagValue),
      action,
      ...additionalData,
      timestamp: new Date().toISOString()
    });
  };

  return { trackFlagInteraction };
};

// Hook for A/B testing with conversion tracking
export const useABTest = <K extends keyof FlagValues>(
  flagKey: K,
  conversionEvent: string
) => {
  const flagValue = useFeatureFlag(flagKey, true);
  const { trackFlagInteraction } = useFeatureFlagTracking();

  const trackConversion = (additionalData?: Record<string, any>) => {
    trackFlagInteraction(flagKey, conversionEvent, {
      conversion: true,
      ...additionalData
    });
  };

  return {
    variant: flagValue,
    trackConversion
  };
};

// Hook for hero CTA variants
export const useHeroCTAVariant = () => {
  const { variant, trackConversion } = useABTest('hero-cta-variant', 'cta_click');

  const getButtonConfig = () => {
    switch (variant) {
      case 'coming-soon':
        return {
          text: 'Coming Soon',
          className: 'bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-semibold text-lg',
          disabled: false
        };
      case 'pre-order':
        return {
          text: 'Pre-Order Now',
          className: 'bg-[#f59e0b] hover:bg-[#d97706] text-black font-semibold text-lg',
          disabled: false
        };
      case 'early-access':
        return {
          text: 'Get Early Access',
          className: 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] text-black font-semibold text-lg',
          disabled: false
        };
      default:
        return {
          text: 'Coming Soon',
          className: 'bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-semibold text-lg',
          disabled: false
        };
    }
  };

  return {
    variant,
    buttonConfig: getButtonConfig(),
    trackConversion
  };
};

// Hook for book cover variants
export const useBookCoverVariant = () => {
  const variant = useFeatureFlag('hero-book-cover');

  const getBookCoverSrc = () => {
    switch (variant) {
      case 'updated':
        return '/Profits Not Pixels Updated Book Cover.png';
      case 'minimalist':
        return '/Profits Not Pixels Minimalist Book Cover.png';
      case 'landing-page':
        return '/Profits Not Pixels Minimalist Website Landing Page.png';
      default:
        return '/Profits Not Pixels Updated Book Cover.png';
    }
  };

  return {
    variant,
    bookCoverSrc: getBookCoverSrc()
  };
};

// Hook for FAQ default state
export const useFAQDefaultState = () => {
  const variant = useFeatureFlag('faq-default-state');

  const getDefaultOpenItems = () => {
    switch (variant) {
      case 'collapsed':
        return [];
      case 'first-expanded':
        return ['item-1'];
      case 'all-expanded':
        return ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7', 'item-8'];
      default:
        return [];
    }
  };

  return {
    variant,
    defaultOpenItems: getDefaultOpenItems()
  };
};