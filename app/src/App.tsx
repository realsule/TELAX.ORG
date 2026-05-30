import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Lessons from './sections/Lessons';
import About from './sections/About';
import Community from './sections/Community';
import Learning from './sections/Learning';
import Greenhouse from './sections/Greenhouse';
import Seasonal from './sections/Seasonal';
import Harvest from './sections/Harvest';
import Join from './sections/Join';
import Projects from './sections/Projects';
import Donation from './sections/Donation';
import Partnership from './sections/Partnership';
import Footer from './sections/Footer';
import DedicatedLessonsPage from './pages/DedicatedLessonsPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (allow small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-carbon min-h-screen overflow-x-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                {/* Pinned Sections (z-index stacking) */}
                <Hero />
                <Lessons />
                <About />
                <Community />
                <Learning />
                <Greenhouse />
                <Seasonal />
                <Harvest />
                <Join />

                {/* Flowing Sections */}
                <Projects />
                <Donation />
                <Partnership />
                <Footer />
              </>
            }
          />
          {/* Dedicated Lessons Page */}
          <Route path="/lessons" element={<DedicatedLessonsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
