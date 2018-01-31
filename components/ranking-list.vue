<template>
  <ol>
    <li v-for="team in teams" :key="team.id"
      :class="{ 'u-text-bold': team.id === selectedTeamId }">
        {{ team[categoryType][categoryName] }}:
        <nuxt-link :to="`team/${team.id}`">{{ team.name }}</nuxt-link>
    </li>
  </ol>
</template>

<script>
  export default {
    props: {
      teams: {
        type: Array,
        required: true
      },
      selectedTeamId: {
        type: String,
        required: true
      },
      categoryType: {
        type: String,
        required: true
      },
      categoryName: {
        type: String,
        required: true
      }
    }
  };
</script>

<style>
  .u-text-bold {
    font-weight: bold;
  }
</style>
