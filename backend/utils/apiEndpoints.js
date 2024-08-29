require("dotenv").config();

const base_url = process.env.API_BASE_URL;

const urls = {
  getRandomAnime: `${base_url}/random/anime`,
  getRecentRecommendations: `${base_url}/recommendations/anime?page=1`,
  getSeasonNow: `${base_url}/seasons/now?filter=tv&sfw=false&unapproved=false&page=1&limit=7`,
  getTopAnimeList: `${base_url}/top/anime?type=tv&filter=bypopularity&sfw=false&page=1&limit=16`,
  getSeasonUpcoming: `${base_url}/seasons/upcoming?filter=tv&sfw=false&unapproved=false&page=1&limit=16`,
  getAnime: (mal_id) => `${base_url}/anime/${mal_id}`,
  getFullAnime: (mal_id) => `${base_url}/anime/${mal_id}/full`,
  getScheduleFor: (day) =>
    `${base_url}/schedules?unapproved=false&filter=${day}`,
  getRecommendedAnimeList: (mal_id) =>
    `${base_url}/anime/${mal_id}/recommendations`,
  getSearchResults: (query) =>
    `${base_url}/anime?sfw=true&unapproved=false&page=1&limit=12&order_by=popularity&sort=asc&q=${query}`,
};

module.exports = urls;
