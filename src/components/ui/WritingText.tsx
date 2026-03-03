import React, { useState, useEffect } from 'react';

interface WritingTextProps {
  text: string;
  speed?: number;      // Vitesse d'écriture (ms)
  deleteSpeed?: number; // Vitesse d'effacement (ms)
  delay?: number;       // Temps d'attente avant d'effacer (ms)
  className?: string;   // Styles Tailwind
  as?: 'h1' | 'h2' | 'p' | 'span'; // Balise HTML
}

const WritingText: React.FC<WritingTextProps> = ({
  text,
  speed = 100,
  deleteSpeed = 50,
  delay = 5000,
  className = "",
  as: Tag = 'h1'
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const fullText = text;
      
      if (!isDeleting) {
        // Mode Écriture
        setDisplayText(fullText.substring(0, displayText.length + 1));
        
        if (displayText === fullText) {
          // Pause une fois le texte complété
          timer = setTimeout(() => setIsDeleting(true), delay);
        } else {
          timer = setTimeout(handleType, speed);
        }
      } else {
        // Mode Effacement
        setDisplayText(fullText.substring(0, displayText.length - 1));
        
        if (displayText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        } else {
          timer = setTimeout(handleType, deleteSpeed);
        }
      }
    };

    timer = setTimeout(handleType, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, text, speed, deleteSpeed, delay]);

  return (
    <Tag className={`${className} border-blue-600 pr-1 animate-pulse-fast`}>
      {displayText}
    </Tag>
  );
};

export default WritingText;