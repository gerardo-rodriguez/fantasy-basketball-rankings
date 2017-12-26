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
