import { motion } from "framer-motion";
import { SectionWrapper } from "@/hoc";
import { styles } from "@/styles";

const experiences = [
  {
    title: "Data Engineer",
    company: "Cognizant Technology Solutions",
    location: "Hyderabad, India",
    duration: "May 2022 - Jun 2023",
    description: [
      "Defined a strategic vision to automate data pipelines using AWS and Apache Airflow, streamlining data processing tasks and reducing manual intervention by 70%",
      "Developed and deployed ML models on AWS SageMaker, leveraging statistical modeling, hyperparameter tuning, and version control to improve predictive accuracy",
      "Implemented real-time monitoring, hypothesis testing and validation for data pipelines, ensuring status tracking and data integrity across cloud workflows"
    ],
    technologies: ["Python", "SQL", "AWS", "Power BI", "Tableau"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Software Developer",
    company: "HighRadius",
    location: "Hyderabad, India",
    duration: "May 2021 - Sep 2021",
    description: [
      "Collaborated with Stakeholders and Advanced Robotics Process Automation team as a Software Developer Trainee, to automate a website to mimic human-directed tasks, using Machine Learning",
      "Integrated Computer vision technology and deployed an AI Enabled Fintech B2B Cloud Application during internship",
      "Designed and validated a full stack web-based product using problem-solving techniques, and appropriate predictive models along with relevant UI/UX components and backend design"
    ],
    technologies: ["Python", "MySQL", "XML", "React", "MongoDB", "Express", "Node.js"],
    color: "from-purple-500 to-pink-500"
  }
];

const ExperienceCard = ({ experience, index }: { experience: typeof experiences[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative group"
    >
      {/* Space-themed background effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
      <div className="absolute inset-0 bg-[url('/assets/stars.png')] opacity-10 rounded-lg" />
      
      <div className="relative bg-[#0a0a0a] p-6 rounded-lg border border-[#2a2a2a] group-hover:border-purple-500/50 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-1">
              {experience.title}
            </h3>
            <div className="text-purple-400 text-sm">
              {experience.company} | {experience.location}
            </div>
          </div>
          <div className="text-gray-400 mt-2 md:mt-0">{experience.duration}</div>
        </div>
        
        <ul className="list-disc list-inside space-y-3 text-gray-300 mb-4 mt-6">
          {experience.description.map((point, i) => (
            <motion.li 
              key={i} 
              className="text-sm leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              {point}
            </motion.li>
          ))}
        </ul>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {experience.technologies.map((tech, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="px-3 py-1 text-sm bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 hover:bg-purple-500/20 transition-colors hover:shadow-lg hover:shadow-purple-500/20"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const WorkExperience = () => {
  return (
    <section className="flex flex-col items-center justify-center py-20 px-4 md:px-8">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20"
      >
        Work Experience
      </motion.h1>
      
      <div className="max-w-5xl w-full space-y-12">
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.title} experience={experience} index={index} />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(WorkExperience, "work-experience"); 