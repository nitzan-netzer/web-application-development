'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataItem {
  _id: string;
  avgPrice: number;
}

interface BarChartProps {
  data: DataItem[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const colors: string[] = ['#D6EFD8', '#80AF81', '#508D4E', '#1A531B', '#E1A531'];

  useEffect(() => {
    if (!chartRef.current) return;

    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const width = 450 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Clear the canvas
    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3
      .select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X-axis
    const x = d3
      .scaleBand<string>()
      .domain(data.map((d) => d._id))
      .range([0, width])
      .padding(0.2);

    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Y-axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.avgPrice) || 0])
      .nice()
      .range([height, 0]);

    chart.append('g').call(d3.axisLeft(y));

    // Bars
    chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d._id) || 0)
      .attr('y', (d) => y(d.avgPrice))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.avgPrice))
      .attr('fill', colors[2]); // Use color from palette

    // Labels
    chart
      .selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .text((d) => `₪${d.avgPrice.toFixed(2)}`)
      .attr('x', (d) => (x(d._id) || 0) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.avgPrice) - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#1A531B');
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default BarChart;
