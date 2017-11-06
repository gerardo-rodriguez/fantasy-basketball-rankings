<template>
  <section>
    <div class="container">
      <svg id="visualization" width="1000" height="500"></svg>
    </div>

    <div class="lists">
      <!-- <h2>points total</h2>
      <ol>
        <li v-for="team in teamsSortedByPtsTotal">{{ team.totals.pts }}: {{ team.name }}</li>
      </ol> -->

      <h2>points avg</h2>
      <ol>
        <li v-for="team in teamsSortedByPtsAverage">{{ team.averages.pts }}: {{ team.name }}</li>
      </ol>

      <h2>3ptm avg</h2>
      <ol>
        <li v-for="team in teamsSortedBy3ptmAverage">{{ team.averages['3ptm'] }}: {{ team.name }}</li>
      </ol>

      <h2>rebound avg</h2>
      <ol>
        <li v-for="team in teamsSortedByRebAverage">{{ team.averages.reb }}: {{ team.name }}</li>
      </ol>

      <h2>assists avg</h2>
      <ol>
        <li v-for="team in teamsSortedByAstAverage">{{ team.averages.ast }}: {{ team.name }}</li>
      </ol>

      <h2>steal avg</h2>
      <ol>
        <li v-for="team in teamsSortedByStlAverage">{{ team.averages.stl }}: {{ team.name }}</li>
      </ol>

      <h2>block avg</h2>
      <ol>
        <li v-for="team in teamsSortedByBlkAverage">{{ team.averages.blk }}: {{ team.name }}</li>
      </ol>

      <h2>TO avg</h2>
      <ol>
        <li v-for="team in teamsSortedByToAverage">{{ team.averages.to }}: {{ team.name }}</li>
      </ol>

      <!-- <pre>{{ teamsSortedByPtsTotal }}</pre> -->
      <!-- <pre>{{ teams }}</pre> -->
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
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
    data () {
      return {
        info: [{
          rank: 4,
          category: 'pts'
        }, {
          rank: 4,
          category: '3ptm'
        }, {
          rank: 6,
          category: 'reb'
        }, {
          rank: 1,
          category: 'ast'
        }, {
          rank: 5,
          category: 'stl'
        }, {
          rank: 5,
          category: 'blk'
        }],
        info2: [{
          rank: 2,
          category: 'pts'
        }, {
          rank: 1,
          category: '3ptm'
        }, {
          rank: 2,
          category: 'reb'
        }, {
          rank: 5,
          category: 'ast'
        }, {
          rank: 3,
          category: 'stl'
        }, {
          rank: 7,
          category: 'blk'
        }],
      };
    },
    computed: {
      ...mapGetters({
        state: 'state',
        teams: 'teams',
        teamsSortedByPtsTotal: 'teamsSortedByPtsTotal',
        teamsSortedByPtsAverage: 'teamsSortedByPtsAverage',
        teamsSortedBy3ptmAverage: 'teamsSortedBy3ptmAverage',
        teamsSortedByRebAverage: 'teamsSortedByRebAverage',
        teamsSortedByAstAverage: 'teamsSortedByAstAverage',
        teamsSortedByStlAverage: 'teamsSortedByStlAverage',
        teamsSortedByBlkAverage: 'teamsSortedByBlkAverage',
        teamsSortedByToAverage: 'teamsSortedByToAverage'
      })
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
        .domain(['pts', '3ptm', 'reb', 'ast', 'stl', 'blk']);

      const yScale = d3.scaleLinear()
        .range([MARGINS.bottom, HEIGHT - MARGINS.top])
        .domain(d3.extent([...this.info, ...this.info2], function (d) {
          return d.rank; // [134, 215]
        }));

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      const dataLine = d3.line()
        .x(function (d) {
          return xScale(d.category);
        })
        .y(function (d) {
          return yScale(d.rank);
        });

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

      vis.append('path')
        .attr('d', dataLine(this.info))
        .attr('stroke', 'blue')
        .attr('strok-width', 2)
        .attr('fill', 'none');

      vis.append('path')
        .attr('d', dataLine(this.info2))
        .attr('stroke', 'red')
        .attr('strok-width', 2)
        .attr('fill', 'none');
    }
  };
</script>

<style>
  body {
    padding: 2em;
  }
</style>
