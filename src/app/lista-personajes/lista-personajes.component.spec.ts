import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPersonajesComponent } from './lista-personajes.component';

describe('ListaPersonajesComponent', () => {
  let component: ListaPersonajesComponent;
  let fixture: ComponentFixture<ListaPersonajesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPersonajesComponent]
    });
    fixture = TestBed.createComponent(ListaPersonajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
