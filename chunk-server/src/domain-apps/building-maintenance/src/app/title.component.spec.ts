import { TestBed, async } from "@angular/core/testing";
import { TitleComponent } from "./title.component";

describe("TitleComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TitleComponent]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(TitleComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
