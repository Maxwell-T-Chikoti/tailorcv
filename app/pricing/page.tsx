"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  FileText,
  Info,
  Sparkles,
  Users,
  ShieldCheck,
  Bot,
  CreditCard,
  CalendarClock,
  BarChart3
} from 'lucide-react';

type BillingCycle = 'monthly' | 'yearly';

type Feature = {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  hint?: string;
};

type Plan = {
  name: string;
  desc: string;
  monthly: string;
  yearly: string;
  period: string;
  features: Feature[];
  highlighted?: boolean;
  badge?: string;
};

const plans: Plan[] = [
  {
    name: 'Starter',
    desc: 'Perfect for first-time job seekers exploring TailorCV.',
    monthly: 'Free',
    yearly: 'Free',
    period: '',
    features: [
      { label: 'Up to 5 CVs', icon: FileText },
      { label: '1 AI tailoring per month', icon: Bot },
      { label: '4 resume templates', icon: Sparkles },
      { label: 'PDF export', icon: CheckCircle2 },
      { label: 'Basic support', icon: Users }
    ]
  },
  {
    name: 'Professional',
    desc: 'Best for active applicants who want more interviews, faster.',
    monthly: '$9',
    yearly: '$7',
    period: '/ month',
    features: [
      { label: 'Unlimited CVs', icon: FileText },
      { label: 'Unlimited AI tailoring', icon: Bot },
      { label: '4 resume templates', icon: Sparkles },
      { label: 'PDF & ATS export', icon: ShieldCheck, hint: 'ATS export helps your resume parse correctly in recruiter software.' },
      { label: 'Cover letter generation', icon: CalendarClock },
      { label: 'Priority support', icon: Users }
    ],
    highlighted: true,
    badge: 'Most Popular'
  },
  {
    name: 'Team',
    desc: 'For recruiters and HR teams hiring collaboratively.',
    monthly: '$49',
    yearly: '$39',
    period: '/ month',
    features: [
      { label: 'All Professional features', icon: CheckCircle2 },
      { label: 'Team collaboration', icon: Users },
      { label: 'Custom templates', icon: Sparkles },
      { label: 'Bulk resume import', icon: FileText },
      { label: 'Analytics dashboard', icon: BarChart3 },
      { label: 'Dedicated support', icon: ShieldCheck }
    ]
  }
];

const faqs = [
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. You can cancel your subscription at any time, and your plan will remain active until the end of your billing period.'
  },
  {
    question: 'What does ATS export mean?',
    answer: 'ATS export optimizes resume structure and keyword formatting so hiring platforms can parse your profile correctly.'
  },
  {
    question: 'Do I need a credit card to start?',
    answer: 'No card is needed for the Starter plan. Upgrade only when you want advanced AI and unlimited CVs.'
  }
];

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>('monthly');

  const annualSavings = useMemo(() => {
    const monthly = 9;
    const yearly = 7;
    const save = Math.round(((monthly - yearly) / monthly) * 100);
    return `${save}%`;
  }, []);

  return (
    <main className="page-shell py-16">
      <section className="glass-panel rounded-[32px] p-8 mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink/45">Pricing</p>
        <h1 className="display-font mt-3 text-4xl md:text-5xl font-semibold">
          Simple, <span className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">transparent</span> pricing.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-7 text-ink/75">
          Pick a plan built around interview outcomes. Start free, then scale when you need unlimited AI tailoring.
        </p>

        <div className="mt-8 inline-flex rounded-full border border-ink/12 bg-white p-1">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${billing === 'monthly' ? 'bg-ink text-paper' : 'text-ink/70 hover:bg-ink/5'}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling('yearly')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${billing === 'yearly' ? 'bg-ink text-paper' : 'text-ink/70 hover:bg-ink/5'}`}
          >
            Yearly
          </button>
          <span className="ml-2 self-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Save {annualSavings}
          </span>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3 items-start">
        {plans.map((plan) => {
          const price = billing === 'monthly' ? plan.monthly : plan.yearly;
          const period = price === 'Free' ? '' : plan.period;
          const isProfessional = plan.highlighted;

          return (
            <article
              key={plan.name}
              className={`relative rounded-[28px] p-6 border transition duration-300 hover:-translate-y-1 hover:shadow-soft ${
                isProfessional
                  ? 'md:-mt-3 md:pb-10 border-blue-500 bg-gradient-to-b from-blue-50 via-white to-teal-50 ring-2 ring-blue-500/50'
                  : 'border-ink/10 bg-white'
              }`}
            >
              {plan.badge ? (
                <span className="mb-3 inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  {plan.badge}
                </span>
              ) : null}

              <h2 className="text-2xl font-semibold mt-1">{plan.name}</h2>
              <p className="text-sm text-ink/65 mt-2 min-h-10">{plan.desc}</p>

              <div className="mt-6 mb-6 transition-all duration-300">
                <span className="text-4xl font-bold">{price}</span>
                {period ? <span className="text-ink/60 ml-1">{period}</span> : null}
                {billing === 'yearly' && isProfessional ? (
                  <p className="mt-1 text-xs font-semibold text-blue-700">Billed annually</p>
                ) : null}
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <li key={feature.label} className="flex items-start gap-3 text-sm text-ink/75">
                      <Icon size={16} className="text-blue-600 mt-0.5" />
                      <span className="inline-flex items-center gap-2">
                        {feature.label}
                        {feature.hint ? (
                          <span title={feature.hint} className="text-ink/45">
                            <Info size={14} />
                          </span>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                className={`mt-6 w-full py-3 rounded-full font-semibold transition ${
                  isProfessional
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-ink/15 bg-white text-ink hover:bg-ink/5'
                }`}
              >
                Get started
              </button>
            </article>
          );
        })}
      </section>

      <section className="mt-8 rounded-[24px] border border-ink/10 bg-white p-5">
        <p className="text-sm font-semibold text-ink/75">Trusted checkout</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-ink/55">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 px-3 py-1.5"><CreditCard size={14} /> VISA</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 px-3 py-1.5"><CreditCard size={14} /> Mastercard</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 px-3 py-1.5"><ShieldCheck size={14} /> Stripe Secure</span>
        </div>
      </section>

      <section className="mt-12 glass-panel rounded-[28px] p-8">
        <h2 className="text-3xl font-semibold mb-6">Frequently asked questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-2xl border border-ink/10 bg-white p-4">
              <summary className="cursor-pointer font-semibold text-ink">{faq.question}</summary>
              <p className="mt-3 text-sm leading-6 text-ink/72">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 glass-panel rounded-[28px] p-8">
        <h2 className="text-3xl font-semibold mb-6">Enterprise</h2>
        <p className="text-ink/75 leading-7 mb-6">
          Need custom features, SSO, white-labeling, or a dedicated account manager? Let&apos;s talk.
        </p>
        <button type="button" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-ink/90 transition">
          Contact sales
        </button>
      </section>

      <p className="mt-8 text-center text-sm font-semibold text-ink/65">
        Join 5,000+ professionals who landed interviews this month using TailorCV.
      </p>

      <div className="mt-4 text-center">
        <Link href="/register" className="text-sm font-semibold text-ink hover:text-blue-600 transition">
          Start free now
        </Link>
      </div>
    </main>
  );
}
