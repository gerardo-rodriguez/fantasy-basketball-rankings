<template>
  <div class="container">
    <svg id="visualization" width="1000" height="500">
      <path v-for="line in lines" :key="line.team.id"
        :d="line.lineData"
        :stroke="stroke(line.team)"
        :stroke-width="strokeWidth(line.team)"
        fill="none"
        ></path>
    </svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';

  /* eslint-disable no-unused-vars */
  const WIDTH = 600;
  const HEIGHT = 500;
  const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 40
  };
  /* eslint-enable no-unused-vars */

  export default {
    props: {
      teams: {
        type: Array,
        required: true
      },
      selectedTeamId: {
        type: String,
        required: true
      },
      xDomain: {
        type: Array,
        required: true
      },
      yDomain: {
        type: Array,
        required: true
      }
    },
    methods: {
      isSelectedTeam (team) {
        return team.id === this.selectedTeamId;
      },
      stroke (team) {
        return this.isSelectedTeam(team) ? 'red' : 'blue';
      },
      strokeWidth (team) {
        return this.isSelectedTeam(team) ? 2 : 1;
      }
    },
    computed: {
      lines () {
        return this.teams.reduce((lines, team) => {
          const xScale = d3.scalePoint()
            .range([MARGINS.left, WIDTH - MARGINS.right])
            .domain(this.xDomain);

          const yScale = d3.scaleLinear()
            .range([MARGINS.bottom, HEIGHT - MARGINS.top])
            .domain(this.yDomain);

          const dataLine = d3.line()
            .x(function (d) {
              return xScale(d.category);
            })
            .y(function (d) {
              return yScale(d.rank);
            });

          lines.push({
            team,
            lineData: dataLine(team.rankings)
          });
          return lines;
        }, []);
      }
    },
    mounted () {
      const vis = d3.select('#visualization');

      // const xScale = d3.scaleLinear().range(
      //   [MARGINS.left, WIDTH - MARGINS.right]
      // ).domain(
      //   d3.extent([...this.info, ...this.info2], function (d) {
      //     return d.category; // [2000, 2010]
      //   })
      // );

      const xScale = d3.scalePoint()
        .range([MARGINS.left, WIDTH - MARGINS.right])
        .domain(this.xDomain);

      const yScale = d3.scaleLinear()
        .range([MARGINS.bottom, HEIGHT - MARGINS.top])
        .domain(this.yDomain);
        // .domain(d3.extent([...this.info, ...this.info2], function (d) {
        //   return d.rank; // [134, 215]
        // }));

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      /* eslint-disable no-unused-vars */
      // const dataLine = d3.line()
      //   .x(function (d) {
      //     return xScale(d.category);
      //   })
      //   .y(function (d) {
      //     return yScale(d.rank);
      //   });
      /* eslint-enable no-unused-vars */

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

      // this.teams.forEach(team => {
      //   const isSelectedTeam = team.id === this.selectedTeamId;
      //   const strokeColor = isSelectedTeam ? 'red' : 'blue';
      //   const strokeWidth = isSelectedTeam ? 2 : 1;
      //
      //   vis.append('path')
      //     .attr('d', dataLine(team.rankings))
      //     .attr('stroke', strokeColor)
      //     .attr('stroke-width', strokeWidth)
      //     .attr('fill', 'none');
      // });
    }
  };
</script>

<style>
</style>
