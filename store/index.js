import {
  SET_TEAM_DATA,
  CALCULATE_TEAM_AVERAGES } from '../constants/mutation-types';
import axios from 'axios';

const DATA_URL = 'http://localhost:3000/league-data.json';
const DEFAULT_DATA = {
  fgm: 0,
  fga: 0,
  ftm: 0,
  fta: 0,
  '3ptm': 0,
  pts: 0,
  reb: 0,
  ast: 0,
  stl: 0,
  blk: 0,
  to: 0
};

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

      commit({
        type: CALCULATE_TEAM_AVERAGES,
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
  },
  [CALCULATE_TEAM_AVERAGES]: (state, { data }) => {
    // Team level
    state.data.teams = data.teams.reduce((arr, team) => {
      const totalWeeks = team.weeklyStats.length;

      // Weekly stats level
      const teamAverages = team.weeklyStats.reduce(
        (obj, week, index) => {
          // Used to find the average.
          const multiplier = index + 1 === totalWeeks ? 1 / totalWeeks : 1;

          // Helper to calculate the total.
          const total = ({totals}, {categories}, category) =>
            (totals[category] + parseInt(categories[category]));

          // Helper to calculate the average.
          const average = ({averages}, {categories}, category) =>
            Math.round(
              (averages[category] + parseInt(categories[category])) * multiplier
            );

          return {
            ...obj,
            ...{
              totals: {
                fgm: total(obj, week, 'fgm'),
                fga: total(obj, week, 'fga'),
                ftm: total(obj, week, 'ftm'),
                fta: total(obj, week, 'fta'),
                '3ptm': total(obj, week, '3ptm'),
                pts: total(obj, week, 'pts'),
                reb: total(obj, week, 'reb'),
                ast: total(obj, week, 'ast'),
                stl: total(obj, week, 'stl'),
                blk: total(obj, week, 'blk'),
                to: total(obj, week, 'to')
              },
              averages: {
                fgm: average(obj, week, 'fgm'),
                fga: average(obj, week, 'fga'),
                ftm: average(obj, week, 'ftm'),
                fta: average(obj, week, 'fta'),
                '3ptm': average(obj, week, '3ptm'),
                pts: average(obj, week, 'pts'),
                reb: average(obj, week, 'reb'),
                ast: average(obj, week, 'ast'),
                stl: average(obj, week, 'stl'),
                blk: average(obj, week, 'blk'),
                to: average(obj, week, 'to')
              }
            }
          };
        },
        { totals: DEFAULT_DATA, averages: DEFAULT_DATA }
      );

      // Season long FGP average
      teamAverages.averages.fgp =
        teamAverages.totals.fgm / teamAverages.totals.fga;
      // Season long FGP totals
      // teamAverages.totals.fgp =
      //   teamAverages.totals.fgm / teamAverages.totals.fga;
      // Season long FTP average
      teamAverages.averages.ftp =
        teamAverages.totals.ftm / teamAverages.totals.fta;
      // Season long FTP totals
      // teamAverages.totals.ftp =
      //   teamAverages.totals.ftm / teamAverages.totals.fta;

      arr.push({...team, ...teamAverages});

      return arr;
    }, []);
  }
};

export const getters = {
  leagueName: state => state.data.name,
  teams: state => state.data.teams,
  teamsSortedByPtsTotal: state => [...state.data.teams].sort(
    (team1, team2) => team2.totals.pts - team1.totals.pts
  ),
  teamsSortedByPtsAverage: state => [...state.data.teams].sort(
    (team1, team2) => team2.averages.pts - team1.averages.pts
  ),
  teamsSortedBy3ptmAverage: state => [...state.data.teams].sort(
    (team1, team2) => team2.averages['3ptm'] - team1.averages['3ptm']
  ),
  teamsSortedByRebAverage: state => [...state.data.teams].sort(
    (team1, team2) => team2.averages.reb - team1.averages.reb
  ),
  teamsSortedByAstAverage: state => [...state.data.teams].sort(
    (team1, team2) => team2.averages.ast - team1.averages.ast
  ),
  teamsSortedByStlAverage: state => [...state.data.teams].sort(
    (team1, team2) => team2.averages.stl - team1.averages.stl
  ),
  teamsSortedByBlkAverage: state => [...state.data.teams].sort(
    (team1, team2) => team2.averages.blk - team1.averages.blk
  ),
  teamsSortedByToAverage: state => [...state.data.teams].sort(
    (team1, team2) => team1.averages.to - team2.averages.to
  )
};
