import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plan = {
  name: 'Complete Design Leadership Package',
  price: 299,
  description: 'For designers ready to lead with business impact',
  features: [
    'Complete digital book + audiobook version',
    'Boardroom presentation templates & frameworks',
    '30-day email coaching series with actionable insights',
    'Exclusive access to private design leadership community',
  ],
  includes:
    'Book, Templates, Community Access, Coaching, and Executive Toolkit',
  companies: [
    {
      name: 'Google',
    },
    {
      name: 'Apple',
    },
    {
      name: 'Microsoft',
    },
    {
      name: 'Meta',
    },
  ],
}

export default function PricingSection() {
  return (
    <section className="py-20 bg-[#1e293b]">
      <div className="section-container max-w-6xl mx-auto px-6">
        <div className="mt-10 md:mt-20">
          <div className="relative rounded-3xl border border-gray-700/50 bg-gray-800/70 shadow-xl shadow-black/20 backdrop-blur-sm">
            <div className="grid items-center gap-12 divide-y divide-gray-700 p-12 md:grid-cols-2 md:gap-x-2 md:divide-x md:divide-y-0">
              {/* Left Side */}
              <div className="pb-12 text-center md:pb-0 md:pr-12">
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-2 text-lg text-gray-300">{plan.description}</p>
                <span className="mb-6 mt-12 inline-block text-6xl font-extrabold text-[#fbbf24]">
                  <span className="align-super text-4xl">$</span>
                  {plan.price}
                </span>
                <div className="flex justify-center">
                  <Button size="lg" className="shadow-md bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-semibold">
                    Get started
                  </Button>
                </div>
                <p className="mt-12 text-sm text-gray-400">
                  Includes: {plan.includes}
                </p>
              </div>

              {/* Right Side */}
              <div className="relative m-3">
                <div className="text-left">
                  <h4 className="mb-4 text-lg font-medium text-white">What's included:</h4>
                  <ul role="list" className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm text-gray-300"
                      >
                        <Check className="mt-1 size-4 text-[#fbbf24]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-6 text-sm text-gray-400">
                  Join 2,500+ designers who've accelerated their careers.
                  Companies using our platform include:
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-start gap-6">
                  {plan.companies.map((company, i) => (
                    <div
                      key={i}
                      className="text-gray-400 text-xs font-medium"
                    >
                      {company.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}