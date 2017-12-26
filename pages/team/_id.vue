<template>
  <p>team: {{ team.name }}</p>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    asyncData (context) {
      // console.log('log', context.store);
      // this.team = context.store.getters.getTeam(context.route.params.id);
    },
    data () {
      return {
        team: {}
      };
    },
    mounted () {
      this.team = this.getTeam(this.$route.params.id);
    },
    computed: {
      ...mapGetters({
        getTeam: 'getTeam',
      })
    }
  };
</script>

<style>
</style>
