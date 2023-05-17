import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrTransportistaComponent } from './qr-transportista.component';

describe('QrTransportistaComponent', () => {
  let component: QrTransportistaComponent;
  let fixture: ComponentFixture<QrTransportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrTransportistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrTransportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
