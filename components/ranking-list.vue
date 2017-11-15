<template>
  <ol>
    <li
      v-for="team in teams"
      :class="{ 'u-text-bold': team.id === selectedTeamId }">
        {{ team[categoryType][categoryName] }}: {{ team.name }}
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
