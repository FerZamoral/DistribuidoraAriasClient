import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AusenciaFormDialogComponent } from "./form-dialog.component";
describe("AusenciaFormDialogComponent", () => {
  let component: AusenciaFormDialogComponent;
  let fixture: ComponentFixture<AusenciaFormDialogComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AusenciaFormDialogComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AusenciaFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
