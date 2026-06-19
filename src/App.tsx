/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenState } from './types';
import EnvelopeScreen from './components/EnvelopeScreen';
import CountdownScreen from './components/CountdownScreen';
import WarningScreen from './components/WarningScreen';
import VideoPlayerScreen from './components/VideoPlayerScreen';
import CelebrationScreen from './components/CelebrationScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('ENVELOPE');

  // Animation variants for smooth screen transitions
  const screenVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 }
  };

  const isCelebration = currentScreen === 'CELEBRATION';

  return (
    <div
      id="app-container"
      className={`min-h-screen w-full select-none bg-pink-50 relative ${
        isCelebration ? 'overflow-y-auto bg-[#090310]' : 'overflow-hidden'
      }`}
    >
      <AnimatePresence mode="wait">
        {currentScreen === 'ENVELOPE' && (
          <motion.div
            key="envelope"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <EnvelopeScreen onOpen={() => setCurrentScreen('COUNTDOWN')} />
          </motion.div>
        )}

        {currentScreen === 'COUNTDOWN' && (
          <motion.div
            key="countdown"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <CountdownScreen onNext={() => setCurrentScreen('WARNING')} />
          </motion.div>
        )}

        {currentScreen === 'WARNING' && (
          <motion.div
            key="warning"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <WarningScreen
              onConfirm={() => setCurrentScreen('VIDEO')}
              onBack={() => setCurrentScreen('COUNTDOWN')}
            />
          </motion.div>
        )}

        {currentScreen === 'VIDEO' && (
          <motion.div
            key="video"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <VideoPlayerScreen
              onFinished={() => setCurrentScreen('CELEBRATION')}
              onBack={() => setCurrentScreen('COUNTDOWN')}
            />
          </motion.div>
        )}

        {currentScreen === 'CELEBRATION' && (
          <motion.div
            key="celebration"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6 }}
            className="relative w-full min-h-screen"
          >
            <CelebrationScreen onRestart={() => setCurrentScreen('VIDEO')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
