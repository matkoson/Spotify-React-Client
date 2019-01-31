import React, { PureComponent } from "react";

const getMinsSecs = ms => {
  ms = (ms - (ms % 1000)) / 1000;
  return {
    min: String(
      Math.floor(ms / 60) < 10 ? `0${Math.floor(ms / 60)}` : Math.floor(ms / 60)
    ),
    sec: String(ms % 60 < 10 ? `0${ms % 60}` : ms % 60)
  };
};
const getPerc = (progT, totT) => 100 - (progT / totT) * 100;
let albumImg,
  songTitle,
  artistName,
  totT,
  progT,
  progPerc,
  rawTot,
  rawProg,
  progDis,
  totDist;

class PlayerBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { playing: "" };
    this.handleAPIpayload = this.handleAPIpayload.bind(this);
    this.handleProgressSkip = this.handleProgressSkip.bind(this);
    this.handlePausePlay = this.handlePausePlay.bind(this);
  }
  handlePausePlay(e) {
    console.log(e.target);
    if (this.state.playing) {
      this.props.APIrequest("pausePlayback");
    } else {
      this.props.APIrequest("playPlayback");
    }
  }
  handleAPIpayload(payload) {
    // console.log("payload", payload);
    if (payload) {
      if (!this.state.playing && payload.is_playing) {
        this.setState({ playing: true });
      } else if (this.state.playing && !payload.is_playing) {
        this.setState({ playing: false });
      }
      rawProg = payload.progress_ms;
      payload = payload.item;
      //
      albumImg = payload.album.images[0].url;
      songTitle = payload.name;
      artistName = payload.artists[0].name;
      rawTot = payload.duration_ms;
      progDis = getMinsSecs(rawProg);
      totDist = getMinsSecs(rawTot);
      progPerc = getPerc(rawProg, rawTot);
    }
  }
  //
  handleProgressSkip(e) {
    console.log(e.target, "wrong");
    const targetMeasure = e.target.getBoundingClientRect();
    const beginning = targetMeasure.left;
    const end = targetMeasure.left + targetMeasure.width;
    const eventMeasure = e.clientX;
    const desiredProg = ((eventMeasure - beginning) / (end - beginning)) * 100;
    const desiredMs = Math.round((desiredProg * rawTot) / 100);
    this.props.APIrequest("setPosition", { ms: desiredMs });
  }
  //
  componentDidUpdate() {
    const currPlay = this.props.currentlyPlaying;
    if (currPlay) {
      this.handleAPIpayload(currPlay);
      if (currPlay.is_playing) {
        if (!this.interval) {
          this.interval = setInterval(() => {
            // console.log("api call");
            this.props.APIrequest("currentlyPlaying");
          }, 800);
        }
      }
    }
  }

  render() {
    progT = progDis || { min: "00", sec: "00" };
    totT = totDist || { min: "00", sec: "00" };
    progPerc = progPerc || 100;
    // console.log(progPerc, "progPerc");
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
            <i
              onClick={() => this.props.APIrequest("previousTrack")}
              className="fas fa-step-backward"
            />
            <div
              onClick={this.handlePausePlay}
              className="player-bar__play-pause"
            >
              {this.state.playing ? (
                <i className="fas fa-pause player__play-pause" />
              ) : (
                <i className="fas fa-play player__play-pause" />
              )}
            </div>
            {/* */}
            <i
              onClick={() => this.props.APIrequest("nextTrack")}
              className="fas fa-step-forward"
            />
            <i className="fas fa-redo" />
          </div>
          <div className="player-bar__player-progress">
            <div className="player-bar__player-progress__time">
              {progT && `${progT.min}:${progT.sec}`}
            </div>
            <div
              className="player-bar__player-progress__wrapper"
              onClick={this.handleProgressSkip}
            >
              <div className="player-bar__player-progress__bar player-bar__progress-bar player-bar__progress-bar--static">
                <div
                  style={{
                    left: `-${progPerc}%`,
                    transitionDuration: "0.3s",
                    transitionTimingFunction: "cubic-bezier(1,0,.7,1)"
                  }}
                  className="player-bar__progress-bar player-bar__progress-bar--dynamic"
                />
              </div>
            </div>
            <div className="player-bar__player-progress__time">
              {totT && `${totT.min}:${totT.sec}`}
            </div>
          </div>
        </div>
        {/*  */}

        <div className="player-bar__tab player-bar__right-tab player-bar__perip-tab">
          <div className="player-bar__right-tab__controls">
            <i className="fas fa-list-ol" />
            <i className="fas fa-tablet-alt" />
            <i className="fas fa-volume-up" />
          </div>
          <div className="player-bar__right-tab_volume-bar player-bar__progress-bar player-bar__progress-bar--static">
            <div
              style={{ left: "-50%" }}
              className="player-bar__progress-bar player-bar__progress-bar--dynamic "
            />
          </div>
          {/* <i className="fas fa-volume-mute"></i> */}
        </div>
      </div>
    );
  }
}

export default PlayerBar;
