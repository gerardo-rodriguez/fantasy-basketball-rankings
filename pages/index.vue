<template>
  <section>

    <form>
      <label class="u-block" v-for="team in teams">
        <input
          type="radio"
          name="teams"
          v-model="selectedTeamId"
          :value="team.id">
          {{ team.name }}
      </label>
    </form>

    <p>{{ selectedTeamId }}</p>

    <div class="container">
      <svg id="visualization" width="1000" height="500"></svg>
    </div>

    <div class="lists">
      <!-- <h2>points total</h2>
      <ol>
        <li v-for="team in teamsSortedByTotalPts">{{ team.totals.pts }}: {{ team.name }}</li>
      </ol> -->

      <h2>FGP avg</h2>
      <RankingList
        :teams="teamsSortedByAvgFGP"
        :selectedTeamId="selectedTeamId"
        categoryType="averages"
        categoryName="fgp"
      />

      <h2>FTP avg</h2>
      <RankingList
        :teams="teamsSortedByAvgFTP"
        :selectedTeamId="selectedTeamId"
        categoryType="averages"
        categoryName="ftp"
      />

      <h2>points avg</h2>
      <RankingList
        :teams="teamsSortedByAvgPts"
        :selectedTeamId="selectedTeamId"
        categoryType="averages"
        categoryName="pts"
      />

      <h2>3ptm avg</h2>
      <RankingList
        :teams="teamsSortedByAvg3ptm"
        :selectedTeamId="selectedTeamId"
        categoryType="averages"
        categoryName="3ptm"
      />

      <h2>rebound avg</h2>
      <RankingList
        :teams="teamsSortedByAvgReb"
        :selectedTeamId="selectedTeamId"
        categoryType="averages"
        categoryName="reb"
      />

      <h2>assists avg</h2>
      <RankingList
        :teams="teamsSortedByAvgAst"
        :selectedTeamId="selectedTeamId"
        categoryType="averages"
        categoryName="ast"
      />

      <h2>steal avg</h2>
      <RankingList
        :teams="teamsSortedByAvgStl"
        :selectedTeamId="selectedTeamId"
        categoryType="averages"
        categoryName="stl"
      />

      <h2>block avg</h2>
      <RankingList
        :teams="teamsSortedByAvgBlk"
        :selectedTeamId="selectedTeamId"
        categoryType="averages"
        categoryName="blk"
      />

      <h2>TO avg</h2>
      <RankingList
        :teams="teamsSortedByAvgTO"
        :selectedTeamId="selectedTeamId"
        categoryType="averages"
        categoryName="to"
      />

      <!-- <pre>{{ teamsSortedByTotalPts }}</pre> -->
      <!-- <pre>{{ teams }}</pre> -->
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import * as d3 from 'd3';
  import RankingList from '../components/ranking-list';

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
        selectedTeamId: '1'
      };
    },
    components: {
      RankingList
    },
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
        const isSelectedTeam = team.id === this.selectedTeamId;
        const strokeColor = isSelectedTeam ? 'red' : 'blue';
        const strokeWidth = isSelectedTeam ? 2 : 1;

        vis.append('path')
          .attr('d', dataLine(team.rankings))
          .attr('stroke', strokeColor)
          .attr('stroke-width', strokeWidth)
          .attr('fill', 'none');
      });
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
