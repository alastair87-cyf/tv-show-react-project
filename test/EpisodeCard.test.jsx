import { beforeAll, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import EpisodeCard from "../src/EpisodeCard";

describe("when rendering an episode card with a typical shape", () => {
  beforeAll(async () => {
    render(<EpisodeCard episode={gameOfThronesEpisode()} />);
  });

  it("has the expected header content", async () => {
    expect(
      screen.getByText("The Iron Throne", { selector: "h2" })
    ).toBeVisible();
    expect(screen.getByText("S08E06", { selector: "h2 span" })).toBeVisible();
  });

  it("has the expected image", async () => {
    const image = screen.getByRole("img");
    expect(image.getAttribute("src")).toEqual(
      "http://static.tvmaze.com/uploads/images/medium_landscape/198/495648.jpg"
    );
    expect(image.getAttribute("alt")).toEqual("The Iron Throne");
  });

  it("has the expected summary", async () => {
    expect(
      screen.getByText(
        "In the aftermath of the devastating attack on King's Landing, Daenerys must face the survivors.",
        { selector: "div p" }
      )
    ).toBeVisible();
  });

  it("has the expected link to the episode's page on TVMaze.com", async () => {
    const episodeLink = screen.getByRole("link");
    expect(episodeLink.textContent).toEqual("episode info on TVMaze.com");
    expect(episodeLink.getAttribute("href")).toEqual(
      "http://www.tvmaze.com/episodes/1623968/game-of-thrones-8x06-the-iron-throne"
    );
  });
});

describe("when rendering an episode with a summary provided as null", () => {
  it("has an empty extract element", async () => {
    const { container } = render(
      <EpisodeCard episode={{ ...gameOfThronesEpisode(), summary: null }} />
    );
    const extract = container.getElementsByClassName("extract")[0];
    expect(extract.textContent).toEqual("");
  });
});

describe("when rendering the title of an episode where the name is provided with HTML entities", () => {
  it("decodes the HTML entity", async () => {
    const { container } = render(
      <EpisodeCard
        episode={{ ...gameOfThronesEpisode(), name: "Peace &amp; Quiet" }}
      />
    );
    const title = container.querySelector("h2");
    expect(title.textContent).toEqual("Peace & Quiet S08E06");
  });
});

function gameOfThronesEpisode() {
  return {
    id: 1623968,
    url: "http://www.tvmaze.com/episodes/1623968/game-of-thrones-8x06-the-iron-throne",
    name: "The Iron Throne",
    season: 8,
    number: 6,
    airdate: "2019-05-19",
    airtime: "21:00",
    airstamp: "2019-05-20T01:00:00+00:00",
    runtime: 80,
    image: {
      medium:
        "http://static.tvmaze.com/uploads/images/medium_landscape/198/495648.jpg",
      original:
        "http://static.tvmaze.com/uploads/images/original_untouched/198/495648.jpg",
    },
    summary:
      "<p>In the aftermath of the devastating attack on King's Landing, Daenerys must face the survivors.</p>",
    _links: {
      self: {
        href: "http://api.tvmaze.com/episodes/1623968",
      },
    },
  };
}
