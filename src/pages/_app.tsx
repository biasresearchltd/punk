import '../styles/globals.css'; // Adjust the path according to where your globals.css file is located
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
