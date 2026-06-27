import type { LessonCard } from '../config';

interface LessonCardComponentProps {
  card: LessonCard;
}

const LessonCardComponent: React.FC<LessonCardComponentProps> = ({ card }) => {
  // Author Quote Layout
  if (card.author) {
    return (
      <div className="relative w-full h-full overflow-hidden group cursor-pointer">
        {/* Background Image */}
        <img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Blurred Overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/60" />
        
        {/* Quote Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
          {/* Quote */}
          <blockquote className="font-display text-2xl lg:text-3xl font-black italic text-chalk leading-tight mb-8 max-w-2xl">
            "{card.author.quote}"
          </blockquote>
          
          {/* Author Info */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-forest">
              <img
                src={card.author.avatar}
                alt={card.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Name */}
            <p className="font-mono text-sm uppercase tracking-[0.12em] text-forest font-semibold">
              {card.author.name}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Original Bento Grid Layout
  return (
    <div className="relative w-full h-full image-frame group cursor-pointer">
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon/90 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <span className="inline-block px-3 py-1 bg-forest text-carbon font-mono text-xs uppercase tracking-[0.12em] mb-3">
          {card.tag}
        </span>
        <h3 className="font-display text-xl lg:text-2xl font-bold text-chalk">
          {card.title}
        </h3>
      </div>
    </div>
  );
};

export default LessonCardComponent;
