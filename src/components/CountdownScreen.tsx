/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Calendar, ArrowRight, Music, Volume2 } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import { TimeRemaining } from '../types';

interface CountdownScreenProps {
  onNext: () => void;
}

const MEMORABLE_QUOTES = [
  "You are my today and all of my tomorrows. 💕",
  "In your smile, I see something more beautiful than the stars. ✨",
  "My favorite place in the entire world is right beside you, Suruchi. 🏡",
  "Loving you is as natural as breathing. I love you so much. ❤️",
  "Every second brings us closer to celebrating the most precious person. 🎂",
  "Your birthday is my absolute favorite day of the year! 😍",
  "Suruchi, you make my heart skip a beat, every single day. 💓"
];

export default function CountdownScreen({ onNext }: CountdownScreenProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  const [quoteIndex, setQuoteIndex] = useState(0);

  // Target Date: 18 July 2026, 00:00:00 (Local Time)
  const targetDateStr = "2026-07-18T00:00:00";

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const target = new Date(targetDateStr);
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        isCompleted: false,
      });
    };

    // Calculate immediately and run interval
    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Interval for rotating sweet quotes every 4 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MEMORABLE_QUOTES.length);
    }, 4000);
    return () => clearInterval(quoteInterval);
  }, []);

  // Helper to pad numbers with leading zeros
  const padZero = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center bg-gradient-to-tr from-[#FFF5F5] via-[#FFF0F6] to-[#FFE3E8] p-4 relative overflow-hidden">
      {/* Animated Floating Hearts */}
      <FloatingHearts />

      {/* Decorative floral elements (top-left & top-right) */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-10 pointer-events-none">
        <svg fill="currentColor" className="text-rose-600" viewBox="0 0 100 100">
          <path d="M10,0 C20,10 30,5 40,20 C50,15 60,30 70,25 C80,40 90,30 100,50 L0,50 Z" />
        </svg>
      </div>

      {/* Header section */}
      <header className="w-full max-w-lg text-center pt-8 z-10 flex flex-col items-center">
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 border border-rose-200/60 rounded-full text-xs font-semibold text-rose-500 shadow-sm"
        >
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-500 animate-pulse" />
          <span>Counting Down to Your Beautiful Day</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-cursive text-rose-900 mt-4 tracking-wide">
          For My Dearest Suruchi
        </h2>
      </header>

      {/* Main Countdown Wrapper */}
      <main className="w-full max-w-lg my-auto py-8 z-10">
        {/* The Glassmorphic Heart Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-md bg-white/70 border border-white/65 shadow-2xl rounded-3xl p-6 md:p-8 text-center relative overflow-hidden"
        >
          {/* Subtle heartbeat mesh inside card */}
          <div className="absolute -right-16 -top-16 w-36 h-36 bg-pink-300/10 rounded-full blur-2xl" />
          <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-rose-300/10 rounded-full blur-2xl" />

          {/* Target Indicator */}
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-rose-600 mb-6 bg-rose-50/70 inline-flex px-3.5 py-1 rounded-full border border-pink-100 mx-auto">
            <Calendar className="w-3.5 h-3.5" />
            <span>Target: 18th July 2026</span>
          </div>

          {/* Time digits grids */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 mb-8">
            {/* Days */}
            <div className="flex flex-col items-center bg-white/90 border border-rose-100 shadow-sm rounded-2xl py-3 px-1">
              <span className="text-3xl md:text-4xl font-sans font-bold text-rose-600 tracking-tight">
                {padZero(timeRemaining.days)}
              </span>
              <span className="text-[10px] md:text-xs font-mono tracking-wider text-rose-500 uppercase mt-1">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center bg-white/90 border border-rose-100 shadow-sm rounded-2xl py-3 px-1">
              <span className="text-3xl md:text-4xl font-sans font-bold text-rose-600 tracking-tight">
                {padZero(timeRemaining.hours)}
              </span>
              <span className="text-[10px] md:text-xs font-mono tracking-wider text-rose-500 uppercase mt-1">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center bg-white/90 border border-rose-100 shadow-sm rounded-2xl py-3 px-1">
              <span className="text-3xl md:text-4xl font-sans font-bold text-rose-600 tracking-tight">
                {padZero(timeRemaining.minutes)}
              </span>
              <span className="text-[10px] md:text-xs font-mono tracking-wider text-rose-500 uppercase mt-1">
                Mins
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center bg-white/90 border border-rose-100 shadow-sm rounded-2xl py-3 px-1">
              <span className="text-3xl md:text-4xl font-sans font-bold text-pink-500 tracking-tight animate-none">
                {padZero(timeRemaining.seconds)}
              </span>
              <span className="text-[10px] md:text-xs font-mono tracking-wider text-rose-500 uppercase mt-1">
                Secs
              </span>
            </div>
          </div>

          {/* Completed State message vs Standard ticking */}
          {timeRemaining.isCompleted ? (
            <p className="font-cursive text-2xl text-rose-600 font-bold mb-6">
              🎉 It's your birthday! Time to celebrate! 🎉
            </p>
          ) : (
            <div className="h-14 flex items-center justify-center mb-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="font-handwritten text-2xl md:text-3xl font-bold text-rose-600/95 leading-relaxed max-w-sm"
                >
                  {MEMORABLE_QUOTES[quoteIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          )}

          {/* Love visual separator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="h-px bg-pink-200 w-16" />
            <Heart className="w-4 h-4 text-rose-400 fill-rose-300" />
            <span className="h-px bg-pink-200 w-16" />
          </div>

          {/* The Call to Action button */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-sans font-medium text-rose-500/80 mb-2">
              A very special surprise is waiting for you...
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="group flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 bg-[length:200%_auto] hover:bg-right text-white font-bold rounded-full shadow-lg shadow-rose-300 hover:shadow-xl hover:shadow-rose-300 transition-all duration-500 cursor-pointer text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-rose-300"
            >
              <span>Tap below for more</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 duration-300" />
            </motion.button>
          </div>
        </motion.div>
      </main>

      {/* Footer message */}
      <footer className="w-full text-center pb-6 z-10">
        <p className="text-xs font-mono text-rose-400/80 tracking-wide">
          I'll love you until the end of time, Suruchi. ❤️
        </p>
      </footer>
    </div>
  );
}
