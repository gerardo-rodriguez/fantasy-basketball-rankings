<template>
  <div>
    <LineChart
      :teams="teams"
      :selectedTeamId="selectedTeamId"
      :xDomain="xDomain"
      :yDomain="yDomain" />
  </div>
</template>

<script>
  import LineChart from './line-chart';

  export default {
    props: {
      teams: {
        type: Array,
        required: true
      },
      selectedTeamId: {
        type: String,
        required: true
      }
    },
    components: {
      LineChart
    },
    computed: {
      /**
       * The xDomain for the chart
       *
       * @return {Array} The xDomain ranking category values
       *
       * ['fgp', 'ftp', 'pts', '3ptm', 'reb', ast', 'stl', 'blk', 'to']
       */
      xDomain () {
        return this.teams[0].rankings.reduce((arr, ranking) => {
          arr.push(ranking.category);
          return arr;
        }, []);
      },
      /**
       * The yDomain for the chart
       *
       * @return {Array} The yDomain ranking values
       */
      yDomain () {
        return [1, this.teams.length];
      }
    }
  };
</script>
