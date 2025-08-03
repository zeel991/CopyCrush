// components/MonthlyPerformanceChart.tsx
import React, { useEffect, useRef } from 'react';

interface TradeData {
  date: string;
  profit: number;
  volume: number;
  trades: number;
  roi: number;
}

interface MonthlyPerformanceChartProps {
  data: TradeData[];
}

const MonthlyPerformanceChart: React.FC<MonthlyPerformanceChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Chart dimensions and padding
    const padding = 60;
    const chartWidth = rect.width - padding * 2;
    const chartHeight = rect.height - padding * 2;

    // Find max values for scaling
    const maxROI = Math.max(...data.map(d => d.roi));
    const maxProfit = Math.max(...data.map(d => d.profit));

    // Colors
    const colors = {
      profit: '#10B981', // green
      roi: '#F59E0B', // orange
      grid: '#374151', // gray
      text: '#9CA3AF' // gray-400
    };

    // Draw grid lines
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= data.length; i++) {
      const x = padding + (chartWidth / data.length) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + chartHeight);
      ctx.stroke();
    }

    // Draw bars
    const barWidth = chartWidth / data.length * 0.8;
    const barSpacing = chartWidth / data.length * 0.1;

    data.forEach((item, index) => {
      const x = padding + (chartWidth / data.length) * index + barSpacing;
      
      // Profit bars (green)
      const profitHeight = (item.profit / maxProfit) * chartHeight * 0.8;
      ctx.fillStyle = colors.profit;
      ctx.fillRect(x, padding + chartHeight - profitHeight, barWidth * 0.45, profitHeight);
      
      // ROI bars (orange)
      const roiHeight = (item.roi / maxROI) * chartHeight * 0.8;
      ctx.fillStyle = colors.roi;
      ctx.fillRect(x + barWidth * 0.5, padding + chartHeight - roiHeight, barWidth * 0.45, roiHeight);
    });

    // Draw labels
    ctx.fillStyle = colors.text;
    ctx.font = '12px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';

    // Month labels
    data.forEach((item, index) => {
      const x = padding + (chartWidth / data.length) * index + (chartWidth / data.length) * 0.5;
      const monthName = new Date(item.date + '-01').toLocaleDateString('en', { month: 'short' });
      ctx.fillText(monthName, x, padding + chartHeight + 20);
    });

    // Y-axis labels (ROI percentages)
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      const value = Math.round(maxROI - (maxROI / 5) * i);
      ctx.fillText(`${value}%`, padding - 10, y + 4);
    }

    // Legend
    ctx.textAlign = 'left';
    ctx.fillStyle = colors.profit;
    ctx.fillRect(padding, padding - 30, 15, 15);
    ctx.fillStyle = colors.text;
    ctx.fillText('Profit ($)', padding + 20, padding - 18);
    
    ctx.fillStyle = colors.roi;
    ctx.fillRect(padding + 100, padding - 30, 15, 15);
    ctx.fillStyle = colors.text;
    ctx.fillText('ROI (%)', padding + 120, padding - 18);

  }, [data]);

  return (
    <div className="bg-gray-900/50 rounded-lg p-6">
      <h3 className="text-white font-bold text-lg mb-4">Monthly Performance Overview</h3>
      <div className="relative">
        <canvas 
          ref={chartRef}
          className="w-full h-80 rounded"
          style={{ display: 'block' }}
        />
      </div>
      
      {/* Data Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-2 text-gray-400">Month</th>
              <th className="text-right py-2 text-gray-400">Profit</th>
              <th className="text-right py-2 text-gray-400">Volume</th>
              <th className="text-right py-2 text-gray-400">Trades</th>
              <th className="text-right py-2 text-gray-400">ROI</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(-6).map((item, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="py-2 text-gray-300">
                  {new Date(item.date + '-01').toLocaleDateString('en', { month: 'short', year: 'numeric' })}
                </td>
                <td className="text-right py-2 text-green-400">${item.profit.toLocaleString()}</td>
                <td className="text-right py-2 text-blue-400">${item.volume.toLocaleString()}</td>
                <td className="text-right py-2 text-purple-400">{item.trades}</td>
                <td className="text-right py-2 text-orange-400">{item.roi.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyPerformanceChart;
