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
  console.log(team.name);

  // eslint-disable-next-line no-unused-vars
  const teamReduced = {...team};

  teamReduced.weeklyStats = team.weeklyStats.reduce((obj, week, index) => {
    console.log(week.categories['pts']);

    return Object.assign({}, obj, {
      categories: {
        // eslint-disable-next-line max-len
        '3ptm': (obj.categories['3ptm'] + parseInt(week.categories['3ptm'])) / (index + 1),
        // eslint-disable-next-line max-len
        pts: (obj.categories.pts + parseInt(week.categories.pts)) / (index + 1)
      }
    });

    // return Object.assign(obj, team, {
    //   categories: {
    //     // eslint-disable-next-line max-len
    //     '3ptm': (obj.categories['3ptm'] + parseInt(week.categories['3ptm']))
    //     / (index + 1)
    //   }
    // });

    // return obj;
  }, {
    categories: {
      '3ptm': 0,
      pts: 0
    }
  });

  console.log('teamReduced', teamReduced);

  arr.push(teamReduced);

  return arr;
}, []);

export const getters = {
  teams: state => state.data.teams,
  teamAverages
};
