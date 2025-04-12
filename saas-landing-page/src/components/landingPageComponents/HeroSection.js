"use client";

import MaxWidthWrapper from "../MaxWidthWrapper";
import {
  ArrowRight,
  Star,
  CheckCircle2,
  Mic,
  Sparkles,
  Brain,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Enhanced animation variants
const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerFeatures = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const featureItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const shimmer = {
  hidden: { backgroundPosition: "200% 0" },
  visible: {
    backgroundPosition: "-200% 0",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 3,
      ease: "linear",
    },
  },
};

function HeroSection() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#EAE6FD] to-[#D4CFFA]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-purple-100 blur-3xl opacity-30" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-indigo-100 blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-blue-100 blur-3xl opacity-20" />
      </div>

      <MaxWidthWrapper
        className={cn(
          "pt-10 lg:pt-24 lg:pb-20 transition-all duration-300",
          scrolled ? "!px-2 lg:!px-10" : "!px-4 lg:!px-14"
        )}
      >
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 items-center">
          {/* Left animated text content */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="col-span-1 px-2 lg:px-0 flex flex-col justify-center"
          >
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              {/* Badge */}
              <motion.div
                variants={shimmer}
                initial="hidden"
                animate="visible"
                className="mb-6 px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 bg-size-200 text-white shadow-lg shadow-purple-200 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Meeting Assistant</span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold tracking-tighter text-gray-900 leading-tight">
              Talk like a pro, Learn like a coach, Grow every meeting
              </h1>

              <p className="mt-6 text-lg max-w-prose text-center lg:text-left  text-gray-700 text-balance">
                SpeakEasyAI is an AI-powered extension that transcribes,
                analyzes emotions, and provides smart insights to improve your
                meetings and communication.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "flex items-center justify-center group bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200/50 transition-all"
                  )}
                >
                  <span>Start Now</span>
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="#"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "flex items-center justify-center group bg-white hover:bg-gray-50"
                  )}
                >
                  <span>Watch Demo</span>
                </Link>
              </div>

              {/* Feature list */}
              <motion.div
                variants={staggerFeatures}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {[
                  { icon: Mic, text: "Transcription" },
                  { icon: Brain, text: "Sentimental analysis" },
                  { icon: Sparkles, text: "Smart insights" },
                  { icon: CheckCircle2, text: "Chatbot" },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    variants={featureItem}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <feature.icon className="h-5 w-5 text-purple-600" />
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* User Avatars and Ratings */}
              <div className="mt-10 flex flex-col sm:flex-row sm:items-start items-center gap-5">
                <div className="flex -space-x-3">
                  {["boy1", "boy2", "boy3", "boy4", "girl1"].map(
                    (user, i) => (
                      <motion.img
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        src={`/users/${user}.jpg`}
                        alt="user image"
                        className="h-10 w-10 rounded-full ring-2 ring-white bg-white shadow-md"
                      />
                    )
                  )}
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.2 + i * 0.1, duration: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        </motion.div>
                      ))}
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <span className="font-semibold">5000+</span> happy users
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right animated image */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="col-span-1 mt-12 lg:mt-0 flex justify-center"
          >
            <div className="relative w-full h-72 md:h-[28rem] lg:h-[32rem] rounded-3xl overflow-hidden">
              {/* Main image */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="w-full h-full rounded-3xl shadow-2xl overflow-hidden"
              >
                <img
                  src="meeting.png"
                  alt="Meeting transcription in action"
                  className="object-cover w-full h-full rounded-3xl"
                />
              </motion.div>

              {/* Floating UI elements */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 lg:left-8 lg:bottom-12 bg-white p-4 rounded-xl shadow-xl w-64"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <p className="font-medium text-sm">Meeting in Progress</p>
                </div>
                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    transition={{ delay: 1, duration: 1.5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                viewport={{ once: true }}
                className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></div>
                  <p className="text-xs font-medium">Analyzing emotions...</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default HeroSection;
