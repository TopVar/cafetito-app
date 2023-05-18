import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarTransportistaComponent } from './verificar-transportista.component';

describe('VerificarTransportistaComponent', () => {
  let component: VerificarTransportistaComponent;
  let fixture: ComponentFixture<VerificarTransportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificarTransportistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarTransportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
