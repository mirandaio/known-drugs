import React, { Component } from 'react';
import * as d3 from 'd3';

const WIDTH = 240;
const HEIGHT = 240;

class PieChart extends Component {
  svgRef = React.createRef();
  pie = d3.pie().sort(null).value(d => d.count);
  arc = d3.arc().innerRadius(0).outerRadius(Math.min(WIDTH, HEIGHT) / 2 - 1);

  componentDidMount() {
    this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  _render() {
    const { data } = this.props;
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.schemePastel1);

    const svg = d3.select(this.svgRef.current);
    const chart = svg.select('g');

    const arcs = this.pie(data);

    chart.attr('stroke', 'white')
    .selectAll('path')
    .data(arcs)
    .join('path')
    .attr('fill', d => color(d.data.category))
    .attr('d', this.arc);

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
        <g/>
      </svg>
    );
  }
}

export default PieChart;
