import React from "react";

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chosenTab: "PLAYLISTS" };
  }
  render() {
    const libNav = ["PLAYLISTS", "TRACKS", "ALBUMS"].map(e => (
      <li
        id={e}
        onClick={e => this.setState({ chosenTab: e.target.id })}
        className={
          this.state.chosenTab === e
            ? "library__nav--clicked library__nav__li"
            : "library__nav__li"
        }
      >
        {e}
      </li>
    ));
    return (
      <div className="library home-screen">
        <ul className="library__nav">{libNav}</ul>
      </div>
    );
  }
}

export default Library;
