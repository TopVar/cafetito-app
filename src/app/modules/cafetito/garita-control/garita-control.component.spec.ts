import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaritaControlComponent } from './garita-control.component';

describe('GaritaControlComponent', () => {
  let component: GaritaControlComponent;
  let fixture: ComponentFixture<GaritaControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaritaControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaritaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
