"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FOOTER_DATA } from "@/constants";

export const Footer = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full text-gray-200 py-8 border-t border-purple-500/20"
    >
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full flex flex-row items-center justify-around flex-wrap gap-8">
          {FOOTER_DATA.map((column) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="min-w-[200px] h-auto flex flex-col items-center justify-start"
            >
              <h3 className="font-bold text-[16px] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                {column.title}
              </h3>
              {column.data.map(({ icon: Icon, name, link }) => (
                <Link
                  key={`${column.title}-${name}`}
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex flex-row items-center my-[15px] group relative"
                >
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/20 rounded-full transition-all duration-300"></div>
                  {Icon && <Icon className="relative h-5 w-5 text-white/70 group-hover:text-white transition-colors" />}
                  <span className="relative text-[15px] ml-[6px] text-white/70 group-hover:text-white transition-colors">
                    {name}
                  </span>
                </Link>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-[15px] text-center text-white/50"
        >
          &copy; {new Date().getFullYear()} Sathwik Reddy Chelemela. All rights reserved.
        </motion.div>
      </div>
    </motion.div>
  );
};
