import React, { Component } from 'react';
import * as d3 from 'd3';

const WIDTH = 280;
const HEIGHT = 280;
const RADIUS = Math.min(WIDTH, HEIGHT) / 2 - 30;
const LABEL_RADIUS = RADIUS * 0.65;

class PieChart extends Component {
  svgRef = React.createRef();
  chart = React.createRef();
  labels = React.createRef();
  pie = d3.pie().sort(null).value(d => d.count);
  arc = d3.arc().innerRadius(0).outerRadius(RADIUS);
  arcLabel = d3.arc().innerRadius(LABEL_RADIUS).outerRadius(LABEL_RADIUS);

  componentDidMount() {
    this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  _render() {
    const { data } = this.props;

    const arcs = this.pie(data);
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.schemePastel1);

    const chart = d3.select(this.chart.current);
    
    chart.attr('stroke', 'white')
    .selectAll('path')
    .data(arcs)
    .join('path')
    .attr('fill', d => color(d.data.category))
    .attr('d', this.arc);

    const labels = d3.select(this.labels.current);

    labels
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'middle')
      .selectAll('text')
      .data(arcs)
      .join('text')
      .attr('transform', d => `translate(${this.arcLabel.centroid(d)})`)
      .attr('y', '-0.4em')
      .text(d => `${d.data.category} (${d.data.count})`);
  }

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={WIDTH}
        height={HEIGHT}
        viewBox={`${-WIDTH/2} ${-HEIGHT/2} ${WIDTH} ${HEIGHT}`}
        ref={this.svgRef}
      >
        <g ref={this.chart}/>
        <g ref={this.labels}/>
      </svg>
    );
  }
}

export default PieChart;
