import { motion } from "framer-motion";
import { styles } from "@/app/styles";
import { fadeIn, textVariant } from "@/utils/motion";

export const SectionWrapper = (Component: React.ComponentType, idName: string) =>
  function HOC() {
    return (
      <motion.section
        variants={fadeIn("", "", 0.1, 1)}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        <div className="scroll-mt-20">
          <Component />
        </div>
      </motion.section>
    );
  }; 