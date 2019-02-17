import React, { useState } from "react";
import { Consumer } from "../../Context/Context";
import { useSpring, animated, useTransition } from "react-spring";

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
  albumType,
  albumTrack;

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.03
];
const trans = (x, y, s) =>
  `perspective(2000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function ContainerGenerator(props) {
  let data = props.data,
    special = props.special,
    type = props.type,
    artistName = null,
    context = props.context,
    animate = props.animate;
  let imgMeasurements = { width: "300px", height: "300px" };
  if (type === "recent") console.log(type, data);
  if (props && data) {
    return data.map((e, i) => {
      if (animate) {
        var [propsAnimate, set] = useSpring(() => ({
          xys: [0, 0, 1],
          config: { mass: 20, tension: 200, friction: 50 }
        }));
        var [show] = useState();
        var transitions = useTransition(show, null, {
          from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
          enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
          unique: true
        });
      }
      albumType = "";
      if (type === "recent") {
        if (e.track) {
          albumTrack = e.track.album.id;
          albumType = "album";
          name = e.track.name;
          artistName = e.track.artists[0].name;
          image = e.track.album.images;
          image =
            window.innerWidth < 820
              ? (image[1] && image[1].url) || image[0].url
              : image[0].url;
          key = e.played_at;
          dataType = e.track.type;
          cx = e.track.uri;
          idS = e.track.album.id;
          cx_pos = e.track.track_number;
          recentTracksPos = i;
        }
        if (!recentTracks) recentTracks = data.map(e => e.track.uri);
      } else if (type === "playlists" || type === "categories") {
        name = e.name;
        key = e.href || e.id;
        if ((e.images && e.images[0]) || e.icons || e.album) {
          if (e.icons) {
            image = e.icons[0].url;
          } else if (type === "playlists") {
            if (e.album) {
              image = e.album.images[0].url;
            } else {
              if (window.innerWidth < 820 && e.images && e.images[1]) {
                image = e.images[1].url;
              } else {
                image = e.images && e.images[0].url;
              }
            }
          }
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
          if (e.album_type)
            albumType = e.album_type || e.track.album.album_type;
        }
      }
      //
      const content = (
        <React.Fragment>
          <div
            style={
              !special
                ? {
                    boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.9)"
                  }
                : null
            }
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
              height={imgMeasurements.height}
              width={imgMeasurements.width}
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
            onClick={e => {
              console.log(this, albumType, albumTrack);
              return context.handleAlbumRightOverride(e, albumType);
            }}
            className="generator__playlist-element__title"
          >
            {name}
          </div>
          <div className="generator__playlist-element__artists">
            {artistName ? artistName : null}
          </div>
        </React.Fragment>
      );
      // console.log("ANIMATE", animate);
      return (
        <React.Fragment>
          {animate ? (
            transitions.map(({ props }) => (
              <animated.div
                className="generator__animation-wrapper"
                style={props}
              >
                <animated.div
                  key={key}
                  className="generator__playlist-element"
                  onMouseMove={({ clientX: x, clientY: y }) =>
                    set({ xys: calc(x, y) })
                  }
                  onMouseLeave={() => set({ xys: [0, 0, 1] })}
                  style={{ transform: propsAnimate.xys.interpolate(trans) }}
                >
                  {content}
                </animated.div>
              </animated.div>
            ))
          ) : (
            <div className="generator__playlist-element">{content}</div>
          )}
        </React.Fragment>
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
          height={imgMeasurements.height}
          width={imgMeasurements.width}
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
          animate={props.animate}
        />
      )}
    </Consumer>
  );
}
