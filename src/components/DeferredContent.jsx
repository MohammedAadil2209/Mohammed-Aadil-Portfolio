import React from 'react';
import AboutSection from './AboutSection';
import LogoLoop from './LogoLoop';
import ServicesSection from './ServicesSection';
import ThreeViewer from './ThreeViewer';
import ExperienceTimeline from './ExperienceTimeline';
import ProjectsArchive from './ProjectsArchive';
import ContactSection from './ContactSection';
import FloatingContactBtn from './FloatingContactBtn';
import StatsCounter from './StatsCounter';

const DeferredContent = ({ onProjectStateChange }) => {
  return (
    <>
      <div id="about">
        <AboutSection />
      </div>

      <StatsCounter />
      <LogoLoop />
      <ServicesSection />
      
      <div id="threeviewer">
        <ThreeViewer />
      </div>

      <ExperienceTimeline />

      <div id="projects">
        <ProjectsArchive onProjectStateChange={onProjectStateChange} />
      </div>

      <ContactSection />
      <FloatingContactBtn />
    </>
  );
};

export default DeferredContent;
