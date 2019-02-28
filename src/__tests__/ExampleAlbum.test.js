import { render } from "react-testing-library";
import React from "react";
import { fireEvent } from "react-testing-library/dist";
import ExampleAlbum from "../Components/Search/ExampleAlbum";

const feedExmplAlbum = {
  items: [
    {
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/0TnOYISbd1XYRBk9myaseg"
          },
          href: "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg",
          id: "0TnOYISbd1XYRBk9myaseg",
          name: "Pitbull",
          type: "artist",
          uri: "spotify:artist:0TnOYISbd1XYRBk9myaseg"
        },
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/23zg3TcAtWQy7J6upgbUnj"
          },
          href: "https://api.spotify.com/v1/artists/23zg3TcAtWQy7J6upgbUnj",
          id: "23zg3TcAtWQy7J6upgbUnj",
          name: "Usher",
          type: "artist",
          uri: "spotify:artist:23zg3TcAtWQy7J6upgbUnj"
        },
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/4D75GcNG95ebPtNvoNVXhz"
          },
          href: "https://api.spotify.com/v1/artists/4D75GcNG95ebPtNvoNVXhz",
          id: "4D75GcNG95ebPtNvoNVXhz",
          name: "Afrojack",
          type: "artist",
          uri: "spotify:artist:4D75GcNG95ebPtNvoNVXhz"
        }
      ],
      disc_number: 1,
      duration_ms: 243160,
      explicit: true,
      external_urls: {
        spotify: "https://open.spotify.com/track/6Q4PYJtrq8CBx7YCY5IyRN"
      },
      href: "https://api.spotify.com/v1/tracks/6Q4PYJtrq8CBx7YCY5IyRN",
      id: "6Q4PYJtrq8CBx7YCY5IyRN",
      is_local: false,
      is_playable: true,
      name: "Party Ain't Over, so let's keep dancing till the morning comes",
      preview_url:
        "https://p.scdn.co/mp3-preview/d3e3191991feb0cb732398374e8c59cdb2cc9fe7?cid=774b29d4f13844c495f206cafdad9c86",
      track_number: 6,
      type: "track",
      uri: "spotify:track:6Q4PYJtrq8CBx7YCY5IyRN",
      images: [{ url: "" }]
    }
  ]
};
const feedTracks = {
  items: [
    {
      duration_ms: 150000,
      artists: [{ name: "Romek jedzie na wakacje na Podkarpacie" }]
    }
  ]
};

const handelAlbumFake = jest.fn();
const APIfake = jest.fn();
const setup = (paused = false) => {
  const utils = render(
    <ExampleAlbum
      tracks={feedTracks}
      getMinsSecs={jest.fn()}
      albums={feedExmplAlbum}
      APIrequest={APIfake}
      handleAlbumRightOverride={handelAlbumFake}
      player={jest.fn()}
      playerState={{ paused: paused }}
      currentlyPlaying={{ item: { uri: feedExmplAlbum.items[0].uri } }}
    />
  );
  const imgEle = utils.getByAltText("Example album");
  return { imgEle, ...utils };
};
it("Click on the example image leads to the correct API request being called for.", () => {
  const { imgEle } = setup();
  fireEvent.click(imgEle);
  expect(APIfake).toHaveBeenCalledWith("currentlyPlaying");
  expect(APIfake).toHaveBeenCalledWith(
    "playSpecificPlayback",
    expect.anything()
  );
});
it("Hovering over example displays the pause or play icon, depending on the conditions.", () => {
  let { imgEle } = setup();
  fireEvent.mouseOver(imgEle);
  let { getByTestId } = setup();
  getByTestId("pause");
  const playCondition = setup(true);
  getByTestId = playCondition.getByTestId;
  fireEvent.mouseOver(imgEle);
  getByTestId("play");
  fireEvent.mouseLeave(imgEle);
  getByTestId("invisible");
  fireEvent.mouseDown(imgEle);
  getByTestId("clicked");
});
it("Click on the example album title results in the correct API request being made.", () => {
  const { getByText } = setup();
  const albumEle = getByText(
    `${feedExmplAlbum.items[0].name.slice(0, 26)}...`,
    { exact: false }
  );
  fireEvent.click(albumEle);
  expect(handelAlbumFake).toHaveBeenCalled();
});
it("Click on a track presented in the 'top results' section calles for a specific playback.", () => {
  const { getByText } = setup();
  const trackEle = getByText(feedTracks.items[0].artists[0].name);
  fireEvent.click(trackEle);
  expect(APIfake).toHaveBeenCalled();
});
// debug();
