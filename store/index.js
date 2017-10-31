import { SET_TEAM_DATA } from '../constants/mutation-types';
import axios from 'axios';

const DATA_URL = 'http://localhost:3000/league-data.json';

export const state = () => ({
  data: {}
});

export const actions = {
  async nuxtServerInit ({ commit }, { error }) {
    try {
      const { data } = await axios.get(DATA_URL);
      commit({
        type: SET_TEAM_DATA,
        data
      });
    } catch ({ message }) {
      console.log(message);
      return error({ statusCode: 404, message });
    }
  }
};

export const mutations = {
  [SET_TEAM_DATA]: (state, { data }) => {
    state.data = data;
  }
};

const teamAverages = state => state.data.teams.reduce((arr, team) => {
  arr.push(team);
  // team.weeklyStats.reduce((obj, week) => {
  //
  //   return obj;
  // }, {});
  return arr;
}, []);

export const getters = {
  teams: state => state.data.teams,
  teamAverages
};
