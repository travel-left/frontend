import React, { PropTypes, Component } from "react";
import Share from "./index";

export default class SharePreview extends Component {
  render() {
    return (
      <div className="container">
        <div className="row mb-4 ml-2 mt-4 pr-5">
          <div className="col-6">
            <h2 className="text-black d-inline ">
              Here's a preview of your trip for your travelers
            </h2>
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
