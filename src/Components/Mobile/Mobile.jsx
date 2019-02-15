import React from "react";

export default function Mobile(props) {
  const mobileNav = ["Search", "Home", "Library"].map(e => (
    <div className="mobile__nav__li">{e}</div>
  ));
  return (
    <div class="mobile">
      {props.mobile && (
        <div className="mobile__nav">
          <div class="mobile__nav__ul">{mobileNav}</div>
        </div>
      )}
      <div
        style={
          props.mobile
            ? { background: "rgba(0,0,0,0)" }
            : {
                background:
                  "linear-gradient( 225deg, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.6) 35%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.1) 45%, rgba(0, 0, 0, 0) 56% )"
              }
        }
        className="mobile__logo"
      >
        <i
          onClick={props.handleMobileNavToggle}
          class="fab fa-react mobile__logo__pic"
        />
      </div>
    </div>
  );
}
