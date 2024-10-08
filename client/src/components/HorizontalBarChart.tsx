'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataItem {
  _id: string;
  avgSales: number;
}

interface HorizontalBarChartProps {
  data: DataItem[];
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const colors: string[] = ['#80AF81', '#508D4E', '#1A531B', '#E1A531'];

  useEffect(() => {
    if (!chartRef.current) return;

    const margin = { top: 20, right: 30, bottom: 50, left: 100 };
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

    // Y-axis
    const y = d3
      .scaleBand<string>()
      .domain(data.map((d) => d._id))
      .range([0, height])
      .padding(0.1);

    chart.append('g').call(d3.axisLeft(y));

    // X-axis
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.avgSales) || 0])
      .nice()
      .range([0, width]);

    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Bars
    chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', (d) => y(d._id) || 0)
      .attr('x', 0)
      .attr('height', y.bandwidth())
      .attr('width', (d) => x(d.avgSales))
      .attr('fill', colors[1]);

    // Labels
    chart
      .selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d.avgSales.toFixed(2))
      .attr('x', (d) => x(d.avgSales) + 5)
      .attr('y', (d) => (y(d._id) || 0) + y.bandwidth() / 2 + 4)
      .attr('fill', '#1A531B');
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default HorizontalBarChart;
