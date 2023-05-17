import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizarTransportistasComponent } from './autorizar-transportistas.component';

describe('AutorizarTransportistasComponent', () => {
  let component: AutorizarTransportistasComponent;
  let fixture: ComponentFixture<AutorizarTransportistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizarTransportistasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorizarTransportistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
