import parse from "html-react-parser";
import { episodeCode } from "./episodeUtils";

function EpisodeCard({ episode }) {
  const { name, summary, image, url } = episode;
  return (
    <article id={`episode-${episodeCode(episode)}`}>
      <h2>
        {htmlDecode(name)} <span>{episodeCode(episode)}</span>
      </h2>
      <div>{image && <img src={image.medium} alt={name} />}</div>
      <div className="extract">{parse(summary || "")}</div>
      <a href={url}>episode info on TVMaze.com</a>
    </article>
  );
}

function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

export default EpisodeCard;
