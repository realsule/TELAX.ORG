import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { projectsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
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
      // Header animation
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

      // Cards stagger animation
      const cardElements = cards.querySelectorAll('.project-card');
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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-24 lg:py-32 bg-carbon"
      style={{ zIndex: 19 }}
    >
      <div className="px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-telax mb-4">
            {projectsConfig.sectionLabel}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-[clamp(40px,6vw,80px)] font-black text-chalk leading-[0.9]">
              {projectsConfig.headline}
            </h2>
            <p className="text-lg text-chalk/70 max-w-md">
              {projectsConfig.description}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projectsConfig.projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative bg-ink hairline-border overflow-hidden cursor-pointer card-hover"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                
                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-carbon/80 backdrop-blur-sm text-chalk font-mono text-xs uppercase tracking-[0.12em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-forest rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-carbon" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-telax mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-[0.12em]">
                    {project.location}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-chalk mb-3 group-hover:text-forest transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-chalk/70 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
