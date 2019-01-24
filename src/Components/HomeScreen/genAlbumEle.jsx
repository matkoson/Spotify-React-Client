import React from "react";
export default function genAlbumEle(data, type) {
  let name, image, id, dataType;
  // console.log(window.innerWidth, window.innerWidth < 1000);
  // if (window.innerWidth < 1000) data = data.slice(0, 3);
  if (window.innerWidth < 1000 && data.length > 3) data = data.slice(0, 3);
  return data.map((e, i) => {
    // if (i === 0) console.log(e.type, type);
    if (type === "recent") {
      name = e.track.name;
      image = e.track.album.images[0].url;
      id = e.played_at;
      dataType = e.track.type;
    } else if (type === "featured") {
      name = e.name;
      image = e.images[0].url;
      id = e.id;
      dataType = e.type;
    } else if (type === "related") {
      name = e.name;
      image = e.images[0].url;
      id = e.id;
      dataType = e.type;
    }
    //
    //
    //
    return (
      <div key={id} className="home-screen__made-for-user__playlist-element">
        {/*  */}
        {/*  */}
        {/*  */}
        <div
          className="home-screen__made-for-user__playlist-element__img"
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
          <div
            className="app__plus-hover"
            onMouseOver={e =>
              (e.currentTarget.className =
                "app__plus-hover app__plus-hover--hover")
            }
            onMouseLeave={e => (e.currentTarget.className = "app__plus-hover")}
          >
            <i className="fas fa-play app__plus-hover__icon" />
          </div>
          <img
            className={
              dataType !== "artist"
                ? "home-screen__made-for-user__playlist-element__img-pic"
                : "app__rounded-album home-screen__made-for-user__playlist-element__img-pic"
            }
            height="200px"
            width="200px"
            src={image}
            alt=""
          />
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        <div className="home-screen__made-for-user__playlist-element__title">
          {name}
        </div>
        <div className="home-screen__made-for-user__playlist-element__artists" />
      </div>
    );
  });
}
