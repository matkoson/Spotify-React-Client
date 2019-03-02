import React from "react";
import {
  render,
  waitForElement,
  getByText,
  fireEvent
} from "react-testing-library";
import Album from "../Components/Album/Album";
import { feedGetPlaylist, feedGetPlaylistTracks, feedGetAlbum } from "../feeds";
import { Provider, Consumer } from "../Context/Context";

it("Correctly renders a component", async () => {
  const { getByText } = render(<Album />);
  await waitForElement(() => getByText("Play All", "Tracklist"));
});
const setupPlaylist = isPlaying => {
  return render(
    <Provider
      value={{
        getMinsSecs: jest.fn(),
        playerState: {
          track_window: {
            current_track: {
              id: isPlaying ? feedGetPlaylistTracks.items[0].track.id : null
            }
          }
        }
      }}
    >
      <Consumer>
        {context => (
          <Album
            getPlaylistTracks={feedGetPlaylistTracks}
            getPlaylistCover={[{ url: "" }]}
            getPlaylist={feedGetPlaylist}
          />
        )}
      </Consumer>
    </Provider>
  );
};
it("Renders an equalier next to the track that is currently being played.", () => {
  const { getByTestId, debug } = setupPlaylist(true);
  getByTestId("equalizer");
  debug();
});
it("Correctly renders a given playlist dataset", () => {
  const { getByText } = setupPlaylist();
  getByText(feedGetPlaylistTracks.items[0].track.name);
  getByText("00:00");
  getByText(feedGetPlaylist.name);
});
const APIfake = jest.fn();

const setupAlbum = () =>
  render(
    <Provider value={{ getMinsSecs: jest.fn(), APIrequest: APIfake }}>
      <Consumer>
        {context => <Album albumViewOption={true} getAlbum={feedGetAlbum} />}
      </Consumer>
    </Provider>
  );
it("Correctly renders a given album dataset", () => {
  const { getByText } = setupAlbum();
  getByText(feedGetAlbum.tracks.items[0].name);
  getByText(feedGetAlbum.name);
  getByText(feedGetAlbum.artists[0].name);
});
it("When clicking on a track, when album dataset is rendered, a request for the accurate playback type is made.", () => {
  const { getByText } = setupAlbum();
  const track = getByText(feedGetAlbum.tracks.items[0].name);
  const trackObj = feedGetAlbum.tracks.items[0];
  fireEvent.click(track);
  expect(APIfake).toHaveBeenCalledWith("playSpecificPlayback", {
    cx: feedGetAlbum.uri,
    cx_pos: Number(trackObj.track_number - 1) || 0
  });
  const playAllBtn = getByText("Play All");
  fireEvent.click(playAllBtn);
  expect(APIfake).toHaveBeenCalledWith("playSpecificPlayback", {
    cx: feedGetAlbum.uri
  });
});
