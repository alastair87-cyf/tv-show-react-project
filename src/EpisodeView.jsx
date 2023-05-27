import { useState } from "react";
import EpisodeList from "./EpisodeList";
import EpisodeSelector from "./EpisodeSelector";
import SearchBar from "./SearchBar";
import ShowSelector from "./ShowSelector";

function EpisodeView({ episodes, ...showProps }) {
  const [searchTerm, setSearchTerm] = useState("");

  const totalEpisodeCount = episodes.length;

  const filteredEpisodes = episodes.filter(({ name, summary }) => {
    if (searchTerm.trim().length === 0) {
      return true;
    }

    return [name, summary].some((corpus) =>
      corpus.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <ShowSelector {...showProps} />
      <EpisodeSelector episodes={filteredEpisodes} />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalEpisodeCount={totalEpisodeCount}
        currentEpisodeCount={filteredEpisodes.length}
      />
      <EpisodeList episodes={filteredEpisodes} />
    </>
  );
}

export default EpisodeView;
