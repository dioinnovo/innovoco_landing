import { NextPage } from 'next'

interface ErrorProps {
  statusCode?: number
}

/**
 * Pages Router Error page
 * This is required for compatibility with sanity studio
 * when using App Router alongside Pages Router
 */
const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>
          {statusCode ? `Error ${statusCode}` : 'An error occurred'}
        </h1>
        <p style={{ color: '#666' }}>
          {statusCode === 404
            ? 'The page you are looking for could not be found.'
            : 'Something went wrong. Please try again later.'}
        </p>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
