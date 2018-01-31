<template>
  <div>
    <h2>{{ team.name }} weekly 3pm category totals</h2>
    <svg id="visualization" width="600" height="500">
      <path
        :d="pathData"
        stroke="green"
        stroke-width="2"
        fill="none"
        ></path>
    </svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';

  const WIDTH = 600;
  const HEIGHT = 500;
  const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 40
  };

  export default {
    props: {
      team: {
        type: Object,
        required: true
      }
    },
    mounted () {
      console.log('xDomain', this.xDomain);
      console.log('yDomain', this.yDomain);
      console.log('pathData', this.pathData);

      const vis = d3.select('#visualization');

      const xAxis = d3.axisBottom(this.xScale);
      const yAxis = d3.axisLeft(this.yScale);

      // Create x axis using xAxis
      vis.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${HEIGHT - MARGINS.bottom})`)
        .call(xAxis);

      // Create y axis using yAxis
      vis.append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${MARGINS.left}, 0)`)
        .call(yAxis);

    },
    computed: {
      xScale () {
        return d3.scaleLinear()
          .domain(this.xDomain)
          .range([MARGINS.left, WIDTH - MARGINS.right]);
      },
      yScale () {
        return d3.scaleLinear()
          .domain(d3.extent(this.yDomain))
          .range([MARGINS.bottom, HEIGHT - MARGINS.top]);
      },
      xDomain () {
        return [1, this.team.weeklyStats.length];
      },
      yDomain () {
        return this.team.weeklyStats.reduce((arr, week) => {
          arr.push(week.categories['3ptm']);
          return arr;
        }, []);
      },
      pathData () {
        const xScale = this.xScale;
        const yScale = this.yScale;

        const dataLine = d3.line()
          .x(function (week, i) {
            return xScale(i + 1);
          })
          .y(function (week) {
            return yScale(week.categories['3ptm']);
          });

        return dataLine(this.team.weeklyStats);
      }
    }
  };
</script>

