import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Award, Users, Building2, Check } from 'lucide-react';
import { partnershipConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Partnership = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const form = formRef.current;
    if (!section || !content || !form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        form,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', organization: '', message: '' });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const badgeIcons = [Award, Users, Building2];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-carbon"
      style={{ zIndex: 21 }}
    >
      <div className="px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left Content */}
          <div ref={contentRef}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-telax mb-4">
              {partnershipConfig.sectionLabel}
            </p>
            <h2 className="font-display text-[clamp(40px,5vw,64px)] font-black text-chalk leading-[0.9] mb-6">
              {partnershipConfig.headline}
            </h2>
            <p className="text-lg text-chalk/70 leading-relaxed mb-10">
              {partnershipConfig.description}
            </p>

            {/* Impact Partner Badges */}
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-telax">
                Partnership Tiers
              </p>
              <div className="flex flex-wrap gap-3">
                {partnershipConfig.badges.map((badge, index) => {
                  const Icon = badgeIcons[index] || Award;
                  return (
                    <div
                      key={badge}
                      className="flex items-center gap-2 px-4 py-2 bg-ink hairline-border"
                    >
                      <Icon className="w-4 h-4 text-forest" />
                      <span className="font-mono text-xs uppercase tracking-[0.12em] text-chalk">
                        {badge}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div ref={formRef}>
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="bg-ink hairline-border p-8"
              >
                <h3 className="font-display text-xl font-bold text-chalk mb-6">
                  Get in Touch
                </h3>

                <div className="space-y-5">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-muted-telax mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-carbon border border-chalk/10 text-chalk placeholder:text-muted-telax/50 focus:border-forest focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-muted-telax mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@organization.com"
                      className="w-full px-4 py-3 bg-carbon border border-chalk/10 text-chalk placeholder:text-muted-telax/50 focus:border-forest focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-muted-telax mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your organization (optional)"
                      className="w-full px-4 py-3 bg-carbon border border-chalk/10 text-chalk placeholder:text-muted-telax/50 focus:border-forest focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-muted-telax mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your partnership goals..."
                      rows={4}
                      className="w-full px-4 py-3 bg-carbon border border-chalk/10 text-chalk placeholder:text-muted-telax/50 focus:border-forest focus:outline-none transition-colors resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-forest text-carbon font-mono text-sm uppercase tracking-[0.12em] font-semibold hover:bg-forest-light transition-colors flex items-center justify-center gap-2"
                  >
                    {partnershipConfig.ctaText}
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-ink hairline-border p-8 text-center">
                <div className="w-16 h-16 bg-forest/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-forest" />
                </div>
                <h3 className="font-display text-2xl font-bold text-chalk mb-4">
                  Message Sent!
                </h3>
                <p className="text-chalk/70">
                  Thank you for reaching out. We'll get back to you within 2-3
                  business days.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;
