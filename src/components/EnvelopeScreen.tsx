/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, MailOpen } from 'lucide-react';

interface EnvelopeScreenProps {
  onOpen: () => void;
}

export default function EnvelopeScreen({ onOpen }: EnvelopeScreenProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Wait for the animation to play before transitioning to the countdown screen
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-tr from-rose-50 via-pink-100 to-rose-100 p-6 relative overflow-hidden">
      {/* Decorative stars and hearts in background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 animate-bounce text-pink-400 text-2xl">✨</div>
        <div className="absolute top-1/3 right-1/4 animate-pulse text-rose-400 text-3xl">💖</div>
        <div className="absolute bottom-1/4 left-1/3 animate-pulse text-pink-300 text-3xl">💗</div>
        <div className="absolute bottom-1/3 right-1/3 animate-bounce text-rose-300 text-2xl">⭐</div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md text-center flex flex-col items-center z-10"
      >
        {/* Cute title */}
        <h1 className="text-5xl md:text-6xl font-cursive text-rose-600 mb-2 tracking-wide drop-shadow-sm">
          Hello my Love, Suruchi
        </h1>
        <p className="text-lg md:text-xl font-handwritten font-medium text-rose-500/90 mb-8 max-w-xs mx-auto">
          I have created a special surprise just for you. Something straight from my heart...
        </p>

        {/* Outer Sealed Envelope Box */}
        <div className="relative w-72 h-56 cursor-pointer group mt-4 mb-8" onClick={handleOpen}>
          {/* Envelope shadow */}
          <div className="absolute inset-0 bg-rose-900/10 rounded-2xl blur-xl transform translate-y-3 scale-95 duration-500 group-hover:translate-y-5" />

          {/* Core Envelope container */}
          <motion.div
            animate={isOpen ? { scale: 0.95, y: 10 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-b from-rose-100 to-pink-50 border-2 border-rose-200 shadow-lg rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-rose-300"
          >
            {/* Triangular mail folds (stylized via grids and borders) */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-rose-200/50 to-transparent clip-path-envelope" />

            {/* Glowing heartbeat badge */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center shadow-md border-4 border-white shadow-rose-300 z-10 hover:bg-rose-600"
            >
              <Heart className="w-10 h-10 text-white fill-white" />
            </motion.div>

            {/* Text on envelope */}
            <div className="mt-4 font-cursive text-xl font-bold text-rose-600/90 z-10">
              Tap to unveil 💌
            </div>
          </motion.div>

          {/* Letter Peeking out behind the heart (animated on open) */}
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={isOpen ? { y: -80, opacity: 1, scale: 1.05 } : { y: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-4 left-6 right-6 h-40 bg-white border border-rose-100 rounded-xl shadow-xl p-4 flex flex-col items-center justify-center z-0 pointer-events-none"
          >
            <div className="font-cursive text-xl text-rose-600 font-bold mb-1">With all my love...</div>
            <div className="w-10 h-1 bg-rose-300 rounded mb-2" />
            <p className="text-[10px] text-gray-500 text-center font-sans">
              "Every single day spent with you is my new favorite day."
            </p>
          </motion.div>
        </div>

        {/* Tap button below for redundancy and screenreader/explicit tap instructions */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full shadow-lg shadow-rose-300 hover:from-rose-600 hover:to-pink-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-rose-300"
        >
          <MailOpen className="w-5 h-5 fill-current" />
          <span>Open with Love</span>
        </motion.button>

        <p className="mt-4 text-xs font-mono text-rose-400/70">
          Handcrafted for my gorgeous Suruchi
        </p>
      </motion.div>
    </div>
  );
}
