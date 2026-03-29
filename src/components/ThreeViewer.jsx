import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ThreeViewer = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        // Scene
        const scene = new THREE.Scene();
        // Fog for depth
        scene.fog = new THREE.FogExp2(0x121212, 0.05);

        // Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 10;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        currentMount.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xffffff, 2);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0x4488ff, 3);
        pointLight2.position.set(-5, -5, -5);
        scene.add(pointLight2);

        // Objects
        const group = new THREE.Group();
        scene.add(group);

        const geometry = new THREE.IcosahedronGeometry(1.5, 0);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.2,
            transmission: 0.9,
            ior: 1.5,
            thickness: 0.5,
            transparent: true,
        });

        // Add floating objects
        const objects = [];
        for (let i = 0; i < 20; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (Math.random() - 0.5) * 20;
            mesh.position.y = (Math.random() - 0.5) * 20;
            mesh.position.z = (Math.random() - 0.5) * 20;
            
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            
            // Random scaling
            const scale = Math.random() * 0.5 + 0.2;
            mesh.scale.set(scale, scale, scale);
            
            group.add(mesh);
            objects.push({
                mesh,
                rx: Math.random() * 0.02 - 0.01,
                ry: Math.random() * 0.02 - 0.01
            });
        }

        // Animation Loop with IntersectionObserver to prevent background lag
        let animationFrameId;
        let isVisible = false;
        
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
        });
        observer.observe(currentMount);

        const clock = new THREE.Clock();

        const animate = () => {
            if (isVisible) {
                const elapsedTime = clock.getElapsedTime();
                
                objects.forEach((obj, i) => {
                    obj.mesh.rotation.x += obj.rx;
                    obj.mesh.rotation.y += obj.ry;
                    obj.mesh.position.y += Math.sin(elapsedTime * 2 + i) * 0.005;
                });

                group.rotation.y = elapsedTime * 0.1;

                renderer.render(scene, camera);
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Responsive
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // ScrollTrigger for camera movement
        gsap.to(camera.position, {
            z: 2,
            y: -2,
            ease: "none",
            scrollTrigger: {
                trigger: currentMount,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
            currentMount.removeChild(renderer.domElement);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return (
        <section className="relative w-full h-[200vh] bg-background">
            <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none z-0">
                <div ref={mountRef} className="w-full h-full" />
            </div>
            
            {/* Overlay Text */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <div className="text-center px-4 mix-blend-difference">
                    <h2 className="text-4xl md:text-7xl font-light text-white tracking-widest uppercase mt-[100vh]">
                        Entering the <span className="font-bold block italic">Void</span>
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default ThreeViewer;
