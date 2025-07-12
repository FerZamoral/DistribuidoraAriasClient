import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllAusenciasComponent } from "./allAusencias.component";
describe("AllausenciasComponent", () => {
  let component: AllAusenciasComponent;
  let fixture: ComponentFixture<AllAusenciasComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AllAusenciasComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllAusenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
