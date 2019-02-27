import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import sinon from "sinon";
// import { render } from "react-testing-library";

it("renders without crashing", () => {
  sinon.stub(window.location, "assign");
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
