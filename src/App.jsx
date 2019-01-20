import React, { Component } from "react";
import "./App.sass";

class App extends Component {
  render() {
    return (
      <main className="app">
        <div className="left-tab">
          <div className="left-tab__logo">
            <img src="./assets/logo.svg" alt="spotify-logo+text" />
            <div className="left-tab__logo__img" />
            <div className="left-tab__logo__text" />
          </div>
          <div className="left-tab__app-nav">
            {/*  */}
            <div className="left-tab__app-nav__search">
              <span className="left-tab__app-nav__search__icon">
                <span className="left-tab__app-nav__search__text">
                  {"Search"}
                </span>
              </span>
            </div>
            {/*  */}
            <div className="left-tab__app-nav__home">
              <span className="left-tab__app-nav__home__icon">
                <span className="left-tab__app-nav__home__text">{"Home"}</span>
              </span>
            </div>
            {/*  */}
            <div className="left-tab__app-nav__library">
              <span className="left-tab__app-nav__library__icon">
                <span className="left-tab__app-nav__library__text">
                  {"Your Library"}
                </span>
              </span>
            </div>
            {/*  */}
          </div>
        </div>
      </main>
    );
  }
}

export default App;
