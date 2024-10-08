'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataItem {
  _id: string;
  totalSales: number;
}

interface PieChartProps {
  data: DataItem[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const colors: string[] = ['#D6EFD8', '#80AF81', '#508D4E', '#1A531B', '#E1A531'];

  useEffect(() => {
    if (!chartRef.current) return;

    const width = 350;
    const height = 350;
    const radius = Math.min(width, height) / 2;

    // Clear the canvas
    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3
      .select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr(
        'transform',
        `translate(${width / 2}, ${height / 2})`
      );

    const pie = d3
      .pie<DataItem>()
      .sort(null)
      .value((d) => d.totalSales);

    const data_ready = pie(data);

    const arc = d3
      .arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(0)
      .outerRadius(radius);

    const color = d3.scaleOrdinal<string>().range(colors);

    svg
      .selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data._id) as string)
      .attr('stroke', '#fff')
      .style('stroke-width', '2px');

    // Add labels
    svg
      .selectAll('text')
      .data(data_ready)
      .enter()
      .append('text')
      .text((d) => d.data._id)
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#fff');
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default PieChart;
