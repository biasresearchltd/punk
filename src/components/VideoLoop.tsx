import React from 'react';

const VideoLoop = () => {
  const videoFile = 'Render28.mp4'; // Single video file

  return (
	<div className="video-container">
	  <video
		src={`../media/${videoFile}`}
		loop
		muted
		playsInline
		controls
		autoPlay
		className="video"
	  >
		Your browser does not support the video tag.
	  </video>
	  <style jsx>{`
		.video-container {
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  height: 100vh; /* Full viewport height */
		  position: relative;
		  overflow: hidden;
		}
		
		.video {
		  position: absolute; /* Expand to fill container */
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  object-fit: cover; /* Ensures the video fills the space proportionally */
		}
	  `}</style>
	</div>
  );
};

export default VideoLoop;
