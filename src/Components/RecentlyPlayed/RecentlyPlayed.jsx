import React, { Component } from "react";
import "../../Styles/Base/app.scss";
import "../../Styles/Components/recently-played.scss";

class RecentlyPlayed extends Component {
  render() {
    let set;
    if (this.props.rawRecPlayed) {
      set = this.props.rawRecPlayed.items.slice(0, 7);
      // console.log("set", set, this.props.player);
      set = set.map(e => {
        return (
          <div
            onMouseOver={e => {
              e.currentTarget.className = e.currentTarget.className =
                "recently-played__element recently-played__element--modified";
              e.currentTarget.dataset.testid = "navBtnOver";
            }}
            onMouseLeave={e => {
              if (
                e.currentTarget.children[0].dataset.testid === "clickedNavBtn"
              ) {
                e.currentTarget.dataset.testid = "navBtnClickedLeft";

                e.currentTarget.className =
                  "recently-played__element left-tab__app-nav__icon-text--clicked";
              } else {
                e.currentTarget.className = "recently-played__element";
                e.currentTarget.dataset.testid = "navBtnLeft";
              }
            }}
            key={e.played_at}
            className="recently-played__element"
            onClick={() => {
              if (this.props.player) {
                this.props.APIrequest("playRecentTracks", {
                  cx: e.track.uri
                });
              }
            }}
          >
            <span className="recently-played__element__title">
              {e.track.name.length > 26
                ? e.track.name.substring(0, 27) + "..."
                : e.track.name}{" "}
            </span>
            <span className="recently-played__element__type">
              {e.track.artists[0].name}
            </span>
          </div>
        );
      });
    }
    return (
      <div data-testid="navRecentlyPlayed" className="recently-played">
        <h2 className="recently-played__h2">RECENTLY PLAYED</h2>
        <div
          onClick={e => this.props.handleNavClick(e, "recent")}
          className="recently-played__track-set"
        >
          {set ? set : "Loading"}
        </div>
      </div>
    );
  }
}

export default RecentlyPlayed;
