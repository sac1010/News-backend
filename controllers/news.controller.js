const express = require("express");
const axios = require("axios");
const router = express.Router();
const urlMetadata = require("url-metadata");

router.get("/:newstype", async (req, res) => {
  try {
    newstypes = {
      topstories: "topstories",
      newstories: "newstories",
      beststories: "beststories",
    };
    const newstype = newstypes[req.params.newstype];
    const response = await axios.get(
      `https://hacker-news.firebaseio.com/v0/${newstype}.json?print=pretty`
    );
    const storyIds = response.data;
    const size = 8;
    const pages = Math.ceil(storyIds.length / size);
    const page = req.query.page || 1;
    const pageIds = storyIds.splice((page - 1) * size, size);

    const promises = [];
    for (let i = 0; i < pageIds.length; i++) {
      const result = axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${pageIds[i]}.json?print=pretty`
      );
      promises.push(result);
    }
    const results = await Promise.all(promises);
    const stories = results.map((res) => res.data);
    res.status(200).send({ stories, pages });
  } catch (err) {
    res.send(err);
  }
});



router.post("/metadata", async (req, res) => {
  try {
    const url = req.body.url;
    const metaData = await urlMetadata(url);
    res.send(metaData);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
