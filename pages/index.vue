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

export default {
  computed: {
    ...mapGetters({
      teams: 'teams',
      teamAverages: 'teamAverages'
    })
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
