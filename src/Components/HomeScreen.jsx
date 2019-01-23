import React, { Component } from "react";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.genAlbumEle = this.genAlbumEle.bind(this);
  }
  genAlbumEle(data, recent) {
    console.log("data", data);
    return data.map(e => {
      return (
        <div
          key={e.id}
          className="home-screen__made-for-user__playlist-element"
        >
          <div className="home-screen__made-for-user__playlist-element__img">
            <img
              height="200px"
              width="200px"
              className="home-screen__made-for-user__playlist-element__img-pic"
              src={recent ? e.track.album.images[0].url : e.images[0].url}
              alt=""
            />
          </div>
          <div className="home-screen__made-for-user__playlist-element__title">
            {e.name}
          </div>
          <div className="home-screen__made-for-user__playlist-element__artists" />
        </div>
      );
    });
  }
  // return(
  //     <div className = "home-screen" >
  // 		<h2 className="home-screen__made-for-user__title">
  // 			{ftrdMssg ? ftrdMssg : null}
  // 		</h2>
  // 		<div className="home-screen__made-for-user__playlist-container">
  // 			{albumPics}
  // 		</div>
  //       {/*  */ }
  //       {/*  */ }
  //       {/*  */ }
  //       <h2 className = "home-screen__recently-played" />
  // 		<div className="home-screen__made-for-user__playlist-container" />
  // 		<h2 className="home-screen__recommendation" />
  // 		<div className="home-screen__made-for-user__playlist-container" />
  //     </div>
  //   );

  render() {
    let ftrdMssg, albumPics, ftrdProp;
    let recentProp, processedProp;
    if (this.props.recent) {
      recentProp = this.props.recent.items.slice(0, 6);
      processedProp = this.genAlbumEle(recentProp, true);
    }
    if (recentProp) console.log("recent", processedProp);
    if (this.props.featured) {
      ftrdProp = this.props.featured;
      console.log(ftrdProp);
      ftrdMssg = ftrdProp.message;
      albumPics = this.genAlbumEle(ftrdProp.playlists.items.slice(0, 6));
      //   console.log("albumPics", albumPics);
      //   albumPics = ftrdProp.playlists.items.slice(0, 6).map(e => {
      //     return (
      //       <div
      //         key={e.id}
      //         className="home-screen__made-for-user__playlist-element"
      //       >
      //         <div className="home-screen__made-for-user__playlist-element__img">
      //           <img
      //             height="200px"
      //             width="200px"
      //             className="home-screen__made-for-user__playlist-element__img-pic"
      //             src={e.images[0].url}
      //             alt=""
      //           />
      //         </div>
      //         <div className="home-screen__made-for-user__playlist-element__title">
      //           {e.name}
      //         </div>
      //         <div className="home-screen__made-for-user__playlist-element__artists" />
      //       </div>
      //     );
      //   });
      //   console.log(albumPics);
    }
    return (
      <div className="home-screen">
        <h2 className="home-screen__made-for-user__title">
          {ftrdMssg ? ftrdMssg : null}
        </h2>
        <div className="home-screen__made-for-user__playlist-container">
          {albumPics}
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        <h2 className="home-screen__recently-played" />
        <div className="home-screen__made-for-user__playlist-container">
          {processedProp}
        </div>
        <h2 className="home-screen__recommendation" />
        <div className="home-screen__made-for-user__playlist-container" />
      </div>
    );
  }
}

export default HomeScreen;
