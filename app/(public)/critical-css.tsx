// Critical CSS for above-the-fold content
export const criticalCSS = `
  /* Reset and base styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
  }
  
  body {
    margin: 0;
    background: white;
    color: #0B0F19;
  }
  
  /* Critical layout */
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Header styles */
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
  }
  
  /* Hero section */
  .hero {
    padding-top: 5rem;
    padding-bottom: 4rem;
    background: linear-gradient(to bottom right, #f8fafc, #dbeafe);
  }
  
  /* Button styles */
  button, .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.2s;
    cursor: pointer;
    border: none;
  }
  
  .btn-primary {
    background: linear-gradient(to right, #0A58D0, #3B82F6);
    color: white;
  }
  
  /* Text styles */
  h1 {
    font-size: clamp(2rem, 5vw, 3.75rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1.125rem;
    line-height: 1.75;
    color: #525252;
  }
  
  /* Loading states */
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

export function CriticalStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{ __html: criticalCSS }}
    />
  );
}