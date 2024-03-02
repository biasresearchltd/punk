import type { NextPage } from 'next';
import VideoLoop from '../components/VideoLoop';

const Home: NextPage = () => {
  return (
	<div>
	  <VideoLoop src="../media/SmallPunk.mp4" />
	</div>
  );
};

export default Home;