import React, { useState, useEffect, useCallback } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * ScrambledText animation that starts on hover.
 * Props:
 *   children: text to animate (string)
 *   duration: total animation time in seconds (default 1.5)
 *   speed: characters per interval (default 3)
 */
export default function ScrambledText({ children, duration = 1.5, speed = 3 }) {
  const [display, setDisplay] = useState('');
  const [hover, setHover] = useState(false);
  const text = typeof children === 'string' ? children : '';

  // Scramble effect logic – runs when hover becomes true
  const scramble = useCallback(() => {
    let start = Date.now();
    const total = duration * 1000;
    const len = text.length;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / total, 1);
      const charsToShow = Math.floor(progress * len);
      let result = '';
      for (let i = 0; i < len; i++) {
        if (i < charsToShow) {
          result += text[i];
        } else {
          const rand = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          result += rand;
        }
      }
      setDisplay(result);
      if (progress === 1) clearInterval(interval);
    }, speed * 20);
    return () => clearInterval(interval);
  }, [text, duration, speed]);

  // Start/stop animation based on hover state
  useEffect(() => {
    if (hover) {
      const cleanup = scramble();
      return cleanup;
    } else {
      // When not hovering, show the static text
      setDisplay(text);
    }
  }, [hover, scramble, text]);

  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'default' }}
    >
      {display}
    </span>
  );
}
