import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssocieSeComponent } from './associe-se.component';

describe('AssocieSeComponent', () => {
  let component: AssocieSeComponent;
  let fixture: ComponentFixture<AssocieSeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssocieSeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssocieSeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
