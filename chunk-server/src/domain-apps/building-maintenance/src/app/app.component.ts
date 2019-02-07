import { Component, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { TitleComponent } from "./title.component";
import { TitleService } from "./title.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(injector: Injector, public titleService: TitleService) {
    const title = createCustomElement(TitleComponent, { injector });
    customElements.define("nh-building-maintenance", title);
  }
}
