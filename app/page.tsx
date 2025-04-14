// Author: //sathwikreddychelemela
"use client"; 
import { Hero } from "@/components/main/hero";
import dynamic from 'next/dynamic';

// Lazy load components that aren't immediately visible
const Skills = dynamic(() => import('@/components/main/skills'), {
  loading: () => <div className="h-screen" />,
  ssr: false
});

const WorkExperience = dynamic(() => import('@/components/main/work-experience'), {
  loading: () => <div className="h-screen" />,
  ssr: false
});

const Education = dynamic(() => import('@/components/main/education'), {
  loading: () => <div className="h-screen" />,
  ssr: false
});

const Projects = dynamic(() => import('@/components/main/projects').then(mod => mod.Projects), {
  loading: () => <div className="h-screen" />,
  ssr: false
});

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Education />
        <WorkExperience />
        <Skills />
        <Projects/>
      </div>
    </main>
  );
}

