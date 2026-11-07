import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import ScrollFloat from './ScrollFloat';
import useScrollLock from '../lib/useScrollLock';
import { X, ArrowRight, Award, Trophy, Briefcase, Calendar, Building2, Linkedin, Users } from 'lucide-react';
import devArenaCert from '../../certificates/dev-arena-hackathon.jpeg';
import iitMadrasCert from '../../certificates/iit-madras-workshop.png';
import nationalsummitcert from '../../certificates/national-summit-ai.png';
import techFusionCert from '../../certificates/techfusion-certificate.png';
import siemensCert from '../../certificates/siemens-certificate.jpg';
import edutainalCert from '../../certificates/edutainal-internship-certificate.jpg';


const EVENTS = [
  {
    id: 1,
    startDate: "2025-09-23",
    endDate: "2025-09-24",
    title: "NATIONAL SUMMIT ON BENEFITS AND CHALLENGES OF AI IN HUMAN WELLBEING",
    organization: "B.S. Abdur Rahman Crescent Institute of Science and Technology",
    type: "National Summit",
    tag: "AI & IoT Enabled Smart Waste Management System | 23 – 24 Sep 2025",
    overview: "Participated in the National Summit on Benefits and Challenges of AI in Human Wellbeing at B.S. Abdur Rahman Crescent Institute of Science and Technology, where the focus was on exploring how artificial intelligence can be leveraged to improve human life while addressing its ethical and societal challenges. As part of the summit, I was involved in presenting and understanding an AI & IoT Enabled Smart Waste Management System, which emphasized the integration of intelligent technologies to optimize waste collection, monitoring, and sustainability practices in urban environments.",
    role: "Engineered the communication logic linking physical hardware sensors (embedded systems) to a centralized architecture, and developed a real-time responsive web dashboard for safety managers to track live diagnostics and AI-triggered alerts.",
    learnings: [
      "Hardware-to-Cloud synchronization and latency optimization",
      "Real-time data visualization and dashboard telemetry",
      "Interfacing AI anomaly detection logic with physical sensors",
      "Rapid prototyping of physical-digital dual architectures"
    ],
    skills: ["Embedded Systems", "IoT", "React.js", "Data visualization", "AI Integration", "Fast Prototyping"],
    impact: "Gained significant exposure to building end-to-end industrial tech where software directly impacts human safety, successfully bridging my deep hardware knowledge with accessible frontend dashboards.",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=70&w=1400&auto=format&fit=crop",
    certificate: nationalsummitcert,
    gallery: [
      { url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=70&w=1400&auto=format&fit=crop", caption: "Data Visualization Dashboard" },
      { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=70&w=1400&auto=format&fit=crop", caption: "Smart City IoT Network" },
      { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=70&w=1400&auto=format&fit=crop", caption: "Technical Collaboration Session" }
    ]
  },
  {
    id: 2,
    startDate: "2025-10-04",
    endDate: "2025-10-05",
    title: "IoT & Robotics Workshop",
    organization: "IIT Madras",
    type: "Workshop",
    tag: "Hands-on Learning | 4 – 5 Oct 2025",
    overview: "An intensive, hands-on workshop hosted at IIT Madras focusing on the critical intersection of applied robotics and Internet of Things (IoT) systems. The program bridged the gap between theoretical electronics and practical hardware engineering.",
    role: "Actively programmed microcontrollers, engineered sensor data pipelines, and collaborated within a technical team to assemble, wire, and deploy a fully functional robotic prototype.",
    learnings: [
      "Embedded C programming principles",
      "Real-time sensor data acquisition",
      "Actuator control mechanisms",
      "Serial communication protocols"
    ],
    skills: ["IoT", "Robotics", "Embedded C", "Hardware Integration", "Problem Solving"],
    impact: "Fundamentally altered my approach to software architecture by exposing me to the physical constraints of hardware, enabling me to design more robust, full-stack systems.",
    heroImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=70&w=1400&auto=format&fit=crop",
    certificate: iitMadrasCert,
    gallery: [
      { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=70&w=1400&auto=format&fit=crop", caption: "Hardware Prototyping" },
      { url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=70&w=1400&auto=format&fit=crop", caption: "Embedded Logic Testing" }
    ]
  },
  {
    id: 3,
    startDate: "2025-10-16",
    endDate: "2025-10-17",
    title: "DEV Arena Hackathon",
    organization: "SRM Easwari Engineering College",
    type: "24 - Hour Hackathon",
    tag: "AI & Embedded Systems | 16 – 17 Oct 2025",
    overview: "Formulated and deployed an 'AI-Powered Worker Safety Management System' designed for high-risk industrial environments. The solution actively monitored workplace hazards using hardware integration to prevent on-site accidents.",
    role: "Engineered the communication logic linking physical hardware sensors (embedded systems) to a centralized architecture, and developed a real-time responsive web dashboard for safety managers to track live diagnostics and AI-triggered alerts.",
    learnings: [
      "Hardware-to-Cloud synchronization and latency optimization",
      "Real-time data visualization and dashboard telemetry",
      "Interfacing AI anomaly detection logic with physical sensors",
      "Rapid prototyping of physical-digital dual architectures"
    ],
    skills: ["Embedded Systems", "IoT", "React.js", "Data Visualization", "AI Integration", "Fast Prototyping"],
    impact: "Gained significant exposure to building end-to-end industrial tech where software directly impacts human safety, successfully bridging my deep hardware knowledge with accessible frontend dashboards.",
    heroImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=70&w=1400&auto=format&fit=crop",
    certificate: devArenaCert,
    gallery: [
      { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=70&w=1400&auto=format&fit=crop", caption: "24-Hour Sprints" },
      { url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=70&w=1400&auto=format&fit=crop", caption: "Code Optimization Phase" }
    ]
  },
  {
    id: 4,
    startDate: "2026-04-09",
    endDate: "2026-04-09",
    title: "TECHFUSION '26 - PROJECT EXPO",
    team: "Team Nexora · with Rahil Syed & Abdul Mateen Danish",
    gratitude: "Especially grateful to my teammate Rahil Syed. Building Nexora GS-1 together, from the first prototype to the podium, is what made this achievement truly special. Thanks also to Abdul Mateen Danish for joining Team Nexora for TECHFUSION and contributing to this win. 🤝",
    organization: "B. S. Abdur Rahman Crescent Institute of Science and Technology",
    type: "Project Expo",
    tag: "Nexora GS-1 | 9 Apr 2026",
    status: "3rd Place",
    overview: "Awarded 3rd Place for Nexora Gesture Control Rover, a cutting-edge human-robot interaction system. Designed to provide touchless, zero-latency control for robotic hardware in hazardous or sterile environments, Nexora bridges the gap between human kinetic movement and physical actuation using advanced Computer Vision AI.",
    role: "Built Nexora GS-1 with Rahil Syed, my core Team Nexora teammate, and Abdul Mateen Danish, who joined the team for TECHFUSION. I was Lead Architect of the three-phase system: Perception (MediaPipe AI), Logic Distribution (Flask-SocketIO Server), and Visualization (React HUD). Engineered the Hysteresis Consecutive Frame Validation (HCFV) filter to eliminate 'ghost movements' and developed the real-time telemetry dashboard for propulsion and vector monitoring.",
    learnings: [
      "High-fidelity motion capture using 21-point 3D Hand Landmarker coordination",
      "Asynchronous multi-threaded command distribution via Flask-SocketIO",
      "Developing HCFV filters for intelligent robotic stabilization and zero-ghost movements",
      "Isolated Dual-Power Architecture (12V Motor / 5V Logic) to prevent EMF interference",
      "Real-time visual telemetry HUD with Glassmorphism industrial aesthetics"
    ],
    skills: ["Computer Vision", "MediaPipe", "Flask-SocketIO", "Arduino", "React.js", "H-Bridge Actuation", "IoT Security"],
    impact: "Secured a podium finish by delivering a production-ready system with 32ms inference speed and 98.4% accuracy, validating the industrial potential of Nexora GS-1.",
    heroImage: "/gallery/techfusion/prototype.jpg",
    certificate: techFusionCert,
    gallery: [
      { url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=70&w=1400&auto=format&fit=crop", caption: "Nexora GS-1 Tactical Gesture Interface" },
      { url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=70&w=1400&auto=format&fit=crop", caption: "Robotic Prototype Architecture" }
    ]
  },
  {
    id: 5,
    startDate: "2026-09-18",
    endDate: "2026-09-18",
    title: "TECHATHON '26 - 1st Place Winner",
    team: "Team Nexora · with Rahil Syed",
    gratitude: "Grateful to have had Rahil Syed by my side. Three hours of pressure, ideas and debugging turned into a 1st Place win because we built RESQER together. 🤝",
    organization: "B.S. Abdur Rahman Crescent Institute of Science and Technology",
    association: "School of Computer Information and Mathematical Sciences (SCIMS) · Dept. of CSE",
    type: "3-Hour Techathon",
    tag: "Team Nexora | 18 Sep 2026",
    status: "1st Place",
    overview: "Three hours to take a problem statement, shape an idea, build a working solution and present it. As Team Nexora, we built RESQER, an AI-powered emergency response and disaster coordination platform that turns scattered emergency reports into actionable intelligence. Everything was developed on the spot within the three hours, from understanding the problem to building, debugging and presenting, and the project won 1st Place.",
    role: "Co-built RESQER with my Team Nexora teammate Rahil Syed and presented it to the judges. RESQER uses a dual-interface architecture: a panic-proof Citizen Portal (report an emergency, describe it by voice, or send a silent one-tap alert when you can't talk) and a Command Center for responders with a live incident map, community signal feed, AI-recommended actions and scenario simulation.",
    learnings: [
      "Turning a raw problem statement into a working product in 3 hours",
      "AI triage: prioritising distress signals by severity, classification and population density",
      "Designing panic-proof, low-bandwidth interfaces for high-stress situations",
      "Command-center UX: live incident mapping, resource routing and response recommendations",
      "Pitching a technical solution clearly to a judging panel under time pressure"
    ],
    skills: ["Rapid Prototyping", "AI Triage", "Emergency Response Systems", "Geospatial Visualization", "Digital Twins", "UI/UX", "Pitching", "Teamwork"],
    impact: "Won 1st Place at TECHATHON '26 and was recognised for exceptional innovation, creativity and technical excellence. RESQER: from scattered signals to coordinated action.",
    heroImage: "/gallery/techathon/award-ceremony.jpg",
    certificate: "/gallery/techathon/certificate.jpg",
    linkedinPosts: [
      { label: "View LinkedIn Post", url: "https://www.linkedin.com/feed/update/urn:li:activity:7507092193195655168/" }
    ],
    gallery: [
      { url: "/gallery/techathon/certificate.jpg", caption: "Certificate of Achievement - 1st Place, TECHATHON '26" },
      { url: "/gallery/techathon/award-ceremony.jpg", caption: "Receiving the 1st Place award" },
      { url: "/gallery/techathon/pitch-architecture.jpg", caption: "Presenting RESQER's dual-interface architecture" },
      { url: "/gallery/techathon/resqer-command-center.jpg", caption: "RESQER Command Center: live incidents and AI-recommended response" },
      { url: "/gallery/techathon/resqer-citizen-app.jpg", caption: "RESQER Citizen Portal: report, speak or silently signal an emergency" },
      { url: "/gallery/techathon/pitch-demo.jpg", caption: "Live demo for the judging panel" },
      { url: "/gallery/techathon/certificates-medals.jpg", caption: "Team Nexora: winner certificates and medals" }
    ]
  },
  {
    id: 6,
    startDate: "2026-10-05",
    endDate: "2026-10-05",
    title: "CresIgnite - Project Expo 2K26",
    team: "Team Nexora · with Rahil Syed",
    gratitude: "I'm especially happy to have built this alongside my teammate Rahil Syed. Turning ResQer InfraSight from an idea into a working rover together is a moment Team Nexora will always remember. 🤝",
    organization: "B.S. Abdur Rahman Crescent Institute of Science and Technology",
    association: "Department of Computer Science and Engineering · SCIMS",
    type: "Project Expo",
    tag: "Team Nexora | 5 Oct 2026",
    status: "2nd Place",
    overview: "Team Nexora secured 2nd Prize at CresIgnite (Project Expo 2K26) with ResQer InfraSight, an intelligent infrastructure inspection system built to go beyond simply detecting defects. A camera-equipped rover patrols roads and streams what it sees to a municipal dashboard that understands not just where a defect is, but how severe it is, how risky it is, and what needs attention first.",
    role: "Built ResQer InfraSight with my teammate Rahil Syed. We used YOLO for real-time defect detection and OpenCV for computer vision, fused with GPS, MPU6050 and ultrasonic sensor data. On top of that we designed Infrastructure DNA, AI-driven risk prioritisation and predictive maintenance, surfaced in a dashboard with a live GIS radar, the rover's vision pipeline and a road-deterioration forecast.",
    learnings: [
      "Real-time object detection with YOLO and computer vision with OpenCV",
      "Sensor fusion: combining GPS, MPU6050 (IMU) and ultrasonic data with vision",
      "Infrastructure DNA: giving every detected defect a traceable profile",
      "AI-driven risk prioritisation and predictive maintenance forecasting",
      "Designing a pipeline end to end: Detect → Understand → Predict → Act"
    ],
    skills: ["YOLO", "OpenCV", "Computer Vision", "Sensor Fusion", "GPS", "MPU6050", "Ultrasonic Sensors", "Predictive Maintenance", "Robotics"],
    impact: "Won 2nd Prize at CresIgnite (Project Expo 2K26). Thanks to Karthiga Kathiravan Ma'am for her guidance and support throughout the journey, and to the CresIgnite team, mentors and judges.",
    heroImage: "/gallery/cresignite/award-ceremony.jpg",
    certificate: "/gallery/cresignite/certificate.jpg",
    linkedinPosts: [
      { label: "View My LinkedIn Post", url: "https://www.linkedin.com/posts/mohammed-aadil-049b29322_cresignite-nexora-resqerinfrasight-ugcPost-7514027793756778497-ttqm/" },
      { label: "View Team Post", url: "https://www.linkedin.com/feed/update/urn:li:activity:7514663214995968000/" }
    ],
    gallery: [
      { url: "/gallery/cresignite/certificate.jpg", caption: "Certificate of Appreciation - 2nd Place, Project Expo 2K26" },
      { url: "/gallery/cresignite/award-ceremony.jpg", caption: "Team Nexora receiving the 2nd Prize" },
      { url: "/gallery/cresignite/infrasight-rover.jpg", caption: "The ResQer InfraSight inspection rover" },
      { url: "/gallery/cresignite/infrasight-gis-radar.jpg", caption: "Municipal GIS infrastructure radar & Infrastructure DNA feed" },
      { url: "/gallery/cresignite/infrasight-vision-pipeline.jpg", caption: "Live rover AI ingestion & YOLO vision pipeline" },
      { url: "/gallery/cresignite/infrasight-predictive-decay.jpg", caption: "Predictive road deterioration & municipal ROI forecast" },
      { url: "/gallery/cresignite/certificate-medal.jpg", caption: "Certificate and medal" }
    ]
  },
  {
    id: 7,
    startDate: "2026-10-26",
    endDate: "2026-10-26",
    title: "CODE CANVAS - TALENT HUNT 2K26",
    team: "Main Coordinators: Mohammed Aadil & Rahil Syed",
    gratitude: "Heartfelt thanks to Rahil Syed, my fellow main coordinator. Planning and running CODE CANVAS together, sharing every responsibility from day one, is what made this event a success. 🤝",
    organization: "B.S. Abdur Rahman Crescent Institute of Science and Technology",
    association: "Department of Computer Science and Engineering · SCIMS",
    type: "Event Organiser",
    tag: "Event Organisation | 26 Oct 2026",
    status: "Main Coordinator",
    overview: "CODE CANVAS was an event at TALENT HUNT 2K26, conducted by the Department of Computer Science and Engineering at B.S. Abdur Rahman Crescent Institute of Science and Technology. Rahil Syed and I were the main coordinators, responsible for bringing the event to life from the first plan to the final session.",
    role: "As main coordinator alongside Rahil Syed, I took ownership of planning, coordination and on-the-day execution: shaping the event format, working with faculty coordinators and the organising team, managing participants in the lab, and making sure the event ran smoothly from start to finish.",
    learnings: [
      "End-to-end event planning, from idea to successful execution",
      "Coordinating with faculty, volunteers and participants",
      "Taking responsibility and making decisions under time pressure",
      "Leading and working within an organising team",
      "Running a hands-on technical event in a live lab environment"
    ],
    skills: ["Event Management", "Leadership", "Coordination", "Teamwork", "Planning", "Communication"],
    impact: "Received a Certificate of Appreciation for dedication and commitment in organising and managing the CODE CANVAS event. Thanks to the faculty coordinators and the entire organising team for making it a success.",
    heroImage: "/gallery/talenthunt/organising-team.jpg",
    certificate: "/gallery/talenthunt/certificate.jpg",
    linkedinPosts: [
      { label: "View LinkedIn Post", url: "https://www.linkedin.com/feed/update/urn:li:activity:7522592139252355072/" }
    ],
    gallery: [
      { url: "/gallery/talenthunt/certificate.jpg", caption: "Certificate of Appreciation - CODE CANVAS, TALENT HUNT 2K26" },
      { url: "/gallery/talenthunt/organising-team.jpg", caption: "The CODE CANVAS organising team with faculty coordinators" },
      { url: "/gallery/talenthunt/code-canvas-live.jpg", caption: "CODE CANVAS in progress in the lab" }
    ]
  }
];

const WORK_EXPERIENCE_EVENTS = [
  {
    id: 'work-1',
    startDate: "2026-04-01",
    endDate: "2026-08-31",
    title: "Robotics & Innovation Intern",
    organization: "Edutainal Ventures",
    organizationLink: "https://edutainal.com/",
    association: "Associated with Edutainal Maverick World",
    associationLink: "https://edutainalmaverick.world/",
    type: "Internship",
    tag: "Edutainal Maverick World | Apr – Aug 2026",
    status: "Completed",
    overview: "Completed a Robotics & Innovation internship at Edutainal Ventures (April 2026 - August 2026), associated with Edutainal Maverick World, within the CS & Robotics domain. The role combined R&D, student mentoring, learning activities, resource support and program operations with hands-on robotics, IoT, sensors and automation projects.",
    role: "Contributed to R&D and technical prototyping for robotics and IoT projects, mentored students through hands-on builds, and supported learning activities and program operations across the CS & Robotics domain.",
    learnings: [
      "Robotics, IoT, sensors and automation through hands-on projects",
      "Advanced embedded systems and firmware development",
      "Industrial robotics and automation workflows",
      "AI/ML integration in physical hardware systems",
      "Student mentoring and technical communication",
      "Program operations and innovation project support"
    ],
    skills: ["Arduino", "Raspberry Pi", "Python", "C++", "IoT", "Embedded Systems", "AI/ML", "Robotics", "Automation"],
    impact: "Successfully completed the internship, recognised by Edutainal Ventures for strong learning ability, responsibility, adaptability and commitment throughout the program.",
    heroImage: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=70&w=1400&auto=format&fit=crop",
    certificate: edutainalCert,
    gallery: [
      { url: edutainalCert, caption: "Official Certificate of Internship - Edutainal Ventures (April - August 2026)" },
      { url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=70&w=1400&auto=format&fit=crop", caption: "Robotics Development Phase" },
      { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=70&w=1400&auto=format&fit=crop", caption: "Embedded Logic Testing" }
    ]
  },
  {
    id: 'work-2',
    startDate: "2026-06-29",
    endDate: "2026-07-10",
    title: "Industrial Automation Intern (Siemens S7-1200 PLC)",
    organization: "Siemens Centre of Excellence (SCoE-MIT)",
    organizationLink: "https://www.scoe.mitindia.edu/research",
    association: "Anna University, MIT Campus - Dept. of Instrumentation Engineering",
    associationLink: "https://www.scoe.mitindia.edu/",
    type: "Internship",
    tag: "Siemens CoE, MIT Anna University | 29 Jun – 10 Jul 2026",
    status: "Completed",
    overview: "Completed an intensive 100% physical offline summer internship at the Siemens Centre of Excellence (SCoE-MIT), Madras Institute of Technology, Anna University in collaboration with the Department of Instrumentation Engineering. The program focused on Industrial Automation using Siemens S7-1200 PLC systems, incorporating course materials, hands-on programming tasks, theory & lab practicals, hardware assessments, and industrial project execution.",
    role: "Programmed Siemens S7-1200 PLCs using TIA Portal (Totally Integrated Automation). Configured digital and analog I/O modules, wired physical sensors, relays, and actuators, engineered Ladder Logic (LAD) control sequences, and conducted diagnostic hardware troubleshooting and system validation.",
    learnings: [
      "Siemens S7-1200 PLC hardware architecture & TIA Portal software environment",
      "Ladder Logic (LAD) programming, timers, counters, and memory bit management",
      "Interfacing industrial sensors, relay circuits, and electric actuators",
      "Real-time diagnostic troubleshooting, safety interlocks, and hardware testing",
      "Comprehensive evaluation via hands-on assessments and project work"
    ],
    skills: ["Siemens S7-1200 PLC", "TIA Portal", "Industrial Automation", "Ladder Logic (LAD)", "Hardware-in-the-Loop", "Instrumentation", "Mechatronics", "Sensors & Actuators"],
    impact: "Secured an outstanding A+ Grade with a 89% score (Certificate No: 2026-IA-S3-07), demonstrating high proficiency in industrial automation and programmable logic controllers.",
    heroImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=70&w=1400&auto=format&fit=crop",
    certificate: siemensCert,
    certificatePdf: "/siemens-certificate.pdf",
    gallery: [
      { url: siemensCert, caption: "Official Siemens Internship Certificate (A+ Grade | 89% Score)" },
      { url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=70&w=1400&auto=format&fit=crop", caption: "Siemens S7-1200 Industrial Automation Workstation" }
    ]
  }
];


// Award badge colours: 1st gold, 2nd silver, 3rd bronze
const PLACE_STYLES = {
  1: "bg-amber-400/10 border-amber-300/35 text-amber-300",
  2: "bg-slate-200/10 border-slate-200/35 text-slate-200",
  3: "bg-orange-700/15 border-orange-400/35 text-orange-300",
};

// Most recent first: sort by end date, then start date (ISO strings compare correctly).
const byMostRecent = (a, b) => b.endDate.localeCompare(a.endDate) || b.startDate.localeCompare(a.startDate);
const SORTED_WORK = [...WORK_EXPERIENCE_EVENTS].sort(byMostRecent);
const SORTED_EVENTS = [...EVENTS].sort(byMostRecent);

const TimelineCard = ({ event, index, setSelectedEvent }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`relative flex w-full mb-24 lg:mb-32 ${index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"}`}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 lg:left-1/2 top-1/2 -translate-x-[4px] lg:-translate-x-1/2 -translate-y-1/2 w-3 h-3 lg:w-5 lg:h-5 rounded-full bg-rose-800 shadow-[0_0_20px_rgba(136,19,55,0.5)] z-20 border-2 border-[#121212]" />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setSelectedEvent(event)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelectedEvent(event))}
        role="button"
        tabIndex={0}
        aria-label={'Open case study: ' + event.title}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`w-full lg:w-[45%] pl-8 md:pl-10 lg:pl-0 hover-magnetic group outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70 rounded-[2rem] ${index % 2 === 1 ? "lg:pl-16" : "lg:pr-16"}`}
      >
        <motion.div
          layoutId={`card-${event.id}`}
          className="relative w-full rounded-[2rem] bg-white/[0.04] border border-white/10 hover:border-white/20 overflow-hidden p-6 md:p-8 group-hover:bg-white/[0.08] transition-colors duration-500"
        >
          <div style={{ transform: "translateZ(40px)" }}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
              {event.status && (/coordinator|organi[sz]er/i.test(event.status) ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-300 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em]">
                  <Users className="w-3 h-3" strokeWidth={2.5} aria-hidden="true" />
                  {event.status}
                </span>
              ) : /place/i.test(event.status) ? (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em] ${PLACE_STYLES[event.status[0]] || PLACE_STYLES[1]}`}>
                  <Trophy className="w-3 h-3" strokeWidth={2.5} aria-hidden="true" />
                  {event.status}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/25 text-emerald-300 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em]">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  {event.status}
                </span>
              ))}
              <p className="text-rose-400/90 text-[10px] md:text-xs font-semibold tracking-widest uppercase leading-relaxed">
                {event.tag}
              </p>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
              {event.title}
            </h3>
            {event.team && (
              <p className="flex items-center gap-2 text-white/55 text-[11px] md:text-xs font-medium mb-3">
                <Users className="w-3.5 h-3.5 text-rose-400/80 shrink-0" strokeWidth={2} aria-hidden="true" />
                {event.team}
              </p>
            )}
            
            <div className="flex flex-col gap-1 mb-6 border-l border-white/20 pl-4">
                {event.organizationLink ? (
                    <a 
                        href={event.organizationLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-white hover:text-rose-600 transition-colors duration-300 font-bold text-sm md:text-lg flex items-center gap-2 group/orgLink outline-none hover-magnetic"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {event.organization}
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/orgLink:opacity-100 group-hover/orgLink:translate-x-0 transition-all" />
                    </a>
                ) : (
                    <p className="text-white/50 font-medium text-sm md:text-base">{event.organization}</p>
                )}

                {event.association && (
                    event.associationLink ? (
                        <a 
                            href={event.associationLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-white/30 text-xs hover:text-rose-500 transition-colors duration-300 outline-none w-fit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {event.association} ↗
                        </a>
                    ) : (
                        <p className="text-white/30 text-xs">{event.association}</p>
                    )
                )}
            </div>

            {/* Image Preview Window inside card */}
            <motion.div
              layoutId={`image-${event.id}`}
              className="w-full h-32 md:h-56 rounded-2xl overflow-hidden relative border border-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent transition-opacity duration-500 z-10" />
              <img
                src={event.heroImage}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                loading="lazy"
                decoding="async"
              />

              {/* Card Bottom Read More action */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  Read Case Study
                </span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          </div>
        </motion.div>
        {/* Glow behind card */}
        <div className="absolute inset-0 -z-10 bg-rose-800/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

const ExperienceTimeline = () => {
  const containerRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Handle ESC key for modal closing cleanly
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Freeze the page (Lenis + native) while the case study is open
  useScrollLock(!!selectedEvent);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-[#050505] py-24 md:py-32 px-5 md:px-12 lg:px-24 z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 md:mb-32 flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-8xl font-medium tracking-tighter text-white flex flex-col items-center justify-center">
            <ScrollFloat text="Journey &" className="mr-3 md:mr-5" />
            <ScrollFloat
              text="Experience."
              className="italic text-white/40 mr-3 md:mr-5"
              delay={0.2}
            />
          </h2>
          <p className="max-w-2xl text-white/60 mt-8 leading-relaxed mx-auto text-base md:text-lg">
            A documented trail of real-world problem-solving, competitive
            technical expansion, and professional growth in robotics and
            full-stack engineering.
          </p>
        </div>

        {/* Section B: Internship & Work Experience (Clickable Timeline) */}
        <div className="mb-24 md:mb-40">
          <motion.div
            className="flex items-center gap-4 mb-16"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Briefcase className="w-5 h-5 text-rose-700" strokeWidth={1.5} />
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Internship & Professional Experience
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>

          <div className="relative w-full">
            <div className="absolute left-[1px] lg:left-1/2 top-0 bottom-0 w-[1px] lg:w-[1px] bg-white/10 lg:-translate-x-1/2" />
            <motion.div
              className="absolute left-[0.5px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose-800 via-rose-700 to-transparent lg:-translate-x-1/2 origin-top shadow-[0_0_20px_rgba(136,19,55,0.8)]"
              style={{ scaleY }}
            />
            <div className="flex flex-col relative z-10 w-full pl-0">
              {SORTED_WORK.map((event, i) => (
                <TimelineCard
                  key={event.id}
                  event={event}
                  index={i}
                  setSelectedEvent={setSelectedEvent}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Section A: Competitions & Events */}
        <div className="relative w-full">
          <motion.div
            className="flex items-center gap-4 mb-16"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Trophy className="w-5 h-5 text-rose-700" strokeWidth={1.5} />
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Competitions & Technical Events
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>

          <div className="absolute left-[1px] lg:left-1/2 top-0 bottom-0 w-[1px] lg:w-[1px] bg-white/10 lg:-translate-x-1/2" />
          <motion.div
            className="absolute left-[0.5px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose-800 via-rose-700 to-transparent lg:-translate-x-1/2 origin-top shadow-[0_0_20px_rgba(136,19,55,0.8)]"
            style={{ scaleY }}
          />

          <div className="flex flex-col relative z-10 w-full pl-0">
            {SORTED_EVENTS.map((event, i) => (
              <TimelineCard
                key={event.id}
                event={event}
                index={i}
                setSelectedEvent={setSelectedEvent}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Immersive Case Study Modal View */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-12 bg-[#050505]/95 backdrop-blur-sm"
          >
            <motion.button
              className="absolute top-6 right-6 md:top-12 md:right-12 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 z-[210] hover-magnetic outline-none"
              onClick={() => setSelectedEvent(null)}
              aria-label="Close case study"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <motion.div
              layoutId={`card-${selectedEvent.id}`}
              className="relative w-full h-full md:h-[90vh] md:max-w-6xl md:rounded-[2rem] bg-[#0a0a0a] md:border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full h-full overflow-y-auto overflow-x-hidden overscroll-contain"
                data-lenis-prevent
              >
                {/* Hero Header Region */}
                <div className="relative w-full h-[50vh] md:h-[60vh] shrink-0">
                  <motion.img
                    layoutId={`image-${selectedEvent.id}`}
                    src={selectedEvent.heroImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/20" />
                  <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    >
                      <p className="text-rose-400 font-semibold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                        {selectedEvent.type} <span className="w-1.5 h-1.5 rounded-full bg-rose-700 shadow-[0_0_10px_rgba(136,19,55,1)]" /> 
                        {selectedEvent.organizationLink ? (
                            <a 
                                href={selectedEvent.organizationLink} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-white hover:text-rose-500 transition-colors duration-300 flex items-center gap-2 outline-none"
                            >
                                {selectedEvent.organization}
                                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                            </a>
                        ) : (
                            <span>{selectedEvent.organization}</span>
                        )}
                      </p>
                      <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-tight">
                        {selectedEvent.title}
                      </h2>
                      {selectedEvent.team && (
                        <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/85 text-xs md:text-sm font-medium">
                          <Users className="w-4 h-4 text-rose-400" strokeWidth={2} aria-hidden="true" />
                          {selectedEvent.team}
                        </p>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Rich Content Grid */}
                <div className="p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-24">
                  {/* Left Column Data (Storytelling) */}
                  <div className="lg:col-span-7 flex flex-col gap-16">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <h4 className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                        <span className="w-2 h-[1px] bg-rose-800" /> Overview
                      </h4>
                      <p className="text-white/90 text-xl leading-relaxed font-light">
                        {selectedEvent.overview}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                        <span className="w-2 h-[1px] bg-rose-800" /> My Role &
                        Participation
                      </h4>
                      <p className="text-white/80 text-lg leading-relaxed">
                        {selectedEvent.role}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                        <span className="w-2 h-[1px] bg-rose-800" /> Outcome /
                        Impact
                      </h4>
                      <p className="text-white/80 text-lg leading-relaxed italic border-l-2 border-rose-800/50 pl-6 py-2 bg-gradient-to-r from-rose-800/5 to-transparent">
                        {selectedEvent.impact}
                      </p>
                    </motion.div>

                    {selectedEvent.gratitude && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35 }}
                        className="relative overflow-hidden rounded-3xl border border-rose-500/20 bg-gradient-to-br from-rose-900/20 via-white/[0.02] to-transparent p-6 md:p-8"
                      >
                        <span aria-hidden="true" className="absolute -top-4 right-4 font-serif text-[7rem] leading-none text-rose-500/10 select-none">&rdquo;</span>
                        <h4 className="text-rose-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                          <span className="w-2 h-[1px] bg-rose-500" /> A Note of Gratitude
                        </h4>
                        <p className="relative text-white/85 text-base md:text-lg leading-relaxed font-serif italic">
                          {selectedEvent.gratitude}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Column Data (Metrics & Skills) */}
                  <div className="lg:col-span-5 flex flex-col gap-12">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <h4 className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6">
                        Skills Acquired
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-rose-100 text-[10px] font-bold tracking-[0.1em] uppercase hover:bg-rose-800/20 hover:border-rose-800/50 transition-colors duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="bg-white/[0.02] border border-white/5 rounded-3xl p-8"
                    >
                      <h4 className="text-rose-700 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6">
                        Key Technical Learnings
                      </h4>
                      <ul className="flex flex-col gap-5">
                        {selectedEvent.learnings.map((learning) => (
                          <li
                            key={learning}
                            className="flex gap-4 items-start text-white/70 text-sm leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-800/50 shrink-0 mt-1.5" />
                            {learning}
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {selectedEvent.organizationLink && (
                        <motion.div initial={{opacity:0, x: 20}} whileInView={{opacity:1, x:0}} viewport={{once: true}} transition={{delay: 0.6}} className="flex flex-col gap-4">
                            <h4 className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-2">Company Branding</h4>
                            <div className="flex flex-col gap-3">
                                <a 
                                    href={selectedEvent.organizationLink} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-rose-800/50 hover:bg-rose-800/10 transition-all duration-500 group/link outline-none"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-rose-900/20 flex items-center justify-center border border-rose-800/20 group-hover/link:bg-rose-800 group-hover/link:text-white transition-colors">
                                            <Building2 className="w-5 h-5 text-rose-700 group-hover/link:text-white" />
                                        </div>
                                        <span className="text-white font-bold text-sm">{selectedEvent.organization}</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-white/20 group-hover/link:text-rose-700 group-hover/link:translate-x-1 transition-all" />
                                </a>

                                {selectedEvent.associationLink && (
                                    <a 
                                        href={selectedEvent.associationLink} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-rose-800/50 hover:bg-rose-800/10 transition-all duration-500 group/link outline-none"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                                <Briefcase className="w-5 h-5 text-white/40" />
                                            </div>
                                            <span className="text-white/60 font-medium text-xs">{selectedEvent.association}</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-white/20 group-hover/link:text-rose-700 group-hover/link:translate-x-1 transition-all" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Certificate Action Button - Only show if certificate exists */}
                    {selectedEvent.certificate ? (
                      <div className="flex flex-col gap-3">
                        <h4 className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-1">
                          Certificate
                        </h4>
                        <a
                          href={selectedEvent.certificate}
                          target="_blank"
                          rel="noreferrer"
                          className="group/cert relative block rounded-2xl overflow-hidden border border-white/10 bg-white hover:border-rose-500/50 transition-colors duration-300"
                          aria-label="Open certificate in full size"
                        >
                          <img
                            src={selectedEvent.certificate}
                            alt={`Certificate - ${selectedEvent.title}`}
                            decoding="async"
                            className="w-full h-auto min-h-[180px] max-h-[420px] object-contain object-top bg-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cert:scale-[1.02]"
                          />
                          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 text-white text-[10px] font-bold uppercase tracking-[0.15em]">
                            Full size ↗
                          </span>
                        </a>
                        <motion.a
                          href={selectedEvent.certificate}
                          target="_blank"
                          rel="noreferrer"
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 }}
                          className="flex items-center gap-6 bg-rose-800/10 hover:bg-rose-800/20 border border-rose-800/20 hover:border-rose-800/50 rounded-3xl p-6 transition-all duration-300 group hover-magnetic outline-none"
                        >
                          <div className="w-14 h-14 shrink-0 rounded-full bg-rose-800/20 flex items-center justify-center text-rose-700 group-hover:bg-rose-800 group-hover:text-[#050505] transition-colors duration-300 shadow-[0_0_20px_rgba(136,19,55,0.2)]">
                            <Award className="w-6 h-6" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-rose-700 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">
                              Official Document
                            </span>
                            <span className="text-white text-sm md:text-base font-semibold group-hover:text-white/80 transition-colors">
                              View Certificate Image ↗
                            </span>
                          </div>
                        </motion.a>

                        {selectedEvent.certificatePdf && (
                          <a
                            href={selectedEvent.certificatePdf}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-widest transition-all"
                          >
                            <span>Download Official PDF Certificate ↗</span>
                          </a>
                        )}

                        {(selectedEvent.linkedinPosts || []).map((post) => (
                          <a
                            key={post.url}
                            href={post.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2.5 p-3.5 rounded-2xl bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/30 hover:border-[#0A66C2]/60 text-[#4f9de8] hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors"
                          >
                            <Linkedin className="w-4 h-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                            <span>{post.label} ↗</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-6 bg-white/[0.02] border border-white/5 rounded-3xl p-6 opacity-60">
                        <div className="w-14 h-14 shrink-0 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white/30 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">
                            Status
                          </span>
                          <span className="text-white/50 text-sm md:text-base font-semibold">
                            Program Completed Successfully
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Visual Proof / Certificate Gallery */}
                <div className="p-8 md:p-16 border-t border-white/5 mt-8 mb-24 bg-[#121212]/50">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-8 text-center md:text-left">
                      Visual Proof & Event Gallery
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {selectedEvent.gallery.map((item, i) => (
                        <div key={i} className="flex flex-col gap-4">
                          <div className="rounded-3xl overflow-hidden aspect-[4/3] md:aspect-video border border-white/10 group relative">
                            <div className="absolute inset-0 bg-rose-800/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                            <img
                              src={typeof item === "string" ? item : item.url}
                              className={`w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                (typeof item === "string" ? item : item.url) === selectedEvent.certificate
                                  ? "object-contain bg-white p-2 group-hover:scale-[1.03]"
                                  : "object-cover group-hover:scale-110"
                              }`}
                              alt={item.caption || "Event visual evidence"}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          {item.caption && (
                            <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium px-2">
                              {item.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceTimeline;
