import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesajeVehiculoComponent } from './pesaje-vehiculo.component';

describe('PesajeVehiculoComponent', () => {
  let component: PesajeVehiculoComponent;
  let fixture: ComponentFixture<PesajeVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesajeVehiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesajeVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
