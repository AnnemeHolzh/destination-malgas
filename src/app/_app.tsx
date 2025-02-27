import { SpeedInsights } from '@vercel/speed-insights/next';
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
} 