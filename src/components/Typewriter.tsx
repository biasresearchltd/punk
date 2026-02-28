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
  const [colorIndex, setColorIndex] = useState(0);

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
	  const randomSpeed = Math.random() * (200 - 50) + 50;
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
	const interval = setInterval(() => {
	  setColorIndex(prev => (prev + 1) % colors.length);
	}, 1000);
	return () => clearInterval(interval);
  }, [colors.length]);

  useEffect(() => {
	resetAndTypeNewText();
  }, []);

  return (
	<div className="typewriter" onClick={resetAndTypeNewText}>
	  {typedText.split('').map((char, index) => (
		<span
		  key={index}
		  className="typewriter-char"
		  style={{
			color: colors[colorIndex],
			animationDelay: `${index * 0.08}s`,
		  }}
		>
		  {char === ' ' ? '\u00A0' : char}
		</span>
	  ))}
	  {showCursor && <span className="cursor" style={{ backgroundColor: colors[colorIndex] }} />}
	  <div className="typewriter-ghost">
		{typedText.split('').map((char, index) => (
		  <span
			key={index}
			className="typewriter-char"
			style={{
			  color: colors[colorIndex],
			  animationDelay: `${index * 0.08}s`,
			}}
		  >
			{char === ' ' ? '\u00A0' : char}
		  </span>
		))}
		{showCursor && <span className="cursor" style={{ backgroundColor: colors[colorIndex] }} />}
	  </div>
	</div>
  );
};

export default Typewriter;
