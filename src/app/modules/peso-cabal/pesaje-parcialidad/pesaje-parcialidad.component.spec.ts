import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesajeParcialidadComponent } from './pesaje-parcialidad.component';

describe('PesajeParcialidadComponent', () => {
  let component: PesajeParcialidadComponent;
  let fixture: ComponentFixture<PesajeParcialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesajeParcialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesajeParcialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
