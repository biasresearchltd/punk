import type { NextPage } from 'next';
import Typewriter from '../components/Typewriter';
import VideoLoop from '../components/VideoLoop';


const Home: NextPage = () => {
	return (
		<div>
			<div className="typewriter-container-top">
				<Typewriter 
					
					texts={[
						"Punk"
					]}
					colors={[
						"#00FF46", // Green
						"#FF00C4", // Pink
						"#FF7F00", // Orange
						"#FFFF00", // Yellow
						"#0075FF", // Blue
						"#B7FF00" // Chartreuse
					]}
					blinkingTimesBeforeStart={3}
				/>
			</div>
			<VideoLoop src="../media/gfy.mp4" />
			<div className="typewriter-container-bottom">
				<Typewriter 
					
					texts={[
						"Everything will be okaos",
						"Free your punk",
						"Don't forget to unsubscribe",
						"All organic",
						"Information aged",
						"Save the Mother",
						"We are AHA: Attention-Hijacked Anonymous",
						"Fuck Zuck",
						"Don't forget to unsubscribe"
					]}
					colors={[
						"#00FF46", // Green
						"#FF00C4", // Pink
						"#FF7F00", // Orange
						"#FFFF00", // Yellow
						"#0075FF", // Blue
						"#B7FF00" // Chartreuse
					]}
					blinkingTimesBeforeStart={3}
				/>
			</div>
		</div>
	);
};

export default Home;