import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { navigationConfig, creatorConfig } from '../config';
import CreatorModal from './CreatorModal';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    // Check if it's a route (starts with /) or anchor (starts with #)
    if (href.startsWith('/')) {
      return; // Let Link handle routing
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-carbon/95 backdrop-blur-md hairline-border-b'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
            >
              <Leaf className="w-5 h-5 text-forest transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-display font-bold text-xl tracking-tight text-chalk">
                {navigationConfig.logo}
              </span>
              {navigationConfig.logoAccent && (
                <span className="text-forest">{navigationConfig.logoAccent}</span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navigationConfig.navLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="font-mono text-xs uppercase tracking-[0.12em] text-chalk/70 hover:text-chalk transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="font-mono text-xs uppercase tracking-[0.12em] text-chalk/70 hover:text-chalk transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                )
              )}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Creator Access Button */}
              <button
                onClick={() => setIsCreatorModalOpen(true)}
                className="font-mono text-xs uppercase tracking-[0.12em] text-muted-telax hover:text-chalk transition-colors duration-300"
              >
                {creatorConfig.buttonText}
              </button>

              {/* Donate CTA */}
              <button
                onClick={() => scrollToSection('#donate')}
                className="px-5 py-2.5 bg-forest text-carbon font-mono text-xs uppercase tracking-[0.12em] font-semibold hover:bg-forest-light transition-all duration-300"
              >
                {navigationConfig.ctaText}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-chalk"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-carbon/98 backdrop-blur-md hairline-border-b transition-all duration-300 ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-6 py-6 space-y-4">
            {navigationConfig.navLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block w-full text-left font-mono text-sm uppercase tracking-[0.12em] text-chalk/70 hover:text-chalk transition-colors duration-300 py-2"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left font-mono text-sm uppercase tracking-[0.12em] text-chalk/70 hover:text-chalk transition-colors duration-300 py-2"
                >
                  {link.label}
                </button>
              )
            )}
            <div className="pt-4 border-t border-chalk/10 space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCreatorModalOpen(true);
                }}
                className="block w-full text-left font-mono text-sm uppercase tracking-[0.12em] text-muted-telax hover:text-chalk transition-colors duration-300 py-2"
              >
                {creatorConfig.buttonText}
              </button>
              <button
                onClick={() => scrollToSection('#donate')}
                className="w-full px-5 py-3 bg-forest text-carbon font-mono text-sm uppercase tracking-[0.12em] font-semibold"
              >
                {navigationConfig.ctaText}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Creator Modal */}
      <CreatorModal
        isOpen={isCreatorModalOpen}
        onClose={() => setIsCreatorModalOpen(false)}
      />
    </>
  );
};

export default Navigation;
