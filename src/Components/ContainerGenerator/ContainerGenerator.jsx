import React from "react";
import { Consumer } from "../../Context/Context";
let name,
  image,
  key,
  dataType,
  cx,
  cx_pos,
  recentTracks,
  recentTracksPos,
  id,
  idS,
  albumType;
function ContainerGenerator(props) {
  let data = props.data,
    special = props.special,
    type = props.type,
    artistName = null,
    context = props.context;

  if (props && data) {
    return data.map((e, i) => {
      albumType = "";
      if (type === "recent") {
        if (e.track) {
          name = e.track.name;
          artistName = e.track.artists[0].name;
          image = e.track.album.images[0].url;
          key = e.played_at;
          dataType = e.track.type;
          cx = e.track.uri;
          idS = e.track.id;
          cx_pos = e.track.track_number;
          recentTracksPos = i;
        }
        if (!recentTracks) recentTracks = data.map(e => e.track.uri);
      } else if (type === "playlists" || type === "categories") {
        name = e.name;
        key = e.href || e.id;
        if ((e.images && e.images[0]) || e.icons || e.album) {
          image =
            type === "playlists"
              ? (e.images && e.images[0].url) || e.album.images[0].url
              : e.icons[0].url;
        }
        dataType = e.type === "artist" ? e.type : type;
        cx = e.uri;
        idS = e.id;
        if (e.type === "track") {
          cx = e.album.uri;
          cx_pos = e.track_number;
        }
        id = e.id;
        if (
          e.album_type === "single" ||
          e.album_type === "album" ||
          e.type === "track"
        ) {
          artistName = e.artists[0].name;
          if (e.album_type) albumType = e.album_type;
        }
      }
      return (
        <div key={key} className="generator__playlist-element">
          {/*  */}
          {/*  */}
          {/*  */}
          <div
            className="generator__playlist-element__img"
            data-cx={cx}
            data-cx_pos={
              cx_pos ? (dataType !== "track" ? cx_pos : recentTracksPos) : null
            }
            data-recent_pos={dataType === "track" ? recentTracksPos : null}
            data-data_type={dataType}
            data-category_type={dataType === "categories" ? id : null}
            onClick={e => {
              if (e.currentTarget.dataset.data_type === "categories") {
                context.handleMainRightViewChange(e);
              }
              if (special || e.currentTarget.dataset.data_type === "artist") {
                return context.APIrequest("playArtist", {
                  cx: e.currentTarget.dataset.cx
                });
              }
              if (e.currentTarget.dataset.data_type === "playlists") {
                context.APIrequest("playSpecificPlayback", {
                  cx: e.currentTarget.dataset.cx,
                  cx_pos: e.currentTarget.dataset.cx_pos
                });
              }
              if (e.currentTarget.dataset.data_type === "track") {
                context.APIrequest("playRecentTracks", {
                  cx: recentTracks,
                  cx_pos: e.currentTarget.dataset.recent_pos
                });
              }
              context.APIrequest("currentlyPlaying");
            }}
            onMouseOver={e => {
              e.currentTarget.className =
                "generator__playlist-element__img--hover";
            }}
            onMouseLeave={e =>
              (e.currentTarget.className = "generator__playlist-element__img")
            }
            onMouseDown={e =>
              (e.currentTarget.className =
                "generator__playlist-element__img--hover generator__playlist-element__img--click")
            }
            onMouseUp={e =>
              (e.currentTarget.className =
                "generator__playlist-element__img--hover")
            }
          >
            {props.type !== "categories" && (
              <div
                className="app__play-hover"
                onMouseOver={e =>
                  (e.currentTarget.className =
                    "app__play-hover app__play-hover--hover")
                }
                onMouseLeave={e =>
                  (e.currentTarget.className = "app__play-hover")
                }
              >
                {context.playerState &&
                !context.playerState.paused &&
                ((dataType === "track" &&
                  context.currentlyPlaying.item &&
                  cx === context.currentlyPlaying.item.uri) ||
                  (dataType === "artist" &&
                    context.currentlyPlaying &&
                    context.currentlyPlaying.item &&
                    context.currentlyPlaying.item.artists[0].name === e.name) ||
                  (dataType === "playlist" &&
                    context.currentlyPlaying.context &&
                    cx === context.currentlyPlaying.context.uri)) ? (
                  <i
                    id="pause"
                    className="fas fa-pause app__pause-visible__icon"
                  />
                ) : (
                  <i id="play" className="fas fa-play app__play-hover__icon" />
                )}
                {/* check whether the uri of the curr playing album/artist/track is same as the uri of the generated element */}
              </div>
            )}
            <img
              className={
                !special
                  ? "generator__playlist-element__img__pic"
                  : "app__rounded-album generator__playlist-element__img__pic"
              }
              height="300px"
              width="300px"
              src={image}
              alt=""
            />
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
          <div
            data-identi={albumType}
            data-album={idS}
            onClick={e => context.handleAlbumRightOverride(e, albumType)}
            className="generator__playlist-element__title"
          >
            {name}
          </div>
          <div className="generator__playlist-element__artists">
            {artistName ? artistName : null}
          </div>
        </div>
      );
    });
  } else {
    let placeholder = new Array(10).fill(1);
    placeholder = placeholder.map((e, i) => (
      <div
        key={`${i}${Math.random * 100000}`}
        className="generator__playlist-element"
      >
        <div
          style={{ backgroundColor: "#282828" }}
          className="generator__playlist-element__img--fake"
        />
        {}
      </div>
    ));
    return placeholder;
  }
}

export default function ContainerGeneratorWithCx(props) {
  return (
    <Consumer>
      {context => (
        <ContainerGenerator
          data={props.data}
          type={props.type}
          context={context}
          special={props.special}
        />
      )}
    </Consumer>
  );
}
