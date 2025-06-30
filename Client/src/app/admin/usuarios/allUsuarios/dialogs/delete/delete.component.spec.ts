import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllUsuariosDeleteComponent } from "./delete.component";
describe("DeleteComponent", () => {
  let component: AllUsuariosDeleteComponent;
  let fixture: ComponentFixture<AllUsuariosDeleteComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AllUsuariosDeleteComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllUsuariosDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
