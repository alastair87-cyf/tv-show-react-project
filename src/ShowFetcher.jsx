import { useEffect, useState } from "react";
import EpisodeView from "./EpisodeView";

function ShowFetcher() {
  const [episodes, setEpisodes] = useState([]);
  const gameOfThronesShowId = 82;
  const [currentShowId, setShowId] = useState(gameOfThronesShowId);

  useEffect(() => {
    const fetchShow = async () => {
      setEpisodes(
        await fetch(
          `https://api.tvmaze.com/shows/${currentShowId}/episodes`
        ).then((response) => response.json())
      );
    };
    fetchShow();
  }, [currentShowId]);

  return (
    <EpisodeView
      episodes={episodes}
      currentShowId={currentShowId}
      setShowId={setShowId}
    />
  );
}

export default ShowFetcher;
