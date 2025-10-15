'use client';

import { useEffect, useState } from 'react';

interface ClientOnlyPlotProps {
  data: any[];
  layout: any;
  config?: any;
  style?: React.CSSProperties;
}

export default function ClientOnlyPlot({ data, layout, config, style }: ClientOnlyPlotProps) {
  const [Plot, setPlot] = useState<any>(null);

  useEffect(() => {
    // Only import Plotly on client side
    import('react-plotly.js').then((plotlyModule) => {
      setPlot(() => plotlyModule.default);
    });
  }, []);

  if (!Plot) {
    return (
      <div style={style} className="flex items-center justify-center bg-gray-100 rounded-md">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    );
  }

  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      style={style}
    />
  );
}