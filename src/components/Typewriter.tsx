import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  texts: string[];
  colors: string[];
  blinkingTimesBeforeStart?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  colors,
  blinkingTimesBeforeStart = 3,
}) => {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentText, setCurrentText] = useState('');
  const [currentColor, setCurrentColor] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const selectRandomText = () => texts[Math.floor(Math.random() * texts.length)];
  const selectRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
	const blinkTimeout = setTimeout(() => {
	  setIsTyping(true);
	}, blinkingTimesBeforeStart * 1000);

	return () => clearTimeout(blinkTimeout);
  }, [blinkingTimesBeforeStart]);

  useEffect(() => {
	if (isTyping && typedText.length < currentText.length) {
	  // Introduce randomness in typing speed
	  const randomSpeed = Math.random() * (224 - 10) + 50; 
	  const timeoutId = setTimeout(() => {
		setTypedText(currentText.substring(0, typedText.length + 1));
	  }, randomSpeed);
	  return () => clearTimeout(timeoutId);
	} else if (isTyping && typedText.length === currentText.length) {
	  setShowCursor(true);
	}
  }, [typedText, currentText, isTyping]);

  const resetAndTypeNewText = () => {
	setIsTyping(false);
	setTypedText('');
	setShowCursor(true);
	let newText = selectRandomText();
	setCurrentText(newText);
	setCurrentColor(selectRandomColor());
	setTimeout(() => {
	  setIsTyping(true);
	}, blinkingTimesBeforeStart * 1000);
  };

  useEffect(() => {
	resetAndTypeNewText(); // Initialize on mount
  }, []);

  return (
	<div className="typewriter" onClick={resetAndTypeNewText} style={{ color: currentColor }}>
	  {typedText}
	  {showCursor && <span className="cursor" style={{ backgroundColor: currentColor }} />}
	</div>
  );
};

export default Typewriter;
