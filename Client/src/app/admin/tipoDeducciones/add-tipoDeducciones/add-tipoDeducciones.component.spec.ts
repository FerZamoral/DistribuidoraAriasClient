import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddTipoDeduccionComponent } from "./add-tipoDeducciones.component";
describe("AddTipoDeduccionComponent", () => {
  let component: AddTipoDeduccionComponent;
  let fixture: ComponentFixture<AddTipoDeduccionComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AddTipoDeduccionComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipoDeduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
