/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, SkipForward, VolumeX, Volume2 } from 'lucide-react';

interface VideoPlayerScreenProps {
  onFinished: () => void;
  onBack: () => void;
}

export default function VideoPlayerScreen({ onFinished, onBack }: VideoPlayerScreenProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Attempt to autoplay immediately when the screen mounts (with gesture from previous screen)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Autoplay was blocked or failed", err);
          // Keep muted and try to autoplay, or let user click to play
          setIsPlaying(false);
          setIsLoading(false);
        });
    }
  }, []);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleError = () => {
    console.error("Failed to load video");
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 z-0 pointer-events-none" />

      {/* Main Video Viewport */}
      {!hasError ? (
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center aspect-video z-10 px-4">
          <video
            ref={videoRef}
            src="/99.mp4"
            className="w-full h-full rounded-2xl shadow-2xl bg-zinc-950 border border-zinc-800 object-contain"
            playsInline
            onEnded={onFinished}
            onError={handleError}
            onLoadedData={handleLoadedData}
          />

          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-2xl">
              <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-white/80 font-mono text-sm">Preparing your romantic video...</p>
            </div>
          )}

          {/* Centered play overlay (if paused & not loading) */}
          {!isPlaying && !isLoading && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl cursor-pointer group transition-all duration-300"
              onClick={handlePlayToggle}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="w-20 h-20 bg-rose-500 hover:bg-rose-600 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/50 border border-white/20"
              >
                <Play className="w-10 h-10 text-white fill-white translate-x-0.5" />
              </motion.div>
            </div>
          )}

          {/* Top Info Bar */}
          <div className="absolute top-8 left-8 right-8 flex justify-between items-center text-white z-20 pointer-events-none">
            <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-mono font-medium tracking-wider uppercase text-rose-300">
                Happy Birthday 
              </span>
            </div>
          </div>

          {/* Custom Bottom controls overlay on hover */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-20">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-black/60 hover:bg-rose-950/80 hover:text-rose-300 backdrop-blur-md text-white/80 border border-white/10 rounded-full text-xs font-mono transition-all duration-300"
            >
              ← Re-countdown
            </button>

            <div className="flex items-center gap-3">
              {/* Mute button */}
              <button
                onClick={handleMuteToggle}
                className="w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-rose-950/80 backdrop-blur-md text-white border border-white/10 rounded-full transition-all duration-300"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-rose-400" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              {/* Skip button directly */}
              <button
                onClick={onFinished}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-500/20 text-white border border-rose-400/20 rounded-full text-xs font-bold transition-all duration-300 uppercase tracking-wider"
              >
                <span>Skip to celebration</span>
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Resilience Fallback screen if video file fails to load */
        <div className="w-full max-w-md p-8 backdrop-blur-md bg-zinc-950/90 border border-zinc-900 rounded-3xl text-center flex flex-col items-center z-10 mx-4">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 mb-6">
            <RotateCcw className="w-8 h-8" />
          </div>
          
          <h4 className="text-xl font-bold text-white mb-2">
            Could not play
          </h4>
          <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
            The background video file could not be fetched or wasn't loaded quite yet, but your special birthday surprise is still 100% active! Let's proceed straight to the celebration! 🎆💖
          </p>

          <button
            onClick={onFinished}
            className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-lg shadow-lg shadow-rose-500/20 hover:from-rose-600 hover:to-pink-600 duration-300"
          >
            Show Celebration! 🎇✨
          </button>
          
          <button
            onClick={onBack}
            className="mt-4 text-xs font-mono text-zinc-500 hover:text-zinc-300"
          >
            ← Back to Countdown
          </button>
        </div>
      )}
    </div>
  );
}
