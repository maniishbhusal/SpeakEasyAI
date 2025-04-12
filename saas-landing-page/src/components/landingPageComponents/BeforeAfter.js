"use client";

import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Mic, FileText, MessageCircle, FolderSearch } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Before",
    icon: <Mic className="h-8 w-8 text-[#9454AC]" />,
    description:
      "Meetings were chaotic and unorganized, with no follow-up clarity.",
  },
  {
    title: "After",
    icon: <FileText className="h-8 w-8 text-[#9454AC]" />,
    description:
      "Crystal-clear transcriptions and summarized insights after every call.",
  },
  {
    title: "Before",
    icon: <MessageCircle className="h-8 w-8 text-[#9454AC]" />,
    description: "Struggled to remember what was discussed or promised.",
  },
  {
    title: "After",
    icon: <FolderSearch className="h-8 w-8 text-[#9454AC]" />,
    description: "Smart dashboard organizes all your past meetings by topic.",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function BeforeAfter() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-white py-20"
    >
      <MaxWidthWrapper className="text-center">
        <motion.h2
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4"
        >
          Before vs After
        </motion.h2>

        <motion.p
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-muted-foreground max-w-2xl mx-auto mb-12 text-lg"
        >
          See the transformation SpeakEasyAI brings to your meetings and
          communication.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Always present soft gradient glow (faint) */}
              <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-purple-100 via-white to-pink-100 opacity-30 blur-md z-0 pointer-events-none shadow-4xl" />

              {/* Hover glow (subtle but all-around border feel) */}
              <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-purple-300 via-white to-pink-300 opacity-0 group-hover:opacity-80 blur-md transition-all duration-500 z-10 pointer-events-none" />

              {/* Card Content */}
              <div className="relative z-20 bg-white rounded-2xl shadow-md p-6 min-h-[260px] w-full flex flex-col justify-center items-center text-center transition-all duration-300">
                <div className="mb-4">{step.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </motion.section>
  );
}

export default BeforeAfter;
