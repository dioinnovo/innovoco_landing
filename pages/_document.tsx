import { Html, Head, Main, NextScript } from 'next/document'

/**
 * Pages Router Document component
 * This is required for compatibility with sanity studio
 * when using App Router alongside Pages Router
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
