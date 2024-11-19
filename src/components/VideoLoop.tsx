import React, { useEffect, useRef, useState } from 'react';

const VideoLoop = () => {
  const videoFiles = [
	'gfy.mp4',
	'punkunix.mp4',
	'pe2-24.mp4',
	'Render28.mp4'
	// Add more filenames as needed
  ];

  // Use useRef to keep a reference to each video element
  const videoRefs = useRef([]);
  // State to manage which video is currently visible
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
	// Function to switch videos while maintaining the current playback time
	const switchVideo = () => {
	  const nextVideoIndex = (currentVideoIndex + 1) % videoFiles.length;
	  const currentTime = videoRefs.current[currentVideoIndex]?.currentTime || 0;

	  // Update the current video index to the next video
	  setCurrentVideoIndex(nextVideoIndex);

	  // Set the next video's current time to match the previous video
	  if (videoRefs.current[nextVideoIndex]) {
		videoRefs.current[nextVideoIndex].currentTime = currentTime;
		videoRefs.current[nextVideoIndex].play();
	  }
	};

	// Set an interval to switch videos
	const interval = setInterval(switchVideo, 5000); // Example: Switch every 5 seconds

	return () => clearInterval(interval);
  }, [currentVideoIndex]);

  return (
	<div className="video-container">
	  {videoFiles.map((file, index) => (
		<video
		  key={file}
		  ref={el => videoRefs.current[index] = el}
		  src={`../media/${file}`}
		  loop
		  muted
		  playsInline
		  className="video"
		  style={{ display: currentVideoIndex === index ? 'block' : 'none' }}
		>
		  Your browser does not support the video tag.
		</video>
	  ))}
	  <style jsx>{`
		.video-container {
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  height: 100vh;
		  position: relative;
		  overflow: hidden;
		}
		.video {
		  position: absolute;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  // object-fit: cover;
		}
	  `}</style>
	</div>
  );
};

export default VideoLoop;
