import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaCuentasComponent } from './bandeja-cuentas.component';

describe('BandejaCuentasComponent', () => {
  let component: BandejaCuentasComponent;
  let fixture: ComponentFixture<BandejaCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaCuentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandejaCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
