import React from 'react';

interface VideoLoopProps {
  src: string; // Define the expected prop type
}

const VideoLoop: React.FC<VideoLoopProps> = ({ src }) => {
  return (
	<div className="video-container">
	  <video
		src={src} // Use the dynamic `src` prop
		loop
		muted
		playsInline
		controls={false}
		autoPlay
		className="video"
	  >
		Your browser does not support the video tag.
	  </video>
	  <style jsx>{`
		.video-container {
		  position: fixed;
		  top: -50px;
		  left: -50px;
		  right: -50px;
		  bottom: -50px;
		  overflow: hidden;
		  z-index: 0;
		}
		.video {
		  position: absolute;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  object-fit: cover;
		}
	  `}</style>
	</div>
  );
};

export default VideoLoop;
