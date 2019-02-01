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
  totDist,volPerc, repeat;

class PlayerBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { playing: "" };
    this.audio = React.createRef();
    //
    this.handleAPIpayload = this.handleAPIpayload.bind(this);
    this.handlePausePlay = this.handlePausePlay.bind(this);
    // this.handleProgressSkip = this.handleProgressSkip.bind(this);
    // this.handleVolumeSet = this.handleVolumeSet.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleRepeatModeChange = this.handleRepeatModeChange.bind(this);

  }
  componentDidUpdate() {
    // console.log(String(this.props.audio), this.audio.current);
    // this.audio.current.play();
    const currPlay = this.props.currentlyPlaying;
    const playback = this.props.currentPlayback;
    // console.log(playback);
    if (currPlay) {
      this.handleAPIpayload(currPlay, playback);
      if (currPlay.is_playing) {
        if (!this.interval) {
          this.interval = setInterval(() => {
            // console.log("api call");
            this.props.APIrequest("currentlyPlaying");
            this.props.APIrequest('currentPlayback');
          }, 800);
        }
      }
    }
  }
  handlePausePlay(e) {
    console.log(e.target);
    if (this.state.playing) {
      this.props.APIrequest("pausePlayback");
    } else {
      this.props.APIrequest("playPlayback");
    }
  }
  handleAPIpayload(playingPayload, playbackPayload) {
    if(playbackPayload && !playbackPayload.device)
    console.log("playbackPayload", playbackPayload);
    if (playingPayload) {
      if (!this.state.playing && playingPayload.is_playing) {
        this.setState({ playing: true });
      } else if (this.state.playing && !playingPayload.is_playing) {
        this.setState({ playing: false });
      }
      rawProg = playingPayload.progress_ms;
      playingPayload = playingPayload.item;
      //
      albumImg = playingPayload.album.images[0].url;
      songTitle = playingPayload.name;
      artistName = playingPayload.artists[0].name;
      rawTot = playingPayload.duration_ms;
      progDis = getMinsSecs(rawProg);
      totDist = getMinsSecs(rawTot);
      progPerc = getPerc(rawProg, rawTot);
      if(playbackPayload&&playbackPayload.device){
      volPerc = playbackPayload.device.volume_percent;
      repeat = playbackPayload.repeat_state;
      }
      // console.log(volPerc,'volPerc')
    }
  }
  //
  handleRangeChange(e) {
    // console.log(e.currentTarget.id);
    const targetId = e.currentTarget.id;
    const targetMeasure = e.target.getBoundingClientRect();
    const beginning = targetMeasure.left;
    const end = targetMeasure.left + targetMeasure.width;
    const eventMeasure = e.clientX;
    let desiredProg;
    if(targetId === 'progress-bar'){
      desiredProg = ((eventMeasure - beginning) / (end - beginning)) * 100;
      const desiredMs = Math.round((desiredProg * rawTot) / 100);
      return this.props.APIrequest("setPosition", { ms: desiredMs });
    }else if(targetId === 'volume-bar'){
      desiredProg = Math.round(((eventMeasure - beginning) / (end - beginning)) * 100);
      return this.props.APIrequest("setVolume", { vol: desiredProg });
    }
  }
  handleRepeatModeChange(e){
    const repeatMode = ['off','context','track'];
    const currentI = repeatMode.indexOf(repeat);
    const current = repeatMode[(currentI+1)%repeatMode.length]
    console.log(current,repeat);

    return this.props.APIrequest('setRepeat', {mode:current})
  }
  // handleProgressSkip(e) {
  //   console.log(e.currentTarget.id);
  //   const targetMeasure = e.target.getBoundingClientRect();
  //   const beginning = targetMeasure.left;
  //   const end = targetMeasure.left + targetMeasure.width;
  //   const eventMeasure = e.clientX;
  //   const desiredProg = ((eventMeasure - beginning) / (end - beginning)) * 100;
  //   const desiredMs = Math.round((desiredProg * rawTot) / 100);
  //   this.props.APIrequest("setPosition", { ms: desiredMs });
  // }
  // handleVolumeSet(e){
  //   console.log(e.currentTarget.id);
  //   const targetMeasure = e.target.getBoundingClientRect();
  //   const beginning = targetMeasure.left;
  //   const end = targetMeasure.left + targetMeasure.width;
  //   const eventMeasure = e.clientX;
  //   const desiredProg = Math.round(((eventMeasure - beginning) / (end - beginning)) * 100);
  //   console.log(desiredProg)
  //   this.props.APIrequest("setVolume", { vol: desiredProg });

  // }
  //


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
            <i onClick={this.handleRepeatModeChange}className={
              repeat === 'off'?
            "fas fa-redo": "fas fa-redo player-bar__redo-icon--repeat-cx"
            } >{repeat==="track"?<span>1</span>:null}</i>
          </div>
          <div className="player-bar__player-progress">
            <div className="player-bar__player-progress__time">
              {progT && `${progT.min}:${progT.sec}`}
            </div>
            <div
            id="progress-bar"
              className="player-bar__player-progress__wrapper"
              onClick={this.handleRangeChange}
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
          <div id="volume-bar" className="player-bar__volume-wrapper" onClick={this.handleRangeChange}><div className="player-bar__right-tab_volume-bar player-bar__progress-bar player-bar__progress-bar--static">
          <div
          style={{ left: `-${100-volPerc}%` }}
          className="player-bar__progress-bar player-bar__progress-bar--dynamic "
          />
          </div></div>
          {/* <i className="fas fa-volume-mute"></i> */}
        </div>
        <audio ref={this.audio} src={this.props.audio} />
      </div>
    );
  }
}

export default PlayerBar;
