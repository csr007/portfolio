// Author: //sathwikreddychelemela
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { SectionWrapper } from "@/hoc";
import { useInView } from "react-intersection-observer";
import { Suspense } from "react";

const skillCategories = [
  {
    title: "Data Science & Analytics",
    skills: [
      "Python",
      "Machine Learning",
      "Statistical Analysis",
      "Data Visualization",
      "Pandas/Numpy",
      "R",
      "Tableau",
      "Power BI",
      "Scikit-learn",
      "XGBoost",
      "Time Series Analysis",
      "A/B Testing",
      "Hypothesis Testing",
      "Feature Engineering",
      "Data Mining",
      "Predictive Modeling",
      "Business Intelligence",
      "Data Storytelling",
      "Jupyter Notebooks",
      "Matplotlib/Seaborn"
    ],
    color: "from-purple-500 to-cyan-500"
  },
  {
    title: "Data Engineering",
    skills: [
      "AWS",
      "Apache Airflow",
      "ETL Pipelines",
      "SQL",
      "Data Warehousing",
      "Apache Spark",
      "Docker",
      "Kubernetes",
      "Snowflake",
      "dbt",
      "Apache Kafka",
      "Data Lake",
      "BigQuery",
      "Redshift",
      "PostgreSQL",
      "MongoDB",
      "Data Modeling",
      "Data Quality",
      "CI/CD",
      "Terraform"
    ],
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "Generative AI & ML",
    skills: [
      "LLMs",
      "NLP",
      "TensorFlow/PyTorch",
      "Computer Vision",
      "Model Deployment",
      "LangChain",
      "Hugging Face",
      "OpenAI API",
      "Stable Diffusion",
      "GANs",
      "Transformers",
      "Vector Databases",
      "Prompt Engineering",
      "Fine-tuning",
      "RAG Systems",
      "Semantic Search",
      "Text Generation",
      "Image Generation",
      "Audio Processing",
      "Reinforcement Learning"
    ],
    color: "from-blue-500 to-indigo-500"
  }
];

const SkillCard = ({ category, index }: { category: typeof skillCategories[0], index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative group bg-[#0a0a0a] p-8 rounded-2xl border border-[#2a2a2a] hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-6">
        {category.title}
      </h3>
        
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: index * 0.2 + skillIndex * 0.05 }}
              className="px-4 py-2 text-sm rounded-full bg-[#1a1a1a] text-gray-300 border border-[#2a2a2a] 
                hover:border-purple-500/50 hover:text-white hover:bg-[#2a2a2a] 
                transition-all duration-300 cursor-default
                hover:shadow-md hover:shadow-purple-500/10"
            >
              {skill}
            </motion.span>
          ))}
          </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="flex flex-col items-center justify-center py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
          Skills & Expertise
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A comprehensive toolkit of modern technologies and methodologies that power data-driven solutions
        </p>
      </motion.div>
      
      <LazyMotion features={domAnimation}>
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
            <Suspense key={category.title} fallback={<div className="h-64 bg-[#0a0a0a] rounded-2xl animate-pulse" />}>
              <SkillCard category={category} index={index} />
            </Suspense>
        ))}
      </div>
      </LazyMotion>
    </section>
  );
};

export default SectionWrapper(Skills, "skills");
