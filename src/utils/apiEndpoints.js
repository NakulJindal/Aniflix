const base_url = "https://api.jikan.moe/v4";

const urls = {
  getTopAnimeList: `${base_url}/top/anime?type=tv&filter=bypopularity&sfw=false&page=1&limit=16`,
  getRecommendedAnimeList: (mal_id) =>
    `${base_url}/anime/${mal_id}/recommendations`,
  getFullAnime: (mal_id) => `${base_url}/anime/${mal_id}/full`,
  getAnime: (mal_id) => `${base_url}/anime/${mal_id}`,
  getRandomAnime: `${base_url}/random/anime`,
  getRecentRecommendations: `${base_url}/recommendations/anime?page=1`,
  getSeasonNow: `${base_url}/seasons/now?filter=tv&sfw=false&unapproved=false&page=1&limit=7`,
  getSearchResults: (query) =>
    `${base_url}/anime?sfw=false&unapproved=false&page=1&limit=12&sfw=false&order_by=popularity&sort=asc&q=${query}`,
  getScheduleFor: (day) =>
    `${base_url}/schedules?unapproved=false&filter=${day}`,
};

export default urls;
