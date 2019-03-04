import React from "react";
import RightTab from "../Components/RightTab/RightTab";
import { render, waitForElement, fireEvent } from "react-testing-library";

const fakeHandleNavClick = jest.fn();
const renderRightTab = () =>
  render(<RightTab handleNavClick={fakeHandleNavClick} mobile={false} />);
it("Renders properly", () => {
  const { getByText } = renderRightTab();
  const featuredLi = getByText("FEATURED");
  fireEvent.click(featuredLi);
  expect(
    expect(fakeHandleNavClick).toHaveBeenCalledWith(expect.anything(), "right")
  ).toMatchSnapshot();
  getByText("CHARTS");
  getByText("GENRES & MOODS");
  getByText("NEW RELEASES");
  getByText("DISCOVER");
});
