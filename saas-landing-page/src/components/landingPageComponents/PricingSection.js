"use client";
import { Building2, CircleCheck, Sparkles } from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("pricing");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.disconnect();
    };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const shimmer = {
    animate: {
      background: [
        "hsla(210, 100%, 86%, 0)",
        "hsla(210, 100%, 86%, 0.2)",
        "hsla(210, 100%, 86%, 0)",
      ],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <section
      className="bg-gradient-to-b from-[#F8F9FA] to-[#F0F4F8]"
      id="pricing"
    >
      <MaxWidthWrapper className="py-24">
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-[#C4D9FF] rounded-full px-5 py-2 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <p className="text-primary text-xs font-semibold tracking-wide">
              PRICING PLANS
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl text-center mt-6"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#293A51] mb-4">
              Choose the Perfect Plan for Your Needs
            </h2>
            <p className="text-[#6B7989] text-lg">
              Flexible pricing options designed to scale with your business and
              deliver exceptional value at every level.
            </p>
          </motion.div>
        </motion.div>

        {/* price chart */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-7 my-12 text-[#293A51]"
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
        >
          {/* free plan */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mt-6"
            variants={item}
            whileHover={{ y: -8 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              FREE PLAN – Start Smart
            </h3>

            <p className="font-bold mb-6 text-center">
              <span className="text-6xl">$0 </span>
              <span className="text-xs text-[#6B7989]">/ month</span>
            </p>

            <p className="text-center font-bold text-[#6B7989]">
              For individuals, students, or early-stage founders exploring
              better meetings.
            </p>

            <motion.div
              className="bg-[#F8F9FA] w-full py-2 rounded-md flex items-center justify-center font-medium my-4"
              animate={shimmer.animate}
            >
              <p className="text-xs text-[#6B7989]">Access to basic features</p>
            </motion.div>

            <div className="px-6">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link
                  href="/"
                  className="flex items-center justify-center cursor-pointer border-2 border-primary px-5 py-[0.45rem] rounded-full hover:bg-primary hover:text-white font-medium text-primary transition-colors duration-300 ease-out w-full"
                >
                  Start for Free
                </Link>
              </motion.div>
            </div>

            <p className="font-medium mt-8 mb-4">Basic features included</p>

            <ul className="text-left text-[#6B7989] font-medium space-y-4 mb-8">
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                AI-powered meeting summary
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                Speaker time breakdown
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                Action items (basic)
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                Recent 30-day history
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                Access to sample advanced reports (teaser for premium)
              </motion.li>
            </ul>
          </motion.div>

          {/* pro plan */}
          <motion.div
            className="relative bg-white p-8 rounded-xl shadow-lg border-2 border-[#9454AC] z-10"
            variants={item}
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ scale: 1.05 }}
          >
            <motion.div
              className="absolute top-[-1rem] left-1/2 transform -translate-x-1/2 bg-primary text-white px-5 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5"
              animate={{
                y: [0, -5, 0],
                boxShadow: [
                  "0 4px 12px rgba(148, 84, 172, 0.3)",
                  "0 8px 16px rgba(148, 84, 172, 0.5)",
                  "0 4px 12px rgba(148, 84, 172, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Most Popular</span>
            </motion.div>

            <h3 className="text-2xl font-bold mb-4 text-center">
              PRO PLAN – Grow Confidently
            </h3>

            <p className="font-bold mb-6 text-center">
              <span className="text-6xl">$19</span>
              <span className="text-xs text-[#6B7989]">/ monthly</span>
            </p>

            <p className="text-center font-bold text-primary">
              For small teams that want real insights and scalable
              collaboration.
            </p>

            <motion.div
              className="bg-[#F8F9FA] w-full py-2 rounded-md flex items-center justify-center font-medium my-4"
              animate={shimmer.animate}
            >
              <p className="text-xs text-[#6B7989]">
                Full access to advanced features
              </p>
            </motion.div>

            <div className="px-6 mb-6">
              <motion.div
                whileTap={{ scale: 0.95 }}
                whileHover={{
                  boxShadow: "0 8px 16px rgba(148, 84, 172, 0.3)",
                }}
                className="flex items-center justify-center cursor-pointer px-5 py-[0.5rem] rounded-full bg-primary hover:bg-primary/90 font-medium text-white transition-all duration-300 ease-out"
              >
                Subscribe now
              </motion.div>
            </div>

            <ul className="text-left text-[#6B7989] font-medium space-y-4 mb-8">
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                <span className="font-bold text-[#293A51]"></span> Everything in
                Free, plus
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                Full sentiment & tone analysis
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                Emotional moment detection
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                Export to PDF/Notion/Slack
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                Calendar integration (auto fetch meetings)
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                Team engagement reports (weekly & monthly)
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.1, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                Light engagement heatmaps
              </motion.li>
            </ul>
          </motion.div>

          {/* enterprise plan */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mt-6"
            variants={item}
            whileHover={{ y: -8 }}
          >
            <h3 className="text-2xl font-bold text-center">
              {" "}
              ENTERPRISE PLAN Lead at Scale
            </h3>
            <motion.div
              className="bg-[#F8F9FA] rounded-full w-20 h-20 flex items-center justify-center mx-auto my-7"
              whileHover={{ rotate: 10, scale: 1.05 }}
              animate={{
                boxShadow: [
                  "0 4px 12px rgba(107, 121, 137, 0.1)",
                  "0 8px 24px rgba(107, 121, 137, 0.2)",
                  "0 4px 12px rgba(107, 121, 137, 0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Building2 className="h-8 w-8 text-[#6B7989]" />
            </motion.div>

            <p className="text-center font-bold text-[#6B7989]">
              Tailored solutions for organizations with complex requirements
            </p>

            <motion.div
              className="bg-[#F8F9FA] w-full py-2 px-6 rounded-md flex items-center justify-center font-medium my-4"
              animate={shimmer.animate}
            >
              <p className="text-xs text-[#6B7989] text-center">
                Full access to all features, including exclusive enterprise
                tools
              </p>
            </motion.div>

            <div className="px-6">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center cursor-pointer border-2 border-primary px-5 py-[0.45rem] rounded-full hover:bg-primary hover:text-white font-medium text-primary transition-colors duration-300 ease-out"
              >
                Contact Us
              </motion.div>
            </div>

            <p className="font-medium mt-8 mb-4">Everything in Pro, plus</p>

            <ul className="text-left text-[#6B7989] font-medium space-y-4 mb-8">
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                <span className="font-bold text-[#293A51]"></span> Emotion
                Recognition Engine (coming soon)
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                Facial expression AI
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                Alerts on team overload, stress patterns, and morale dips
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                Visual graphs of team energy, confusion, or excitement
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                AI feedback on leadership tone, inclusiveness, listening style
              </motion.li>
              <motion.li
                className="flex gap-1.5 items-center text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1, duration: 0.3 }}
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-[#39BAF6] text-white" />
                View team-level trends, risks, and improvement suggestions
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Satisfaction guarantee */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-[#F0F4FF] to-[#E6EEFF] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="bg-white rounded-full p-3 shadow-md">
              <CircleCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-[#293A51]">
                30-Day Money-Back Guarantee
              </h4>
              <p className="text-[#6B7989]">
                Try risk-free with our no-questions-asked refund policy
              </p>
            </div>
          </div>
          <motion.button
            className="px-6 py-2 bg-primary text-white rounded-full font-medium shadow-md hover:bg-primary/90 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
}

export default PricingSection;
