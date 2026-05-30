import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { communityConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Community = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const title = titleRef.current;
    const content = contentRef.current;
    if (!section || !bg || !title || !content) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%–30%)
      // Background scales in
      scrollTl.fromTo(
        bg,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Title lines rise up with stagger
      const titleLines = title.querySelectorAll('.title-line');
      scrollTl.fromTo(
        titleLines,
        { y: '60vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, ease: 'none' },
        0
      );

      // Content from right
      scrollTl.fromTo(
        content,
        { x: '20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30%–70%) - hold

      // EXIT (70%–100%)
      scrollTl.fromTo(
        bg,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        titleLines,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, stagger: 0.05, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        content,
        { x: 0, opacity: 1 },
        { x: '15vw', opacity: 0, ease: 'power2.in' },
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
      style={{ zIndex: 13 }}
    >
      {/* Full-bleed Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ opacity: 1, transform: 'scale(1)' }}
      >
        <img
          src={communityConfig.backgroundImage}
          alt="Community garden"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-ink/50" />
      </div>

      {/* Oversized Title */}
      <div
        ref={titleRef}
        className="absolute left-[6vw] top-[18vh]"
        style={{ opacity: 1, transform: 'translateY(0)' }}
      >
        <h2 className="font-display text-[clamp(48px,9vw,160px)] font-black text-chalk leading-[0.85] tracking-tight">
          <span className="title-line block">{communityConfig.headlineLine1}</span>
          <span className="title-line block text-forest">{communityConfig.headlineLine2}</span>
        </h2>
      </div>

      {/* Bottom Right Content Block */}
      <div
        ref={contentRef}
        className="absolute right-[6vw] bottom-[14vh] w-[34vw] max-w-md"
        style={{ opacity: 1, transform: 'translateX(0)' }}
      >
        <p className="text-lg text-chalk/90 leading-relaxed mb-6">
          {communityConfig.description}
        </p>
        <a
          href={communityConfig.ctaHref}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-forest hover:text-forest-light transition-colors duration-300 group"
        >
          {communityConfig.ctaText}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      {/* Wipe Panel */}
      <div
        className="wipe-panel absolute inset-0 bg-forest"
        style={{ transform: 'translateX(110vw)' }}
      />
    </section>
  );
};

export default Community;
