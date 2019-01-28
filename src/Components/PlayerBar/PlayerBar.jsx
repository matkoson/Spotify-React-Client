import React, { Component } from "react";
import genAlbumEle from "../HomeScreen/genAlbumEle";
import { getTopArtist } from "../../APImethods";

class PlayerBar extends Component {
  render() {
    const currPlay = this.props.currentlyPlaying;
    let albumImg, songTitle, artistName;
    console.log(currPlay);
    if (currPlay) {
      albumImg = currPlay.album.images[0].url;
      songTitle = currPlay.name;
      artistName = currPlay.artists[0].name;
      console.log(albumImg);
    }

    return (
      <div className="player-bar">
        {/*  */}
        <div className="player-bar__tab player-bar__left-tab player-bar__perip-tab">
          <div className="player-bar__left-tab__inside-perip">
            <div className="player-bar__album-img">
              {albumImg && (
                <img
                  src={`${albumImg}`}
                  alt="album cover"
                  height="56px"
                  width="56px"
                />
              )}
            </div>
          </div>
          <div className="player-bar__tab player-bar__left-tab__center">
            <span className="player-bar__left-tab__center-title-artist__title">
              {songTitle}
            </span>
            <span className="player-bar__left-tab__center-title-artist__artist">
              {artistName}
            </span>
          </div>
          <div className="player-bar__tab player-bar__left-tab__perip">
            <i className="fas fa-plus" />
          </div>
        </div>

        {/*  */}
        <div className="player-bar__tab player-bar__center-tab">
          <div className="player-bar__player-controls">
            <i className="fas fa-random" />
            <i className="fas fa-step-backward" />
            {/* <i className="fas fa-pause player__play-pause" /> */}
            <i className="fas fa-play player__play-pause" />
            <i className="fas fa-step-forward" />
            <i className="fas fa-redo" />
          </div>
          <div className="player-bar__player-progress">
            <div className="player-bar__player-progress__time">00:00</div>
            <div className="player-bar__player-progress__bar player-bar__progress-bar" />
            <div className="player-bar__player-progress__time">00:00</div>
          </div>
        </div>
        {/*  */}

        <div className="player-bar__tab player-bar__right-tab player-bar__perip-tab">
          <div className="player-bar__right-tab__controls">
            <i className="fas fa-list-ol" />
            <i className="fas fa-tablet-alt" />
            <i className="fas fa-volume-up" />
          </div>
          <div className="player-bar__right-tab_volume-bar player-bar__progress-bar" />
          {/* <i className="fas fa-volume-mute"></i> */}
        </div>
      </div>
    );
  }
}

export default PlayerBar;
