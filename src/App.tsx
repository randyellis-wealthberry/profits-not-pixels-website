import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Swoosh } from "@/components/ui/swoosh"
import { MenuBarDemo } from "@/components/MenuBarDemo"
import { LogoCarouselDemo } from "@/components/ui/logo-carousel"
import DecryptedHeroTitle from "@/components/ui/DecryptedHeroTitle"
import { ArrowRight, BookOpen, Star, Users } from "lucide-react"
import { useHeroCTAVariant, useBookCoverVariant, useFeatureFlag } from "@/hooks/use-feature-flags"
import { FlagDebugger } from "@/components/FlagDebugger"
import React, { lazy } from "react"

// Direct imports for critical components that need immediate loading
import Testimonials from "@/components/ui/testimonials-columns-1"
import { FAQ } from "@/components/ui/faq-section"
import { Footer2 } from "@/components/ui/footer2"

// Lazy load only heavy, below-the-fold components with error handling
const BentoGridDemo = lazy(() => 
  import("@/components/ui/bento-grid-demo").then(module => {
    console.log('Bento Grid module loaded:', module);
    return module;
  }).catch(error => {
    console.error('Failed to load Bento Grid:', error);
    // Return a fallback component
    return { default: () => <div className="py-20 text-center text-gray-500">Content temporarily unavailable</div> };
  })
)
const AppleCardsCarouselDemo = lazy(() => 
  import("@/components/apple-cards-carousel-demo").then(module => {
    console.log('Apple Cards module loaded:', module);
    return { default: module.AppleCardsCarouselDemo };
  }).catch(error => {
    console.error('Failed to load Apple Cards:', error);
    // Return a fallback component
    return { default: () => <div className="py-20 text-center text-gray-500">Content temporarily unavailable</div> };
  })
)

function App() {
  // Feature flag hooks
  const { variant: ctaVariant, buttonConfig, trackConversion } = useHeroCTAVariant();
  const { bookCoverSrc } = useBookCoverVariant();
  const appleCardsEnabled = useFeatureFlag('apple-cards-enabled');
  
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
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
        <MenuBarDemo />
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 lg:pt-36 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#1e293b] to-[#0f172a]" />
        
        <div className="relative z-10 section-container stable-grid grid lg:grid-cols-2 gap-12 items-center layout-stable">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <Badge className="bg-[#fbbf24] text-black font-semibold px-4 py-2">
                Transform Your Design Career
              </Badge>
              
              <div className="space-y-4">
                <Swoosh size="lg" className="mx-auto lg:mx-0" />
                <DecryptedHeroTitle />
              </div>
              
              <p className="text-xl lg:text-2xl text-gray-300 max-w-lg mx-auto lg:mx-0">
                A Guide for Designers to Shift from Visual Appeal to Boardroom Fluency
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

            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
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
            <div className="relative book-cover-container">
              <div className="absolute inset-0 bg-[#fbbf24] opacity-20 blur-3xl rounded-lg transform rotate-6"></div>
              <img
                src={bookCoverSrc}
                alt="Profits Not Pixels Book Cover"
                className="relative z-10 book-cover-fixed shadow-2xl rounded-lg transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logo Carousel Section */}
      <LogoCarouselDemo />

      {/* Testimonials Section */}
      <div id="testimonials">
        <Testimonials />
      </div>

      {/* Apple Cards Carousel Section - Feature Flag Controlled */}
      {appleCardsEnabled && (
        <React.Suspense 
          fallback={
            <div className="py-20 bg-[#1e293b]">
              <div className="max-w-7xl mx-auto px-4">
                <div className="h-96 bg-gray-800/30 rounded-lg animate-pulse flex items-center justify-center">
                  <div className="text-gray-500">Loading Apple Cards Carousel...</div>
                </div>
              </div>
            </div>
          }
        >
          <AppleCardsCarouselDemo />
        </React.Suspense>
      )}

      {/* Value Proposition Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
        <div className="section-container">
          <div className="text-center space-y-6 mb-16">
            <Swoosh size="md" className="mx-auto" />
            <h2 className="text-4xl lg:text-5xl font-light">
              Why <span className="text-[#fbbf24]">Boardroom Fluency</span> Matters
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stop being seen as just a "creative." Learn to speak the language of business and become an indispensable strategic partner.
            </p>
          </div>

          <React.Suspense 
            fallback={
              <div className="py-8">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                  <div className="h-32 bg-gray-800/30 rounded-lg animate-pulse flex items-center justify-center">
                    <div className="text-gray-500 text-sm">Loading...</div>
                  </div>
                  <div className="h-32 bg-gray-800/30 rounded-lg animate-pulse flex items-center justify-center">
                    <div className="text-gray-500 text-sm">Loading...</div>
                  </div>
                  <div className="h-32 bg-gray-800/30 rounded-lg animate-pulse flex items-center justify-center">
                    <div className="text-gray-500 text-sm">Loading...</div>
                  </div>
                </div>
              </div>
            }
          >
            <BentoGridDemo />
          </React.Suspense>
        </div>
      </section>

      {/* About the Book Section */}
      <section id="about" className="py-20 bg-[#0f172a]">
        <div className="section-container stable-grid grid lg:grid-cols-2 gap-12 items-center layout-stable">
          <div className="space-y-8">
            <div className="space-y-4">
              <Swoosh size="md" />
              <h2 className="text-4xl lg:text-5xl font-light">
                About the <span className="text-[#fbbf24]">Book</span>
              </h2>
            </div>
            
            <p className="text-lg text-gray-300">
              "Profits, Not Pixels" bridges the gap between aesthetic excellence and business impact. This isn't about abandoning good design—it's about amplifying its strategic power.
            </p>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-[#fbbf24]">What You'll Learn:</h3>
              <ul className="space-y-3 text-gray-300">
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
            <div className="relative book-cover-container">
              <div className="absolute inset-0 bg-[#fbbf24] opacity-20 blur-3xl rounded-lg transform rotate-3"></div>
              <img
                src="/book-cover-with-author.png"
                alt="Profits Not Pixels Book Cover by Randy M. Ellis"
                className="relative z-10 book-cover-fixed rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Section */}
      <section id="corporate" className="py-20 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
        <div className="section-container text-center space-y-12">
          <div className="space-y-6">
            <Swoosh size="md" className="mx-auto" />
            <h2 className="text-4xl lg:text-5xl font-light">
              <span className="text-[#fbbf24]">Corporate</span> Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your entire design organization with enterprise-level training and strategic consulting.
            </p>
          </div>

          <div className="stable-grid grid md:grid-cols-3 gap-8 layout-stable">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-[#fbbf24] rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white">Team Training</h3>
                <p className="text-gray-300">
                  Comprehensive workshops to elevate your design team's business acumen and strategic thinking.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-[#fbbf24] rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white">Strategic Consulting</h3>
                <p className="text-gray-300">
                  Custom consulting to align your design organization with business objectives and growth strategies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-[#fbbf24] rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white">Leadership Development</h3>
                <p className="text-gray-300">
                  Executive coaching and leadership development programs for design leaders and directors.
                </p>
              </CardContent>
            </Card>
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
      <section id="author" className="py-20 bg-gradient-to-t from-[#1e293b] to-[#0f172a]">
        <div className="section-container text-center space-y-12">
          <div className="space-y-6">
            <Swoosh size="md" className="mx-auto" />
            <h2 className="text-4xl lg:text-5xl font-light">
              About the <span className="text-[#fbbf24]">Author</span>
            </h2>
          </div>

          <Card className="bg-gray-800/50 border-gray-700 p-8">
            <CardContent className="space-y-6">
              <div className="w-32 h-32 mx-auto bg-gray-600 rounded-full flex items-center justify-center">
                <Users className="h-16 w-16 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">Author Name</h3>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  An experienced designer and business strategist who has helped hundreds of designers transition from pixel-pushers to profit-drivers. With over 15 years in design leadership roles at Fortune 500 companies, they understand both sides of the creative-business divide.
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
      <section id="participate" className="py-20 bg-[#1e293b]">
        <div className="section-container text-center space-y-8">
          <div className="space-y-6">
            <Swoosh size="md" className="mx-auto" />
            <h2 className="text-4xl lg:text-5xl font-light">
              <span className="text-[#fbbf24]">Participate</span> in the Movement
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join a community of designers who are transforming how the industry approaches business strategy.
            </p>
          </div>

          <div className="stable-grid grid md:grid-cols-2 gap-8 layout-stable">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <CardContent className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Community Access</h3>
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
                <h3 className="text-xl font-semibold text-white">Monthly Workshops</h3>
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
      <section id="contact" className="py-20 bg-[#1e293b]">
        <div className="section-container text-center space-y-8">
          <Swoosh size="lg" className="mx-auto" />
          
          <h2 className="text-4xl lg:text-5xl font-light">
            Ready to Master <span className="text-[#fbbf24]">Boardroom Fluency</span>?
          </h2>
          
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