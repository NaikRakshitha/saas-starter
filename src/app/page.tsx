import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              Build Your SaaS
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">in Days, Not Months</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
              Production-ready Next.js starter with authentication, payments, database integration, and everything you need to launch your SaaS product.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md border border-blue-600"
              >
                Get Started Free
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="#features"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-slate-300 text-slate-700 font-semibold hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                Learn More
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-slate-600">
              <div>
                <div className="font-semibold text-slate-900">500+</div>
                <div>Developers using</div>
              </div>
              <div className="h-8 w-px bg-slate-300"></div>
              <div>
                <div className="font-semibold text-slate-900">⭐ 4.9/5</div>
                <div>Average rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-20 sm:px-6 lg:px-8 bg-slate-50">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Everything You Need
              </h2>
              <p className="text-lg text-slate-600">
                Pre-configured with all the essentials to launch your SaaS product
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Fast Setup
                </h3>
                <p className="text-slate-600">
                  Get up and running in minutes with our production-ready configuration and zero setup hassle.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔐</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Secure Authentication
                </h3>
                <p className="text-slate-600">
                  Built-in NextAuth integration with support for multiple authentication providers and OAuth.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💳</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Payment Processing
                </h3>
                <p className="text-slate-600">
                  Stripe integration ready for subscriptions, one-time payments, and invoicing.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Analytics Ready
                </h3>
                <p className="text-slate-600">
                  Pre-configured analytics dashboard to track user behavior and business metrics.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🗄️</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Database Integration
                </h3>
                <p className="text-slate-600">
                  Prisma ORM with PostgreSQL, MySQL, and SQLite support. Migrations included.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Beautiful UI
                </h3>
                <p className="text-slate-600">
                  Tailwind CSS with pre-built components, responsive design, and dark mode support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-slate-600">
                One-time purchase, lifetime access
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter */}
              <div className="bg-white border border-slate-200 rounded-lg p-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Starter</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$39</span>
                  <span className="text-slate-600">/one-time</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Full source code
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Email support
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Documentation
                  </li>
                </ul>
                <Link 
                  href="/auth/signup"
                  className="w-full block text-center px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Get Started
                </Link>
              </div>

              {/* Pro */}
              <div className="bg-white border-2 border-blue-600 rounded-lg p-8 relative ring-1 ring-blue-600/10">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Pro</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$99</span>
                  <span className="text-slate-600">/one-time</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Everything in Starter
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Premium components
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Advanced features
                  </li>
                </ul>
                <Link 
                  href="/auth/signup"
                  className="w-full block text-center px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get Pro Access
                </Link>
              </div>

              {/* Enterprise */}
              <div className="bg-white border border-slate-200 rounded-lg p-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Enterprise</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">Custom</span>
                  <span className="text-slate-600">/contact us</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Custom features
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Dedicated support
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Priority updates
                  </li>
                </ul>
                <button className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to launch your SaaS?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Get started today and save weeks of development time.
            </p>
            <Link 
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors border border-white shadow-sm"
            >
              Get Started Free
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}