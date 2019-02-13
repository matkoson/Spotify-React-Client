export function makeApropriateFetch(chosenView) {
  if (chosenView === "Charts") {
    if (!this.state.PolandTop) {
      this.playerRequest("getCategoryPlaylists", {
        category: "toplists",
        country: "PL"
      });
    }
    if (!this.state.getCategoryPlaylists.length) {
      let visited = {},
        index;
      for (let i = 0; i < 20; i += 1) {
        index = Math.round(Math.random() * (this.countryCodes.length - 1));
        while (visited[this.countryCodes[index].isoCode])
          index = Math.round(Math.random() * (this.countryCodes.length - 1)); //making sure to not fetch one country's playlists twice
        visited[this.countryCodes[index].isoCode] = true;
        console.log(visited, this.state.getCategoryPlaylists);
        this.playerRequest("getCategoryPlaylists", {
          category: "toplists",
          country: this.countryCodes[index].isoCode
        });
      }
    }
  } else if (chosenView === "Genres") {
    if (!this.state.alreadyViewed.includes(chosenView)) {
      this.playerRequest("getCategories");
      this.setState(state => {
        return { alreadyViewed: [...state.alreadyViewed, chosenView] };
      });
    }
  } else if (chosenView === "New Releases") {
    if (!this.state.alreadyViewed.includes(chosenView)) {
      this.playerRequest("getNewReleases");
      this.setState(state => {
        return { alreadyViewed: [...state.alreadyViewed, chosenView] };
      });
    }
  } else if (chosenView === "Discover" && this.state.topRelatedArtists) {
    let idList = this.state.topRelatedArtists.map(e => e.id);
    if (!this.state.alreadyViewed.includes(chosenView)) {
      this.playerRequest("getMultipleArtists", { ids: idList });
      this.setState(state => {
        return { alreadyViewed: [...state.alreadyViewed, chosenView] };
      });
    }
  }
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
    this.makeApropriateFetch(chosenView);
    //depending on the chosen view, make the right API request
    const randomNum = Math.round(Math.random() * this.gradientArr.length - 1);
    if (ele.target.className === "right-tab__right-nav__element") {
      this.setState(state => {
        return {
          rightTabView: chosenView,
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
    basicClass = "left-tab__app-nav__search left-tab__app-nav__icon-text";
    clickedClass = "left-tab__app-nav__icon-text--clicked";
    chosenOne = chosenOne.offsetParent;
  } else if (navType === "recent") {
    strategy = "offsetTop";
    basicClass = "recently-played__element ";
    clickedClass =
      "left-tab__app-nav__icon-text--clicked recently-played__element--modified";
  }

  allNavElems = allNavElems.forEach(e => {
    if (e[strategy] === chosenOne[strategy]) {
      e.className = `${basicClass} ${clickedClass}`;
    } else if (
      navType === "recent" &&
      e.className === chosenOne.parentNode.className
    ) {
      e.className = `${basicClass} ${clickedClass}`;
      e.dataset.clicked = true;
    } else {
      e.className = basicClass;
      if (e.dataset && e.dataset.clicked) e.dataset.clicked = false;
    }
  });
}
export function handleAlbumRightOverride(e, albumType) {
  window.scrollY = 0;
  console.log("HANDLING ALBUM OVERRIDE", albumType, e.target.dataset);
  let that = this;
  console.log(this.albumRef);
  // that.refs.albumRef.scrollTop = 0;
  let renderOption = albumType === "album" ? true : false;
  return new Promise(resolve => {
    return that.setState(
      {
        mainRightView: "Album",
        albumViewOption: renderOption,
        currGrad:
          "linear-gradient(to right bottom, #000000, #000000,  #202020, #282828, #282828)"
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

export function handleResize() {
  if (!this.state.windowWidth) {
    this.setState({ windowWidth: window.innerWidth });
  } else {
    if (this.state.windowWidth > 1000 && window.innerWidth < 1000) {
      this.setState({ windowWidth: window.innerWidth });
    }
    if (this.state.windowWidth < 1000 && window.innerWidth > 1000)
      this.setState({ windowWidth: window.innerWidth });
  }
}

export function gradientCarousel() {
  this.gradientChange = setInterval(() => {
    console.log(
      "changing",
      this.gradientArr[Math.round(Math.random() * this.gradientArr.length)]
    );
    this.setState({
      currGrad: this.gradientArr[
        Math.round(Math.random() * this.gradientArr.length)
      ]
    });
  }, 1000 * 10);
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

export function handleMainRightChange(mainRightView) {
  mainRightView === "Search"
    ? this.setState({
        mainRightView,
        rightTabView: "",
        currGrad:
          "linear-gradient(to right bottom, #000000, #000000,  #202020, #282828, #282828)"
      })
    : this.setState({ mainRightView, rightTabView: "" });
}
