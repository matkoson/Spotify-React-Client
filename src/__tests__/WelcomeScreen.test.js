import React from "react";
import { render, wait, waitForElement } from "react-testing-library";
import { StateMock } from "@react-mock/state";
import Search from "../Components/Search/Search";
import { fireEvent } from "react-testing-library/dist";
import { feedSearch } from "../feeds";
import { Provider, Consumer } from "../Context/Context";
import WelcomeScreen from "../Components/WelcomeScreen/WelcomeScreen";

const renderFakeWelcomeScreen = () => render(<WelcomeScreen />);
test("Renders all the text correctly", () => {
  const { getByText } = renderFakeWelcomeScreen();
  getByText("Spotify React Client");
  getByText("Search");
  getByText("Recommended");
});
