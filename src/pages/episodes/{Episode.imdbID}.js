import React from "react"
import { graphql, Link } from "gatsby"

export default function Episode({data: {allEpisode}}) {
  const episode = allEpisode.nodes[0];
  

  return (
      <div>
        <Link to="/episodes">back</Link>
        <h1>{episode.title}</h1>
        <img src={episode.poster} />
      </div>
  )
}

export const query = graphql`
  query($imdbID: String!) {
        allEpisode(filter: { imdbID: { eq: $imdbID } }) {
            nodes {
                imdbID
                poster
                title
                type
            }
        }
  }
`