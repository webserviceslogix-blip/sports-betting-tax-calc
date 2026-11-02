'use client';

import { useState } from 'react';

interface EmailCaptureProps {
  variant?: 'banner' | 'inline' | 'footer';
  className?: string;
}

export default function EmailCapture({ variant = 'banner', className = '' }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Subscription failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (status === 'error') {
    return (
      <div className={`rounded-xl p-6 text-center ${variant === 'footer' ? 'bg-gray-800' : 'bg-red-50 border border-red-200'} ${className}`}>
        <p className={`font-semibold text-sm ${variant === 'footer' ? 'text-red-400' : 'text-red-800'}`}>
          Something went wrong. Please try again.
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className={`rounded-xl p-6 text-center ${variant === 'footer' ? 'bg-gray-800' : 'bg-green-50 border border-green-200'} ${className}`}>
        <p className={`font-semibold ${variant === 'footer' ? 'text-green-400' : 'text-green-800'}`}>
          You're on the list!
        </p>
        <p className={`text-sm mt-1 ${variant === 'footer' ? 'text-gray-400' : 'text-green-700'}`}>
          We'll send you a reminder before the April 15 tax deadline with your estimated payment dates.
        </p>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-primary/5 border border-primary/20 rounded-xl p-6 ${className}`}>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              Tax season is coming — don't get caught off guard
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Get a free reminder before the April 15 deadline with estimated payment dates and a checklist for reporting your gambling income.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 shrink-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900 w-56"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {status === 'loading' ? 'Joining...' : 'Remind Me'}
            </button>
          </form>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Free. No spam. Unsubscribe anytime. We only email about tax deadlines and rule changes.
        </p>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-amber-50 border border-amber-200 rounded-xl p-5 ${className}`}>
        <h4 className="font-semibold text-amber-800 text-sm">
          Don't forget to file your gambling income
        </h4>
        <p className="text-xs text-amber-700 mt-1 mb-3">
          Get a free tax deadline reminder with estimated quarterly payment dates.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className="flex-1 px-3 py-2 border border-amber-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 text-gray-900"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 bg-amber-600 text-white text-sm font-semibold rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? '...' : 'Remind Me'}
          </button>
        </form>
      </div>
    );
  }

  // footer variant
  return (
    <div className={className}>
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
        Tax Deadline Reminders
      </h3>
      <p className="text-sm text-gray-400 mb-3">
        Free reminder before April 15 with your estimated payment dates.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? '...' : 'Join'}
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-2">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
