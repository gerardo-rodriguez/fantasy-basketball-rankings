<template>
  <section>
    <!-- <h2>points total</h2>
    <ol>
      <li v-for="team in teamsSortedByPtsTotal">{{ team.totals.pts }}: {{ team.name }}</li>
    </ol> -->

    <div class="container">
      <div class="jumbotron">
        <svg id="visualization" width="1000" height="500"></svg>
      </div>
    </div>

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
          'sale': '202',
          'year': '2000'
        }, {
          'sale': '215',
          'year': '2001'
        }, {
          'sale': '179',
          'year': '2002'
        }, {
          'sale': '199',
          'year': '2003'
        }, {
          'sale': '134',
          'year': '2004'
        }, {
          'sale': '176',
          'year': '2010'
        }],
        info2: [{
          'sale': '102',
          'year': '2000'
        }, {
          'sale': '115',
          'year': '2001'
        }, {
          'sale': '101',
          'year': '2002'
        }, {
          'sale': '144',
          'year': '2003'
        }, {
          'sale': '166',
          'year': '2004'
        }, {
          'sale': '100',
          'year': '2010'
        }]
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

      const xScale = d3.scaleLinear().range(
        [MARGINS.left, WIDTH - MARGINS.right]
      ).domain(
        d3.extent([...this.info, ...this.info2], function (d) {
          return d['year']; // [2000, 2010]
        })
      );

      const yScale = d3.scaleLinear().range(
        [HEIGHT - MARGINS.top, MARGINS.bottom]
      ).domain(
        d3.extent([...this.info, ...this.info2], function (d) {
          return d['sale']; // [134, 215]
        })
      );

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      const dataLine = d3.line()
        .x(function (d) {
          return xScale(d['year']);
        })
        .y(function (d) {
          return yScale(d['sale']);
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
