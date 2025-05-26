import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiderancaComponent } from './lideranca.component';

describe('LiderancaComponent', () => {
  let component: LiderancaComponent;
  let fixture: ComponentFixture<LiderancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiderancaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiderancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
