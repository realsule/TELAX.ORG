import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { lessonsConfig } from '../config';
import LessonCardComponent from '../components/LessonCardComponent';

const DedicatedLessonsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Back Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-carbon/95 backdrop-blur-md hairline-border-b">
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center h-16 lg:h-20">
            <Link
              to="/"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-chalk/70 hover:text-chalk transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="pt-24 lg:pt-32 pb-12 px-6 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-telax mb-4">
          {lessonsConfig.sectionLabel}
        </p>
        <h1 className="font-display text-[clamp(48px,8vw,100px)] font-black text-chalk leading-[0.85] mb-6">
          {lessonsConfig.headline}
        </h1>
        <p className="text-lg text-chalk/80 leading-relaxed max-w-2xl">
          {lessonsConfig.description}
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessonsConfig.cards.map((card, index) => (
            <div
              key={index}
              className="aspect-[4/3] w-full"
            >
              <LessonCardComponent card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DedicatedLessonsPage;
