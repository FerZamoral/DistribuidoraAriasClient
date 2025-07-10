import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TipoDeduccionDeleteComponent } from './delete.component';

describe('TipoDeduccionDeleteComponent', () => {
  let component: TipoDeduccionDeleteComponent;
  let fixture: ComponentFixture<TipoDeduccionDeleteComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TipoDeduccionDeleteComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeduccionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
