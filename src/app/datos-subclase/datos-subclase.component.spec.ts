import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosSubclaseComponent } from './datos-subclase.component';

describe('DatosSubclaseComponent', () => {
  let component: DatosSubclaseComponent;
  let fixture: ComponentFixture<DatosSubclaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosSubclaseComponent]
    });
    fixture = TestBed.createComponent(DatosSubclaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
