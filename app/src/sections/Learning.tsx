import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { learningConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Learning = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    if (!section || !content || !image) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%–30%)
      // Content from left
      scrollTl.fromTo(
        content,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Image from right
      scrollTl.fromTo(
        image,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // SETTLE (30%–70%) - hold

      // EXIT (70%–100%)
      scrollTl.fromTo(
        content,
        { x: 0, opacity: 1 },
        { x: '-25vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        image,
        { x: 0, opacity: 1 },
        { x: '25vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Wipe panel
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

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-carbon"
      style={{ zIndex: 14 }}
    >
      {/* Left Content Block */}
      <div
        ref={contentRef}
        className="absolute left-[6vw] top-[18vh] w-[38vw]"
        style={{ opacity: 1, transform: 'translateX(0)' }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-telax mb-8">
          {learningConfig.sectionLabel}
        </p>

        <h2 className="font-display text-[clamp(40px,5vw,80px)] font-black text-chalk leading-[0.85] mb-8">
          <span className="block">{learningConfig.headlineLine1}</span>
          <span className="block text-forest">{learningConfig.headlineLine2}</span>
        </h2>

        <p className="text-lg text-chalk/80 leading-relaxed max-w-md mb-10">
          {learningConfig.description}
        </p>

        <a
          href={learningConfig.ctaHref}
          className="btn-secondary inline-flex items-center gap-2 group"
        >
          {learningConfig.ctaText}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      {/* Right Image Frame */}
      <div
        ref={imageRef}
        className="absolute left-[52vw] top-[14vh] w-[42vw] h-[72vh] image-frame"
        style={{ opacity: 1, transform: 'translateX(0)' }}
      >
        <img
          src={learningConfig.image}
          alt="Hands-on learning"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-forest/40" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-forest/40" />
      </div>

      {/* Wipe Panel */}
      <div
        className="wipe-panel absolute inset-0 bg-earth-orange"
        style={{ transform: 'translateX(110vw)' }}
      />
    </section>
  );
};

export default Learning;
