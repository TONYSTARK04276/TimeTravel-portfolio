import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TerminalTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
}

export function TerminalText({
  text,
  className,
  speed = 40,
  delay = 0,
  showCursor = true,
  cursorChar = '█',
  onComplete,
}: TerminalTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [hasStarted, text, speed, onComplete]);

  return (
    <span className={cn('font-mono', className)}>
      {displayText}
      {showCursor && !isComplete && (
        <span className="animate-blink ml-0.5">{cursorChar}</span>
      )}
      {showCursor && isComplete && (
        <span className="animate-blink ml-0.5 opacity-50">{cursorChar}</span>
      )}
    </span>
  );
}

interface TerminalLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  speed?: number;
  lineDelay?: number;
  showCursor?: boolean;
  onAllComplete?: () => void;
  prefix?: string;
}

export function TerminalLines({
  lines,
  className,
  lineClassName,
  speed = 40,
  lineDelay = 600,
  showCursor = true,
  onAllComplete,
  prefix = '> ',
}: TerminalLinesProps) {
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentLineText, setCurrentLineText] = useState('');

  useEffect(() => {
    if (currentLine >= lines.length) {
      onAllComplete?.();
      return;
    }

    const text = lines[currentLine];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        setCurrentLineText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setCompletedLines(prev => [...prev, text]);
        setCurrentLineText('');
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
        }, lineDelay);
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [currentLine, lines, speed, lineDelay, onAllComplete]);

  return (
    <div className={cn('font-mono', className)}>
      {completedLines.map((line, idx) => (
        <div key={idx} className={lineClassName}>
          <span className="opacity-50">{prefix}</span>
          {line}
        </div>
      ))}
      {currentLine < lines.length && (
        <div className={lineClassName}>
          <span className="opacity-50">{prefix}</span>
          {currentLineText}
          {showCursor && <span className="animate-blink ml-0.5">█</span>}
        </div>
      )}
    </div>
  );
}
