import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const tag = "nh-bakery";

if (!window.customElements.get(tag)) {
  window.customElements.define(
    tag,
    class Bakery extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        ReactDOM.render(<App />, this);
      }
    }
  );
}
