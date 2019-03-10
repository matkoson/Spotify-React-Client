import React from "react";
import RightTab from "../Components/RightTab/RightTab";
import { render, waitForElement, fireEvent } from "react-testing-library";
import { handleNavClick } from "../AppMethods/AppMethods";
import { StateMock } from "@react-mock/state";

const renderRightTab = () =>
  render(<RightTab handleNavClick={handleNavClick} mobile={false} />);
test("Renders properly", () => {
  const { getByText, getByTestId } = renderRightTab();
  const featuredLi = getByText("CHARTS");
  fireEvent.click(featuredLi);
  getByText("FEATURED");
  getByText("CHARTS");
  getByText("GENRES & MOODS");
  getByText("NEW RELEASES");
  getByText("DISCOVER");
  getByTestId("clickedNavBtn");
  //recognizes that one of the btns's been clicked
});
