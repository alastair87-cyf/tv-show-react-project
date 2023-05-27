import { getAllShows } from "./shows";

function ShowSelector({ currentShowId, setShowId }) {
  const shows = getAllShows()
    .map(({ id, name }) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="show-selector">
      <select
        value={currentShowId}
        onChange={(e) => {
          const selectedShowId = e.target.selectedOptions[0].value;
          if (!selectedShowId) return;
          setShowId(selectedShowId);
        }}
      >
        {shows.map(({ id, name: showName }) => (
          <option value={id} key={id}>
            {showName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ShowSelector;
