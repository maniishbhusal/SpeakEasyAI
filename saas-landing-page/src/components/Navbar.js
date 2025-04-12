"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ArrowRight, Menu, X } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import SignInForm from "./SignInForm";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="sticky h-16 inset-x-0 top-0 z-30 w-full border-b border-purple-100 bg-white/90 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center justify-center gap-8 lg:gap-14">
              <Link href="/" className="flex z-40 font-bold text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#9447E8"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[#9447E8]">SpeakEasyAI</span>
              </Link>

              <div className="hidden md:flex items-center justify-center gap-8 lg:gap-14">
                <Link
                  href="#pricing"
                  className="font-medium text-gray-700 hover:text-[#9447E8] transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/nirjala"
                  className="font-medium text-gray-700 hover:text-[#9447E8] transition-colors"
                >
                  Demo
                </Link>
                <Link
                  href="#faq"
                  className="font-medium text-gray-700 hover:text-[#9447E8] transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="#about"
                  className="font-medium text-gray-700 hover:text-[#9447E8] transition-colors"
                >
                  About
                </Link>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-[#9447E8] transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 cursor-pointer" />
                ) : (
                  <Menu className="h-6 w-6 cursor-pointer" />
                )}
              </button>
            </div>

            {/* Sign in button */}
            <div className="hidden md:flex items-center space-x-1.5">
              <button
                onClick={() => setIsOpen(true)}
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "flex items-center justify-center group px-5 bg-[#9447E8] hover:bg-[#7B3ABF] text-white transition-all rounded-full"
                )}
              >
                <span>Sign in</span>
                <ArrowRight className="ml-1.5 transform h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-20 bg-white border-b border-purple-100 shadow-lg py-4 animate-fadeIn">
          <MaxWidthWrapper>
            <div className="flex flex-col space-y-4">
              <Link
                href="#pricing"
                className="px-4 py-2 font-medium text-gray-700 hover:text-[#9447E8] hover:bg-purple-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/nirjala"
                className="px-4 py-2 font-medium text-gray-700 hover:text-[#9447E8] hover:bg-purple-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Demo
              </Link>
              <Link
                href="#faq"
                className="px-4 py-2 font-medium text-gray-700 hover:text-[#9447E8] hover:bg-purple-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="#about"
                className="px-4 py-2 font-medium text-gray-700 hover:text-[#9447E8] hover:bg-purple-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsOpen(true);
                }}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full bg-[#9447E8] hover:bg-[#7B3ABF] text-white transition-all rounded-full"
                )}
              >
                Sign in
              </button>
            </div>
          </MaxWidthWrapper>
        </div>
      )}

      {/* Sign in modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-purple-100">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#9447E8] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <SignInForm />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
