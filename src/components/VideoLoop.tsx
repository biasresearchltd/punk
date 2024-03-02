import React from 'react';

interface VideoLoopProps {
  src: string;
}

const VideoLoop: React.FC<VideoLoopProps> = ({ src }) => {
  return (
	<div className="video-container">
	  <video src={src} autoPlay loop muted playsInline className="video">
		Your browser does not support the video tag.
	  </video>
	  <style jsx>{`
		.video-container {
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  height: 100vh; /* Full height of viewport */
		  overflow: hidden;
		}
		.video {
		  width: auto;
		  height: 100%;
		  // For responsiveness, adjust width and height as needed
		}
	  `}</style>
	</div>
  );
};

export default VideoLoop;
