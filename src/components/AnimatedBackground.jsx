import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <motion.video
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      src="/videos/background-loop.webm"
      autoPlay
      loop
    />
  );
};

export default AnimatedBackground;
