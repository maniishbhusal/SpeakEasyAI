"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

function FeatureDisplay() {
  const features = [
    { name: "Smartpost Meeting Reports", image: "meeting.png" },
    { name: "Emotion & Engagement Timeline", image: "emotional.png" },
    { name: "AI Powered Communication Tips", image: "communication.png" },
    { name: "Privacy First Design", image: "privacy.png" },
  ];

  return (
    <section className="bg-slate-50 py-24 pb-16">
      <div className="max-w-sm sm:max-w-2xl lg:max-w-6xl mx-auto flex flex-col gap-6">
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center"
        ></motion.div>

        <motion.p
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="font-semibold my-4 text-center text-gray-700 text-xl sm:text-2xl"
        >
          SpeakEasyAI helps you analyze your meetings with AI—get
          transcriptions, emotional timelines, and smart feedback.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl hover:border-indigo-400 transition-all duration-300"
            >
              <img
                src={feature.image}
                alt={feature.name}
                className="h-25 w-25 mb-6"
              />
              <p className="text-lg font-semibold text-gray-800">
                {feature.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeatureDisplay;
