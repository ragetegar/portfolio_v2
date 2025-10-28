"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedHero({ name = "Tegar", emoji = "👋" }) {
  const [step, setStep] = useState<"hi" | "typing" | "full" | "shake">("hi");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (step === "hi") {
      const timer = setTimeout(() => setStep("typing"), 800);
      return () => clearTimeout(timer);
    }
    if (step === "typing") {
      let fullText = `I'm ${name}${emoji}`;
      let i = 0;
      const typeInterval = setInterval(() => {
        setTyped(fullText.slice(0, i + 1));
        i++;
        if (i === fullText.length) {
          clearInterval(typeInterval);
          setTimeout(() => setStep("full"), 200);
        }
      }, 70);
      return () => clearInterval(typeInterval);
    }
    if (step === "full") {
      setTyped(`I'm ${name}${emoji}`);
      const timer = setTimeout(() => setStep("shake"), 1200);
      return () => clearTimeout(timer);
    }
    if (step === "shake") {
      setTyped(`I'm ${name}${emoji}`);
      const timer = setTimeout(() => {
        setStep("hi");
        setTyped("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, name, emoji]);

  // Find emoji position for shake
  const emojiIndex = typed.lastIndexOf(emoji);

  return (
    <div className="flex items-center space-x-2 h-16">
      <motion.span
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold"
      >
        Hi,
      </motion.span>
      {(step === "typing" || step === "full" || step === "shake") && (
        <span className="text-3xl font-bold flex items-center">
          {typed.slice(0, emojiIndex)}
          {emojiIndex !== -1 && (
            <motion.span
              className="inline-block"
              animate={
                step === "shake"
                  ? { rotate: [0, 10, -10, 10, -10, 0] }
                  : { rotate: 0 }
              }
              transition={
                step === "shake"
                  ? {
                      duration: 2,
                      repeat: 1,
                      ease: "easeInOut",
                    }
                  : {}
              }
            >
              {emoji}
            </motion.span>
          )}
        </span>
      )}
    </div>
  );
}