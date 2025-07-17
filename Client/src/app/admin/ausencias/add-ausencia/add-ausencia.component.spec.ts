import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddAusenciaComponent } from './add-ausencia.component';

describe('AddAusenciaComponent', () => {
  let component: AddAusenciaComponent;
  let fixture: ComponentFixture<AddAusenciaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddAusenciaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAusenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
