import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuemPodeSeAssociarComponent } from './quem-pode-se-associar.component';

describe('QuemPodeSeAssociarComponent', () => {
  let component: QuemPodeSeAssociarComponent;
  let fixture: ComponentFixture<QuemPodeSeAssociarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuemPodeSeAssociarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuemPodeSeAssociarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
