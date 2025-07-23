import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Imagens2Component } from './imagens2.component';

describe('Imagens2Component', () => {
  let component: Imagens2Component;
  let fixture: ComponentFixture<Imagens2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Imagens2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Imagens2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
