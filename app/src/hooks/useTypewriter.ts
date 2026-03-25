import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function useTypewriter({ 
  text, 
  speed = 50, 
  delay = 0,
  onComplete 
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startTyping = useCallback(() => {
    setDisplayText('');
    setIsTyping(true);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [text, speed, delay, isTyping, onComplete]);

  return { 
    displayText, 
    isTyping, 
    isComplete, 
    startTyping,
    reset: () => {
      setDisplayText('');
      setIsTyping(false);
      setIsComplete(false);
    }
  };
}

export function useMultiTypewriter(
  texts: string[],
  options: {
    speed?: number;
    lineDelay?: number;
    onAllComplete?: () => void;
  } = {}
) {
  const { speed = 50, lineDelay = 500, onAllComplete } = options;
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const start = () => {
    setCurrentLine(0);
    setDisplayedLines([]);
    setIsComplete(false);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning || currentLine >= texts.length) return;

    const text = texts[currentLine];
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex < text.length) {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[currentLine] = text.slice(0, charIndex + 1);
          return newLines;
        });
        charIndex++;
        setTimeout(typeChar, speed);
      } else {
        // Line complete
        if (currentLine < texts.length - 1) {
          setTimeout(() => {
            setCurrentLine(prev => prev + 1);
          }, lineDelay);
        } else {
          setIsComplete(true);
          setIsRunning(false);
          onAllComplete?.();
        }
      }
    };

    const timeoutId = setTimeout(typeChar, lineDelay);
    return () => clearTimeout(timeoutId);
  }, [currentLine, texts, speed, lineDelay, isRunning, onAllComplete]);

  return {
    displayedLines,
    currentLine,
    isComplete,
    isRunning,
    start,
    reset: () => {
      setCurrentLine(0);
      setDisplayedLines([]);
      setIsComplete(false);
      setIsRunning(false);
    }
  };
}
