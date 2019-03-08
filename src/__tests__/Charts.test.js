import React from "react";
import Charts from "../Components/Charts/Charts";
import { render, fireEvent, wait, waitForElement } from "react-testing-library";
import { feedGetCategoryPlaylist, feedPolandTop } from "../feeds";
import countryCodes from "../assets/countries";
import { Provider, Consumer } from "../Context/Context";

const renderFakeCharts = () =>
  render(
    <Provider value={{ currentlyPlaying: jest.fn(), APIrequest: jest.fn() }}>
      <Consumer>
        {context => (
          <Charts
            getCategoryPlaylists={feedGetCategoryPlaylist}
            PolandTop={feedPolandTop}
            countryCodes={countryCodes()}
          />
        )}
      </Consumer>
    </Provider>
  );

it("Renders correctly", async () => {
  const { getByText, debug } = renderFakeCharts();
  await wait(() => {
    debug();
    getByText("Featured Charts");
    getByText("Viral 50 by Country");
    getByText("Top 50 by Country");
    getByText(feedPolandTop.playlists.items[0].name);
    getByText(feedGetCategoryPlaylist[0].playlists.items[0].name);
  });
});
