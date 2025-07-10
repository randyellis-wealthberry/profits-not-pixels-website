import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { setFlagValue, FlagValues } from '@/lib/flags';
import { useFeatureFlag } from '@/hooks/use-feature-flags';

export function FlagDebugger() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Get current flag values
  const heroCTAVariant = useFeatureFlag('hero-cta-variant', false);
  const appleCardsEnabled = useFeatureFlag('apple-cards-enabled', false);
  const faqDefaultState = useFeatureFlag('faq-default-state', false);
  const heroBookCover = useFeatureFlag('hero-book-cover', false);

  // Handle flag changes
  const handleFlagChange = <K extends keyof FlagValues>(
    key: K,
    value: FlagValues[K]
  ) => {
    setFlagValue(key, value);
    // Force page reload to see changes
    window.location.reload();
  };

  // Only show in development
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        onClick={() => setIsVisible(!isVisible)}
        className="mb-2"
        variant="outline"
        size="sm"
      >
        🏳️ Flags {isVisible ? '▲' : '▼'}
      </Button>
      
      {isVisible && (
        <Card className="w-80 max-h-96 overflow-y-auto bg-black/90 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white">Feature Flags Debug</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {/* Hero CTA Variant */}
              <div className="space-y-1">
                <label className="text-xs text-gray-300">Hero CTA Variant</label>
                <Select 
                  value={heroCTAVariant} 
                  onValueChange={(value) => handleFlagChange('hero-cta-variant', value as FlagValues['hero-cta-variant'])}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coming-soon">Coming Soon</SelectItem>
                    <SelectItem value="pre-order">Pre-Order Now</SelectItem>
                    <SelectItem value="early-access">Get Early Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Apple Cards Enabled */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">Apple Cards Enabled</span>
                <Switch 
                  checked={appleCardsEnabled} 
                  onCheckedChange={(checked) => handleFlagChange('apple-cards-enabled', checked)}
                />
              </div>
              
              {/* FAQ Default State */}
              <div className="space-y-1">
                <label className="text-xs text-gray-300">FAQ Default State</label>
                <Select 
                  value={faqDefaultState} 
                  onValueChange={(value) => handleFlagChange('faq-default-state', value as FlagValues['faq-default-state'])}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="collapsed">All Collapsed</SelectItem>
                    <SelectItem value="first-expanded">First Expanded</SelectItem>
                    <SelectItem value="all-expanded">All Expanded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Hero Book Cover */}
              <div className="space-y-1">
                <label className="text-xs text-gray-300">Hero Book Cover</label>
                <Select 
                  value={heroBookCover} 
                  onValueChange={(value) => handleFlagChange('hero-book-cover', value as FlagValues['hero-book-cover'])}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated Cover</SelectItem>
                    <SelectItem value="minimalist">Minimalist Cover</SelectItem>
                    <SelectItem value="landing-page">Landing Page Cover</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                Changes are tracked in analytics and saved locally.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}