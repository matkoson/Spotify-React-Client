import React, { Component } from "react";

class RecentlyPlayed extends Component {
  render() {
    let set;

    if (this.props.rawRecPlayed) {
      set = this.props.rawRecPlayed.items.slice(0, 7);
      set = set.map(e => {
        return (
          <div
            onMouseOver={e =>
              (e.currentTarget.className =
                e.currentTarget.className +
                " recently-played__element--modified")
            }
            onMouseLeave={e =>
              (e.currentTarget.className = "recently-played__element")
            }
            key={e.played_at}
            className="recently-played__element"
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
      <div className="recently-played">
        <h2 className="recently-played__h2">RECENTLY PLAYED</h2>
        {set ? set : "Loading"}
      </div>
    );
  }
}

export default RecentlyPlayed;
