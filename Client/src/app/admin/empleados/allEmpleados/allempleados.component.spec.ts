import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllEmpleadosComponent } from "./allempleados.component";
describe("AllempleadosComponent", () => {
  let component: AllEmpleadosComponent;
  let fixture: ComponentFixture<AllEmpleadosComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AllEmpleadosComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
