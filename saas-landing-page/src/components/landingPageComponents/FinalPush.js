"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { IoIosRocket } from "react-icons/io";
import { buttonVariants } from "../ui/button";
import { motion } from "framer-motion";

// Animation Variants
const imageFadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const textFadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

function FinalPush() {
  return (
    <section className="pt-40 pb-32 px-5" id="contact">
      <div className="flex flex-col lg:flex-row max-w-5xl mx-auto px-6 md:px-14 py-10 gap-10 bg-[#C68EFD] rounded-3xl items-center">
        {/* Image Left Side */}
        <motion.div
          variants={imageFadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <img
            src="businessplan.png" // Replace with your actual image
            alt="Grow with AI"
            className="rounded-2xl  w-full max-w-md"
          />
        </motion.div>

        {/* Text Right Side */}
        <motion.div
          variants={textFadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full lg:w-1/2 space-y-6"
        >
          <h2 className="relative tracking-tight font-bold text-3xl md:text-4xl text-white">
            <span className="absolute top-[-20px] right-0">
              
            </span>
            Take your business to the next level
          </h2>

          <p className="text-lg font-thin leading-relaxed text-white">
            Enhance your meetings with SpeakEasyAI—your AI-powered communication
            coach. After every meeting, receive insights on engagement, speaking
            patterns, and actionable feedback to help you improve for next time.
            Make each conversation more impactful!
          </p>

          <div className="w-full sm:w-1/2">
            <Link
              href="/"
              className={cn(
                buttonVariants({ size: "lg" }),
                "flex items-center justify-center group px-4"
              )}
            >
              <span>Start Now</span>
              <ArrowRight className="ml-1.5 transform h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalPush;
