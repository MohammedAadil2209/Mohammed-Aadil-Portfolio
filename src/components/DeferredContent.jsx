import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import AboutSection from './AboutSection';
import LogoLoop from './LogoLoop';
import ServicesSection from './ServicesSection';
import ExperienceTimeline from './ExperienceTimeline';
import ProjectsArchive from './ProjectsArchive';
import ContactSection from './ContactSection';
import FloatingContactBtn from './FloatingContactBtn';
import StatsCounter from './StatsCounter';

// three.js is the heaviest dependency on the page (~460 KB). Download and boot
// it only when the visitor scrolls close to the 3D section.
const ThreeViewer = lazy(() => import('./ThreeViewer'));

const NearViewport = ({ children, className, rootMargin = '150% 0px' }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {show ? children : null}
    </div>
  );
};

const ThreeFallback = () => <section className="relative w-full h-[200vh] bg-[#020205]" aria-hidden="true" />;

const DeferredContent = ({ onProjectStateChange }) => {
  return (
    <>
      <AboutSection />

      <StatsCounter />
      <LogoLoop />
      <ServicesSection />

      {/* Reserve the exact height up front so lazy-mounting never shifts the page */}
      <NearViewport className="min-h-[200vh] bg-[#020205]">
        <Suspense fallback={<ThreeFallback />}>
          <ThreeViewer />
        </Suspense>
      </NearViewport>

      <ExperienceTimeline />

      <ProjectsArchive onProjectStateChange={onProjectStateChange} />

      <ContactSection />
      <FloatingContactBtn />
    </>
  );
};

export default DeferredContent;
