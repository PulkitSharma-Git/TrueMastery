'use client';

import React, { useState, useEffect } from 'react';

// Format date helpers
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

const formatFullDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

interface HistoryPoint {
  id?: string;
  score: number;
  totalQuestions: number;
  totalScore: number;
  createdAt: string;
  isSimulated?: boolean;
}

interface MasteryHistoryChartProps {
  history: HistoryPoint[];
}

export default function MasteryHistoryChart({ history }: MasteryHistoryChartProps) {
  const [timeRange, setTimeRange] = useState<'Week' | 'Month' | 'Year' | 'All Time'>('All Time');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleClose = () => setIsOpen(false);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, [isOpen]);

  // Apply filtering based on selected range and time-based spacing
  const now = new Date();
  const maxTime = now.getTime();
  let minTime = maxTime;

  if (timeRange === 'Week') {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    minTime = cutoff.getTime();
  } else if (timeRange === 'Month') {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    minTime = cutoff.getTime();
  } else if (timeRange === 'Year') {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 365);
    minTime = cutoff.getTime();
  } else {
    // All Time
    if (history.length > 0) {
      minTime = new Date(history[0].createdAt).getTime();
    } else {
      minTime = maxTime - 86400000; // default 1 day ago
    }
  }

  // Prevent division by zero or extremely small intervals
  const effectiveMinTime = (maxTime - minTime < 1000) ? minTime - 86400000 : minTime;

  let filteredHistory: HistoryPoint[] = [];

  if (timeRange !== 'All Time') {
    const pointsInPeriod = history.filter(p => new Date(p.createdAt).getTime() >= effectiveMinTime);
    const pointsBeforePeriod = history.filter(p => new Date(p.createdAt).getTime() < effectiveMinTime);

    if (pointsInPeriod.length === 0) {
      if (pointsBeforePeriod.length > 0) {
        const lastPoint = pointsBeforePeriod[pointsBeforePeriod.length - 1];
        filteredHistory = [
          {
            ...lastPoint,
            createdAt: new Date(effectiveMinTime).toISOString(),
            isSimulated: true,
          },
          {
            ...lastPoint,
            createdAt: new Date(maxTime).toISOString(),
            isSimulated: true,
          }
        ];
      } else {
        filteredHistory = [];
      }
    } else {
      const result: HistoryPoint[] = [];

      // Prepend simulated start point if there's history before the period
      if (pointsBeforePeriod.length > 0) {
        const lastPoint = pointsBeforePeriod[pointsBeforePeriod.length - 1];
        result.push({
          ...lastPoint,
          createdAt: new Date(effectiveMinTime).toISOString(),
          isSimulated: true,
        });
      }

      // Add all points within the period
      result.push(...pointsInPeriod);

      // Append simulated end point at "now"
      const lastPoint = pointsInPeriod[pointsInPeriod.length - 1];
      result.push({
        ...lastPoint,
        createdAt: new Date(maxTime).toISOString(),
        isSimulated: true,
      });

      filteredHistory = result;
    }
  } else {
    // All Time
    if (history.length > 0) {
      const result = [...history];
      const lastPoint = history[history.length - 1];
      result.push({
        ...lastPoint,
        createdAt: new Date(maxTime).toISOString(),
        isSimulated: true,
      });
      filteredHistory = result;
    } else {
      filteredHistory = [];
    }
  }

  // Render variables
  const pointsCount = filteredHistory.length;
  const actualPointsCount = timeRange === 'All Time'
    ? history.length
    : history.filter(p => new Date(p.createdAt).getTime() >= effectiveMinTime).length;

  // Render dropdown control along with header
  const renderHeader = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
      <h3 style={{ fontSize: '15px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-green)' }}></span>
        True Mastery Timeline
      </h3>
      <div style={{ position: 'relative' }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          style={{
            background: '#222',
            color: '#fff',
            border: `2px solid ${isOpen ? 'var(--color-green)' : '#333'}`,
            borderRadius: '6px',
            padding: '6px 30px 6px 12px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            outline: 'none',
            transition: 'all 0.15s ease',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
            textTransform: 'none'
          }}
          onMouseEnter={(e) => {
            if (!isOpen) e.currentTarget.style.borderColor = '#555';
          }}
          onMouseLeave={(e) => {
            if (!isOpen) e.currentTarget.style.borderColor = '#333';
          }}
        >
          {timeRange}
          <span style={{
            position: 'absolute',
            right: '10px',
            display: 'flex',
            alignItems: 'center',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            color: 'var(--text-secondary)'
          }}>
            <svg fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' height='10' width='10' viewBox='0 0 24 24'>
              <polyline points='6 9 12 15 18 9'></polyline>
            </svg>
          </span>
        </button>

        {isOpen && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            background: '#1e1e1e',
            border: '2px solid #333',
            borderRadius: '6px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
            zIndex: 100,
            minWidth: '120px',
            overflow: 'hidden'
          }}>
            {(['Week', 'Month', 'Year', 'All Time'] as const).map((range) => {
              const isSelected = timeRange === range;
              return (
                <div
                  key={range}
                  onClick={() => {
                    setTimeRange(range);
                    setIsOpen(false);
                  }}
                  style={{
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: isSelected ? 'var(--color-green)' : 'var(--text-secondary)',
                    background: isSelected ? 'rgba(46, 204, 113, 0.08)' : 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.15s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isSelected ? 'rgba(46, 204, 113, 0.12)' : 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = isSelected ? 'var(--color-green)' : '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isSelected ? 'rgba(46, 204, 113, 0.08)' : 'transparent';
                    e.currentTarget.style.color = isSelected ? 'var(--color-green)' : 'var(--text-secondary)';
                  }}
                >
                  {range}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  if (!filteredHistory || pointsCount === 0) {
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        {renderHeader()}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '240px',
          color: 'var(--text-secondary)',
          border: '1px dashed #444',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '10px', opacity: 0.5 }}>
            <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.75 9l-5.25 5.25-3-3L7.5 14.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p style={{ fontSize: '14px', fontWeight: '500' }}>No history recorded yet.</p>
          <p style={{ fontSize: '11px', marginTop: '4px', opacity: 0.7 }}>Mark a question as revised or add questions to see your progress graph!</p>
        </div>
      </div>
    );
  }

  // Chart dimensions
  const width = 500;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  // Calculate coordinates for points based on time
  const chartPoints = filteredHistory.map((point, index) => {
    const t = new Date(point.createdAt).getTime();
    let x = paddingX;
    if (maxTime > effectiveMinTime) {
      x = paddingX + ((t - effectiveMinTime) / (maxTime - effectiveMinTime)) * chartWidth;
    } else {
      x = paddingX + chartWidth / 2;
    }

    // Y Coordinate: inverted scale, where 100% is top (paddingY) and 0% is bottom (height - paddingY)
    const scoreVal = Math.min(100, Math.max(0, point.score));
    const y = height - paddingY - (scoreVal / 100) * chartHeight;

    return { x, y, ...point, index };
  });

  // Generate X-Axis labels at regular time intervals
  const xAxisTicks: { x: number; label: string }[] = [];
  if (filteredHistory.length > 0) {
    const ticksCount = 4;
    for (let i = 0; i < ticksCount; i++) {
      const ratio = i / (ticksCount - 1);
      const tickTime = effectiveMinTime + ratio * (maxTime - effectiveMinTime);
      const x = paddingX + ratio * chartWidth;
      xAxisTicks.push({
        x,
        label: formatDate(new Date(tickTime).toISOString())
      });
    }
  }

  // Create path for the stroke
  let linePath = '';
  let areaPath = '';

  if (pointsCount === 1) {
    // Draw a horizontal helper line and a point
    const yVal = chartPoints[0].y;
    linePath = `M ${paddingX} ${yVal} L ${width - paddingX} ${yVal}`;
    areaPath = `M ${paddingX} ${yVal} L ${width - paddingX} ${yVal} L ${width - paddingX} ${height - paddingY} L ${paddingX} ${height - paddingY} Z`;
  } else if (pointsCount > 1) {
    // Generate curved line path
    linePath = `M ${chartPoints[0].x} ${chartPoints[0].y}`;
    for (let i = 0; i < pointsCount - 1; i++) {
      const curr = chartPoints[i];
      const next = chartPoints[i + 1];
      // Compute bezier control points for a smooth curve
      const cpX1 = curr.x + (next.x - curr.x) / 3;
      const cpY1 = curr.y;
      const cpX2 = curr.x + 2 * (next.x - curr.x) / 3;
      const cpY2 = next.y;
      linePath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
    }

    // Generate closed area path for the gradient fill
    areaPath = `${linePath} L ${chartPoints[pointsCount - 1].x} ${height - paddingY} L ${chartPoints[0].x} ${height - paddingY} Z`;
  }



  // Grid line percentages
  const gridLines = [0, 25, 50, 75, 100];
  const showDots = pointsCount <= 30;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {renderHeader()}

      <div style={{ position: 'relative', background: 'rgba(26,26,26,0.3)', border: '1px solid #333', borderRadius: '8px', padding: '10px 5px', overflow: 'hidden' }}>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
          <defs>
            {/* Stroke gradient */}
            <linearGradient id="chart-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-light-green)" />
              <stop offset="100%" stopColor="var(--color-green)" />
            </linearGradient>

            {/* Area gradient */}
            <linearGradient id="chart-area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-green)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-green)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Vertical Grid lines */}
          {xAxisTicks.map((tick, idx) => (
            <line
              key={`v-grid-${idx}`}
              x1={tick.x}
              y1={paddingY}
              x2={tick.x}
              y2={height - paddingY}
              stroke="var(--text-secondary)"
              strokeDasharray="4 4"
              strokeWidth="1"
              style={{ opacity: 0.08 }}
            />
          ))}

          {/* Grid lines & Labels */}
          {gridLines.map((percent) => {
            const y = height - paddingY - (percent / 100) * chartHeight;
            return (
              <g key={percent} style={{ opacity: 0.25 }}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="var(--text-secondary)"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 8}
                  y={y + 4}
                  fill="var(--text-secondary)"
                  fontSize="9px"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  {percent}%
                </text>
              </g>
            );
          })}

          {/* Fill Area under the line */}
          {areaPath && (
            <path d={areaPath} fill="url(#chart-area-grad)" />
          )}

          {/* Main Line path */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="url(#chart-stroke)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Interactive Hover Vertical Guidelines */}
          {hoveredIndex !== null && chartPoints[hoveredIndex] && (
            <line
              x1={chartPoints[hoveredIndex].x}
              y1={paddingY}
              x2={chartPoints[hoveredIndex].x}
              y2={height - paddingY}
              stroke="rgba(255,255,255,0.15)"
              strokeDasharray="2 2"
              strokeWidth="1"
            />
          )}

          {/* Data Points */}
          {chartPoints.map((point, idx) => (
            <g key={idx}>
              {/* Overlay hover target (larger radius for easy touch/hover) */}
              <circle
                cx={point.x}
                cy={point.y}
                r="12"
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {/* Visual dot */}
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredIndex === idx ? 6 : (showDots ? 3.5 : 0)}
                fill={hoveredIndex === idx ? 'var(--color-green)' : '#fff'}
                stroke="var(--bg-color)"
                strokeWidth={hoveredIndex === idx ? 1.5 : (showDots ? 1.5 : 0)}
                style={{
                  transition: 'all 0.15s ease',
                  cursor: 'pointer',
                  pointerEvents: 'none'
                }}
              />
            </g>
          ))}

          {/* X-Axis labels (dates) */}
          {xAxisTicks.map((tick, idx) => {
            let textAnchor = "middle";
            if (idx === 0) textAnchor = "start";
            else if (idx === xAxisTicks.length - 1) textAnchor = "end";
            return (
              <text
                key={`x-label-${idx}`}
                x={tick.x}
                y={height - paddingY + 16}
                fill="var(--text-secondary)"
                fontSize="9px"
                textAnchor={textAnchor}
                style={{ opacity: 0.8 }}
              >
                {tick.label}
              </text>
            );
          })}
        </svg>

        {/* HTML Tooltip overlay */}
        {hoveredIndex !== null && chartPoints[hoveredIndex] && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: chartPoints[hoveredIndex].x > width / 2 ? '16px' : 'auto',
            right: chartPoints[hoveredIndex].x > width / 2 ? 'auto' : '16px',
            background: 'rgba(15, 15, 15, 0.95)',
            border: '2px solid var(--color-green)',
            borderRadius: '6px',
            padding: '10px 14px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.6)',
            pointerEvents: 'none',
            zIndex: 10,
            transition: 'all 0.1s ease',
            minWidth: '160px',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {chartPoints[hoveredIndex].isSimulated 
                ? (hoveredIndex === 0 ? `Baseline (${formatDate(chartPoints[hoveredIndex].createdAt)})` : `Current (${formatDate(chartPoints[hoveredIndex].createdAt)})`)
                : formatFullDate(chartPoints[hoveredIndex].createdAt)}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--color-green)', display: 'flex', alignItems: 'baseline', gap: '3px' }}>
              {chartPoints[hoveredIndex].score}% <span style={{ fontSize: '10px', color: '#fff', fontWeight: 'normal' }}>Mastery</span>
            </div>
            <div style={{ fontSize: '10px', color: '#fff', borderTop: '1px solid #333', marginTop: '6px', paddingTop: '4px', lineHeight: '1.4' }}>
              <div>Questions: {chartPoints[hoveredIndex].totalQuestions}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Score: {chartPoints[hoveredIndex].totalScore} pts</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', padding: '0 5px' }}>
        <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
          {timeRange === 'All Time'
            ? `Showing history across ${actualPointsCount} updates`
            : `Showing timeline for the past ${timeRange.toLowerCase()} (${actualPointsCount} updates)`}
        </span>
        <span style={{ fontSize: '10px', color: 'var(--color-green)', fontWeight: 'bold' }}>
          Target: 100% Mastery
        </span>
      </div>
    </div>
  );
}
