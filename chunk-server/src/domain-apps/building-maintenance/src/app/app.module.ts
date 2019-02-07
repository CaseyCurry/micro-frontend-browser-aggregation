import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { TitleComponent } from "./title.component";
import { TitleService } from "./title.service";

@NgModule({
  declarations: [AppComponent, TitleComponent],
  imports: [BrowserModule],
  providers: [TitleService],
  bootstrap: [AppComponent],
  entryComponents: [TitleComponent]
})
export class AppModule {}
