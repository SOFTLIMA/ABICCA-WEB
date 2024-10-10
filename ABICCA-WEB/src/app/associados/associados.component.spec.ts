import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASSOCIADOSComponent } from './associados.component';

describe('ASSOCIADOSComponent', () => {
  let component: ASSOCIADOSComponent;
  let fixture: ComponentFixture<ASSOCIADOSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ASSOCIADOSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ASSOCIADOSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
