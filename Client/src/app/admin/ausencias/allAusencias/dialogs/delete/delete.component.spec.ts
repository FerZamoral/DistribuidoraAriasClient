import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllAusenciasDeleteComponent } from "./delete.component";
describe("AllAusenciasDeleteComponent", () => {
  let component: AllAusenciasDeleteComponent;
  let fixture: ComponentFixture<AllAusenciasDeleteComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AllAusenciasDeleteComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllAusenciasDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
