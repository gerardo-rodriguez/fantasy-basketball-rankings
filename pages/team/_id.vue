<template>
  <div>
    <nuxt-link to="/">Home</nuxt-link>
    <p>team: {{ team.name }}</p>
    <WeeklyTotalsChart :team="team" />
  </div>
</template>

<script>
  import WeeklyTotalsChart from
    '../../components/team-weekly-category-totals-chart';

  export default {
    asyncData ({ store, route }) {
      return {
        team: store.getters.getTeam(route.params.id)
      };
    },
    components: {
      WeeklyTotalsChart
    }
  };
</script>

<style>
</style>
