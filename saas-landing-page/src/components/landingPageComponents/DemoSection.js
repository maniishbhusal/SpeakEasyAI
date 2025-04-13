"use client";
import Iframe from "react-iframe";

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

  const benefitItems = [
    "Instant meeting transcriptions",
    "Emotional intelligence insights",
    "Action item extraction",
    "Privacy-first design",
  ];

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
                  <span>Smooth experience, great feedback – try it yourself!</span>
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
                    href="https://chrome.google.com/webstore/detail/your-extension-id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300"
                  >
                    <Chrome className="h-5 w-5" />
                    <span>Try Now for Free</span>
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

            {/* Right Video Preview with Iframe */}
            <motion.div
              className="flex-1 relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
              variants={itemVariants}
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
            >
              <Iframe
                url="https://www.youtube.com/embed/faBbwMK6XuI?si=4AhnQIRRDmdCqOU9"
                width="100%"
                height="400"
                id="videoIframe"
                className="w-full aspect-video"
                display="block"
                position="relative"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
