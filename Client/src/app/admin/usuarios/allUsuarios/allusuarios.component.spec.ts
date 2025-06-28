import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllusuariosComponent } from "./allusuarios.component";
describe("AllusuariosComponent", () => {
  let component: AllusuariosComponent;
  let fixture: ComponentFixture<AllusuariosComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AllusuariosComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
