import { FaYoutube, FaFacebook, FaEnvelope } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const SKILL_DATA = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Framer Motion",
    image: "framer.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Stripe",
    image: "stripe.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
] as const;

export const SOCIALS = [] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Material UI",
    image: "mui.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  }
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Prisma",
    image: "prisma.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Graphql",
    image: "graphql.png",
    width: 80,
    height: 80,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "React Native",
    image: "reactnative.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Tauri",
    image: "tauri.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "Go",
    image: "go.png",
    width: 60,
    height: 60,
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Social",
    data: [
      {
        icon: RxGithubLogo,
        name: "GitHub",
        link: "https://github.com/sathwikreddychelemela",
      },
      {
        icon: RxLinkedinLogo,
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/sathwikreddychelemela/",
      },
    ],
  },
  {
    title: "Contact",
    data: [
      {
        icon: FaEnvelope,
        name: "Gmail",
        link: "https://mail.google.com/mail/?view=cm&fs=1&to=sathwikreddychelemela@gmail.com",
      },
      {
        icon: FaEnvelope,
        name: "Email",
        link: "mailto:sathwikreddychelemela@gmail.com",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Education",
    link: "#education",
  },
  {
    title: "Work Experience",
    link: "#work-experience",
  },
  {
    title: "Skills",
    link: "#skills",
  },
] as const;


export const PROJECTS = [
  {
    title: "Reddit Data Engineering Pipeline",
    description: "A data engineering pipeline for processing and analyzing Reddit data using Airflow and AWS services.",
    link: "https://github.com/SathwikReddyChelemela/Reddit_DataEngineeringPipeline",
    tags: ["Python", "Apache Airflow", "AWS", "ETL", "Data Engineering"],
  },
  {
    title: "Real-Time Data Pipeline",
    description: "A real-time data pipeline using Airflow, Kafka, Spark, and Cassandra for streaming and processing user data.",
    link: "https://github.com/SathwikReddyChelemela/RealtimeDataStreaming_DataEnggPipeline",
    tags: ["Apache Kafka", "Apache Spark", "Airflow", "Cassandra", "Docker"],
  },
  {
    title: "Fine-Tuning LLMs for SQL Query Generation",
    description: "LoRA fine-tuning of DeepSeek and LLaMA models to generate SQL queries from natural language prompts.",
    link: "https://github.com/SathwikReddyChelemela/Fine-Tuning-LLMs-for-SQL-Query-Generation",
    tags: ["LLM", "SQL", "NLP", "LoRA", "Fine-tuning"],
  },
  {
    title: "Generative Adversarial Networks",
    description: "Implementation of GANs to generate synthetic data and images using deep learning techniques.",
    link: "https://github.com/SathwikReddyChelemela/Generative-Adversarial-Networks",
    tags: ["Python", "GAN", "Deep Learning", "Jupyter", "Neural Networks"],
  },
  {
    title: "Autoencoder",
    description: "Dimensionality reduction and feature learning using neural network-based autoencoders.",
    link: "https://github.com/SathwikReddyChelemela/Autoencoder",
    tags: ["Autoencoder", "Neural Networks", "Deep Learning", "Dimensionality Reduction"],
  },
  {
    title: "Fraud Detection Ensemble Model",
    description: "An ensemble model combining CNN, ANN, and Random Forest to detect fraudulent transactions.",
    link: "https://github.com/SathwikReddyChelemela/Fraud-Detection-Ensemble-Model",
    tags: ["CNN", "ANN", "Random Forest", "Ensemble", "Fraud Detection"],
  },
  {
    title: "Financial Risk and Loan Prediction",
    description: "A machine learning model to predict financial risk and loan approval using customer data.",
    link: "https://github.com/SathwikReddyChelemela/Project-Financial-Risk-and-Loan-Prediction",
    tags: ["Machine Learning", "Risk Analysis", "Finance", "Loan Prediction"],
  },
  {
    title: "WeCare Fund Management System",
    description: "Java Swing application for donation, fund, and kit management with enterprise-level communication.",
    link: "https://github.com/SathwikReddyChelemela/WeCareFundManagementSystem",
    tags: ["Java", "Swing", "GUI", "Enterprise App", "Fund Management"],
  },
  {
    title: "Vivid Vibes Event Management",
    description: "A full-stack web app for event planning with role-based access, user auth, and responsive design.",
    link: "https://github.com/SathwikReddyChelemela/Vivid-Vibes-EventManagment",
    tags: ["React", "Node.js", "MongoDB", "Express", "Event Management"],
  },
  {
    title: "UI/UX Portfolio",
    description: "A Framer-powered interactive prototype showcasing a revolutionary social shopping experience. Features include personalized feeds, influencer recommendations, and seamless social commerce integration.",
    link: "https://sathwikreddychelemela.framer.website/",
    tags: ["Framer", "UI/UX Design", "Social Commerce", "User Research", "Prototyping"],
    isUxProject: true
  },
  {
    title: "Xon: Merging Social and Commerce",
    description: "A comprehensive Figma design system that brings together social interaction and e-commerce. Features detailed UI components, color schemes, and interactive prototypes showcasing the seamless integration of social features with shopping functionality.",
    link: "https://www.figma.com/proto/aQYckssiJTaOh13Ejxz8TB/SathwikReddyChelemela_Fall2024?node-id=922-155&p=f&t=P4KypHJl6csMVNQT-1&scaling=scale-down&content-scaling=fixed&page-id=922%3A13&starting-point-node-id=922%3A155",
    tags: ["Figma", "Design System", "UI Components", "Prototyping", "Social Commerce"],
    isUxProject: true
  },
];

export const LINKS = {
  sourceCode: "https://github.com/SathwikReddyChelemela",
};
