import type { NextPage } from 'next';
import Typewriter from '../components/Typewriter';
import Typewriter2 from '../components/Typewriter2';
import VideoLoop from '../components/VideoLoop';
import CSSGrainOverlay from '../components/CSSGrainOverlay';


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
			<VideoLoop src="../media/longdesktopglow.mp4" />
			<div className="typewriter-container-bottom">
				<Typewriter2
					texts={[
						"Everything will be okaos",
						"Free your punk",
						"Don't forget to unsubscribe",
						"All organic",
						"Information aged",
						"Save the Mother",
						"We are AHA: Attention-Hijacked Anonymous",
						"Fuck Zuck",
						"Your data is not your own",
						"Error 404: Freedom not found",
						"Terms and conditions may apply to your soul",
						"Bandwidth of the damned",
						"No gods no algorithms",
						"You are the product",
						"Opt out of everything",
						"Do not feed the machine",
						"Your feed is a leash",
						"They log your dreams now",
						"Burn the timeline",
						"Not available in your dystopia",
						"Loading consciousness...",
						"Reject the default settings",
						"Adblock your reality",
						"Run silent run free",
						"There is no cloud just someone elses computer",
						"Delete your lawn",
						"The algorithm wants you docile",
						"Read the terms of your surrender",
						"Reclaim your attention",
						"This page intentionally left alive",
						"Signal over noise",
						"Permission denied",
						"We were never offline",
						"Unplug the feed plug in the amp",
						"Your password is obedience",
						"Normalize logging off"
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
					multiColor="cycle"
					refreshInterval={30000}
				/>
			</div>
		{/* <CSSGrainOverlay /> */}
		</div>
	);
};

export default Home;
