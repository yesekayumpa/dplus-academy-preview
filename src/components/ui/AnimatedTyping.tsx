import React, { useState, useEffect } from 'react';

interface AnimatedTypingProps {
  text: string;
  coloredText: string;
  speed?: number;
  className?: string;
}

const AnimatedTyping: React.FC<AnimatedTypingProps> = ({
  text,
  coloredText,
  speed = 50,
  className = ""
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showColored, setShowColored] = useState(false);
  const fullText = text + coloredText;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      if (displayText.length < fullText.length) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        timer = setTimeout(handleType, speed);
      }
    };

    timer = setTimeout(handleType, speed);

    return () => clearTimeout(timer);
  }, [displayText, fullText, speed]);

  useEffect(() => {
    setShowColored(displayText.length >= text.length);
  }, [displayText, text]);

  return (
    <span className={className}>
      <span>{displayText.substring(0, Math.min(text.length, displayText.length))}</span>
      {showColored && displayText.length > text.length && (
        <span className="italic text-red-800">
          {displayText.substring(text.length)}
        </span>
      )}
    </span>
  );
};

export default AnimatedTyping;
