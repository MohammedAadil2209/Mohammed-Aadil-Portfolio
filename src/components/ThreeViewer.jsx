import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

const ThreeViewer = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        const isMobile = window.innerWidth < 768;

        // Optimized Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x020205);
        scene.fog = new THREE.Fog(0x020205, 10, 30);

        // Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 15;

        // Renderer with strict speed priority
        const renderer = new THREE.WebGLRenderer({ 
            antialias: !isMobile, 
            powerPreference: "high-performance",
            stencil: false,
            depth: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
        currentMount.appendChild(renderer.domElement);

        // Starfield / Particles (Void Dust) - High performance
        const starGeometry = new THREE.BufferGeometry();
        const starCount = isMobile ? 300 : 800; // Significantly reduced for performance
        const starPositions = new Float32Array(starCount * 3);
        
        for(let i = 0; i < starCount * 3; i+=3) {
            starPositions[i] = (Math.random() - 0.5) * 50;
            starPositions[i+1] = (Math.random() - 0.5) * 50;
            starPositions[i+2] = (Math.random() - 0.5) * 50;
        }
        
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: isMobile ? 0.08 : 0.05,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Standard Material (Zero Transmission Lag)
        const geometry = new THREE.IcosahedronGeometry(1, 0); 
        const material = new THREE.MeshStandardMaterial({
            color: 0x4488ff,
            metalness: 0.8,
            roughness: 0.2,
            transparent: true,
            opacity: 0.4
        });

        const objects = [];
        const group = new THREE.Group();
        scene.add(group);

        const objectCount = isMobile ? 8 : 20;
        for (let i = 0; i < objectCount; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25
            );
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            const s = Math.random() * 0.8 + 0.2;
            mesh.scale.set(s, s, s);
            group.add(mesh);
            objects.push({ mesh, speed: Math.random() * 0.005 + 0.002 });
        }

        // Lighting - High Performance
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);
        
        const p1 = new THREE.PointLight(0x00ffff, 10, 50);
        p1.position.set(10, 10, 10);
        scene.add(p1);

        let animationFrameId;
        const clock = new THREE.Clock();

        const animate = () => {
            const time = clock.getElapsedTime();
            group.rotation.y = time * 0.03;
            objects.forEach(obj => {
                obj.mesh.rotation.y += obj.speed;
                obj.mesh.rotation.x += obj.speed * 0.5;
            });
            stars.rotation.z = time * 0.01;
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Scroll Integration - Ultra Clean
        gsap.to(stars.position, {
            z: 30,
            ease: "none",
            scrollTrigger: {
                trigger: currentMount,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        gsap.to(camera.position, {
            z: 6,
            ease: "none",
            scrollTrigger: {
                trigger: currentMount,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            currentMount.removeChild(renderer.domElement);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            starGeometry.dispose();
            starMaterial.dispose();
        };
    }, []);

    return (
        <section className="relative w-full h-[200vh] bg-[#020205]">
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                <div ref={mountRef} className="w-full h-full" />
            </div>
            
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <h2 className="text-5xl md:text-[8vw] font-black text-white leading-[0.9] tracking-tighter uppercase mb-6">
                        Entering <br className="md:hidden" /> the Void
                    </h2>
                    <div className="h-px w-24 md:w-48 bg-emerald-500/30 mx-auto" />
                </motion.div>
            </div>
        </section>
    );
};

export default ThreeViewer;
