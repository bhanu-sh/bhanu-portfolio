"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Dot = {
  size: number;
  duration: number;
  delay: number;
  x: number;
  y: number;
};

const generateDots = (count: number): Dot[] => {
  return Array.from({ length: count }).map(() => ({
    size: Math.random() * 6 + 4,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));
};

const FloatingDots = () => {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    setDots(generateDots(200));
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-10"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            top: `${dot.y}%`,
            left: `${dot.x}%`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.15, 0], y: -200 }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingDots;
