import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

function StackedCircularFooter() {
  return (
    <footer className="bg-[#0f172a] py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8 rounded-full bg-[#fbbf24]/10 p-8">
            <img 
              src="/Profits Not Pixels Logo Mark Only Transparent.png"
              alt="Profits Not Pixels Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            <a href="#home" className="text-gray-300 hover:text-[#fbbf24] transition-colors">Home</a>
            <a href="#about" className="text-gray-300 hover:text-[#fbbf24] transition-colors">About Book</a>
            <a href="#features" className="text-gray-300 hover:text-[#fbbf24] transition-colors">Features</a>
            <a href="#testimonials" className="text-gray-300 hover:text-[#fbbf24] transition-colors">Testimonials</a>
            <a href="#author" className="text-gray-300 hover:text-[#fbbf24] transition-colors">Author</a>
            <a href="#contact" className="text-gray-300 hover:text-[#fbbf24] transition-colors">Contact</a>
          </nav>
          <div className="mb-8 flex space-x-4">
            <Button variant="outline" size="icon" className="rounded-full border-gray-700 text-gray-300 hover:bg-[#fbbf24] hover:text-black hover:border-[#fbbf24]">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-gray-700 text-gray-300 hover:bg-[#fbbf24] hover:text-black hover:border-[#fbbf24]">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-gray-700 text-gray-300 hover:bg-[#fbbf24] hover:text-black hover:border-[#fbbf24]">
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-gray-700 text-gray-300 hover:bg-[#fbbf24] hover:text-black hover:border-[#fbbf24]">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
          <div className="mb-8 w-full max-w-md">
            <form className="flex space-x-2">
              <div className="flex-grow">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input 
                  id="email" 
                  placeholder="Enter your email for updates" 
                  type="email" 
                  className="rounded-full bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-[#fbbf24]" 
                />
              </div>
              <Button 
                type="submit" 
                className="rounded-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-semibold"
              >
                Subscribe
              </Button>
            </form>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">
              © 2024 Profits, Not Pixels. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { StackedCircularFooter }