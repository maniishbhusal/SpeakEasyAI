"use client";

import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, Star } from "lucide-react";
import { useState } from "react";

// Enhanced animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const shimmerVariants = {
  hidden: { backgroundPosition: "200% 0", opacity: 0.3 },
  visible: {
    backgroundPosition: "-200% 0",
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 3,
      ease: "linear",
    },
  },
};

const floatVariants = {
  hidden: { y: 0 },
  visible: {
    y: [-8, 8, -8],
    transition: {
      repeat: Infinity,
      duration: 6,
      ease: "easeInOut",
    },
  },
};

const pulseVariants = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.05, 1],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut",
    },
  },
};

function FeatureDisplay() {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      name: "Smart Meeting Reports",
      image: "meeting.png",
      description:
        "Detailed transcriptions and summarized action items from every meeting.",
      highlightColor: "from-blue-400 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      iconGradient: "from-blue-400 to-indigo-500",
    },
    {
      name: "Emotion Timeline",
      image: "emotional.png",
      description:
        "Track engagement levels and emotional responses throughout conversations.",
      highlightColor: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      iconGradient: "from-purple-400 to-pink-500",
    },
    {
      name: "AI Communication Tips",
      image: "communication.png",
      description:
        "Get real-time suggestions to improve your communication effectiveness.",
      highlightColor: "from-emerald-400 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      iconGradient: "from-emerald-400 to-teal-500",
    },
    {
      name: "Privacy First Design",
      image: "privacy.png",
      description:
        "End-to-end encryption and full control over your sensitive data.",
      highlightColor: "from-amber-400 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      iconGradient: "from-amber-400 to-orange-500",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-24 pb-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-50 rounded-full opacity-30 blur-3xl translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-sm sm:max-w-2xl lg:max-w-6xl mx-auto flex flex-col gap-6 px-4 relative z-10">
        {/* Feature heading with animated underline */}
        <div className="text-center mb-12">
          <motion.div
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text text-3xl md:text-4xl font-bold mb-2 inline-block">
              Powerful Features
            </span>
            <motion.div
              className="h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full w-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "100%", opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.div>
        </div>

        <motion.p
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-16 text-lg"
        >
          SpeakEasyAI helps you analyze your meetings with AI—get
          transcriptions, emotional timelines, and smart feedback.
        </motion.p>

        {/* Features display */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
              className="group relative"
            >
              {/* Card glow effect on hover */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${feature.highlightColor} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300`}
              ></div>

              {/* Card content */}
              <div
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden h-full transition-all duration-500 border border-gray-100`}
              >
                {/* Top colorful stripe */}
                <div
                  className={`h-2 w-full bg-gradient-to-r ${feature.highlightColor}`}
                ></div>

                <div className="p-6 flex flex-col items-center text-center">
                  {/* Image container with floating animation */}
                  <motion.div
                    className="relative mb-6 p-4"
                    variants={activeFeature === index ? floatVariants : {}}
                    animate={activeFeature === index ? "visible" : "hidden"}
                  >
                    {/* Background circle that pulses on hover */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${feature.bgGradient} opacity-30`}
                      variants={activeFeature === index ? pulseVariants : {}}
                      animate={activeFeature === index ? "visible" : "hidden"}
                    ></motion.div>

                    <img
                      src={feature.image}
                      alt={feature.name}
                      className="h-20 w-20 relative z-10 object-contain"
                    />
                  </motion.div>

                  {/* Feature title */}
                  <h3
                    className={`text-xl font-bold mb-3 bg-gradient-to-r ${feature.highlightColor} text-transparent bg-clip-text`}
                  >
                    {feature.name}
                  </h3>

                  {/* Feature description */}
                  <p className="text-gray-600 mb-6">{feature.description}</p>

                  {/* Learn more button with arrow */}
                  <div className="mt-auto">
                    <button
                      className={`flex items-center text-sm font-medium text-gray-600 group-hover:text-indigo-600 transition-colors`}
                    >
                      <span>Learn more</span>
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Feature number badge */}
              <div
                className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r ${feature.iconGradient} flex items-center justify-center shadow-md z-20 text-white font-bold text-sm`}
              >
                {index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA section with shimmer effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.div
            variants={shimmerVariants}
            initial="hidden"
            animate="visible"
            className="inline-block px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-size-200 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="flex items-center">
              <span>Try All Features Now</span>
              <ChevronRight className="ml-1 h-5 w-5" />
            </div>
          </motion.div>

          {/* Testimonial badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-gray-100"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm font-medium">
              Loved by 5000+ professionals
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeatureDisplay;
