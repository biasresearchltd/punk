import React, { useEffect, useState, useCallback, useRef } from 'react';

interface TypewriterProps {
  texts: string[];
  colors: string[];
  blinkingTimesBeforeStart?: number;
  multiColor?: 'none' | 'cycle' | 'gridFill';
  refreshInterval?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  colors,
  blinkingTimesBeforeStart = 2,
  multiColor = 'none',
  refreshInterval,
}) => {
  const [typedText, setTypedText] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [isErasing, setIsErasing] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentColor, setCurrentColor] = useState<string>('');
  const [doneTyping, setDoneTyping] = useState(false);
  const [cursorColorIndex, setCursorColorIndex] = useState(0);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  const selectRandomText = () => texts[Math.floor(Math.random() * texts.length)];
  const selectRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const startErasing = useCallback(() => {
	setDoneTyping(false);
	setIsTyping(false);
	setIsErasing(true);
  }, []);

  const resetAndTypeNewText = useCallback(() => {
	setIsTyping(false);
	setIsErasing(false);
	setDoneTyping(false);
	setTypedText([]);
	setShowCursor(true);
	setCurrentText(selectRandomText());
	setCurrentColor(selectRandomColor());
	setTimeout(() => {
	  setIsTyping(true);
	}, blinkingTimesBeforeStart * 1000);
  }, [texts, colors, blinkingTimesBeforeStart]);

  useEffect(() => {
	const blinkTimeout = setTimeout(() => {
	  setIsTyping(true);
	}, blinkingTimesBeforeStart * 1000);

	return () => clearTimeout(blinkTimeout);
  }, [blinkingTimesBeforeStart]);

  // Typing effect
  useEffect(() => {
	if (isTyping && !isErasing && typedText.length < currentText.length) {
	  const randomSpeed = Math.random() * (224 - 10) + 50;
	  const timeoutId = setTimeout(() => {
		setTypedText(currentText.substring(0, typedText.length + 1).split(''));
	  }, randomSpeed);
	  return () => clearTimeout(timeoutId);
	} else if (isTyping && !isErasing && typedText.length === currentText.length && currentText.length > 0) {
	  setShowCursor(true);
	  setDoneTyping(true);
	}
  }, [typedText, currentText, isTyping, isErasing]);

  // Erasing effect
  useEffect(() => {
	if (isErasing && typedText.length > 0) {
	  const eraseSpeed = Math.random() * (180 - 20) + 20;
	  const timeoutId = setTimeout(() => {
		setTypedText(typedText.slice(0, -1));
	  }, eraseSpeed);
	  return () => clearTimeout(timeoutId);
	} else if (isErasing && typedText.length === 0) {
	  setIsErasing(false);
	  resetAndTypeNewText();
	}
  }, [isErasing, typedText, resetAndTypeNewText]);

  // Auto-refresh timer — triggers erase instead of immediate reset
  useEffect(() => {
	if (refreshInterval && doneTyping) {
	  refreshTimerRef.current = setTimeout(() => {
		startErasing();
	  }, refreshInterval);
	  return () => {
		if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
	  };
	}
  }, [refreshInterval, doneTyping, startErasing]);

  // Cursor color cycling
  useEffect(() => {
	const interval = setInterval(() => {
	  setCursorColorIndex(prev => (prev + 1) % colors.length);
	}, 1000);
	return () => clearInterval(interval);
  }, [colors.length]);

  useEffect(() => {
	resetAndTypeNewText();
  }, []);

  const renderText = () => {
	if (multiColor === 'none') {
	  return typedText.map((char, index) => (
		<span
		  key={index}
		  className="typewriter-char"
		  style={{
			color: currentColor,
			animationDelay: `${index * 0.08}s`,
		  }}
		>
		  {char === ' ' ? '\u00A0' : char}
		</span>
	  ));
	} else {
	  return renderTextWithColors();
	}
  };

  const renderTextWithColors = () => {
	return typedText.map((char, index) => (
	  <span
		key={index}
		className="typewriter-char"
		style={{
		  color: colors[index % colors.length],
		  animationDelay: `${index * 0.08}s`,
		}}
	  >
		{char === ' ' ? '\u00A0' : char}
	  </span>
	));
  };

  return (
	<div className="typewriter" onClick={() => isErasing ? null : startErasing()}>
	  {renderText()}
	  {showCursor && (
		<span className="cursor" style={{ backgroundColor: colors[cursorColorIndex] }}></span>
	  )}
	  <div className="typewriter-ghost">
		{renderText()}
		{showCursor && (
		  <span className="cursor" style={{ backgroundColor: colors[cursorColorIndex] }}></span>
		)}
	  </div>
	</div>
  );
};

export default Typewriter;
