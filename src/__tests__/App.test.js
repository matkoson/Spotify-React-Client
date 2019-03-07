import React from "react";
import App from "../App";
import sinon from "sinon";
import { render, fireEvent, waitForElement, wait } from "react-testing-library";
import { Provider, Consumer } from "../Context/Context";
import { StateMock } from "@react-mock/state";

import {
  Router,
  Link,
  createHistory,
  createMemorySource,
  LocationProvider
} from "@reach/router";
// import { render } from "react-testing-library";

it("Renders without crashing", () => {
  sinon.stub(window.location, "assign");
  render(<App />);
});
function renderWithRouter(
  ui,
  { route = "/", history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...render(
      <Provider value={{}}>
        <LocationProvider history={history}>{ui}</LocationProvider>
      </Provider>
    ),
    history
  };
}
it("Renders/navigates correctly", async () => {
  const {
    container,
    history: { navigate },
    getByTestId,
    queryByTestId,
    debug
  } = renderWithRouter(<App />);
  const appContainer = container;
  await navigate(process.env.PUBLIC_URL + "/home");
  getByTestId("navHome");
  getByTestId("navMobile");
  getByTestId("navDesktop");
  getByTestId("navPlayerBar");
  getByTestId("navRightTab");

  await navigate(process.env.PUBLIC_URL + "/home/charts");
  getByTestId("navCharts");

  await navigate(process.env.PUBLIC_URL + "/home/genres-moods");
  getByTestId("navGenres");

  await navigate(process.env.PUBLIC_URL + "/home/new-releases");
  getByTestId("navNewReleases");

  await navigate(process.env.PUBLIC_URL + "/home/discover");
  getByTestId("navDiscover");

  await navigate(process.env.PUBLIC_URL + "/search");
  getByTestId("navSearch");
  expect(queryByTestId("navRightTab")).not.toBeInTheDocument();

  await navigate(process.env.PUBLIC_URL + "/library");
  getByTestId("navLibrary");
  expect(queryByTestId("navRightTab")).not.toBeInTheDocument();

  await navigate(process.env.PUBLIC_URL + "/album");
  getByTestId("navAlbum");
  expect(queryByTestId("navRightTab")).not.toBeInTheDocument();

  await navigate(process.env.PUBLIC_URL + "/category");
  getByTestId("navCatInnerView");
  expect(queryByTestId("navRightTab")).not.toBeInTheDocument();
});
const renderApp = (tabOn, mobileOn) =>
  render(
    <Provider value={{ APIrequest: jest.fn() }}>
      <Consumer>
        {context => (
          <StateMock
            state={{
              auth: "1234",
              deviceTabOn: tabOn,
              mobile: mobileOn,
              valueContext: { APIrequest: jest.fn() },
              handleNavClick: jest.fn(),
              handleDeviceTabClick: jest.fn(),
              handleResize: jest.fn()
            }}
          >
            <App />
          </StateMock>
        )}
      </Consumer>
    </Provider>
  );
it("Correctly renders device tab, and hides it when there's an onClick registered anywhere on the app.", async () => {
  const { getByText, queryByTestId, getByTestId, debug } = renderApp(true);
  getByTestId("deviceTabOnIcon");
  await waitForElement(() => getByTestId("deviceTabOn"));
  const homeBtn = getByText("Home");
  fireEvent.click(homeBtn);
  expect(queryByTestId("deviceTabOn")).not.toBeInTheDocument();
});
it("Doesn't show device tab, when it's not required by the local state", () => {
  const { queryByTestId } = renderApp();
  expect(queryByTestId("deviceTabOn")).not.toBeInTheDocument();
});
it("Toggles  mobile menu properly + ", async () => {
  const { getByTestId, getByText, debug } = renderApp(false, true);
  let reactLogo;
  await waitForElement(() => (reactLogo = getByTestId("reactLogo")));
  // debug();
  getByTestId("VisibleMobileNav");
  fireEvent.click(reactLogo);
  await wait(() => getByTestId("InvisibleMobileNav"));
});
it("Invokes the right callback in response of clicking on tablet icon, which results in appearance of device tab.", async () => {
  const { getByTestId, getByText } = renderApp();
  let deviceTabOnIcon;
  await wait(() => {
    deviceTabOnIcon = getByTestId("deviceTabOnIcon");
    fireEvent.click(deviceTabOnIcon);
    getByText("No active devices");
  });
});
