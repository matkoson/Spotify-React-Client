import React from "react";
import { render, wait, waitForElement } from "react-testing-library";
import { StateMock } from "@react-mock/state";
import Search from "../Components/Search/Search";
import { fireEvent } from "react-testing-library/dist";
import { feedSearch } from "../feeds";
import { Provider, Consumer } from "../Context/Context";

const APIfake = jest.fn();
const renderSearch = ({ searchInput, chosenTab = "top result" }) =>
  render(
    <Provider value={{ APIrequest: APIfake }}>
      <Consumer>
        {context => (
          <StateMock state={{ searchInput, chosenTab }}>
            <Search searchQuery={feedSearch} />
          </StateMock>
        )}
      </Consumer>
    </Provider>
  );
test("Input and its placeholder are visible.", async () => {
  const { getByPlaceholderText } = renderSearch(
    <Search state={{ searchInput: "lolz" }} />
  );
  getByPlaceholderText("Insert your query...");
});
test("Renders essential elements when on 'top result' tab(default)", async () => {
  const { getByText } = renderSearch({
    searchInput: "lolz",
    chosenTab: "top result"
  });
  await waitForElement(() =>
    getByText("Top Result", "Matching Artists", "Matching Playlists")
  );
});

test("Renders essential elements when on 'albums'", async () => {
  const { getByText } = renderSearch({
    searchInput: "lolz",
    chosenTab: "albums"
  });
  await waitForElement(() => getByText("Matching Albums"));
});
test("Renders essential elements when on 'albums'", async () => {
  const { getByText } = renderSearch({
    searchInput: "lolz",
    chosenTab: "artists"
  });
  await waitForElement(() => getByText("Matching Artists"));
});
test("Renders essential elements when on 'tracks'", async () => {
  const { getByText } = renderSearch({
    searchInput: "whatever",
    chosenTab: "tracks"
  });
  await waitForElement(() => getByText("Matching Tracks"));
});
test("Renders essential elements when on 'playlists'", async () => {
  const { getByText } = renderSearch({
    searchInput: "lolz",
    chosenTab: "playlists"
  });
  await waitForElement(() => getByText("Matching Playlists"));
});

test("Clicking on a nav btn changes the state value accordingly.", () => {
  const { getByText } = renderSearch({
    searchInput: "lolz",
    chosenTab: "top result"
  });
  fireEvent.click(getByText("tracks"));
  getByText("Matching Tracks");
});

test("Clicking on a nav btn changes the state value accordingly.", async () => {
  const { getByPlaceholderText } = renderSearch({
    searchInput: "lolz",
    chosenTab: "top result"
  });
  const inputElem = getByPlaceholderText("Insert your query...");
  fireEvent.change(inputElem, { target: { value: "lollol" } });
  expect(inputElem.value).toBe("lollol");
  await wait(() =>
    expect(APIfake).toHaveBeenCalledWith("searchQuery", { query: "lollol" })
  );
});

test("Renders without issues, when some valid query response provided.", async () => {
  const { getByText } = renderSearch({
    searchInput: "lolz",
    chosenTab: "top result"
  });
  getByText(
    feedSearch.artists.items[0].name,
    "Top Result",
    "Matching Artists",
    "Matching Playlists"
  );
});
