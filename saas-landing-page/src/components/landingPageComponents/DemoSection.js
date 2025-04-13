"use client";

import {
  Chrome,
  CheckCircle,
  ArrowRight,
  Star,
  Download,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { motion } from "framer-motion";
import { useState } from "react";

export default function InstallExtensionCTA() {
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const benefitItems = [
    "Instant meeting transcriptions",
    "Emotional intelligence insights",
    "Action item extraction",
    "Privacy-first design",
  ];

  const highlightVariants = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-blue-600 mix-blend-soft-light filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-purple-600 mix-blend-soft-light filter blur-3xl opacity-20"></div>

      <section className="relative py-24">
        <MaxWidthWrapper>
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Left Content */}
            <motion.div className="flex-1 text-white" variants={itemVariants}>
              <div className="mb-6 inline-block">
                <motion.span
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/20"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Star
                    className="h-4 w-4 text-yellow-400 mr-2"
                    fill="#FFC107"
                  />
                  <span>4.9/5 on Chrome Web Store</span>
                </motion.span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Transform Your Meetings <br />
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Into Actionable Insights
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                    variants={highlightVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  />
                </span>
              </h2>

              <p className="text-xl text-white/80 max-w-xl mb-8">
                Add SpeakEasyAI to Chrome and start getting real-time feedback,
                insights, and better conversations with AI-powered meeting
                analysis.
              </p>

              <div className="space-y-4 mb-8">
                {benefitItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                >
                  <Link
                    href="https://chrome.google.com/webstore/detail/your-extension-id" // replace with your actual link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300"
                  >
                    <Chrome className="h-5 w-5" />
                    <span>Install Extension</span>
                    <motion.div
                      animate={isButtonHovered ? { x: 5 } : { x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Link>
                </motion.div>

                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    href="#watch-demo"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/15 transition-all duration-300"
                  >
                    <PlayCircle className="h-5 w-5" />
                    <span>Watch Demo</span>
                  </Link>
                </motion.div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <motion.img
                      key={i}
                      src={`/users/user-${i}.png`}
                      alt={`User ${i}`}
                      className="w-8 h-8 rounded-full border-2 border-indigo-800"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                    />
                  ))}
                </div>
                <motion.p
                  className="text-sm text-white/80"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="font-semibold">2,500+</span> downloads this
                  month
                </motion.p>
              </div>
            </motion.div>

            {/* Right Video Preview */}
            <motion.div
              className="flex-1 relative"
              variants={itemVariants}
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
            >
              {/* Video Light Effect */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"
                animate={
                  isVideoHovered
                    ? { opacity: 0.8, scale: 1.05 }
                    : { opacity: 0.4, scale: 1 }
                }
                transition={{ duration: 0.5 }}
              />

              {/* Video Container */}
              <motion.div
                className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
                animate={
                  isVideoHovered ? { y: -5, scale: 1.02 } : { y: 0, scale: 1 }
                }
                transition={{ duration: 0.4 }}
              >
                {/* Chrome Browser Frame */}
                <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 mx-2 bg-gray-700 rounded-full py-1 px-3 text-xs text-white/80 flex items-center">
                    <div className="w-4 h-4 mr-2 text-gray-400">
                      <Chrome className="w-4 h-4" />
                    </div>
                    meet.google.com
                  </div>
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600">
                    <Download className="w-3 h-3 text-white" />
                  </div>
                </div>
                {/* 
                <a
                  href="https://www.youtube.com/watch?v=2ZIpFytCSVc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <iframe
                    className="w-full aspect-video"
                    src="https://www.youtube.com/embed/i96UO8-GFvw"
                    title="AI Tutorial by Edureka"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </a> */}

                <a
                  href="https://www.youtube.com/watch?v=i96UO8-GFvw&list=RDi96UO8-GFvw&start_radio=1&ab_channel=TheLocalTrain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-full aspect-video overflow-hidden rounded-2xl border border-white/20 shadow-2xl group"
                >
                  {/* Thumbnail */}
                  <img
                    src="https://img.youtube.com/vi/2ZIpFytCSVc/hqdefault.jpg"
                    alt="Demo Video"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Overlay Play Button */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/50">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-indigo-600 ml-1"></div>
                    </div>
                  </div>
                </a>

                {/* Play Button Overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors duration-300 cursor-pointer"
                  animate={isVideoHovered ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-indigo-600 ml-1"></div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Extension Popup Preview */}
              <motion.div
                className="absolute -bottom-10 -right-5 bg-white rounded-lg shadow-2xl w-48 overflow-hidden border border-gray-200"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-indigo-600 p-2 text-white text-xs font-medium flex items-center gap-1">
                  <img src="/favicon.ico" alt="Logo" className="w-4 h-4" />
                  SpeakEasyAI
                </div>
                <div className="p-2 text-xs">
                  <div className="mb-2 font-medium text-gray-800">
                    Meeting Analysis
                  </div>
                  <div className="h-1 w-full bg-gray-100 rounded-full mb-1">
                    <div className="h-1 w-3/4 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-gray-500 text-2xs">
                    Engagement score: 75%
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
