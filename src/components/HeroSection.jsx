import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useScroll } from "framer-motion";

const HeroSection = () => {
  const [isInView, setIsInView] = useState(false);
  const { ref, inView } = useInView();

  const { scrollY } = useScroll();

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  return (
    <motion.div
      className="hero"
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: scrollY > 200 ? 0 : 1,
        y: scrollY > 200 ? 100 : 0,
      }}
      transition={{ duration: 0.5 }}
      ref={ref}
      layoutId="hero"
    >
      {/* Hero content */}
      <h1>Hello, my name is Andre</h1>
      <h2>I am a {/* cycling text */}</h2>
      {/* Stacked buttons */}
      <button className="button">Work with me</button>
      <button className="button">About Me</button>
      <button className="button">Projects</button>
      <button className="button">Connect With Me</button>
    </motion.div>
  );
};

export default HeroSection;
