import React, { Component } from "react";

class HomeScreen extends Component {
  render() {
    let ftrdMssg, albumPics;
    const ftrdProp = this.props.featured;
    const recentProp = this.props.recent;
    if (recentProp) console.log(recentProp.items.slice(0, 6));
    if (ftrdProp) {
      ftrdMssg = ftrdProp.message;
      albumPics = ftrdProp.playlists.items.slice(0, 6).map(e => {
        return (
          <div
            key={e.id}
            className="home-screen__made-for-user__playlist-element"
          >
            <div className="home-screen__made-for-user__playlist-element__img">
              <img
                height="200px"
                width="200px"
                className="home-screen__made-for-user__playlist-element__img-pic"
                src={e.images[0].url}
                alt=""
              />
            </div>
            <div className="home-screen__made-for-user__playlist-element__title">
              {e.name}
            </div>
            <div className="home-screen__made-for-user__playlist-element__artists" />
          </div>
        );
      });
    }
    return (
      <div className="home-screen">
        <h2 className="home-screen__made-for-user__title">
          {ftrdMssg ? ftrdMssg : null}
        </h2>
        <div className="home-screen__made-for-user__playlist-container">
          {albumPics}
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        <h2 className="home-screen__recently-played" />
        <div className="home-screen__made-for-user__playlist-container" />
        <h2 className="home-screen__recommendation" />
        <div className="home-screen__made-for-user__playlist-container" />
      </div>
    );
  }
}

export default HomeScreen;
