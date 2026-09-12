"use client";

import React, { useState, useEffect } from "react";
import NovaNestLogo from "../ui/NovaNestLogo";
import Button from "../ui/Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Categories", href: "#categories" },
    { label: "Exclusive Offers", href: "#exclusive-offers" },
    { label: "Popular Ads", href: "#popular-ads" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-forest-900/85 backdrop-blur-md shadow-lg border-b border-brand-forest-600/30 py-3.5"
          : "bg-brand-forest-900/60 backdrop-blur-sm border-b border-white/5 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group">
          <NovaNestLogo iconSize={34} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-brand-cream-50/80">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-brand-cream-50 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-sage-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden lg:flex items-center gap-3.5">
          <Button href="#popular-ads" variant="primary" size="md">
            Explore Properties
          </Button>
          <Button href="#newsletter" variant="outline" size="md">
            Contact Us
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            href="#popular-ads"
            variant="primary"
            size="sm"
            className="text-xs px-3.5 py-1.5"
          >
            Explore
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-brand-cream-50 hover:bg-brand-forest-700/50 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-forest-900/95 backdrop-blur-xl border-b border-brand-forest-600/30 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4 text-base font-medium text-brand-cream-50/90">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-sage-300 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-brand-forest-600/40 flex flex-col gap-3">
              <Button
                href="#popular-ads"
                variant="primary"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center"
              >
                Explore Properties
              </Button>
              <Button
                href="#newsletter"
                variant="outline"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
