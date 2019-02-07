import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import "./polyfills";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

const tag = "nh-cashier";

if (!window.customElements.get(tag)) {
  window.customElements.define(
    tag,
    class Cashier extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        const app = document.createElement("app-root");
        this.appendChild(app);
        platformBrowserDynamic()
          .bootstrapModule(AppModule)
          .catch(err => console.log(err));
      }
    }
  );
}
