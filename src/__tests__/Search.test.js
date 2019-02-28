import React from "react";
import { render, waitForElement } from "react-testing-library";
import { StateMock } from "@react-mock/state";
import Search from "../Components/Search/Search";
import { fireEvent } from "react-testing-library/dist";
import ExampleAlbum from "../Components/Search/ExampleAlbum";

const renderComponent = ({ searchInput, chosenTab }) =>
  render(
    <StateMock state={{ searchInput, chosenTab }}>
      <Search searchQuery={[]} />
    </StateMock>
  );
it("Input and its placeholder are visible.", async () => {
  const { getByPlaceholderText, getByText } = render(
    <Search state={{ searchInput: "lolz" }} />
  );
  await waitForElement(() => getByPlaceholderText("Insert your query..."));
});
it("Renders essential elements when on 'top result' tab(default)", async () => {
  const { getByText } = renderComponent({
    searchInput: "lolz",
    chosenTab: "top result"
  });
  await waitForElement(() =>
    getByText("Top Result", "Matching Artists", "Matching Playlists")
  );
});

it("Renders essential elements when on 'albums'", async () => {
  const { getByText } = renderComponent({
    searchInput: "lolz",
    chosenTab: "albums"
  });
  await waitForElement(() => getByText("Matching Albums"));
});
it("Renders essential elements when on 'tracks'", async () => {
  const { getByText } = renderComponent({
    searchInput: "whatever",
    chosenTab: "tracks"
  });
  await waitForElement(() => getByText("Matching Tracks"));
});
it("Renders essential elements when on 'playlists'", async () => {
  const { getByText } = renderComponent({
    searchInput: "lolz",
    chosenTab: "playlists"
  });
  await waitForElement(() => getByText("Matching Playlists"));
});

it("Clicking on a nav btn changes the state value accordingly.", async () => {
  const { getByText } = renderComponent({
    searchInput: "lolz",
    chosenTab: "top result"
  });
  fireEvent.click(getByText("tracks"));
  await waitForElement(() => getByText("Matching Tracks"));
});

it("Clicking on a nav btn changes the state value accordingly.", () => {
  const { getByPlaceholderText } = render(
    <StateMock state={{ searchInput: "lolz", chosenTab: "top result" }}>
      <Search
        searchQuery={{
          albums: { items: [] },
          artists: { items: [] },
          tracks: { items: [] },
          playlists: { items: [] }
        }}
      />
    </StateMock>
  );
  const inputElem = getByPlaceholderText("Insert your query...");
  console.log();
  fireEvent.change(inputElem, { target: { value: "lollol" } });
  expect(inputElem.value).toBe("lollol");
});

it("Renders without issues, when some valid query response provided.", async () => {
  const feedSearch = {
    artists: {
      href:
        "https://api.spotify.com/v1/search?query=tania+bowra&offset=0&limit=20&type=artist",
      items: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/08td7MxkoHQkXnWAYD8d6Q"
          },
          genres: [],
          href: "https://api.spotify.com/v1/artists/08td7MxkoHQkXnWAYD8d6Q",
          id: "08td7MxkoHQkXnWAYD8d6Q",
          images: [
            {
              height: 640,
              url:
                "https://i.scdn.co/image/f2798ddab0c7b76dc2d270b65c4f67ddef7f6718",
              width: 640
            },
            {
              height: 300,
              url:
                "https://i.scdn.co/image/b414091165ea0f4172089c2fc67bb35aa37cfc55",
              width: 300
            },
            {
              height: 64,
              url:
                "https://i.scdn.co/image/8522fc78be4bf4e83fea8e67bb742e7d3dfe21b4",
              width: 64
            }
          ],
          name: "Tania Bowra",
          popularity: 0,
          type: "artist",
          uri: "spotify:artist:08td7MxkoHQkXnWAYD8d6Q"
        }
      ],
      limit: 20,
      next: null,
      offset: 0,
      previous: null,
      total: 1
    }
  };
  const { getByText } = render(
    <StateMock state={{ searchInput: "lolz", chosenTab: "top result" }}>
      <Search searchQuery={feedSearch} />
    </StateMock>
  );
  await waitForElement(() =>
    getByText(
      feedSearch.artists.items[0].name,
      "Top Result",
      "Matching Artists",
      "Matching Playlists"
    )
  );
});
