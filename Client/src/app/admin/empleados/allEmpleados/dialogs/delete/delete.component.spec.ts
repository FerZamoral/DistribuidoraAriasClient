import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllEmpleadosDeleteComponent } from "./delete.component";
describe("AllEmpleadosDeleteComponent", () => {
  let component: AllEmpleadosDeleteComponent;
  let fixture: ComponentFixture<AllEmpleadosDeleteComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AllEmpleadosDeleteComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmpleadosDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
