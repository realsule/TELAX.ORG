import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Instagram, Youtube, Linkedin, ArrowRight } from 'lucide-react';
import { footerConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmail('');
      alert('Thanks for subscribing!');
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return Instagram;
      case 'youtube':
        return Youtube;
      case 'linkedin':
        return Linkedin;
      default:
        return Instagram;
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-ink hairline-border-t"
      style={{ zIndex: 22 }}
    >
      {/* Main Footer Content */}
      <div className="px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 mb-6"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Leaf className="w-6 h-6 text-forest" />
              <span className="font-display font-bold text-2xl text-chalk">
                {footerConfig.logo}
              </span>
            </a>
            <p className="text-chalk/70 mb-8 max-w-sm">
              {footerConfig.brandDescription}
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {footerConfig.socialLinks.map((link) => {
                const Icon = getSocialIcon(link.platform);
                return (
                  <a
                    key={link.platform}
                    href={link.href}
                    aria-label={link.label}
                    className="w-10 h-10 bg-carbon hairline-border flex items-center justify-center text-chalk/60 hover:text-forest hover:border-forest transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {footerConfig.linkSections.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-muted-telax mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-chalk/70 hover:text-chalk transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-muted-telax mb-6">
              Stay Updated
            </h4>
            <p className="text-chalk/70 mb-4">
              Get weekly growing tips and community updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-carbon border border-chalk/10 text-chalk placeholder:text-muted-telax/50 focus:border-forest focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="px-4 py-3 bg-forest text-carbon hover:bg-forest-light transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 lg:px-12 py-6 hairline-border-t">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Contact Info */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <a
              href={`mailto:${footerConfig.contact.email}`}
              className="text-chalk/60 hover:text-chalk transition-colors text-sm"
            >
              {footerConfig.contact.email}
            </a>
            <span className="text-chalk/40 text-sm">
              {footerConfig.contact.location}
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            {footerConfig.legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-chalk/60 hover:text-chalk transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="px-6 lg:px-12 py-4 bg-carbon">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
          <p className="text-chalk/40 text-sm">
            {footerConfig.copyrightText}
          </p>
          <p className="text-chalk/40 text-sm font-mono text-xs uppercase tracking-[0.12em]">
            Powered by TELAX
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
