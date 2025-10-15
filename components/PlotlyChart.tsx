'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface PlotlyChartProps {
  data: any;
  layout?: any;
  config?: any;
  className?: string;
}

export default function PlotlyChart({ data, layout, config, className }: PlotlyChartProps) {
  const defaultLayout = {
    autosize: true,
    margin: { t: 40, r: 20, b: 40, l: 50 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { color: '#ffffff' },
    xaxis: { 
      gridcolor: '#333',
      zerolinecolor: '#333'
    },
    yaxis: { 
      gridcolor: '#333',
      zerolinecolor: '#333'
    },
    ...layout
  };

  const defaultConfig = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d'],
    ...config
  };

  return (
    <div className={className}>
      <Plot
        data={data}
        layout={defaultLayout}
        config={defaultConfig}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}