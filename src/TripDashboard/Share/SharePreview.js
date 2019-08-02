import React, { PropTypes, Component } from "react";
import Share from "./index";

export default class SharePreview extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            Here's a preview of your trip for your travelers
          </div>
          <div className="col-4">
            <div style={{ marginTop: "5vh", marginBottom: "5vh" }}>
              <div className="iphone6" style={{ height: "70vh", zIndex: "-1" }}>
                <div className="screen">
                  <Share />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
