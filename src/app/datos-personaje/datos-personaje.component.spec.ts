import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPersonajeComponent } from './datos-personaje.component';

describe('DatosPersonajeComponent', () => {
  let component: DatosPersonajeComponent;
  let fixture: ComponentFixture<DatosPersonajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosPersonajeComponent]
    });
    fixture = TestBed.createComponent(DatosPersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
