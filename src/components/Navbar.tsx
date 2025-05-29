// components/Navbar.tsx

'use client';

import React from 'react';

import {
  Menu,
  Moon,
  Sun,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/' },
  { label: 'Weather', href: '/weather' },
  { label: 'News', href: '/news' },
  { label: 'Finance', href: '/finance' },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200 mr-4" />
            <Link href="/" className="text-2xl font-bold text-primary dark:text-secondary">
              PGAGI
            </Link>
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800" />
              )}
            </button>
            {/* Placeholder for profile/avatar */}
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
