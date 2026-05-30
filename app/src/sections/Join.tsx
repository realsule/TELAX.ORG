import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';
import { joinConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Join = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      scrollTl.fromTo(
        content,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative w-screen h-screen overflow-hidden bg-carbon"
      style={{ zIndex: 18 }}
    >
      {/* Left Content Block */}
      <div
        ref={contentRef}
        className="absolute left-[6vw] top-[14vh] w-[38vw]"
        style={{ opacity: 1, transform: 'translateX(0)' }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-telax mb-8">
          {joinConfig.sectionLabel}
        </p>

        <h2 className="font-display text-[clamp(40px,5vw,80px)] font-black text-chalk leading-[0.85] mb-8">
          <span className="block">{joinConfig.headlineLine1}</span>
          <span className="block text-forest">{joinConfig.headlineLine2}</span>
        </h2>

        <p className="text-lg text-chalk/80 leading-relaxed max-w-md mb-8">
          {joinConfig.description}
        </p>

        {/* Email Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-carbon border border-chalk/20 text-chalk placeholder:text-muted-telax/50 focus:border-forest focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-forest text-carbon font-mono text-sm uppercase tracking-[0.12em] font-semibold hover:bg-forest-light transition-colors flex items-center gap-2"
              >
                {joinConfig.ctaText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-telax">{joinConfig.microcopy}</p>
          </form>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-forest/10 border border-forest/30">
            <Check className="w-5 h-5 text-forest" />
            <p className="text-chalk">
              Welcome to the movement! Check your inbox for confirmation.
            </p>
          </div>
        )}
      </div>

      {/* Right Image Frame */}
      <div
        ref={imageRef}
        className="absolute left-[50vw] top-[14vh] w-[44vw] h-[72vh] image-frame"
        style={{ opacity: 1, transform: 'translateX(0)' }}
      >
        <img
          src={joinConfig.image}
          alt="Community of growers"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-forest/40" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-forest/40" />
      </div>

      {/* Wipe Panel */}
      <div
        className="wipe-panel absolute inset-0 bg-mineral-teal"
        style={{ transform: 'translateX(110vw)' }}
      />
    </section>
  );
};

export default Join;
