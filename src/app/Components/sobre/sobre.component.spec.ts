import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SOBREComponent } from './sobre.component';

describe('SOBREComponent', () => {
  let component: SOBREComponent;
  let fixture: ComponentFixture<SOBREComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SOBREComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SOBREComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
