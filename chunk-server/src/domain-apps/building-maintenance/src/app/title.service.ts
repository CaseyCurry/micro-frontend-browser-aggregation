import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector
} from "@angular/core";
import { NgElement, WithProperties } from "@angular/elements";
import { TitleComponent } from "./title.component";

@Injectable()
export class TitleService {
  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  showAsComponent(message: string) {
    const title = document.createElement("title-component");
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      TitleComponent
    );
    const titleComponentRef = factory.create(this.injector, [], title);
    this.applicationRef.attachView(titleComponentRef.hostView);
    document.body.appendChild(title);
  }

  showAsElement(message: string) {
    const titleEl: NgElement &
      WithProperties<TitleComponent> = document.createElement(
      "title-element"
    ) as any;
    document.body.appendChild(titleEl);
  }
}
