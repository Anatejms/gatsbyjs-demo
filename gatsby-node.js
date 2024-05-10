const axios = require('axios');
const crypto = require('crypto');

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  // fetch raw data from the omdbapi
  const fetchEpisodes = () => axios.get(`https://www.omdbapi.com/?s=game%20of%20thrones&apikey=CHANGEME`);
  // await for results
  const res = await fetchEpisodes();

  // map into these results and create nodes
  res.data.Search.map((episode, i) => {
    // Create your node object
    const episodeNode = {
      // Required fields
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `Episode`, // name of the graphQL query --> allRandomUser {}
      },
      children: [],

      // Other fields that you want to query with graphQl
      title: episode.Title,
      year: episode.Year,
      imdbID: episode.imdbID,
      type: episode.Type,
      poster: episode.Poster,
    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(episodeNode))
      .digest(`hex`);
    // add it to episodeNode
    episodeNode.internal.contentDigest = contentDigest;

    // Create node with the gatsby createNode() API
    createNode(episodeNode);
  });

  return;
}