<template>
  <div>
    <nuxt-link to="/">Home</nuxt-link>
    <p>team: {{ team.name }}</p>
    <WeeklyTotalsChart :team="team" category="fgm" />
    <WeeklyTotalsChart :team="team" category="fga" />
    <WeeklyTotalsChart :team="team" category="fgp" />
    <WeeklyTotalsChart :team="team" category="ftm" />
    <WeeklyTotalsChart :team="team" category="fta" />
    <WeeklyTotalsChart :team="team" category="ftp" />
    <WeeklyTotalsChart :team="team" category="3ptm" />
    <WeeklyTotalsChart :team="team" category="pts" />
    <WeeklyTotalsChart :team="team" category="reb" />
    <WeeklyTotalsChart :team="team" category="ast" />
    <WeeklyTotalsChart :team="team" category="stl" />
    <WeeklyTotalsChart :team="team" category="blk" />
    <WeeklyTotalsChart :team="team" category="to" />
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
