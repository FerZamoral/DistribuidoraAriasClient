import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { TipobonificacionFormDialogComponent } from "./form-dialog.component";
describe("TipobonificacionFormDialogComponent", () => {
  let component: TipobonificacionFormDialogComponent;
  let fixture: ComponentFixture<TipobonificacionFormDialogComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [TipobonificacionFormDialogComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(TipobonificacionFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
