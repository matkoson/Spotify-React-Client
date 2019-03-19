export function handleAlbumRightOverride(e) {
  window.scrollY = 0;
  let albumType = e.target.dataset.identi;
  let that = this;
  let renderOption = albumType === "album" ? true : false;
  return new Promise(resolve => {
    return that.setState(
      {
        mainRightView: "Album",
        albumViewOption: renderOption,
        currGrad:
          "linear-gradient(to right bottom, #000000, #000000,  #202020, #282828, #282828)",
        mobile: false
      },
      resolve(makeAPIcall())
    );
  });
  function makeAPIcall() {
    if (!albumType) {
      that.state.playerRequest("getPlaylistTracks", {
        uri: e.target.dataset.album
      });
      that.state.playerRequest("getPlaylistCover", {
        uri: e.target.dataset.album
      });
      that.state.playerRequest("getPlaylist", { uri: e.target.dataset.album });
    } else if (albumType === "album") {
      that.state.playerRequest("getAlbum", { uri: e.target.dataset.album });
    }
  }
}

export function handleDeviceTabClick(e) {
  e.target.style.color === "rgb(255, 255, 255)"
    ? (e.target.style.color = "#1db954")
    : (e.target.style.color = "rgb(255, 255, 255)");
  this.setState({ deviceTabOn: !this.state.deviceTabOn });
}
export function handleMainRightChange(mainRightView) {
  mainRightView === "Search"
    ? this.setState({
        currGrad:
          "linear-gradient(to right bottom, #000000, #000000,  #202020, #282828, #282828)",
        mobile: false
      })
    : this.setState({ mainRightView, rightTabView: "" });
}

export function handleInnerCategoryViewChange(e) {
  const category = e.currentTarget.dataset.category_type;
  this.state.playerRequest("getCategoryPlaylists", { category, country: "PL" });
  this.state.playerRequest("getCategory", { category, country: "PL" });
  this.setState({
    mainRightView: category,
    currGrad:
      "linear-gradient(to right bottom, #000000, #000000,  #202020, #282828, #282828)"
  });
}
export function handleMobileNavToggle() {
  this.setState({ mobile: !this.state.mobile });
}

export function handleNavClick(ele, navType) {
  // eslint-disable-next-line
  let allNavElems = Array.from(ele.currentTarget.children);
  let chosenOne = ele.target;
  let basicClass, clickedClass, strategy, chosenView;
  if (navType === "right") {
    strategy = "innerText";
    basicClass = "right-tab__right-nav__element";
    clickedClass = "right-tab__right-nav__element--clicked";
    chosenView = ele.target.id;
  } else if (navType === "left") {
    strategy = "offsetTop";
    basicClass = "desktop__app-nav__search desktop__app-nav__icon-text";
    clickedClass = "desktop__app-nav__icon-text--clicked";
    chosenOne = chosenOne.offsetParent;
  } else if (navType === "recent") {
    strategy = "offsetTop";
    basicClass = "recently-played__element ";
    clickedClass =
      "desktop__app-nav__icon-text--clicked recently-played__element--modified";
  }

  allNavElems = allNavElems.forEach(e => {
    if (chosenOne) {
      if (e[strategy] === chosenOne[strategy]) {
        e.className = `${basicClass} ${clickedClass}`;
      } else if (
        navType === "recent" &&
        e.className === chosenOne.parentNode.className
      ) {
        e.className = `${basicClass} ${clickedClass}`;
        // e.dataset.clicked = true;
      } else {
        e.className = basicClass;
      }
      chosenOne.dataset.testid = "clickedNavBtn";
    }
  });
}
export function setCompGradient(gradientValue) {
  return this.setState({
    valueContext: {
      ...this.state.valueContext,
      currGrad: gradientValue
    }
  });
}

export function handleResize() {
  if (window.innerWidth > 800 && this.state.mobile) {
    this.setState({ mobile: false });
  }
}
