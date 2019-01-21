import React, { Component } from "react";

class RecentlyPlayed extends Component {
  render() {
    return (
      <div className="recently-played">
        <h2 className="recently-played__h2">RECENTLY PLAYED</h2>
        <div className="recently-played__element">
          <span className="recently-played__element__title">title</span>
          <span className="recently-played__element__type">TYPE</span>
        </div>
        <div className="recently-played__element">
          <span className="recently-played__element__title">title</span>
          <span className="recently-played__element__type">TYPE</span>
        </div>
        <div className="recently-played__element">
          <span className="recently-played__element__title">title</span>
          <span className="recently-played__element__type">TYPE</span>
        </div>
        <div className="recently-played__element">
          <span className="recently-played__element__title">title</span>
          <span className="recently-played__element__type">TYPE</span>
        </div>
        <div className="recently-played__element">
          <span className="recently-played__element__title">title</span>
          <span className="recently-played__element__type">TYPE</span>
        </div>
      </div>
    );
  }
}

export default RecentlyPlayed;
