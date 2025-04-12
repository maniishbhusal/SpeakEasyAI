"use client";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";

function AsSeenOn() {
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

    const section = document.getElementById("as-seen-on");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.disconnect();
    };
  }, []);

  const brandLogos = [
    {
      src: "/brand-logos/product_hunt.png",
      alt: "Product Hunt",
      height: "100px",
      featured: true,
    },
    {
      src: "/brand-logos/fast.png",
      alt: "Fast Company",
      height: "40px",
    },
    {
      src: "/brand-logos/inc.png",
      alt: "Inc Magazine",
      height: "80px",
    },
    {
      src: "/brand-logos/techcrunch.png",
      alt: "TechCrunch",
      height: "70px",
      featured: true,
    },
    {
      src: "/brand-logos/forbes.svg",
      alt: "Forbes",
      height: "120px",
      featured: true,
    },
    {
      src: "/brand-logos/wired.png",
      alt: "Wired",
      height: "50px",
    },
    {
      src: "/brand-logos/businessinsider.png",
      alt: "Business Insider",
      height: "55px",
    },
    {
      src: "/brand-logos/cnn.png",
      alt: "CNN",
      height: "55px",
    },
    {
      src: "/brand-logos/bloomberg.png",
      alt: "Bloomberg",
      height: "90px",
      featured: true,
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="as-seen-on"
      className="bg-gradient-to-b from-white to-purple-50 py-16 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Award className="h-4 w-4" />
            <span className="text-xs font-semibold tracking-wide uppercase">
              Featured In
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Leading Publications
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our platform has been recognized by the world's most respected
            business and technology publications
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

          <div className="py-8">
            <InfiniteSlider gap={64} reverse speed={40} className="py-4">
              {brandLogos.map((logo, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center justify-center px-6 ${
                    logo.featured ? "scale-110" : ""
                  }`}
                  whileHover={{
                    scale: 1.1,
                    filter: "brightness(1.1)",
                    transition: { duration: 0.3 },
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: index * 0.1 },
                    },
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`h-[${
                      logo.height
                    }] w-auto transition-all duration-300 filter grayscale hover:grayscale-0 ${
                      logo.featured
                        ? "opacity-100"
                        : "opacity-75 hover:opacity-100"
                    }`}
                  />
                </motion.div>
              ))}
            </InfiniteSlider>
          </div>

          <InfiniteSlider gap={64} className="py-4">
            {brandLogos
              .slice()
              .reverse()
              .map((logo, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center justify-center px-6 ${
                    logo.featured ? "scale-110" : ""
                  }`}
                  whileHover={{
                    scale: 1.1,
                    filter: "brightness(1.1)",
                    transition: { duration: 0.3 },
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: index * 0.1 + 0.3 },
                    },
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`h-[${
                      logo.height
                    }] w-auto transition-all duration-300 filter grayscale hover:grayscale-0 ${
                      logo.featured
                        ? "opacity-100"
                        : "opacity-75 hover:opacity-100"
                    }`}
                  />
                </motion.div>
              ))}
          </InfiniteSlider>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.a
            href="/press"
            className="inline-flex items-center gap-2 text-purple-600 font-medium hover:underline text-lg group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            View our press coverage
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        <motion.div
          className="mt-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 max-w-4xl mx-auto border border-purple-200"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-white p-2 rounded-full shadow-md">
              <div className="bg-purple-600 rounded-full p-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.4 7H4.6C4.27 7 4 7.27 4 7.6V19.4C4 19.73 4.27 20 4.6 20H7.4C7.73 20 8 19.73 8 19.4V7.6C8 7.27 7.73 7 7.4 7ZM19.4 7H16.6C16.27 7 16 7.27 16 7.6V19.4C16 19.73 16.27 20 16.6 20H19.4C19.73 20 20 19.73 20 19.4V7.6C20 7.27 19.73 7 19.4 7Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>

          <blockquote className="text-xl text-gray-700 italic text-center">
            "One of the most innovative platforms we've seen this year. Their
            approach to solving industry challenges is nothing short of
            revolutionary."
          </blockquote>
          <div className="mt-6 flex items-center justify-center">
            <img
              src="/brand-logos/forbes.svg"
              alt="Forbes"
              className="h-8 w-auto mr-3"
            />
            <span className="font-semibold text-gray-900">
              Forbes Technology Council
            </span>
          </div>
        </motion.div>

        {/* Subtle decorative element */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-purple-600 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-purple-600 opacity-5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}

export default AsSeenOn;
