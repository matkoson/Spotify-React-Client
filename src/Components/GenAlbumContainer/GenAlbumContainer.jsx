import React from "react";
import { Consumer } from "../../Context/Context";
// import { playerRequest } from "././APImethods";
let name,
  image,
  key,
  dataType,
  cx,
  cx_pos,
  recentTracks,
  recentTracksPos,
  id,
  idS;
function GenAlbumContainer(props) {
  let data = props.data,
    special = props.special,
    type = props.type,
    artistName = null,
    context = props.context;
  console.log(props, "data", data, "type", type, special);
  // if (type === "playlists") console.log(data, type);
  if (props && data) {
    return data.map((e, i) => {
      // console.log(e.name);
      // if (special) console.log("special", e);
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
          // console.log("IN");
          image =
            type === "playlists"
              ? (e.images && e.images[0].url) || e.album.images[0].url
              : e.icons[0].url;
        }
        // console.log(image, e.images, e.album && e.album.images);
        dataType = e.type === "artist" ? e.type : type;
        cx = e.uri;
        idS = e.id;
        if (e.type === "track") {
          cx = e.album.uri;
          cx_pos = e.track_number;
        }
        id = e.id;
        // artistName =  e.track.artists[0].name;
        if (
          e.album_type === "single" ||
          e.album_type === "album" ||
          e.type === "track"
        )
          artistName = e.artists[0].name;
        // if (e.type === "track") type = "track";
        // console.log("DATA", name, image, artistName, cx);
      }
      return (
        <div key={key} className="home-screen__made-for-user__playlist-element">
          {/*  */}
          {/*  */}
          {/*  */}
          <div
            className="home-screen__made-for-user__playlist-element__img"
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
                "home-screen__made-for-user__playlist-element__img--hover";
            }}
            onMouseLeave={e =>
              (e.currentTarget.className =
                "home-screen__made-for-user__playlist-element__img")
            }
            onMouseDown={e =>
              (e.currentTarget.className =
                "home-screen__made-for-user__playlist-element__img--hover home-screen__made-for-user__playlist-element__img--click")
            }
            onMouseUp={e =>
              (e.currentTarget.className =
                "home-screen__made-for-user__playlist-element__img--hover")
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
                  ? "home-screen__made-for-user__playlist-element__img-pic"
                  : "app__rounded-album home-screen__made-for-user__playlist-element__img-pic"
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
            data-album={idS}
            onClick={context.handleAlbumRightOverride}
            className="home-screen__made-for-user__playlist-element__title"
          >
            {name}
          </div>
          <div className="home-screen__made-for-user__playlist-element__artists">
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
        className="home-screen__made-for-user__playlist-element"
      >
        <div
          style={{ backgroundColor: "#282828" }}
          className="home-screen__made-for-user__playlist-element__img--fake"
        />
        {}
      </div>
    ));
    // console.log(placeholder, "placeholder");
    return placeholder;
  }
}

export default function GenAlbumContainerWithCx(props) {
  return (
    <Consumer>
      {context => (
        <GenAlbumContainer
          data={props.data}
          type={props.type}
          context={context}
          special={props.special}
        />
      )}
    </Consumer>
  );
}
