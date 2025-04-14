"use client";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/hoc";
import { styles } from "@/styles";

const Contact = () => {
  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-20 px-4 md:px-8"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20"
      >
        Contact Me
      </motion.h1>

      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0a0a0a] p-8 rounded-xl border border-[#2a2a2a] hover:border-purple-500/50 transition-colors"
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <p className="text-gray-300 text-center">
              Have a question or want to work together? Feel free to reach out!
            </p>
            <a
              href="mailto:sathwikreddychelemela@gmail.com?subject=Portfolio%20Inquiry&body=Hello%20Sathwik%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.%0A%0A"
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg transition-colors duration-300 flex items-center space-x-2"
            >
              <span>Send Email</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(Contact, "contact");