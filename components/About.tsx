// Author: //sathwikreddychelemela
import { motion } from "framer-motion";
import { styles } from "@/styles";
import { fadeIn, textVariant } from "@/utils/motion";
import { SectionWrapper } from "@/hoc";
import { useInView } from "react-intersection-observer";

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeIn("up", "spring", 0.5, 1)}
      className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
    >
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Three.js. I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let's work together to bring your ideas to life!
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {[
          {
            title: "Frontend Development",
            icon: "💻",
            description:
              "I'm proficient in building responsive and interactive user interfaces using modern frameworks like React and Next.js.",
          },
          {
            title: "Backend Development",
            icon: "⚡",
            description:
              "I have experience in developing robust backend services using Node.js, Express, and various databases.",
          },
          {
            title: "3D Development",
            icon: "🎮",
            description:
              "I specialize in creating immersive 3D experiences using Three.js and React Three Fiber.",
          },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={fadeIn("right", "spring", index * 0.5, 0.75)}
            className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
          >
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-[#915eff]" />
              <div className="absolute inset-0 flex justify-center items-center">
                <span className="text-2xl">{feature.icon}</span>
              </div>
            </div>
            <h3 className="text-white font-bold text-[24px] mt-5">{feature.title}</h3>
            <p className="mt-2 text-secondary text-[14px]">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default SectionWrapper(About, "about"); 