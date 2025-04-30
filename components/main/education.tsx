"use client";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/hoc";
import { styles } from "@/styles";

const education = [
  {
    degree: "Master of Science",
    school: "Northeastern University",
    location: "Boston, United States",
    duration: "Sep 2023 - May 2025",
    specialization: "Information Systems",
    description: [
      "Currently pursuing MS in Information Systems with a focus on AI and Machine Learning",
      "Key courses include Generative AI, Natural Language Processing, Machine Learning, Database Management, and Web Design",
      "Maintaining a strong academic record with a GPA of 3.758",
    ],
    achievements: [
      "Active participation in AI and Machine Learning research projects",
      "Collaborative work on database management systems",
      "Hands-on experience with modern web technologies and UX design principles",
    ],
  },
  {
    degree: "Bachelor of Technology",
    school: "SRM University AP",
    location: "Amaravati, India",
    duration: "Jun 2022",
    specialization: "Electronics and Communication Engineering",
    description: [
      "Completed B.Tech in Electronics and Communication Engineering",
      "Core focus on Data Structures, Algorithms, and Programming",
      "Strong foundation in Statistics and Probability Theory",
    ],
    achievements: [
      "Proficient in Object-Oriented Programming principles",
      "Strong understanding of Data Structures and Algorithms",
      "Solid background in Electronics and Communication systems",
    ],
  },
];

const EducationCard = ({ education, index }: { education: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#0a0a0a] p-6 rounded-xl border border-[#2a2a2a] hover:border-purple-500/50 transition-colors"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{education.degree}</h3>
          <div className="text-purple-400 text-sm">
            {education.school} | {education.location}
          </div>
        </div>
        <div className="text-gray-400 mt-2 md:mt-0">{education.duration}</div>
      </div>
      
      {education.specialization && (
        <div className="text-purple-400 text-sm mb-4">
          Specialization: {education.specialization}
        </div>
      )}
      
      <ul className="list-disc list-inside space-y-3 text-gray-300 mb-4 mt-6">
        {education.description.map((point: string, i: number) => (
          <li key={i} className="text-sm leading-relaxed">{point}</li>
        ))}
      </ul>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {education.achievements.map((achievement: string, i: number) => (
          <span
            key={i}
            className="px-3 py-1 text-sm bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20"
          >
            {achievement}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Education = () => {
  return (
    <section
      className="flex flex-col items-center justify-center py-20 px-4 md:px-8"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20"
      >
        Education
      </motion.h1>
      
      <div className="max-w-5xl w-full space-y-8">
        {education.map((edu, index) => (
          <EducationCard
            key={`education-${index}`}
            index={index}
            education={edu}
          />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Education, "education"); 
