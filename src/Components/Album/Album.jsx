import React from "react";
const getMinsSecs = (ms = 0) => {
  console.log(ms);
  ms = (ms - (ms % 1000)) / 1000;
  return {
    min: String(
      Math.floor(ms / 60) < 10 ? `0${Math.floor(ms / 60)}` : Math.floor(ms / 60)
    ),
    sec: String(ms % 60 < 10 ? `0${ms % 60}` : ms % 60)
  };
};
class Album extends React.Component {
  componentDidMount() {
    if (this.props.chosenAlbum)
      this.props.APIrequest("getAlbum", { uri: this.props.chosenAlbum });
  }
  componentDidUpdate() {
    console.log(this.props);
  }
  render() {
    if (this.props.getAlbum) {
      var { artists, images, name, tracks } = this.props.getAlbum;
      tracks = tracks.items.map(e => {
        const totalDuration = getMinsSecs(e.duration_ms);
        return (
          <div className="album__tracklist__tracks__track">
            <div className="album__tracklist__tracks__track__title">
              {e.name}
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
          <div className="album__presentation__play-btn">
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
}

export default Album;
