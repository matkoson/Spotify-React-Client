import React from "react";
import Desktop from "../Components/Desktop/Desktop";
import { render, fireEvent } from "react-testing-library";

const fakeHandleMainRightChange = jest.fn();
const fakeHandleNavClick = jest.fn();
const renderFakeDesktop = () =>
  render(
    <Desktop
      handleNavClick={fakeHandleNavClick}
      handleMainRightChange={fakeHandleMainRightChange}
    />
  );
test("Invokes the correct callback in respone to a nav click", () => {
  const { getByText } = renderFakeDesktop();
  const searchBtn = getByText("Search");
  fireEvent.click(searchBtn);
  expect(fakeHandleMainRightChange).toHaveBeenCalledWith("Search");
  expect(fakeHandleNavClick).toHaveBeenCalledWith(expect.anything(), "left");
  const libraryBtn = getByText("Your Library");
  fireEvent.click(libraryBtn);
  expect(fakeHandleMainRightChange).toHaveBeenCalledWith("Library");
  expect(fakeHandleNavClick).toHaveBeenCalledWith(expect.anything(), "left");
});
test("Calls the correct method in response to clicking on visible logo.", () => {
  const { getByText } = renderFakeDesktop();
  const reactLogo = getByText("React");
  fireEvent.click(reactLogo);
  expect(fakeHandleMainRightChange).toHaveBeenCalledWith("Home");
});
