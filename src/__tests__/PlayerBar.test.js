import React, { Suspense } from "react";
import PlayerBar from "../Components/PlayerBar/PlayerBar";
import sinon from "sinon";
import {
  render,
  fireEvent,
  waitForElement,
  wait,
  getByText,
  waitForDomChange
} from "react-testing-library";
import { Provider, Consumer } from "../Context/Context";
import { StateMock } from "@react-mock/state";
import { feedRecent } from "../feeds";
import { debug } from "util";
const fakeHandleDeviceTabClick = jest.fn();
const fakeIsDeviceTabOn = jest.fn();
const fakePlaybackSDKinterval = jest.fn();
const fakeVoiGetCurrentState = jest.fn(() => Promise.resolve(null));
const fakeGetCurrentState = jest.fn(() =>
  Promise.resolve({
    track_window: {
      paused: false,
      shuffled: false,
      current_track: {
        artists: [{ name: "artistLolz" }],
        album: {
          images: [{ url: "urllolz" }]
        },
        name: "lolz"
      }
    }
  })
);
const fakePlayerPause = jest.fn(() => Promise.resolve());
const fakePlayerResume = jest.fn(() => Promise.resolve());
const fakeSeek = jest.fn(() => Promise.resolve());
const fakeSetVolume = jest.fn(() => Promise.resolve());
const fakeGetVolume = jest.fn(() => Promise.resolve());

const fakeAPIrequest = jest.fn();
const getMinsSecs = (ms = 0) => {
  ms = (ms - (ms % 1000)) / 1000;
  return {
    min: String(
      Math.floor(ms / 60) < 10 ? `0${Math.floor(ms / 60)}` : Math.floor(ms / 60)
    ),
    sec: String(ms % 60 < 10 ? `0${ms % 60}` : ms % 60)
  };
};
const repeatMode = ["off", "context", "track"];

const renderFakePlayerBar = (playerOn, paused, voidState) =>
  render(
    <Suspense fallback={"Loading"}>
      <Provider
        value={{
          APIrequest: fakeAPIrequest,
          playerState: playerOn
            ? { bitrate: {}, getCurrentState: fakeGetCurrentState }
            : null,
          getMinsSecs: getMinsSecs
        }}
      >
        <Consumer>
          {context => (
            <StateMock
              state={{
                albumImage: "",
                artistName: "",
                repeatMode: repeatMode[0],
                rawTrackTime: "",
                rawTrackProgress: "",
                volumePercentage: "",
                paused: paused
              }}
            >
              <PlayerBar
                recent={feedRecent.items[0]}
                handleDeviceTabClick={fakeHandleDeviceTabClick}
                deviceName={"Spotify React Client"}
                player={{
                  pause: fakePlayerPause,
                  resume: fakePlayerResume,
                  getCurrentState: voidState
                    ? fakeVoiGetCurrentState
                    : fakeGetCurrentState,
                  seek: fakeSeek,
                  setVolume: fakeSetVolume,
                  getVolume: fakeGetVolume
                }}
              />
            </StateMock>
          )}
        </Consumer>
      </Provider>
    </Suspense>
  );
test("Correctly handles repeat mode switching", async () => {
  const { getByText, debug, getByTestId } = renderFakePlayerBar(true, false);
  await wait(() => {
    const repeatIcon = getByTestId("repeatIcon");
    fireEvent.click(repeatIcon);
    expect(fakeAPIrequest)
      // .not.toHaveBeenCalled();
      .toHaveBeenCalledWith("setRepeat", {
        mode: repeatMode[1]
      });
  });
});
test("Allows to adjust volume level by clicking on the volume bar", async () => {
  const { getByText, debug, getByTestId } = renderFakePlayerBar(true, false);
  const volumeBar = getByTestId("volumeBar");
  await wait(() => {
    fireEvent.click(volumeBar);
    expect(fakeSetVolume).toHaveBeenCalled();
  });
});
test("Allows to seek different point of progress in the currently played track", async () => {
  const { getByText, debug, getByTestId } = renderFakePlayerBar(true, false);
  const progressBar = getByTestId("progressBar");
  await wait(() => {
    fireEvent.click(progressBar);
    expect(fakeSeek).toHaveBeenCalled();
  });
});
test("Signals that there's a connection with SDK API, but there's no playback", async () => {
  const { getByText, debug, getByTestId } = renderFakePlayerBar(
    true,
    false,
    true
  );
  await wait(() => expect(fakeVoiGetCurrentState).toHaveBeenCalled());
});
test("Correctly invokes callback for handling pause/play action.", async () => {
  const { getByText, debug, getByTestId } = renderFakePlayerBar(false);
  await wait(async () => {
    getByTestId("play");
    const playbackControlIcon = getByTestId("playPauseControl");
    fireEvent.click(playbackControlIcon);
    expect(fakeAPIrequest).toHaveBeenCalledWith("playRecentTracks", {
      cx: feedRecent.items[0].track.uri
    });
  });
});
test("Correctly calls for resuming playback, when paused", async () => {
  const { getByTestId } = renderFakePlayerBar(true, true);
  await wait(async () => {
    getByTestId("pause");
    const playbackControlIcon = getByTestId("playPauseControl");
    fireEvent.click(playbackControlIcon);
    expect(fakePlayerResume).toHaveBeenCalled();
  });
});
test("Correctly calls for pausing playback, wile playing", async () => {
  const { getByTestId } = renderFakePlayerBar(true, false);
  await wait(async () => {
    getByTestId("pause");
    const playbackControlIcon = getByTestId("playPauseControl");
    fireEvent.click(playbackControlIcon);
    expect(fakePlayerPause).toHaveBeenCalled();
  });
});

test("Renders correctly", () => {
  const { getByText, getByTestId } = renderFakePlayerBar();
  getByText("00:00");
  const deviceTabBtn = getByTestId("deviceTabOnIcon");
  fireEvent.click(deviceTabBtn);
  expect(fakeHandleDeviceTabClick).toHaveBeenCalled();
});
test("Correctly renders details of the currently played song", async () => {
  const { getByText } = renderFakePlayerBar(true);
  await wait(() => {
    getByText("lolz");
    getByText("artistLolz");
  });
});
test("Correctly renders details of the previously played song, when there's no current playback.", async () => {
  const { getByText, debug } = renderFakePlayerBar(false);
  await wait(() => {
    getByText(feedRecent.items[0].track.name);
    getByText(feedRecent.items[0].track.artists[0].name);
  });
});
