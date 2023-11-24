import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosHechizoComponent } from './datos-hechizo.component';

describe('DatosHechizoComponent', () => {
  let component: DatosHechizoComponent;
  let fixture: ComponentFixture<DatosHechizoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosHechizoComponent]
    });
    fixture = TestBed.createComponent(DatosHechizoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
