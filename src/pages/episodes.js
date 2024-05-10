import React from 'react'
import { Link, graphql } from 'gatsby'

const EpisodePage = (props) => {
  const episodes = props.data.allEpisode.edges;

  return (
    <div>
      {episodes.map((user, i) => {
        const episode = user.node;
        return (
          <div key={i}>
            <p>#{i+1} <Link to={`/episodes/${episode.imdbID}`}>Title: {episode.title}</Link> [{episode.year}]</p>
          </div>
        )
      })}
    </div>
  );
};

export default EpisodePage;

export const query = graphql`
    query Episodes {
        allEpisode {
            edges {
                node {
                    id
                    title
                    type
                    year
                    poster
                    imdbID
                }
            }
        }
    }
`;