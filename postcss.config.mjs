const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    ...(process.env.NODE_ENV === 'production' ? { 
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          colormin: true,
          convertValues: true,
          minifyFontValues: true,
          minifyGradients: true,
          minifyParams: true,
          minifySelectors: true,
          minifySvg: true,
        }]
      }
    } : {})
  },
};

export default config;
