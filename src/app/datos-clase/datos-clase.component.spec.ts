import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosClaseComponent } from './datos-clase.component';

describe('DatosClaseComponent', () => {
  let component: DatosClaseComponent;
  let fixture: ComponentFixture<DatosClaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosClaseComponent]
    });
    fixture = TestBed.createComponent(DatosClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
