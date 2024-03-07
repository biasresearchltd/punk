import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  texts: string[];
  colors: string[];
  blinkingTimesBeforeStart?: number;
  multiColor?: 'none' | 'cycle' | 'gridFill'; // Flag to activate multicolor mode
}

const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  colors,
  blinkingTimesBeforeStart = 2,
  multiColor = 'none', // Default to 'none'
}) => {
  const [typedText, setTypedText] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentColor, setCurrentColor] = useState<string>('');

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
	  const randomSpeed = Math.random() * (224 - 10) + 50; 
	  const timeoutId = setTimeout(() => {
		setTypedText(currentText.substring(0, typedText.length + 1).split(''));
	  }, randomSpeed);
	  return () => clearTimeout(timeoutId);
	} else if (isTyping && typedText.length === currentText.length) {
	  setShowCursor(true);
	}
  }, [typedText, currentText, isTyping]);

  const resetAndTypeNewText = () => {
	setIsTyping(false);
	setTypedText([]);
	setShowCursor(true);
	setCurrentText(selectRandomText());
	setCurrentColor(selectRandomColor()); // Select a new random color for the next text
	setTimeout(() => {
	  setIsTyping(true);
	}, blinkingTimesBeforeStart * 1000);
  };

  useEffect(() => {
	resetAndTypeNewText();
  }, []);

  // Adjusted function to render text based on the current mode
  const renderText = () => {
	if (multiColor === 'none') {
	  return <span style={{ color: currentColor }}>{typedText.join('')}</span>;
	} else {
	  return renderTextWithColors();
	}
  };

  // Function to render each character with cycling color
  const renderTextWithColors = () => {
	return typedText.map((char, index) => (
	  <span key={index} style={{ color: colors[index % colors.length] }}>
		{char}
	  </span>
	));
  };

  return (
	<div className="typewriter" onClick={resetAndTypeNewText}>
	  {renderText()}
	  {showCursor && (
		<span className="cursor" style={{ backgroundColor: 'currentColor' }}></span>
	  )}
	</div>
  );
};

export default Typewriter;
