'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        router.push(data.url);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Pricing Header */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-slate-50">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-slate-600">
              Choose the perfect plan for your needs. Always flexible to scale.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <div className="bg-white border border-slate-200 rounded-lg p-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Starter</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$29</span>
                  <span className="text-slate-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="text-slate-600">✓ Up to 10 projects</li>
                  <li className="text-slate-600">✓ Basic analytics</li>
                  <li className="text-slate-600">✓ Email support</li>
                </ul>
                <button
                  onClick={() => handleCheckout('price_1TrE522Y25vgQoh5xGLnqzPm')}
                  disabled={loading === 'price_starter'}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 disabled:bg-slate-100"
                >
                  {loading === 'price_starter' ? 'Loading...' : 'Get Started'}
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-white border-2 border-blue-600 rounded-lg p-8">
                <div className="mb-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Pro</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$99</span>
                  <span className="text-slate-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="text-slate-600">✓ Unlimited projects</li>
                  <li className="text-slate-600">✓ Advanced analytics</li>
                  <li className="text-slate-600">✓ Priority support</li>
                </ul>
                <button
                  onClick={() => handleCheckout('price_1TrE6K2Y25vgQoh5Qix2STSs')}
                  disabled={loading === 'price_pro'}
                  className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {loading === 'price_pro' ? 'Loading...' : 'Get Pro'}
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white border border-slate-200 rounded-lg p-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Enterprise</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">Custom</span>
                  <span className="text-slate-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="text-slate-600">✓ Everything in Pro</li>
                  <li className="text-slate-600">✓ Dedicated support</li>
                  <li className="text-slate-600">✓ SLA guarantee</li>
                </ul>
                <button className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}