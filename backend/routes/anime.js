const axios = require("axios");
const express = require("express");
const urls = require("../utils/apiEndpoints");

const animeRouter = express.Router();

const apiCall = async (URL) => {
  try {
    const response = await axios.get(URL);
    return response.data.data;
  } catch (error) {
    console.log(URL);
    throw error;
  }
};

let scheduleList = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

animeRouter.get("/schedule/:day", async function (req, res) {
  const day = req.params.day;

  if (scheduleList[day].length === 0) {
    try {
      const data = await apiCall(urls.getScheduleFor(day));
      scheduleList[day] = data;

      if (scheduleList[day].length > 0) {
        setTimeout(() => {
          scheduleList[day] = [];
        }, 24 * 60 * 60 * 1000);
      }
    } catch (err) {
      console.log(err);
      return res.status(err.status).json({ message: err.statusText }).end();
    }
  }
  res.status(200).json(scheduleList[day]);
});

let topList = [];

animeRouter.get("/top", async function (req, res) {
  if (topList.length === 0) {
    try {
      const data = await apiCall(urls.getTopAnimeList);
      topList = data;

      if (topList.length > 0) {
        setTimeout(() => {
          topList = [];
        }, 24 * 60 * 60 * 1000);
      }
    } catch (err) {
      console.log(err);
      return res.status(err.status).json({ message: err.statusText }).end();
    }
  }
  res.status(200).json(topList);
});

let recentList = [];

animeRouter.get("/recent", async function (req, res) {
  if (recentList.length === 0) {
    try {
      const data = await apiCall(urls.getRecentRecommendations);
      recentList = data;

      if (recentList.length > 0) {
        setTimeout(() => {
          recentList = [];
        }, 24 * 60 * 60 * 1000);
      }
    } catch (err) {
      console.log(err);
      return res.status(err.status).json({ message: err.statusText }).end();
    }
  }
  res.status(200).json(recentList);
});

let seasonList = [];

animeRouter.get("/season", async function (req, res) {
  if (seasonList.length === 0) {
    try {
      const data = await apiCall(urls.getSeasonNow);
      seasonList = data;

      if (seasonList.length > 0) {
        setTimeout(() => {
          seasonList = [];
        }, 24 * 60 * 60 * 1000);
      }
    } catch (err) {
      console.log(err);
      return res.status(err.status).json({ message: err.statusText }).end();
    }
  }
  res.status(200).json(seasonList);
});

let upcomingList = [];

animeRouter.get("/upcoming", async function (req, res) {
  if (upcomingList.length === 0) {
    try {
      const data = await apiCall(urls.getSeasonUpcoming);
      upcomingList = data;

      if (upcomingList.length > 0) {
        setTimeout(() => {
          upcomingList = [];
        }, 24 * 60 * 60 * 1000);
      }
    } catch (err) {
      console.log(err);
      return res.status(err.status).json({ message: err.statusText }).end();
    }
  }
  res.status(200).json(upcomingList);
});

animeRouter.get("/recommend/:mal_id", async function (req, res) {
  const mal_id = req.params.mal_id;

  try {
    const data = await apiCall(urls.getRecommendedAnimeList(mal_id));
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.statusText }).end();
  }
});

animeRouter.get("/fullanime/:mal_id", async function (req, res) {
  const mal_id = req.params.mal_id;

  try {
    const data = await apiCall(urls.getFullAnime(mal_id));
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.statusText }).end();
  }
});

animeRouter.get("/anime/:mal_id", async function (req, res) {
  const mal_id = req.params.mal_id;

  try {
    const data = await apiCall(urls.getAnime(mal_id));
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.statusText }).end();
  }
});

animeRouter.get("/search", async function (req, res) {
  const query = req.query.q;

  try {
    const data = await apiCall(urls.getSearchResults(query));
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.statusText }).end();
  }
});

animeRouter.get("/random", async function (req, res) {
  try {
    const data = await apiCall(urls.getRandomAnime);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.statusText }).end();
  }
});

module.exports = animeRouter;
