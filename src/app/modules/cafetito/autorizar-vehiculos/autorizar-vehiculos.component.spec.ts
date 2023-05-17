import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizarVehiculosComponent } from './autorizar-vehiculos.component';

describe('AutorizarVehiculosComponent', () => {
  let component: AutorizarVehiculosComponent;
  let fixture: ComponentFixture<AutorizarVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizarVehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorizarVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
