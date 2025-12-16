import type { AppProps } from 'next/app'

/**
 * Pages Router App component
 * This is required for compatibility with sanity studio
 * when using App Router alongside Pages Router
 */
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
