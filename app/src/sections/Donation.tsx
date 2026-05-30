import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Heart } from 'lucide-react';
import { donationConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Donation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      const cardElements = cards.querySelectorAll('.donation-card');
      gsap.fromTo(
        cardElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  const getAccentClass = (accent: string) => {
    switch (accent) {
      case 'forest':
        return 'border-forest hover:border-forest-light';
      case 'earth-orange':
        return 'border-earth-orange hover:border-[#f5b073]';
      case 'mineral-teal':
        return 'border-mineral-teal hover:border-[#7ec9d2]';
      default:
        return 'border-forest';
    }
  };

  const getButtonClass = (accent: string) => {
    switch (accent) {
      case 'forest':
        return 'bg-forest hover:bg-forest-light text-carbon';
      case 'earth-orange':
        return 'bg-earth-orange hover:bg-[#f5b073] text-carbon';
      case 'mineral-teal':
        return 'bg-mineral-teal hover:bg-[#7ec9d2] text-carbon';
      default:
        return 'bg-forest hover:bg-forest-light text-carbon';
    }
  };

  const getAccentColor = (accent: string) => {
    switch (accent) {
      case 'forest':
        return 'text-forest';
      case 'earth-orange':
        return 'text-earth-orange';
      case 'mineral-teal':
        return 'text-mineral-teal';
      default:
        return 'text-forest';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="donate"
      className="relative w-full py-24 lg:py-32 bg-ink"
      style={{ zIndex: 20 }}
    >
      <div className="px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-forest" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-telax">
              {donationConfig.sectionLabel}
            </p>
          </div>
          <h2 className="font-display text-[clamp(40px,6vw,80px)] font-black text-chalk leading-[0.9] mb-6">
            {donationConfig.headline}
          </h2>
          <p className="text-lg text-chalk/70 max-w-2xl mx-auto">
            {donationConfig.description}
          </p>
        </div>

        {/* Donation Tiers */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {donationConfig.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`donation-card relative bg-carbon border-2 ${getAccentClass(
                tier.accent
              )} p-8 transition-all duration-500 hover:-translate-y-2`}
            >
              {/* Tier Name */}
              <p className={`font-mono text-sm uppercase tracking-[0.12em] ${getAccentColor(tier.accent)} mb-4`}>
                {tier.name}
              </p>

              {/* Amount */}
              <div className="mb-4">
                <span className="font-display text-5xl font-black text-chalk">
                  {tier.amount}
                </span>
              </div>

              {/* Description */}
              <p className="text-chalk/70 mb-8">{tier.description}</p>

              {/* Benefits */}
              <ul className="space-y-3 mb-8">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 ${getAccentColor(tier.accent)} flex-shrink-0 mt-0.5`} />
                    <span className="text-chalk/80 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 font-mono text-sm uppercase tracking-[0.12em] font-semibold transition-all duration-300 ${getButtonClass(
                  tier.accent
                )}`}
              >
                Donate {tier.amount}
              </button>

              {/* Corner Decoration */}
              <div className={`absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 ${getAccentClass(tier.accent)} -mt-px -mr-px opacity-50`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Donation;
