import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddTipobonificacionComponent } from "./add-tipobonificaciones.component";
describe("AddTipobonificacionComponent", () => {
  let component: AddTipobonificacionComponent;
  let fixture: ComponentFixture<AddTipobonificacionComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AddTipobonificacionComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipobonificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
