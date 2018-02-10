<template>
  <div>
    <h2>{{ team.name }}</h2>
    <h3>{{ category }} category week-by-week totals</h3>
    <svg :id="chartName" width="600" height="500">
      <path
        :d="pathData"
        stroke="green"
        stroke-width="2"
        fill="none"
      ></path>
      <circle
        v-for="week in team.weeklyStats"
        :key="`${category}-week-${week.id}`"
        :cx="xPos(week)"
        :cy="yPos(week)"
        r="5"
        fill="green"
      ></circle>
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
      },
      category: {
        type: String,
        required: true
      }
    },
    mounted () {
      // console.log('\n\nxDomain', this.xDomain);
      // console.log('yDomain', this.yDomain);
      // console.log('pathData', this.pathData);
      // console.log('this.category', this.category);
      // console.log('this.chartName', this.chartName);

      const vis = d3.select(`#${this.chartName}`);

      const xAxis = d3.axisBottom(this.xScale);
      const yAxis = d3.axisLeft(this.yScale);

      // Create x axis using xAxis
      vis.append('g')
        .attr('transform', `translate(0, ${HEIGHT - MARGINS.bottom})`)
        .call(xAxis);

      // Create y axis using yAxis
      vis.append('g')
        .attr('transform', `translate(${MARGINS.left}, 0)`)
        .call(yAxis);
    },
    methods: {
      /**
       * Calculates the x position using the xScale()
       * @param {Object} week An object representing a week's data for a team
       * @returns {Number} The x position value
       */
      xPos (week) {
        return this.xScale(week.id);
      },
      /**
       * Calculates the y position using the yScale()
       * @param {Object} week An object representing a week's data for a team
       * @returns {Number} The y position value
       */
      yPos (week) {
        return this.yScale(week.categories[this.category]);
      }
    },
    computed: {
      chartName () {
        return `viz-${this.category}`;
      },
      xScale () {
        return d3.scaleLinear()
          .domain(this.xDomain)
          .range([MARGINS.left, WIDTH - MARGINS.right]);
      },
      yScale () {
        return d3.scaleLinear()
          // .domain(d3.extent(this.yDomain).reverse())
          .domain([d3.max(this.yDomain), 0])
          .range([MARGINS.bottom, HEIGHT - MARGINS.top]);
      },
      xDomain () {
        return [1, this.team.weeklyStats.length];
      },
      yDomain () {
        return this.team.weeklyStats.reduce((arr, week) => {
          arr.push(
            Number.parseFloat(week.categories[this.category])
          );
          return arr;
        }, []);
      },
      pathData () {
        const dataLine = d3.line()
          .x(this.xPos)
          .y(this.yPos);

        return dataLine(this.team.weeklyStats);
      }
    }
  };
</script>

