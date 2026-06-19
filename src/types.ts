/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenState = 'ENVELOPE' | 'COUNTDOWN' | 'WARNING' | 'VIDEO' | 'CELEBRATION';

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export interface LoveNote {
  id: number;
  title: string;
  emoji: string;
  shortDescription: string;
  content: string;
  backgroundColor: string;
}
