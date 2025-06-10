import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Navbar = () => {
  const [isInView, setIsInView] = useState(false);
  const { ref, inView } = useInView();

  const { scrollY } = useScroll();

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -100 }}
      animate={{
        opacity: scrollY > 200 ? 1 : 0,
        y: scrollY > 200 ? 0 : -100,
      }}
      transition={{ duration: 0.5 }}
      ref={ref}
      layoutId="navbar"
    >
      {/* Navbar content */}
      <h1>Andre Emanuel</h1>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About Me</a>
        </li>
        <li>
          <a href="#">Projects</a>
        </li>
        <li>
          <a href="#">Connect With Me</a>
        </li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;
