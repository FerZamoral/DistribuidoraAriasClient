import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddUsuarioComponent } from "./add-usuario.component";
describe("AddEmployeeComponent", () => {
  let component: AddUsuarioComponent;
  let fixture: ComponentFixture<AddUsuarioComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AddUsuarioComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
