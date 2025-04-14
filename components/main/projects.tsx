// Author: //sathwikreddychelemela
import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";
import Link from "next/link";

export const Projects = () => {
  return (
    <section className="relative w-full">

      {/* Project Section Content */}
      <div
        id="projects"
        className="relative z-10 flex flex-col items-center justify-center py-20 px-4 md:px-10 bg-transparent"
      >
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 pb-16 text-center">
          My Projects
        </h1>

        {/* Project Grid */}
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              link={project.link}
              tags={project.tags}
              isUxProject={project.isUxProject}
            />
          ))}
        </div>

        {/* View More Projects Button */}
        <div className="mt-12 z-10">
          <Link
            href="https://github.com/SathwikReddyChelemela?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-purple-300 border border-purple-500 px-6 py-3 rounded-lg hover:bg-purple-500/10 transition-all"
          >
            View More Projects →
          </Link>
        </div>
      </div>
    </section>
  );
};
