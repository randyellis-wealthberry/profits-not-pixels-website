import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Swoosh } from "@/components/ui/swoosh"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MenuBarDemo } from "@/components/MenuBarDemo"
import AnimatedTestimonialsDemo from "@/components/AnimatedTestimonialsDemo"
import { ArrowRight, TrendingUp, Users, Target, BookOpen, Star } from "lucide-react"

function App() {
  return (
    <div className="min-h-screen bg-[#1e293b] text-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
        <MenuBarDemo />
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#1e293b] to-[#0f172a]" />
        
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <Badge className="bg-[#fbbf24] text-black font-semibold px-4 py-2">
                Transform Your Design Career
              </Badge>
              
              <div className="space-y-4">
                <Swoosh size="lg" className="mx-auto lg:mx-0" />
                <h1 className="text-5xl lg:text-7xl font-light tracking-tight">
                  PROFITS,<br />
                  <span className="text-[#fbbf24]">NOT</span><br />
                  PIXELS
                </h1>
              </div>
              
              <p className="text-xl lg:text-2xl text-gray-300 max-w-lg mx-auto lg:mx-0">
                A Guide for Designers to Shift from Visual Appeal to Boardroom Fluency
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-semibold px-8 py-6 text-lg"
              >
                Coming Soon
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-[#fbbf24] text-[#fbbf24] hover:bg-[#fbbf24] hover:text-black px-8 py-6 text-lg"
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
            <div className="relative">
              <div className="absolute inset-0 bg-[#fbbf24] opacity-20 blur-3xl rounded-lg transform rotate-6"></div>
              <img
                src="/Profits Not Pixels Minimalist Book Cover.png"
                alt="Profits Not Pixels Book Cover"
                className="relative z-10 w-80 lg:w-96 h-auto shadow-2xl rounded-lg transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <Swoosh size="md" className="mx-auto" />
            <h2 className="text-4xl lg:text-5xl font-light">
              Why <span className="text-[#fbbf24]">Boardroom Dominance</span> Matters
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stop being seen as just a "creative." Learn to speak the language of business and become an indispensable strategic partner.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-[#fbbf24] mb-4" />
                <CardTitle className="text-white">Strategic Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Transform from executing tasks to driving business outcomes. Learn to connect design decisions to revenue growth.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <Users className="h-12 w-12 text-[#fbbf24] mb-4" />
                <CardTitle className="text-white">Executive Presence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Command respect in C-suite meetings. Present design work that resonates with business leaders and stakeholders.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <Target className="h-12 w-12 text-[#fbbf24] mb-4" />
                <CardTitle className="text-white">Career Acceleration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Position yourself for leadership roles. Move beyond traditional design boundaries into strategic positions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About the Book Section */}
      <section id="about" className="py-20 px-6 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
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
              className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-semibold px-8 py-6 text-lg"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Start Reading Today
            </Button>
          </div>

          <div className="flex justify-center">
            <img
              src="/Profits Not Pixels Minimalist Website Landing Page.png"
              alt="Book Preview"
              className="w-full max-w-md h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-[#1e293b]">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <Swoosh size="md" className="mx-auto" />
            <h2 className="text-4xl lg:text-5xl font-light">
              What <span className="text-[#fbbf24]">Readers</span> Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of designers who have transformed their careers from creative executors to strategic leaders.
            </p>
          </div>
          <ScrollArea className="h-[400px] w-full">
            <AnimatedTestimonialsDemo />
          </ScrollArea>
        </div>
      </section>

      {/* About the Author Section */}
      <section id="author" className="py-20 px-6 bg-gradient-to-t from-[#1e293b] to-[#0f172a]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
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

      {/* Final CTA Section */}
      <section id="contact" className="py-20 px-6 bg-[#1e293b]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Swoosh size="lg" className="mx-auto" />
          
          <h2 className="text-4xl lg:text-5xl font-light">
            Ready to Dominate the <span className="text-[#fbbf24]">Boardroom</span>?
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of designers who have transformed their careers from creative executors to strategic leaders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-semibold px-12 py-6 text-xl"
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
      <footer className="py-12 px-6 bg-[#0f172a] border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Swoosh size="sm" />
            <span className="text-lg font-semibold">Profits, Not Pixels</span>
          </div>
          
          <p className="text-gray-400">
            © 2024 Profits, Not Pixels. All rights reserved.
          </p>
          
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#fbbf24] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#fbbf24] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#fbbf24] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App