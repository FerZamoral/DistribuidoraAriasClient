import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { EmpleadoFormDialogComponent } from "./form-dialog.component";
describe("EmpleadoFormDialogComponent", () => {
  let component: EmpleadoFormDialogComponent;
  let fixture: ComponentFixture<EmpleadoFormDialogComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [EmpleadoFormDialogComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
