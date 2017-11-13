<template>
  <section>

    <form>
      <label class="u-block" v-for="team in teams">
        <input
          type="radio"
          name="teams"
          :value="team.id">
          {{ team.name }}
      </label>
    </form>

    <div class="container">
      <svg id="visualization" width="1000" height="500"></svg>
    </div>

    <div class="lists">
      <!-- <h2>points total</h2>
      <ol>
        <li v-for="team in teamsSortedByTotalPts">{{ team.totals.pts }}: {{ team.name }}</li>
      </ol> -->

      <h2>FGP avg</h2>
      <ol>
        <li v-for="team in teamsSortedByAvgFGP">
          {{ team.averages.fgp }}: {{ team.name }}
        </li>
      </ol>

      <h2>FTP avg</h2>
      <ol>
        <li v-for="team in teamsSortedByAvgFTP">
          {{ team.averages.ftp }}: {{ team.name }}
        </li>
      </ol>

      <h2>points avg</h2>
      <ol>
        <li v-for="team in teamsSortedByAvgPts">
          {{ team.averages.pts }}: {{ team.name }}
          <!-- <pre>{{team}}</pre> -->
        </li>
      </ol>

      <h2>3ptm avg</h2>
      <ol>
        <li v-for="team in teamsSortedByAvg3ptm">{{ team.averages['3ptm'] }}: {{ team.name }}</li>
      </ol>

      <h2>rebound avg</h2>
      <ol>
        <li v-for="team in teamsSortedByAvgReb">{{ team.averages.reb }}: {{ team.name }}</li>
      </ol>

      <h2>assists avg</h2>
      <ol>
        <li v-for="team in teamsSortedByAvgAst">{{ team.averages.ast }}: {{ team.name }}</li>
      </ol>

      <h2>steal avg</h2>
      <ol>
        <li v-for="team in teamsSortedByAvgStl">{{ team.averages.stl }}: {{ team.name }}</li>
      </ol>

      <h2>block avg</h2>
      <ol>
        <li v-for="team in teamsSortedByAvgBlk">{{ team.averages.blk }}: {{ team.name }}</li>
      </ol>

      <h2>TO avg</h2>
      <ol>
        <li v-for="team in teamsSortedByAvgTO">{{ team.averages.to }}: {{ team.name }}</li>
      </ol>

      <!-- <pre>{{ teamsSortedByTotalPts }}</pre> -->
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
    // data () {
    //   return {
    //     info: [{
    //       rank: 4,
    //       category: 'pts'
    //     }, {
    //       rank: 4,
    //       category: '3ptm'
    //     }, {
    //       rank: 6,
    //       category: 'reb'
    //     }, {
    //       rank: 1,
    //       category: 'ast'
    //     }, {
    //       rank: 5,
    //       category: 'stl'
    //     }, {
    //       rank: 5,
    //       category: 'blk'
    //     }],
    //     info2: [{
    //       rank: 2,
    //       category: 'pts'
    //     }, {
    //       rank: 1,
    //       category: '3ptm'
    //     }, {
    //       rank: 2,
    //       category: 'reb'
    //     }, {
    //       rank: 5,
    //       category: 'ast'
    //     }, {
    //       rank: 3,
    //       category: 'stl'
    //     }, {
    //       rank: 7,
    //       category: 'blk'
    //     }],
    //   };
    // },
    computed: {
      ...mapGetters({
        state: 'state',
        teams: 'teams',
        teamsSortedByTotalPts: 'teamsSortedByTotalPts',
        teamsSortedByAvgFGP: 'teamsSortedByAvgFGP',
        teamsSortedByAvgFTP: 'teamsSortedByAvgFTP',
        teamsSortedByAvgPts: 'teamsSortedByAvgPts',
        teamsSortedByAvg3ptm: 'teamsSortedByAvg3ptm',
        teamsSortedByAvgReb: 'teamsSortedByAvgReb',
        teamsSortedByAvgAst: 'teamsSortedByAvgAst',
        teamsSortedByAvgStl: 'teamsSortedByAvgStl',
        teamsSortedByAvgBlk: 'teamsSortedByAvgBlk',
        teamsSortedByAvgTO: 'teamsSortedByAvgTO'
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
        .domain(
          this.teams[0].rankings.reduce((arr, ranking) => {
            arr.push(ranking.category);
            return arr;
          }, [])
        );

      const yScale = d3.scaleLinear()
        .range([MARGINS.bottom, HEIGHT - MARGINS.top])
        .domain([1, this.teams.length]);
        // .domain(d3.extent([...this.info, ...this.info2], function (d) {
        //   return d.rank; // [134, 215]
        // }));

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

      this.teams.forEach(team => {
        const isMyTeam = team.name === 'Hardwood Addicts';
        const strokeColor = isMyTeam ? 'red' : 'blue';
        const strokeWidth = isMyTeam ? 2 : 1;
        vis.append('path')
          .attr('d', dataLine(team.rankings))
          .attr('stroke', strokeColor)
          .attr('stroke-width', strokeWidth)
          .attr('fill', 'none');
      });

      // vis.append('path')
      //   .attr('d', dataLine(this.info))
      //   .attr('stroke', 'blue')
      //   .attr('strok-width', 2)
      //   .attr('fill', 'none');
      //
      // vis.append('path')
      //   .attr('d', dataLine(this.info2))
      //   .attr('stroke', 'red')
      //   .attr('strok-width', 2)
      //   .attr('fill', 'none');
    }
  };
</script>

<style>
  body {
    padding: 2em;
  }
  .u-block {
    display: block;
  }
</style>
