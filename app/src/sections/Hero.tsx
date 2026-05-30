import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const headline = headlineRef.current;
    if (!section || !image || !content || !headline) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ delay: 0.3 });

      // Image frame slides in from left
      loadTl.fromTo(
        image,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
      );

      // Headline words stagger in from right
      const headlineWords = headline.querySelectorAll('.headline-word');
      loadTl.fromTo(
        headlineWords,
        { x: '40vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.8'
      );

      // Subtitle and CTAs fade up
      const contentElements = content.querySelectorAll('.content-element');
      loadTl.fromTo(
        contentElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset elements when scrolling back to top
            gsap.set([image, content], { opacity: 1, x: 0 });
          },
        },
      });

      // EXIT (70%–100%)
      scrollTl.fromTo(
        image,
        { x: 0, opacity: 1 },
        { x: '-35vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        content,
        { x: 0, opacity: 1 },
        { x: '35vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Wipe panel transition
      const wipePanel = section.querySelector('.wipe-panel');
      if (wipePanel) {
        scrollTl.fromTo(
          wipePanel,
          { x: '110vw' },
          { x: '-110vw', ease: 'power2.inOut' },
          0.78
        );
      }

      if (scrollTl.scrollTrigger) {
        triggersRef.current.push(scrollTl.scrollTrigger);
      }
    }, section);

    return () => {
      ctx.revert();
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  const scrollToSection = (href: string) => {
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
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-carbon"
      style={{ zIndex: 10 }}
    >
      {/* Background vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(17,20,24,0.4)_100%)]" />

      {/* Left Image Frame */}
      <div
        ref={imageRef}
        className="absolute left-[6vw] top-[14vh] w-[38vw] h-[72vh] image-frame"
        style={{ opacity: 1, transform: 'translateX(0)' }}
      >
        <img
          src={heroConfig.backgroundImage}
          alt="Hands planting a seedling"
          className="w-full h-full object-cover"
        />
        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-forest/40" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-forest/40" />
      </div>

      {/* Right Content Block */}
      <div
        ref={contentRef}
        className="absolute left-[52vw] top-[18vh] w-[42vw]"
        style={{ opacity: 1, transform: 'translateX(0)' }}
      >
        {/* Micro Label */}
        <p className="content-element font-mono text-xs uppercase tracking-[0.2em] text-muted-telax mb-8">
          {heroConfig.microLabel}
        </p>

        {/* Headline */}
        <div ref={headlineRef} className="mb-8">
          <h1 className="font-display text-[clamp(48px,8vw,140px)] font-black text-chalk leading-[0.85] tracking-tight">
            <span className="headline-word block">{heroConfig.titleLine1}</span>
            <span className="headline-word block text-forest">{heroConfig.titleLine2}</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="content-element text-lg text-chalk/80 leading-relaxed max-w-md mb-10">
          {heroConfig.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="content-element flex flex-wrap gap-4">
          {heroConfig.ctaHref.startsWith('/') ? (
            <Link
              to={heroConfig.ctaHref}
              className="btn-primary flex items-center gap-2 group"
            >
              {heroConfig.ctaText}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ) : (
            <button
              onClick={() => scrollToSection(heroConfig.ctaHref)}
              className="btn-primary flex items-center gap-2 group"
            >
              {heroConfig.ctaText}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
          {heroConfig.ctaSecondaryHref.startsWith('/') ? (
            <Link
              to={heroConfig.ctaSecondaryHref}
              className="btn-secondary"
            >
              {heroConfig.ctaSecondaryText}
            </Link>
          ) : (
            <button
              onClick={() => scrollToSection(heroConfig.ctaSecondaryHref)}
              className="btn-secondary"
            >
              {heroConfig.ctaSecondaryText}
            </button>
          )}
        </div>
      </div>

      {/* Wipe Panel (for transition) */}
      <div
        className="wipe-panel absolute inset-0 bg-forest"
        style={{ transform: 'translateX(110vw)' }}
      />

      {/* Watermark */}
      <div className="absolute bottom-8 right-8 font-display text-[20vw] font-black text-chalk/[0.02] leading-none pointer-events-none select-none">
        TELAX
      </div>
    </section>
  );
};

export default Hero;
