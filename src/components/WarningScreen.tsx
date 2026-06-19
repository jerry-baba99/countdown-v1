/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { RotateCw, Volume2, Sparkles, Film } from 'lucide-react';
import FloatingHearts from './FloatingHearts';

interface WarningScreenProps {
  onConfirm: () => void;
  onBack: () => void;
}

export default function WarningScreen({ onConfirm, onBack }: WarningScreenProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#FFF5F5] via-[#FFF0F6] to-[#FFE3E8] p-6 relative overflow-hidden">
      {/* Floating hearts of course */}
      <FloatingHearts />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md backdrop-blur-md bg-white/80 border border-white/70 shadow-2xl rounded-3xl p-6 md:p-8 text-center z-10 flex flex-col items-center"
      >
        {/* Cute animated head icon */}
        <div className="w-16 h-16 bg-rose-50 rounded-full border border-pink-100 flex items-center justify-center shadow-inner relative mb-6">
          <Film className="w-8 h-8 text-rose-500" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 text-yellow-400"
          >
            <Sparkles className="w-5 h-5 fill-yellow-300" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-serif font-bold text-rose-900 mb-2">
          Get Ready, Suruchi!
        </h3>
        <p className="text-sm font-sans text-rose-500/80 mb-8">
          The next part of your surprise is a video I saved for you. Please prepare your device!
        </p>

        {/* Requirements Box */}
        <div className="w-full grid grid-cols-1 gap-4 mb-8">
          {/* Requirement 1: Rotation */}
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
            }}
            className="flex items-center gap-4 bg-white/90 border border-rose-50 rounded-2xl p-4 shadow-sm"
          >
            <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center border border-pink-100 flex-shrink-0">
              <motion.div
                animate={{ rotate: [0, 90, 0] }}
                transition={{ repeat: Infinity, duration: 3, repeatDelay: 1 }}
              >
                <RotateCw className="w-6 h-6 text-pink-500" />
              </motion.div>
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-gray-800">Rotate Your Device</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Rotate your phone or tablet horizontally (landscape mode) for the final full screen experience!
              </p>
            </div>
          </motion.div>

          {/* Requirement 2: Sound */}
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              delay: 0.5,
              ease: "easeInOut",
            }}
            className="flex items-center gap-4 bg-white/90 border border-rose-50 rounded-2xl p-4 shadow-sm"
          >
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center border border-rose-100 flex-shrink-0">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Volume2 className="w-6 h-6 text-rose-500 animate-pulse" />
              </motion.div>
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-gray-800">Enable Your Sound</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Turn up your volume or connect your headphones! Ensure your silent mode is toggled off.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onConfirm}
            className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-full shadow-lg shadow-rose-300 hover:from-rose-600 hover:to-pink-600 transition-all duration-300 cursor-pointer text-base focus:outline-none focus:ring-4 focus:ring-rose-300"
          >
            I'm Ready! Play Video 🎬❤️
          </motion.button>

          <button
            onClick={onBack}
            className="w-full py-2.5 text-xs font-mono text-gray-400 hover:text-rose-500 transition-colors focus:outline-none"
          >
            ← Back to countdown
          </button>
        </div>
      </motion.div>
    </div>
  );
}
