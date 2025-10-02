import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCredito } from './consulta-credito';

describe('ConsultaCredito', () => {
  let component: ConsultaCredito;
  let fixture: ComponentFixture<ConsultaCredito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaCredito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaCredito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
