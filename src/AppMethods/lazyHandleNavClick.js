export default function handleNavClick(ele, navType) {
  // eslint-disable-next-line
  let allNavElems = Array.from(ele.currentTarget.children);
  let chosenOne = ele.target;
  let basicClass, clickedClass, strategy, chosenView;
  if (navType === "right") {
    strategy = "innerText";
    basicClass = "right-tab__right-nav__element";
    clickedClass = "right-tab__right-nav__element--clicked";
    chosenView = ele.target.id;
    //depending on the chosen view, make the right API request
    const randomNum = Math.round(Math.random() * this.gradientArr.length - 1);
    if (ele.target.className === "right-tab__right-nav__element") {
      this.setState(state => {
        return {
          // rightTabView: chosenView,
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
