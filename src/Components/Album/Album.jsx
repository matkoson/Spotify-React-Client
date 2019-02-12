import React from "react";
import { Consumer } from "../../Context/Context";

function Album(props) {
  console.log("ALBUM PROPS", props);
  const context = props.context;
  if (props.getAlbum||props.getPlaylistTracks) {
    if(props.getAlbum){
    var { artists, images, name, tracks, uri } = props.getAlbum;

    tracks = tracks.items.map(e => {
      const totalDuration = context.getMinsSecs(e.duration_ms);

      const isPlaying =
        context.playerState &&
        e.id === context.playerState.track_window.current_track.id;
      if (context.playerState) {
        console.log(
          isPlaying,
          "ID BATTLE",
          e.id,
          context.playerState.track_window.current_track.id
        );
      }
      return (
        <div
          data-album={uri}
          data-track_number={e.track_number}
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
            {/* {isPlaying && <i class="fas fa-music track_fa-music" />} */}

            {isPlaying && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="equilizer"
                viewBox="0 0 128 128"
              >
                <g>
                  <title>Audio Equilizer</title>
                  <rect class="bar" transform="translate(0,0)" y="15" />
                  <rect class="bar" transform="translate(25,0)" y="15" />
                  <rect class="bar" transform="translate(50,0)" y="15" />
                  <rect class="bar" transform="translate(75,0)" y="15" />
                  <rect class="bar" transform="translate(100,0)" y="15" />
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
    });
  }
  return (
    <div className="album">
      <div className="album__presentation">
        <div className="album__presentation__img">
          <div class="album__presentation__veneer">
            <img
              className="album__presentation__img__file"
              src={images && images[0].url}
              alt=""
            />
          </div>
        </div>
        <div class="album__presentation__img-title">
          <div className="album__presentation__img__title">{name}</div>
          <div className="album__presentation__img__artist">
            {artists && artists[0].name}
          </div>
        </div>
        <div
          data-album_uri={uri}
          onClick={e => {
            console.log(e.currentTarget.dataset.album_uri);
            context.APIrequest("playSpecificPlayback", {
              cx: e.currentTarget.dataset.album_uri
            });
          }}
          className="album__presentation__play-btn"
        >
          <i class="fas fa-play album__presentation__play-btn__icon" />
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

export default function AlbumWithCx(props) {
  return (
    <Consumer>
      {context => (
        <Album
          getPlaylistTracks={props.getPlaylistTracks}
          getAlbum={props.getAlbum}
          context={context}
        />
      )}
    </Consumer>
  );
}
