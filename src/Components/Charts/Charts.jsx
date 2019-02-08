import React, { Component } from "react";
import GenAlbumContainer from "../GenAlbumContainer/GenAlbumContainer";
class Charts extends Component {
  constructor(props) {
    super(props);
    this.renderCharts = this.renderCharts.bind(this);
  }
  componentDidMount() {
    this.props.APIrequest("getCategories");
    if (this.props.getCategoryPlaylists.playlists) this.renderCharts();
  }
  componentDidUpdate() {
    // console.log(this.PolandTop, this.countryTop);
    this.renderCharts();
  }

  renderCharts() {
    console.log("render");
    console.log("poland?", this.props.PolandTop);
    if (this.props.PolandTop) {
      this.PolandTop = (
        <GenAlbumContainer
          data={this.props.PolandTop.playlists.items}
          type={"playlists"}
          playerState={this.props.playerState}
          APIrequest={this.props.APIrequest}
          currPlay={this.props.currentlyPlaying}
        />
      );
      // console.log(this.PolandTop);
    }
    //
    //
    //
    console.log("catlist?", this.props.getCategoryPlaylists.length);
    if (this.props.getCategoryPlaylists.length) {
      this.countryTop = this.props.getCategoryPlaylists
        .map(e => e.playlists.items[e.playlists.items.length - 5])
        .filter(e => {
          return (
            /^(?!.*(Global Top)).*50$/.test(e.name) && e.name.includes("Top")
          );
        });
      this.countryTop = (
        <GenAlbumContainer
          data={this.countryTop}
          type={"playlists"}
          playerState={this.props.playerState}
          APIrequest={this.props.APIrequest}
          currPlay={this.props.currentlyPlaying}
        />
      );
      console.log(this.countryTop);

      const hash = {};
      this.countryViral = this.props.getCategoryPlaylists
        .map(e => {
          const name = e.playlists.items[e.playlists.items.length - 2].name;
          hash[name] ? (hash[name] += 1) : (hash[name] = 1);
          return e.playlists.items[e.playlists.items.length - 2];
        })
        .filter(e => {
          console.log("DUPL?", /^(?!.*(Global Viral)).*50$/.test(e.name));
          return /^(?!.*(Global Viral)).*50$/.test(e.name) && hash[e.name] < 2;
        });

      this.countryViral = (
        <GenAlbumContainer
          data={this.countryViral}
          type={"playlists"}
          playerState={this.props.playerState}
          APIrequest={this.props.APIrequest}
          currPlay={this.props.currentlyPlaying}
        />
      );
      // console.log(this.countryViral);
    }
  }
  render() {
    this.renderCharts();
    return (
      <div className="home-screen">
        <h2 className="app__fetch-title home-screen__made-for-user__title">
          {"Featured Charts"}
        </h2>
        <div className="app__fetch-container home-screen__made-for-user__playlist-container">
          {this.PolandTop || <GenAlbumContainer />}
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        <h2 className="app__fetch-title">{"Top 50 by Country"}</h2>
        <div className="app__fetch-container ">
          {this.countryTop || <GenAlbumContainer />}
        </div>
        <h2 className="app__fetch-title">{"Viral 50 by Country"}</h2>
        <div className="app__fetch-container ">
          {this.countryViral || <GenAlbumContainer />}
        </div>
      </div>
    );
  }
}

export default Charts;
