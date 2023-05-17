import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCuentaComponent } from './gestionar-cuenta.component';

describe('GestionarCuentaComponent', () => {
  let component: GestionarCuentaComponent;
  let fixture: ComponentFixture<GestionarCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
