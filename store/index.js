import {
  SET_TEAM_DATA,
  CALCULATE_TEAM_AVERAGES,
  CALCULATE_TEAM_AVERAGE_RANKINGS } from '../constants/mutation-types';
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

      commit({
        type: CALCULATE_TEAM_AVERAGE_RANKINGS,
        data
      });
    } catch ({ message }) {
      console.log(message);
      return error({ statusCode: 404, message });
    }
  },

  // getTeam ({ co}) {
  // }
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
          // Helps find the average, won't divide by totalWeeks until last item.
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
  },
  [CALCULATE_TEAM_AVERAGE_RANKINGS]: (state, { data }) => {
    calculateTeamAvgRankings(state);
  }
};

/**
 * Curry function to assist in descending sort by type & category
 *
 * Types: 'averages', 'totals'
 * Categories: 'pts', '3ptm', 'reb', etc.
 *
 * @param  {String} type The type to sort against (e.g "averages"/"totals").
 * @param  {String} category The category to sort by.
 * @param  {Object} team1 The first team to compare.
 * @param  {Object} team2 The second team to compare.
 * @return {Array} Desc sorted array.
 */
const sortByTypeCategoryDesc =
  type =>
    category =>
      (team1, team2) =>
        team2[type][category] - team1[type][category];

/**
 * Curry function to assist in ascending sort by type & category
 *
 * Types: 'averages', 'totals'
 * Categories: 'pts', '3ptm', 'reb', etc.
 *
 * @param  {String} type The type to sort against (e.g "averages"/"totals").
 * @param  {String} category The category to sort by.
 * @param  {Object} team2 The second team to compare.
 * @return {Array} Ascending sorted array.
 */
const sortByTypeCategoryAsc =
  type =>
    category =>
      (team1, team2) =>
        team1[type][category] - team2[type][category];

/**
 * Descending & ascending average sort curry functions
 * @type {Function}
 */
const sortByAvgCategoryDesc = sortByTypeCategoryDesc('averages');
const sortByAvgCategoryAsc = sortByTypeCategoryAsc('averages');

/**
 * Descending & ascending totals sort curry functions
 * @type {Function}
 */
const sortByTotalCategoryDesc = sortByTypeCategoryDesc('totals');

/***********************************************
 * Totals sorting helper functions
 ***********************************************/

/**
 * Leverages curry function to sort by pts descending.
 * @type {Function}
 */
const sortByTotalPtsDesc = sortByTotalCategoryDesc('pts');

/***********************************************
 * Average sorting helper functions
 ***********************************************/

/**
 * Leverages curry function to sort by pts descending.
 * @type {Function}
 */
const sortByAvgPtsDesc = sortByAvgCategoryDesc('pts');
/**
 * Leverages curry function to sort by pts descending.
 * @type {Function}
 */
const sortByAvgFGPDesc = sortByAvgCategoryDesc('fgp');
const sortByAvgFTPDesc = sortByAvgCategoryDesc('ftp');
/**
 * Leverages curry function to sort by 3ptm descending.
 * @type {Function}
 */
const sortByAvg3ptmDesc = sortByAvgCategoryDesc('3ptm');
/**
 * Leverages curry function to sort by reb descending.
 * @type {Function}
 */
const sortByAvgRebDesc = sortByAvgCategoryDesc('reb');
/**
 * Leverages curry function to sort by ast descending.
 * @type {Function}
 */
const sortByAvgAstDesc = sortByAvgCategoryDesc('ast');
/**
 * Leverages curry function to sort by stl descending.
 * @type {Function}
 */
const sortByAvgStlDesc = sortByAvgCategoryDesc('stl');
/**
 * Leverages curry function to sort by blk descending.
 * @type {Function}
 */
const sortByAvgBlkDesc = sortByAvgCategoryDesc('blk');
/**
 * Leverages curry function to sort by to descending.
 * @type {Function}
 */
const sortByAvgTOAscending = sortByAvgCategoryAsc('to');

/****************/

const teamsSortedByTotalPts =
  state => [...state.data.teams].sort(sortByTotalPtsDesc);

const teamsSortedByAvgPts =
  state => [...state.data.teams].sort(sortByAvgPtsDesc);

const teamsSortedByAvgFGP =
  state => [...state.data.teams].sort(sortByAvgFGPDesc);

const teamsSortedByAvgFTP =
  state => [...state.data.teams].sort(sortByAvgFTPDesc);

const teamsSortedByAvg3ptm =
  state => [...state.data.teams].sort(sortByAvg3ptmDesc);

const teamsSortedByAvgReb =
  state => [...state.data.teams].sort(sortByAvgRebDesc);

const teamsSortedByAvgAst =
  state => [...state.data.teams].sort(sortByAvgAstDesc);

const teamsSortedByAvgStl =
  state => [...state.data.teams].sort(sortByAvgStlDesc);

const teamsSortedByAvgBlk =
  state => [...state.data.teams].sort(sortByAvgBlkDesc);

const teamsSortedByAvgTO =
  state => [...state.data.teams].sort(sortByAvgTOAscending);

/****************/

// TODO: Use reduce() function?
const calculateTeamAvgRankings = state => {

  teamsSortedByAvgFGP(state).map((team, i) => {
    team.rankings = [{
      rank: i + 1,
      category: 'fgp'
    }];
  });

  teamsSortedByAvgFTP(state).map((team, i) => {
    team.rankings.push({
      rank: i + 1,
      category: 'ftp'
    });
  });

  teamsSortedByAvgPts(state).map((team, i) => {
    team.rankings.push({
      rank: i + 1,
      category: 'pts'
    });
  });

  teamsSortedByAvg3ptm(state).map((team, i) => {
    team.rankings.push({
      rank: i + 1,
      category: '3ptm'
    });
  });

  teamsSortedByAvgReb(state).map((team, i) => {
    team.rankings.push({
      rank: i + 1,
      category: 'reb'
    });
  });

  teamsSortedByAvgAst(state).map((team, i) => {
    team.rankings.push({
      rank: i + 1,
      category: 'ast'
    });
  });

  teamsSortedByAvgStl(state).map((team, i) => {
    team.rankings.push({
      rank: i + 1,
      category: 'stl'
    });
  });

  teamsSortedByAvgBlk(state).map((team, i) => {
    team.rankings.push({
      rank: i + 1,
      category: 'blk'
    });
  });

  teamsSortedByAvgTO(state).map((team, i) => {
    team.rankings.push({
      rank: i + 1,
      category: 'to'
    });
  });
};

const getTeam = state => teamId => state.data.teams.find(
  team => team.id == teamId
);

/****************/

export const getters = {
  leagueName: state => state.data.name,
  teams: state => state.data.teams,
  teamsSortedByTotalPts,
  teamsSortedByAvgFGP,
  teamsSortedByAvgFTP,
  teamsSortedByAvgPts,
  teamsSortedByAvg3ptm,
  teamsSortedByAvgReb,
  teamsSortedByAvgAst,
  teamsSortedByAvgStl,
  teamsSortedByAvgBlk,
  teamsSortedByAvgTO,
  getTeam
};
