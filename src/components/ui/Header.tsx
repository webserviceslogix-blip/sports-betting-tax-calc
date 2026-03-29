'use client';

import Link from 'next/link';
import { useState } from 'react';
import Logo from './Logo';

const navigation = [
  { name: 'Tax Calculator', href: '/calculator' },
  {
    name: 'Tools',
    href: '#',
    children: [
      { name: 'Parlay Tax Calculator', href: '/tools/parlay-tax' },
      { name: 'Phantom Income Calculator', href: '/tools/phantom-income' },
      { name: 'W-2G Checker', href: '/tools/w2g-checker' },
      { name: 'State Comparison', href: '/tools/state-comparison' },
    ],
  },
  { name: 'States', href: '/states' },
  { name: 'Daily Wins', href: '/daily-wins' },
  { name: 'Guides', href: '/guides' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" aria-label="BetTaxCalc Home">
              <Logo size="md" />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => setToolsOpen(!toolsOpen)}
                    onBlur={() => setTimeout(() => setToolsOpen(false), 200)}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md hover:bg-gray-50 flex items-center gap-1"
                  >
                    {item.name}
                    <svg className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {toolsOpen && (
                    <div className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                          onClick={() => setToolsOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              )
            )}
            <Link
              href="/calculator"
              className="ml-3 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
            >
              Calculate Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-50"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 py-3 space-y-1">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name}>
                  <div className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {item.name}
                  </div>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block pl-6 pr-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="pt-2 px-3">
              <Link
                href="/calculator"
                className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                Calculate Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
