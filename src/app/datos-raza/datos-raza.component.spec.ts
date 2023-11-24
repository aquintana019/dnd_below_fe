import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosRazaComponent } from './datos-raza.component';

describe('DatosRazaComponent', () => {
  let component: DatosRazaComponent;
  let fixture: ComponentFixture<DatosRazaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosRazaComponent]
    });
    fixture = TestBed.createComponent(DatosRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
