export function makeApropriateFetch(chosenView) {
  if (chosenView === "Charts") {
    this.playerRequest("getCategoryPlaylists", {
      category: "toplists",
      country: "PL"
    });
    console.log(this.countryCodes);
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
  } else if (chosenView === "Genres") {
    this.playerRequest("getCategories");
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
    this.setState({
      rightTabView: chosenView,
      currGrad: this.gradientArr[
        Math.round(Math.random() * this.gradientArr.length)
      ]
    });
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
  this.playerRequest("getCategoryPlaylists", { category });
  this.setState({ mainRightView: category });
}

export function handleReturnHome() {
  this.setState({ mainRightView: "Home", rightTabView: "" });
}
