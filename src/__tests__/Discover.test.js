import React from "react";
import Discover from "../Components/Discover/Discover";
import { render, wait, waitForElement } from "react-testing-library";
import { Provider, Consumer } from "../Context/Context";
import { feedTopRelatedArtists, feedGetMultipleArtistAlbums } from "../feeds";

const fakeAPIrequest = jest.fn();
const fakeSetCompGradient = jest.fn();

const renderFakeDiscover = albumListPresent =>
  render(
    <Provider
      value={{
        APIrequest: fakeAPIrequest,
        setCompGradient: fakeSetCompGradient
      }}
    >
      <Consumer>
        {context => (
          <Discover
            getMultipleArtistAlbums={
              albumListPresent ? feedGetMultipleArtistAlbums : []
            }
            idList={feedTopRelatedArtists}
          />
        )}
      </Consumer>
    </Provider>
  );

test("Makes right requests when not fed with getMultipleArtistAlbums", () => {
  renderFakeDiscover(false);
  expect(fakeAPIrequest).toHaveBeenCalledWith("getMultipleArtists", {
    ids: feedTopRelatedArtists
  });
});
test("Renders correctly when fed with getMultipleArtistAlbums", async () => {
  const { getByText } = renderFakeDiscover(true);
  expect(fakeSetCompGradient).toHaveBeenCalledWith(
    "linear-gradient(105deg, #000000 30%, #602227 40%,#CE3639 100%)"
  );
  getByText("Recommended Albums & Singles");
  await wait(() => {
    getByText(feedGetMultipleArtistAlbums[0].items[0].name);
  });
});
