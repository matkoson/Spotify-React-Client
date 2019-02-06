import React from "react";

class CatInnerView extends React.Component {
  constructor(props) {
    super(props);
    this.generateInnerView = this.generateInnerView.bind(this);
  }
  generateInnerView() {}
  render() {
    return <div className="cat-inner-view" />;
  }
}

export default CatInnerView;
