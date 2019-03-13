import SideControls from "../Components/PlayerBar/InnerComps/SideControls";
import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  wait,
  getByText
} from "react-testing-library";
import DeviceTab from "../Components/PlayerBar/InnerComps/DeviceTab";

test("Should display the given device name, in the opened device-tab", async () => {
  const fakeHandleDeviceTabClick = jest.fn();
  const { getByText, debug } = render(
    <SideControls
      isDeviceTabOn={true}
      handleDeviceTabClick={fakeHandleDeviceTabClick}
    >
      <DeviceTab deviceName={"Spotify React Player"} />
    </SideControls>
  );
  await wait(() => {
    getByText("Spotify React Player");
    getByText("Listening On:");
    getByText("Active Device");
  });
});
