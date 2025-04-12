"use client";

import React, { useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import {
  Mic,
  FileText,
  MessageCircle,
  FolderSearch,
  ArrowRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    before: {
      title: "Listen",
      icon: <XCircle className="h-10 w-10 text-red-500" />,
      description: "Manually track and understand conversation.",
    },
    after: {
      title: "Transcribe",
      icon: <FileText className="h-10 w-10 text-[#9454AC]" />,
      description: "We transcribe speech into text",
    },
  },
  {
    before: {
      title: "Sentimental Analysis",
      icon: <XCircle className="h-10 w-10 text-red-500" />,
      description: "No clue about speaker's emotions.",
    },
    after: {
      title: "Feedback",
      icon: <CheckCircle className="h-10 w-10 text-[#9454AC]" />,
      description: "feedback about personal growth",
    },
  },
];

// Enhanced animation variants
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.2,
      ease: "easeOut",
    },
  }),
};

const arrowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.6,
      ease: "easeOut",
    },
  },
  floating: {
    x: [0, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

function BeforeAfter() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50 to-white opacity-70"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-100 mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-pink-100 mix-blend-multiply filter blur-3xl opacity-30"></div>

      <MaxWidthWrapper className="text-center relative z-10">
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4 inline-block"
        >
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            The Transformation
          </span>
        </motion.div>

        <motion.h2
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-purple-600 to-indigo-700"
        >
          How it Works
        </motion.h2>

        <motion.p
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-muted-foreground max-w-2xl mx-auto mb-16 text-lg"
        >
          See the transformation SpeakEasyAI brings to your meetings and
          communication.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              {/* Before card */}
              <div
                className="group relative z-10"
                onMouseEnter={() => setHoveredCard(`before-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-200 to-red-300 rounded-2xl opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
                <div
                  className={`relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 transform ${
                    hoveredCard === `before-${index}` ? "scale-105" : ""
                  }`}
                >
                  <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-800">
                    {step.before.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {step.before.description}
                  </p>

                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center z-20 shadow-lg">
                    <motion.div
                      variants={arrowVariants}
                      initial="hidden"
                      whileInView="visible"
                      animate="floating"
                      viewport={{ once: true }}
                    >
                      <ArrowRight className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* After card */}
              <div
                className="group relative z-0 mt-12"
                onMouseEnter={() => setHoveredCard(`after-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
                <div
                  className={`relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 transform ${
                    hoveredCard === `after-${index}` ? "scale-105" : ""
                  }`}
                >
                  <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    {step.after.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-800">
                    {step.after.title}
                  </h3>
                  <p className="text-gray-600">{step.after.description}</p>

                  {/* Success indicator */}
                  <div className="absolute -top-2 -right-2 bg-green-100 p-1 rounded-full border-2 border-white shadow-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </div>

              {/* Success metrics (conditional) */}
              {index === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute -right-4 -bottom-4 bg-white p-3 rounded-xl shadow-xl z-30 text-left border border-purple-100"
                >
                  <p className="text-xs font-semibold text-purple-700 mb-1">
                    Success Rate
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "90%" }}
                        transition={{ delay: 1, duration: 1 }}
                        className="h-full bg-purple-600 rounded-full"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      90%
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Testimonial quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl shadow-sm border border-purple-100"
        >
          <svg
            className="h-8 w-8 text-purple-400 mb-4 mx-auto"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-lg italic text-gray-700 mb-4">
            "SpeakEasyAI transformed how our team communicates. We've cut
            meeting times by 30% and everyone stays on the same page."
          </p>
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Sarah Johnson</p>
              <p className="text-sm text-gray-600">Product Manager, TechCorp</p>
            </div>
          </div>
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full shadow-lg shadow-purple-200 hover:shadow-xl hover:translate-y-0.5 transform transition-all duration-300 flex items-center mx-auto">
            <span>Experience the Difference</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </motion.div>
      </MaxWidthWrapper>
    </motion.section>
  );
}

export default BeforeAfter;
