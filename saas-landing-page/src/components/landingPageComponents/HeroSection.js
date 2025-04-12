"use client";

import MaxWidthWrapper from "../MaxWidthWrapper";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { motion } from "framer-motion";

// Variants
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

function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-white to-[#D4CFFA]">
      <MaxWidthWrapper className="pt-10 !px-2 lg:!px-10 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:pt-24 lg:pb-20 items-center">
        {/* Left Animated Text Content */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="col-span-1 px-2 lg:px-0 flex flex-col justify-center"
        >
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-gray-900 leading-tight">
              Transcribe <span className="text-[#9447E8]">smarter</span>{" "}
              Understand deeper.
            </h1>

            <p className="mt-6 text-lg max-w-prose text-center lg:text-left font-semibold text-balance">
              SpeakEasyAI is an AI-powered extension that transcribes, analyzes
              emotions, and provides smart insights to improve your meetings and
              communication.
            </p>

            <Link
              href="#"
              className={cn(
                buttonVariants({ size: "lg" }),
                "flex items-center justify-center mt-8 group"
              )}
            >
              <span>Start Now</span>
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* User Avatars and Ratings */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-start items-center gap-5">
              <div className="flex -space-x-3">
                {["user-1", "user-2", "user-3", "user-4", "user-5"].map(
                  (user, i) => (
                    <img
                      key={i}
                      src={`/users/${user}.png`}
                      alt="user image"
                      className="h-10 w-10 rounded-full ring-2 ring-slate-200 bg-white"
                    />
                  )
                )}
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                </div>
                <p>
                  <span className="font-semibold">5000+</span> happy users
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Animated Image */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="col-span-1 mt-12 lg:mt-0 flex justify-center"
        >
          <div className="w-full h-72 md:h-[28rem] lg:h-[32rem] rounded-3xl overflow-hidden shadow-xl">
            <img
              src="meeting.png"
              alt="Your graphic"
              className="object-cover w-full h-full rounded-3xl"
            />
          </div>
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
}

export default HeroSection;
