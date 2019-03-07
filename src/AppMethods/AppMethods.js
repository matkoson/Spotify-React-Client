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
      resolve(makeAPIcall(), console.log(that.state))
    );
  });
  function makeAPIcall() {
    if (!albumType) {
      that.playerRequest("getPlaylistTracks", {
        uri: e.target.dataset.album
      });
      that.playerRequest("getPlaylistCover", { uri: e.target.dataset.album });
      that.playerRequest("getPlaylist", { uri: e.target.dataset.album });
    } else if (albumType === "album") {
      that.playerRequest("getAlbum", { uri: e.target.dataset.album });
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
        // mainRightView,
        // rightTabView: "",
        currGrad:
          "linear-gradient(to right bottom, #000000, #000000,  #202020, #282828, #282828)",
        mobile: false
      })
    : this.setState({ mainRightView, rightTabView: "" });
}

export function handleMainRightViewChange(e) {
  const category = e.currentTarget.dataset.category_type;
  this.playerRequest("getCategoryPlaylists", { category, country: "PL" });
  this.playerRequest("getCategory", { category, country: "PL" });
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
    const randomNum =
      this.gradientArr &&
      Math.round(Math.random() * this.gradientArr.length - 1);
    if (
      this.setState &&
      ele.target.className === "right-tab__right-nav__element"
    ) {
      this.setState(state => {
        return {
          currGrad:
            this.gradientArr[randomNum] ||
            "linear - gradient(to right bottom, #4d0b96, #3b2195, #292c91, #19348c, #0c3985)" ===
              state.currGrad
              ? this.gradientArr[randomNum + 1] ||
                this.gradientArr[randomNum - 1]
              : this.gradientArr[randomNum] ||
                "linear - gradient(to right bottom, #4d0b96, #3b2195, #292c91, #19348c, #0c3985)"
        };
      });
    }
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
        // if (e.dataset && e.dataset.clicked) e.dataset.clicked = false;
      }
      chosenOne.dataset.testid = "clickedNavBtn";
      console.log("DATASET", chosenOne.dataset);
    }
  });
}

export function handleResize() {
  if (window.innerWidth > 800 && this.state.mobile) {
    this.setState({ mobile: false });
  }
}
