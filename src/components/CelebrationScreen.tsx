/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift, Flame, RotateCcw, X, Volume2, Smile } from 'lucide-react';
import FireworksCanvas from './FireworksCanvas';
import { LOVE_NOTES } from '../data/loveNotes';
import { LoveNote } from '../types';

interface CelebrationScreenProps {
  onRestart: () => void;
}

export default function CelebrationScreen({ onRestart }: CelebrationScreenProps) {
  // Modal State for active Love Note
  const [selectedNote, setSelectedNote] = useState<LoveNote | null>(null);

  // Candles State: [Candle 1, Candle 2, Candle 3] represents whether candle flame is active (true = burning, false = blown)
  const [candles, setCandles] = useState<boolean[]>([true, true, true]);
  const [cakeWished, setCakeWished] = useState(false);

  const handleBlowCandle = (index: number) => {
    const updated = [...candles];
    updated[index] = false;
    setCandles(updated);

    // If all blown out, set cake wished
    if (updated.every(c => !c)) {
      setCakeWished(true);
    }
  };

  const handleResetCandles = () => {
    setCandles([true, true, true]);
    setCakeWished(false);
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden pb-16 bg-[#090310] text-purple-50">
      {/* 1. Spark-burst Firework Canvas backplane */}
      <FireworksCanvas />

      {/* 2. Audio indicator badge (benign aesthetic touch) */}
      <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-full text-[10px] font-mono font-bold tracking-wider text-purple-300 uppercase">
          <Volume2 className="w-3.5 h-3.5 text-pink-400" />
          <span>Interactive Cosmic Celebration</span>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 pt-12 md:pt-16 z-10 flex flex-col items-center">
        {/* Floating Heart Ring Badge */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
          className="w-24 h-24 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/50 border-4 border-purple-950 text-white mb-6"
        >
          <Gift className="w-12 h-12 fill-current animate-bounce" />
        </motion.div>

        {/* 3. Hero Birthday Congratulatory Block */}
        <div className="text-center mb-10 max-w-2xl px-2">
          <h1 className="text-5xl md:text-7xl font-cursive font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-400 to-yellow-200 tracking-wide drop-shadow-[0_4px_12px_rgba(244,63,94,0.4)] mb-3 animate-pulse">
            Happy Birthday, Suruchi! 💖
          </h1>
          <p className="text-2xl md:text-3xl font-handwritten text-rose-100/90 leading-relaxed max-w-lg mx-auto mb-4">
            "Of all the chapters in my life, my absolute favorite is the one where you walked in."
          </p>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent w-48 mx-auto" />
        </div>

        {/* 4. Interactive Cake Blow Game */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md bg-black/40 backdrop-blur-md border border-purple-500/20 rounded-3xl p-6 md:p-8 text-center shadow-2xl mb-12 relative overflow-hidden"
        >
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -left-8 -top-8 w-24 h-24 bg-pink-500/10 rounded-full blur-xl pointer-events-none" />

          <h3 className="text-sm font-bold tracking-wider text-rose-300 uppercase mb-1 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Interactive Candle Blow</span>
          </h3>
          <p className="text-xs text-purple-200/70 mb-6">
            Make a wish in your heart, then tap each candle to blow it out! 🕯️✨
          </p>

          {/* Interactive Birthday Cake SVG */}
          <div className="relative h-44 flex flex-col items-center justify-center mb-6">
            <svg className="w-48 h-full" viewBox="0 0 200 180" fill="none">
              {/* Stand / Tray */}
              <path d="M20 160 C20 155, 180 155, 180 160 L180 168 C180 173, 20 173, 20 168 Z" fill="#4c1d95" />
              <path d="M40 168 L160 168 L150 178 L50 178 Z" fill="#3b0764" />

              {/* Cake Bottom Tier */}
              <rect x="40" y="105" width="120" height="48" rx="8" fill="#fb7185" />
              {/* Frosting drips */}
              <path d="M40 115 C45 125, 55 122, 60 115 C65 108, 75 128, 80 115 C85 102, 95 122, 100 115 C105 108, 115 125, 120 115 C125 105, 135 125, 140 115 C145 105, 155 125, 160 115" stroke="#f43f5e" strokeWidth="8" strokeLinecap="round" />
              {/* Hearts on Bottom Tier */}
              <circle cx="70" cy="132" r="3" fill="#ffe4e6" />
              <circle cx="100" cy="132" r="3" fill="#ffe4e6" />
              <circle cx="130" cy="132" r="3" fill="#ffe4e6" />

              {/* Cake Top Tier */}
              <rect x="52" y="65" width="96" height="40" rx="6" fill="#ffe4e6" />
              {/* White frosting drips */}
              <path d="M52 72 C57 80, 65 78, 70 72 C75 66, 83 82, 88 72 C93 62, 101 78, 106 72 C111 66, 119 80, 124 72 C129 64, 137 80, 142 72" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
              
              {/* Candlesticks & Flames */}
              {/* Candle 1 (Left): X=70, Y=45 */}
              <rect x="68" y="45" width="4" height="20" rx="1" fill="#a78bfa" />
              {candles[0] && (
                <g onClick={() => handleBlowCandle(0)} className="cursor-pointer group">
                  <motion.path
                    animate={{ scale: [1, 1.2, 0.9, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    d="M70 33 C73 38, 70 45, 70 45 C70 45, 67 38, 70 33 Z"
                    fill="#fbbf24"
                    className="origin-bottom"
                  />
                  <motion.path
                    animate={{ scale: [1, 1.3, 0.8, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    d="M70 36 C71.5 39, 70 43, 70 43 C70 43, 68.5 39, 70 36 Z"
                    fill="#f97316"
                    className="origin-bottom"
                  />
                </g>
              )}

              {/* Candle 2 (Middle): X=100, Y=40 */}
              <rect x="98" y="40" width="4" height="25" rx="1" fill="#60a5fa" />
              {candles[1] && (
                <g onClick={() => handleBlowCandle(1)} className="cursor-pointer group">
                  <motion.path
                    animate={{ scale: [1, 1.1, 1.2, 0.9, 1] }}
                    transition={{ repeat: Infinity, duration: 1.4 }}
                    d="M100 28 C103 33, 100 40, 100 40 C100 40, 97 33, 100 28 Z"
                    fill="#fbbf24"
                    className="origin-bottom"
                  />
                  <motion.path
                    animate={{ scale: [1, 0.8, 1.2, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 0.9 }}
                    d="M100 31 C101.5 34, 100 38, 100 38 C100 38, 98.5 34, 100 31 Z"
                    fill="#f97316"
                    className="origin-bottom"
                  />
                </g>
              )}

              {/* Candle 3 (Right): X=130, Y=45 */}
              <rect x="128" y="45" width="4" height="20" rx="1" fill="#34d399" />
              {candles[2] && (
                <g onClick={() => handleBlowCandle(2)} className="cursor-pointer group">
                  <motion.path
                    animate={{ scale: [1.1, 0.9, 1.1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.1 }}
                    d="M130 33 C133 38, 130 45, 130 45 C130 45, 127 38, 130 33 Z"
                    fill="#fbbf24"
                    className="origin-bottom"
                  />
                  <motion.path
                    animate={{ scale: [0.9, 1.2, 1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 0.75 }}
                    d="M130 36 C131.5 39, 130 43, 130 43 C130 43, 128.5 39, 130 36 Z"
                    fill="#f97316"
                    className="origin-bottom"
                  />
                </g>
              )}
            </svg>

            {/* Tap Hotspots for easy phone touch access */}
            <div className="absolute inset-0 flex justify-center gap-12 pointer-events-none">
              {/* Invisible overlay buttons for easy tapping over the flames */}
              <button
                onClick={() => handleBlowCandle(0)}
                className="w-10 h-10 rounded-full mt-6 pointer-events-auto cursor-pointer flex items-center justify-center"
                title="Blow Left Candle"
              >
                {!candles[0] && <span className="text-xs text-rose-400">♥</span>}
              </button>
              <button
                onClick={() => handleBlowCandle(1)}
                className="w-10 h-10 rounded-full mt-4 pointer-events-auto cursor-pointer flex items-center justify-center"
                title="Blow Center Candle"
              >
                {!candles[1] && <span className="text-xs text-rose-400">♥</span>}
              </button>
              <button
                onClick={() => handleBlowCandle(2)}
                className="w-10 h-10 rounded-full mt-6 pointer-events-auto cursor-pointer flex items-center justify-center"
                title="Blow Right Candle"
              >
                {!candles[2] && <span className="text-xs text-rose-400">♥</span>}
              </button>
            </div>
          </div>

          {/* Congratulations overlay for blowing cake */}
          <AnimatePresence mode="wait">
            {cakeWished ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border border-pink-500/30 rounded-2xl p-4 mb-2"
              >
                <h4 className="text-base font-bold text-yellow-300 flex items-center justify-center gap-1.5 animate-pulse">
                  <Smile className="w-5 h-5" />
                  <span>A Million Birthday Wishes to You!</span>
                </h4>
                <p className="text-xs text-rose-100 mt-1 leading-relaxed">
                  Every flame has been blown out. May all the dreams, wishes, and happiness you carry in your beautiful heart manifest this year. You deserve the stars, Suruchi! ⭐💓
                </p>
                <button
                  onClick={handleResetCandles}
                  className="mt-3 text-[10px] font-mono text-pink-300 hover:text-pink-100 flex items-center gap-1 mx-auto"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Relight Candles</span>
                </button>
              </motion.div>
            ) : (
              <p className="text-xs text-purple-300 font-mono">
                Candles Lit: {candles.filter(Boolean).length}/3 • Tap to blow them!
              </p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 5. Heart Love Letters / Messages Section */}
        <div className="w-full text-center mb-6 mt-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-pink-200">
            My Love Letters for You
          </h2>
          <p className="text-xs md:text-sm text-purple-300/80 mt-1">
            Click on each note to reveal a sweet message written just for you, Suruchi... 💌
          </p>
        </div>

        {/* The Grid of Bento-style Love Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {LOVE_NOTES.map((note, index) => (
            <motion.div
              key={note.id}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedNote(note)}
              className="group cursor-pointer select-none border backdrop-blur-md bg-purple-950/20 hover:bg-purple-900/30 border-purple-500/20 hover:border-pink-500/50 p-5 rounded-2xl flex flex-col justify-between h-44 text-left transition-all duration-300 shadow-lg hover:shadow-pink-500/15"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl">{note.emoji}</span>
                  <span className="w-6 h-6 border border-pink-500/30 group-hover:bg-pink-500 group-hover:text-white rounded-full flex items-center justify-center text-[10px] text-pink-400 font-bold transition-all duration-300">
                    →
                  </span>
                </div>
                <h4 className="text-lg font-serif font-bold text-white group-hover:text-pink-200 transition-colors">
                  {note.title}
                </h4>
                <p className="text-xs text-purple-200/70 mt-1 leading-snug">
                  {note.shortDescription}
                </p>
              </div>

              <div className="text-[10px] font-mono tracking-wider text-rose-400 border-t border-purple-500/10 pt-2 flex items-center gap-1 uppercase">
                <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                <span>Reveals personal letter</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 6. Replay & Controls buttons bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 z-10 w-full justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="flex items-center gap-2 px-6 py-3 border border-purple-500/30 bg-purple-950/20 backdrop-blur-sm rounded-full text-sm font-semibold tracking-wide hover:bg-purple-900/40 text-purple-200 duration-300 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Surprise Video 🎬</span>
          </motion.button>

          <p className="text-xs font-mono text-purple-400/80">
            Made with all the love in the universe ✨
          </p>
        </div>
      </div>

      {/* 7. Full-Screen Elegant Heart Envelope modal */}
      <AnimatePresence>
        {selectedNote && (
          <div className="fixed inset-0 min-h-screen w-full flex items-center justify-center p-4 z-50 overflow-y-auto">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNote(null)}
              className="absolute inset-0 bg-[#07020d]/80 backdrop-blur-md cursor-pointer"
            />

            {/* The actual tactile note box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className={`w-full max-w-lg bg-gradient-to-b ${selectedNote.backgroundColor} border shadow-2xl rounded-3xl p-6 md:p-8 text-slate-800 z-10 relative`}
            >
              {/* Close Button badge */}
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon Emoji Header */}
              <div className="text-5xl mb-4 text-center mt-2 animate-bounce">
                {selectedNote.emoji}
              </div>

              {/* Title inside */}
              <h3 className="text-2xl md:text-3xl font-cursive font-bold text-center text-rose-800 mb-1">
                {selectedNote.title}
              </h3>
              <p className="text-xs uppercase tracking-widest text-rose-600/70 text-center font-mono font-semibold mb-6">
                To My Darling Suruchi
              </p>

              <div className="h-px bg-rose-200/55 w-full mb-6" />

              {/* Love letter paragraphs */}
              <div className="text-2xl md:text-3xl font-handwritten font-semibold text-slate-800 leading-relaxed text-justify px-2 mb-8 select-text">
                {selectedNote.content}
              </div>

              <div className="h-px bg-rose-200/55 w-full mb-6" />

              {/* Romantic signature */}
              <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-1">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
                  <span className="font-cursive text-lg font-bold text-rose-700">Forever Yours</span>
                </div>
                <button
                  onClick={() => setSelectedNote(null)}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs rounded-full shadow-md shadow-rose-300 transition-colors focus:ring-2 focus:ring-rose-400"
                >
                  Close Letter
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
