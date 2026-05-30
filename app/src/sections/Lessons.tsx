import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { lessonsConfig } from '../config';
import LessonCardComponent from '../components/LessonCardComponent';

gsap.registerPlugin(ScrollTrigger);

const Lessons = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const topCardRef = useRef<HTMLDivElement>(null);
  const bottomCardRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCard = leftCardRef.current;
    const topCard = topCardRef.current;
    const bottomCard = bottomCardRef.current;
    if (!section || !leftCard || !topCard || !bottomCard) return;

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
      // Left green card from left
      scrollTl.fromTo(
        leftCard,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Top right card from right
      scrollTl.fromTo(
        topCard,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Bottom right card from right + slight Y
      scrollTl.fromTo(
        bottomCard,
        { x: '60vw', y: '10vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30%–70%) - elements hold position

      // EXIT (70%–100%)
      scrollTl.fromTo(
        leftCard,
        { x: 0, opacity: 1 },
        { x: '-30vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        topCard,
        { x: 0, opacity: 1 },
        { x: '30vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bottomCard,
        { x: 0, opacity: 1 },
        { x: '30vw', opacity: 0, ease: 'power2.in' },
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
      id="lessons"
      className="relative w-screen h-screen overflow-hidden bg-carbon"
      style={{ zIndex: 11 }}
    >
      {/* Left Green Title Card */}
      <div
        ref={leftCardRef}
        className="absolute left-[6vw] top-[14vh] w-[40vw] h-[72vh] bg-forest p-8 lg:p-12 flex flex-col justify-between"
        style={{ opacity: 1, transform: 'translateX(0)' }}
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-carbon/60 mb-4">
            {lessonsConfig.sectionLabel}
          </p>
          <h2 className="font-display text-[clamp(48px,6vw,100px)] font-black text-carbon leading-[0.85] mb-6">
            {lessonsConfig.headline}
          </h2>
          <p className="text-carbon/80 leading-relaxed max-w-sm">
            {lessonsConfig.description}
          </p>
        </div>
        <Link
          to={lessonsConfig.linkHref}
          className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.12em] text-carbon font-semibold hover:gap-3 transition-all duration-300 group"
        >
          {lessonsConfig.linkText}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Top Right Lesson Card */}
      <div
        ref={topCardRef}
        className="absolute left-[50vw] top-[14vh] w-[44vw] h-[34vh] image-frame group cursor-pointer"
        style={{ opacity: 1, transform: 'translateX(0)' }}
      >
        <LessonCardComponent card={lessonsConfig.cards[0]} />
      </div>

      {/* Bottom Right Lesson Card */}
      <div
        ref={bottomCardRef}
        className="absolute left-[50vw] top-[52vh] w-[44vw] h-[34vh] image-frame group cursor-pointer"
        style={{ opacity: 1, transform: 'translateX(0) translateY(0)' }}
      >
        <LessonCardComponent card={lessonsConfig.cards[1]} />
      </div>

      {/* Wipe Panel */}
      <div
        className="wipe-panel absolute inset-0 bg-earth-orange"
        style={{ transform: 'translateX(110vw)' }}
      />
    </section>
  );
};

export default Lessons;
