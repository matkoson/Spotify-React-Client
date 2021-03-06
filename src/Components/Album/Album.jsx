import React from "react";
import { Context } from "../../Context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Styles/Components/album.scss";

// import ReactDOM from "react-dom";

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.initRef = React.createRef();
  }
  // componentDidMount() {
  //   this.initRef.current.scrollIntoView();
  // }
  render() {
    const context = this.context;
    var trackNumber;
    if (
      this.props.getAlbum ||
      (this.props.getPlaylistTracks &&
        this.props.getPlaylist &&
        this.props.getPlaylistCover)
    ) {
      if (this.props.albumViewOption && this.props.getAlbum) {
        var {
          artists,
          images,
          name,
          tracks,
          uri,
          track_number
        } = this.props.getAlbum;
        tracks = tracks.items;

        var width = "400px",
          height = "400px";
      } else if (
        this.props.getPlaylistTracks &&
        this.props.getPlaylist &&
        this.props.getPlaylistCover
      ) {
        var { name, uri } = this.props.getPlaylist;
        var images = this.props.getPlaylistCover;
        var artists = null;
        var tracks = this.props.getPlaylistTracks.items.map(e => e.track);
        var width = "300px",
          height = "300px";
      }

      if (tracks) {
        tracks = tracks.map((e, i) => {
          //some of the API response packages contain 'null' items
          if (e) {
            const totalDuration = context.getMinsSecs(e.duration_ms) || {
              min: "00",
              sec: "00"
            };

            const isPlaying =
              context.playerState &&
              ((e.track &&
                e.track.name ===
                  context.playerState.track_window.current_track.name) ||
                e.name === context.playerState.track_window.current_track.name);
            return (
              <div
                key={e.uri}
                data-album={uri}
                data-track_number={track_number || i + 1}
                onClick={e => {
                  // console.log(e.currentTarget.dataset);
                  e = e.currentTarget.dataset;
                  context.APIrequest("playSpecificPlayback", {
                    cx: e.album,
                    cx_pos: Number(e.track_number - 1)
                  });
                }}
                className={
                  isPlaying
                    ? "album__tracklist__tracks__track--playing album__tracklist__tracks__track"
                    : "album__tracklist__tracks__track"
                }
              >
                <div className="album__tracklist__tracks__track__title">
                  {e.name}
                  {isPlaying && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="equilizer"
                      viewBox="0 0 128 128"
                      data-testid="equalizer"
                    >
                      <g>
                        <title>Audio Equilizer</title>
                        <rect
                          className="bar"
                          transform="translate(0,0)"
                          y="15"
                        />
                        <rect
                          className="bar"
                          transform="translate(25,0)"
                          y="15"
                        />
                        <rect
                          className="bar"
                          transform="translate(50,0)"
                          y="15"
                        />
                        <rect
                          className="bar"
                          transform="translate(75,0)"
                          y="15"
                        />
                        <rect
                          className="bar"
                          transform="translate(100,0)"
                          y="15"
                        />
                      </g>
                    </svg>
                  )}
                </div>
                <div className="album__tracklist__tracks__track__duration">
                  {" "}
                  {`${totalDuration.min}:${totalDuration.sec}`}
                </div>
              </div>
            );
          }
        });
      }
    }
    return (
      <div data-testid="navAlbum" className="album">
        <div style={{ width }} className="album__presentation">
          <div className="album__presentation__img">
            <div
              style={{ width, height }}
              className="album__presentation__veneer"
            >
              <img
                ref={this.initRef}
                className="album__presentation__img__file"
                src={images && images[0].url}
                alt="Album Cover"
              />
            </div>
          </div>
          <div className="album__presentation__img-title">
            <div className="album__presentation__img__title">{name}</div>
            <div className="album__presentation__img__artist">
              {artists && artists[0].name}
            </div>
          </div>
          <div
            data-album_uri={uri}
            onClick={e => {
              // console.log(e.currentTarget.dataset.album_uri);
              context.APIrequest("playSpecificPlayback", {
                cx: e.currentTarget.dataset.album_uri
              });
            }}
            className="album__presentation__play-btn"
          >
            <FontAwesomeIcon icon="play" />
            {/* <i className="fas fa-play album__presentation__play-btn__icon" /> */}
            <div className="album__presentation__play-btn__caption">
              {"Play All"}
            </div>
          </div>
        </div>
        <div className="album__tracklist">
          <h2 className="album__tracklist__title">{"Tracklist"}</h2>
          <div className="album__tracklist__tracks">{tracks}</div>
        </div>
      </div>
    );
  }
}
Album.contextType = Context;

export default Album;
