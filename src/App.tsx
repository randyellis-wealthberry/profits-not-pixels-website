import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Banner } from "@/components/ui/banner"
import { Swoosh } from "@/components/ui/swoosh"
import { MenuBarDemo } from "@/components/MenuBarDemo"
import { LogoCarouselDemo } from "@/components/ui/logo-carousel"
import DecryptedHeroTitle from "@/components/ui/DecryptedHeroTitle"
import DecryptedHeader from "@/components/ui/DecryptedHeader"
import SpotlightCard from "@/components/ui/SpotlightCard"
import BoardroomFluencyFeatures from "@/components/mvpblocks/feature-3"
import { ArrowRight, BookOpen, Star, Users, Megaphone } from "lucide-react"
import { useHeroCTAVariant, useBookCoverVariant, useFeatureFlag } from "@/hooks/use-feature-flags"
import { useAnnouncementBanner } from "@/hooks/use-banner"
import { FlagDebugger } from "@/components/FlagDebugger"
import { useEffect } from "react"
import { cleanupSharedObserver } from "@/hooks/use-intersection-observer"

// Direct imports for critical components that need immediate loading
import Testimonials from "@/components/ui/testimonials-columns-1"
import { FAQ } from "@/components/ui/faq-section"
import { Footer2 } from "@/components/ui/footer2"
import { AppleCardsCarouselDemo } from "@/components/apple-cards-carousel-demo"

function App() {
  // Feature flag hooks
  const { variant: ctaVariant, buttonConfig, trackConversion } = useHeroCTAVariant();
  const { bookCoverSrc } = useBookCoverVariant();
  const appleCardsEnabled = useFeatureFlag('apple-cards-enabled');
  
  // Banner hook
  const { isVisible: bannerVisible, closeBanner, config: bannerConfig } = useAnnouncementBanner();
  
  // Cleanup effect for memory leak prevention
  useEffect(() => {
    return () => {
      cleanupSharedObserver();
    };
  }, []);
  
  // Debug logging
  console.log('Feature flags debug:', { 
    appleCardsEnabled,
    ctaVariant,
    bookCoverSrc,
    localStorage_flags: typeof window !== 'undefined' ? {
      'apple-cards-enabled': localStorage.getItem('flag-apple-cards-enabled'),
      'hero-cta-variant': localStorage.getItem('flag-hero-cta-variant'),
      'hero-book-cover': localStorage.getItem('flag-hero-book-cover')
    } : 'server-side'
  });
  
  // Component render debugging
  console.log('App render - appleCardsEnabled:', appleCardsEnabled);
  console.log('Will render Apple Cards section:', !!appleCardsEnabled);

  return (
    <div className="min-h-screen bg-[#1e293b] text-white">
      {/* Global Banner */}
      {bannerVisible && (
        <div className="fixed top-0 left-0 right-0 z-[9999]">
          <Banner
            variant="announcement"
            isClosable
            onClose={closeBanner}
            icon={<Megaphone className="h-6 w-6" />}
            action={
              bannerConfig.actionText && (
                <Button 
                  variant="ghost" 
                  size="default"
                  className="text-white border border-white hover:bg-white/10 hover:text-white font-semibold px-4 py-2"
                  onClick={() => {
                    if (bannerConfig.actionUrl) {
                      document.querySelector(bannerConfig.actionUrl)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {bannerConfig.actionText}
                </Button>
              )
            }
          >
            <div className="text-sm font-medium">
              {bannerConfig.content}
            </div>
          </Banner>
        </div>
      )}

      {/* Navigation Header */}
      <header className={`fixed left-0 right-0 z-50 flex justify-center p-4 ${bannerVisible ? 'top-[52px]' : 'top-0'}`} role="banner" aria-label="Main navigation">
        <MenuBarDemo />
      </header>

      {/* Hero Section */}
      <section id="home" className={`relative min-h-screen flex items-center justify-center pb-20 overflow-hidden ${bannerVisible ? 'pt-28 md:pt-36 lg:pt-40' : 'pt-24 md:pt-32 lg:pt-36'}`} role="main" aria-label="Hero section - Profits Not Pixels book introduction">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#1e293b] to-[#0f172a]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b]/30 via-[#1e293b]/50 to-[#0f172a]/70 z-2 pointer-events-none" />
        
        <div className="relative z-10 section-container max-w-6xl mx-auto stable-grid grid lg:grid-cols-[3fr_2fr] gap-6 items-center layout-stable">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-3">
              <Badge className="bg-[#fbbf24] text-black font-semibold px-4 py-2 pointer-events-none">
                Transform Your Design Career
              </Badge>
              
              <div className="space-y-2 pointer-events-none">
                <Swoosh size="lg" className="mx-auto lg:mx-0" />
                <DecryptedHeroTitle />
              </div>
              
              <p className="text-xl lg:text-2xl text-gray-300 max-w-lg mx-auto lg:mx-0 pointer-events-none" role="doc-subtitle">
                A Guide for Designers to Shift from<br />Visual Appeal to Boardroom Fluency
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className={buttonConfig.className}
                aria-label={`${buttonConfig.text} - Profits Not Pixels book`}
                disabled={buttonConfig.disabled}
                onClick={() => trackConversion({ cta_variant: ctaVariant })}
              >
                {buttonConfig.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-[#fbbf24] text-[#fbbf24] hover:bg-[#fbbf24] hover:text-black text-lg"
                aria-label="Learn more about Profits Not Pixels book"
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-400 pointer-events-none" role="region" aria-label="Social proof metrics">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>2,500+ Designers</span>
              </div>
            </div>
          </div>

          {/* Right Content - Book Cover */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative book-cover-container group">
              <div 
                className="absolute inset-0 bg-[#fbbf24] opacity-20 blur-3xl rounded-lg transform rotate-6 pointer-events-none transition-all duration-700 group-hover:opacity-40 group-hover:scale-110 group-hover:rotate-12"
                style={{ willChange: 'transform', transform: 'rotate(6deg) translateZ(0)' }}
              ></div>
              <img
                src={bookCoverSrc}
                alt="Profits Not Pixels book cover - A comprehensive guide for designers to master boardroom fluency and transform their careers from visual appeal to strategic business impact"
                className="relative z-10 book-cover-fixed shadow-2xl rounded-lg transform transition-all duration-700 ease-out cursor-pointer group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-[0_25px_50px_-12px_rgba(251,191,36,0.25)]"
                style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                loading="eager"
                width="400"
                height="600"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#fbbf24]/0 via-[#fbbf24]/0 to-[#fbbf24]/0 rounded-lg transition-all duration-700 group-hover:from-[#fbbf24]/5 group-hover:via-[#fbbf24]/10 group-hover:to-[#fbbf24]/5 pointer-events-none z-5"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Carousel Section */}
      <LogoCarouselDemo />

      {/* Testimonials Section */}
      <section id="testimonials" aria-label="Customer testimonials and reviews for Profits Not Pixels book" itemScope itemType="https://schema.org/Product">
        <meta itemProp="name" content="Profits, Not Pixels" />
        <meta itemProp="description" content="A Guide for Designers to Shift from Visual Appeal to Boardroom Fluency" />
        <Testimonials />
      </section>

      {/* Apple Cards Carousel Section - Feature Flag Controlled */}
      {appleCardsEnabled && <AppleCardsCarouselDemo />}

      {/* Boardroom Fluency Features Section */}
      <BoardroomFluencyFeatures />

      {/* About the Book Section */}
      <section id="about" className="py-20 bg-[#0f172a]" aria-label="About Profits Not Pixels book details and learning outcomes">
        <div className="section-container stable-grid grid lg:grid-cols-2 gap-12 items-center layout-stable">
          <div className="space-y-8">
            <div className="space-y-4">
              <Swoosh size="md" />
              <DecryptedHeader
                text="About the Book"
                highlightWords={["Book"]}
                triggerDelay={400}
              />
            </div>
            
            <p className="text-lg text-gray-300">
              "Profits, Not Pixels" bridges the gap between aesthetic excellence and business impact. This isn't about abandoning good design—it's about amplifying its strategic power.
            </p>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-[#fbbf24]" id="what-youll-learn">What You'll Learn:</h3>
              <ul className="space-y-3 text-gray-300" role="list" aria-label="Key learning outcomes from Profits Not Pixels book">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#fbbf24] rounded-full mt-2 flex-shrink-0"></div>
                  <span>How to translate design decisions into business language</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#fbbf24] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Frameworks for presenting design work to executives</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#fbbf24] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Strategies for positioning design as a profit center</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#fbbf24] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Building cross-functional relationships that drive career growth</span>
                </li>
              </ul>
            </div>

            <Button 
              size="lg" 
              className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-semibold text-lg"
              aria-label="Purchase and start reading Profits Not Pixels today"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Start Reading Today
            </Button>
          </div>

          <div className="flex justify-center">
            <div className="relative book-cover-container group">
              <div className="absolute inset-0 bg-[#fbbf24] opacity-20 blur-3xl rounded-lg transform rotate-3 pointer-events-none transition-all duration-700 group-hover:opacity-40 group-hover:scale-110 group-hover:rotate-12"></div>
              <img
                src="/book-cover-with-author.png"
                alt="Profits Not Pixels book cover featuring author Randy M. Ellis - Design career transformation guide for boardroom fluency and business strategy"
                className="relative z-10 book-cover-fixed rounded-lg shadow-2xl transform transition-all duration-700 ease-out cursor-pointer group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-[0_25px_50px_-12px_rgba(251,191,36,0.25)]"
                loading="lazy"
                width="400"
                height="600"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#fbbf24]/0 via-[#fbbf24]/0 to-[#fbbf24]/0 rounded-lg transition-all duration-700 group-hover:from-[#fbbf24]/5 group-hover:via-[#fbbf24]/10 group-hover:to-[#fbbf24]/5 pointer-events-none z-5"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Section */}
      <section id="corporate" className="py-20 bg-gradient-to-b from-[#0f172a] to-[#1e293b]" aria-label="Corporate solutions and enterprise training services">
        <div className="section-container text-center space-y-12">
          <div className="space-y-6">
            <Swoosh size="md" className="mx-auto" />
            <DecryptedHeader
              text="Corporate Solutions"
              highlightWords={["Corporate"]}
              triggerDelay={600}
            />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your entire design organization with enterprise-level training and strategic consulting.
            </p>
          </div>

          <div className="stable-grid grid md:grid-cols-3 gap-8 layout-stable" itemScope itemType="https://schema.org/ServiceCatalog">
            <SpotlightCard 
              className="p-6" 
              spotlightColor="rgba(251, 191, 36, 0.15)"
            >
              <div className="space-y-4" itemScope itemType="https://schema.org/Service">
                <div className="w-12 h-12 bg-[#fbbf24] rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white" id="team-training" itemProp="name">Team Training</h3>
                <p className="text-gray-300" itemProp="description">
                  Comprehensive workshops to elevate your design team's business acumen and strategic thinking.
                </p>
                <meta itemProp="serviceType" content="Training" />
                <meta itemProp="provider" content="Profits Not Pixels" />
              </div>
            </SpotlightCard>

            <SpotlightCard 
              className="p-6" 
              spotlightColor="rgba(251, 191, 36, 0.15)"
            >
              <div className="space-y-4" itemScope itemType="https://schema.org/Service">
                <div className="w-12 h-12 bg-[#fbbf24] rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white" id="strategic-consulting" itemProp="name">Strategic Consulting</h3>
                <p className="text-gray-300" itemProp="description">
                  Custom consulting to align your design organization with business objectives and growth strategies.
                </p>
                <meta itemProp="serviceType" content="Consulting" />
                <meta itemProp="provider" content="Profits Not Pixels" />
              </div>
            </SpotlightCard>

            <SpotlightCard 
              className="p-6" 
              spotlightColor="rgba(251, 191, 36, 0.15)"
            >
              <div className="space-y-4" itemScope itemType="https://schema.org/Service">
                <div className="w-12 h-12 bg-[#fbbf24] rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white" id="leadership-development" itemProp="name">Leadership Development</h3>
                <p className="text-gray-300" itemProp="description">
                  Executive coaching and leadership development programs for design leaders and directors.
                </p>
                <meta itemProp="serviceType" content="Coaching" />
                <meta itemProp="provider" content="Profits Not Pixels" />
              </div>
            </SpotlightCard>
          </div>

          <Button 
            size="lg" 
            className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-semibold text-lg px-8"
          >
            Schedule Consultation
          </Button>
        </div>
      </section>

      {/* About the Author Section */}
      <section id="author" className="py-20 bg-gradient-to-t from-[#1e293b] to-[#0f172a]" aria-label="About Randy M. Ellis - Author biography and credentials">
        <div className="section-container text-center space-y-12">
          <div className="space-y-6">
            <Swoosh size="md" className="mx-auto" />
            <DecryptedHeader
              text="About the Author"
              highlightWords={["Author"]}
              triggerDelay={800}
            />
          </div>

          <Card className="bg-gray-800/50 border-gray-700 p-8">
            <CardContent className="space-y-6">
              <div className="w-32 h-32 mx-auto bg-gray-600 rounded-full flex items-center justify-center">
                <Users className="h-16 w-16 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white" id="author-bio">Randy M. Ellis</h3>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  An experienced designer and business strategist who has helped hundreds of designers transition from pixel-pushers to profit-drivers. With over 15 years in design leadership roles at Fortune 500 companies, Randy understands both sides of the creative-business divide and specializes in teaching designers how to speak the language of business executives.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Badge variant="outline" className="border-[#fbbf24] text-[#fbbf24]">
                    Design Leadership
                  </Badge>
                  <Badge variant="outline" className="border-[#fbbf24] text-[#fbbf24]">
                    Business Strategy
                  </Badge>
                  <Badge variant="outline" className="border-[#fbbf24] text-[#fbbf24]">
                    Executive Coaching
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Participate Section */}
      <section id="participate" className="py-20 bg-[#1e293b]" aria-label="Community participation and engagement opportunities">
        <div className="section-container text-center space-y-8">
          <div className="space-y-6">
            <Swoosh size="md" className="mx-auto" />
            <DecryptedHeader
              text="Participate in the Movement"
              highlightWords={["Participate"]}
              triggerDelay={1000}
            />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join a community of designers who are transforming how the industry approaches business strategy.
            </p>
          </div>

          <div className="stable-grid grid md:grid-cols-2 gap-8 layout-stable">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <CardContent className="space-y-4">
                <h3 className="text-xl font-semibold text-white" id="community-access">Community Access</h3>
                <p className="text-gray-300">
                  Connect with like-minded designers, share experiences, and learn from industry leaders.
                </p>
                <Button 
                  variant="outline" 
                  className="border-[#fbbf24] text-[#fbbf24] hover:bg-[#fbbf24] hover:text-black"
                >
                  Join Community
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <CardContent className="space-y-4">
                <h3 className="text-xl font-semibold text-white" id="monthly-workshops">Monthly Workshops</h3>
                <p className="text-gray-300">
                  Attend live sessions on business strategy, executive communication, and career advancement.
                </p>
                <Button 
                  variant="outline" 
                  className="border-[#fbbf24] text-[#fbbf24] hover:bg-[#fbbf24] hover:text-black"
                >
                  View Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-20 bg-[#1e293b]" aria-label="Call to action - Purchase Profits Not Pixels book">
        <div className="section-container text-center space-y-8">
          <Swoosh size="lg" className="mx-auto" />
          
          <DecryptedHeader
            text="Ready to Master Boardroom Fluency?"
            highlightWords={["Boardroom Fluency"]}
            triggerDelay={1200}
          />
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of designers who have transformed their careers from creative executors to strategic leaders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-semibold text-xl px-12"
              aria-label="Purchase your copy of Profits Not Pixels book now"
            >
              Get Your Copy Now
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>

          <p className="text-sm text-gray-400">
            30-day money-back guarantee • Instant digital download • Bonus resources included
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer2 />
      
      {/* Feature Flag Debugger (Development Only) */}
      <FlagDebugger />
    </div>
  )
}

export default App