// Author: //sathwikreddychelemela
import Link from "next/link";
import { FaGithub, FaFigma } from "react-icons/fa";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fadeIn } from "@/utils/motion";
import { Tilt } from "react-tilt";
import { useInView } from "react-intersection-observer";

type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
  tags?: string[];
  isUxProject?: boolean;
};

export const ProjectCard = ({
  title,
  description,
  link,
  tags = [],
  isUxProject = false,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-200, 200], [10, -10]);
  const rotateY = useTransform(x, [-200, 200], [-10, 10]);

  const springConfig = { damping: 20, stiffness: 200 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPos = mouseX - width / 2;
    const yPos = mouseY - height / 2;
    
    setMousePosition({ x: xPos, y: yPos });
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full h-full rounded-2xl p-6 border ${
        isUxProject 
          ? "border-pink-800/50 shadow-xl hover:shadow-pink-700/30 hover:border-pink-500 bg-gradient-to-br from-pink-900/10 via-transparent to-purple-900/10" 
          : "border-purple-800/50 shadow-xl hover:shadow-purple-700/30 hover:border-purple-500 bg-[#0f0f11]"
      } transition-all duration-300 flex flex-col justify-between gap-6 backdrop-blur-md overflow-hidden group perspective-1000`}
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        isUxProject 
          ? "from-pink-900/20 via-transparent to-purple-900/20" 
          : "from-purple-900/20 via-transparent to-cyan-900/20"
      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Dynamic particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${
              isUxProject ? "bg-pink-500/30" : "bg-purple-500/30"
            } rounded-full`}
            initial={{ 
              x: Math.random() * 100, 
              y: Math.random() * 100,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              scale: [null, Math.random() * 0.5 + 0.5],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Interactive glow effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${
          isUxProject 
            ? "from-pink-500/20 to-purple-500/20" 
            : "from-purple-500/20 to-cyan-500/20"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        style={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
          background: `radial-gradient(circle at ${mousePosition.x + 100}px ${mousePosition.y + 100}px, ${
            isUxProject 
              ? "rgba(236, 72, 153, 0.2)" 
              : "rgba(147, 51, 234, 0.2)"
          }, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4">
        <motion.h3 
          className={`text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
            isUxProject 
              ? "group-hover:from-pink-500 group-hover:to-purple-500" 
              : "group-hover:from-purple-500 group-hover:to-cyan-500"
          } transition-all duration-300`}
          animate={{
            textShadow: isHovered ? `0 0 10px ${
              isUxProject 
                ? "rgba(236, 72, 153, 0.5)" 
                : "rgba(147, 51, 234, 0.5)"
            }` : "none",
          }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
          animate={{
            textShadow: isHovered ? "0 0 5px rgba(147, 51, 234, 0.3)" : "none",
          }}
        >
          {description}
        </motion.p>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, backgroundColor: isUxProject ? "rgba(236, 72, 153, 0.2)" : "rgba(147, 51, 234, 0.2)" }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`px-3 py-1 text-sm ${
                isUxProject 
                  ? "bg-pink-500/10 text-pink-400 border-pink-500/20 group-hover:bg-pink-500/20 group-hover:border-pink-500/40" 
                  : "bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover:bg-purple-500/20 group-hover:border-purple-500/40"
              } rounded-full border transition-all duration-300 cursor-default`}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      )}

      {/* Project Type Icon */}
      {isUxProject && (
        <div className="absolute top-4 right-4 z-20">
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.8, 0.5, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              animate={{
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? 360 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <FaFigma className="text-purple-400 text-2xl drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]" />
            </motion.div>
          </div>
        </div>
      )}

      {/* Project Link Button */}
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative z-10 inline-flex items-center justify-center gap-2 text-sm ${
          isUxProject 
            ? "text-pink-300 border-pink-500 hover:bg-pink-500/10" 
            : "text-purple-300 border-purple-500 hover:bg-purple-500/10"
        } border rounded-lg py-2 px-4 transition-all group/button overflow-hidden`}
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${
            isUxProject 
              ? "from-pink-500/20 to-purple-500/20" 
              : "from-purple-500/20 to-cyan-500/20"
          } opacity-0 group-hover/button:opacity-100 transition-opacity duration-300`}
          style={{
            x: mousePosition.x * 0.3,
            y: mousePosition.y * 0.3,
          }}
        />
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: -5 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 relative z-10"
        >
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            {isUxProject ? (
              <FaFigma className="text-base group-hover/button:text-purple-400 transition-colors" />
            ) : (
              <FaGithub className="text-base group-hover/button:text-purple-400 transition-colors" />
            )}
          </motion.div>
          {isUxProject ? (title === "UI/UX Portfolio" ? "View Project Portfolio" : "View Prototype") : "GitHub Repository"}
        </motion.span>
      </Link>
    </motion.div>
  );
};
