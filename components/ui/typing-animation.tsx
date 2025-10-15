'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: number; // Characters per second
  onComplete?: () => void;
  showCursor?: boolean;
}

export function TypingAnimation({ 
  text, 
  className, 
  speed = 60, // Faster typing speed to keep user engaged
  onComplete,
  showCursor = true 
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showBlinkingCursor, setShowBlinkingCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      // Calculate delay based on character type for more natural typing
      const char = text[currentIndex];
      let delay = 1000 / speed; // Base delay from speed
      
      // Add realistic pauses (reduced for faster typing)
      if (char === '.' || char === '!' || char === '?') {
        delay *= 1.5; // Shorter pause after sentences
      } else if (char === ',' || char === ';') {
        delay *= 1.2; // Minimal pause after clauses
      } else if (char === ' ') {
        delay *= 0.9; // Slightly faster for spaces
      }
      
      // Add slight randomness to make it feel more human (reduced range)
      delay *= (0.9 + Math.random() * 0.2);

      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
      
      // Hide cursor after completion
      setTimeout(() => {
        setShowBlinkingCursor(false);
      }, 1000);
    }
  }, [currentIndex, text, speed, onComplete, isComplete]);

  return (
    <span className={cn("inline", className)}>
      {displayedText}
      {showCursor && showBlinkingCursor && (
        <span className="animate-pulse ml-0.5 text-gray-400">|</span>
      )}
    </span>
  );
}