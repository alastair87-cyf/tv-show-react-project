import { episodeCode } from "./episodeUtils";

function EpisodeSelector({ episodes }) {
  return (
    <div className="episode-selector">
      <select
        className="episodes"
        onChange={(e) => {
          scrollToSelectedArticle(e.target);
        }}
      >
        {episodes.map((episode) => (
          <option value={episodeCode(episode)} key={episode.id}>
            {episodeCode(episode)} - {episode.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function scrollToSelectedArticle(select) {
  const targetCode = select.selectedOptions[0].value;
  const target = document.getElementById(`episode-${targetCode}`);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth" });
}

export default EpisodeSelector;
