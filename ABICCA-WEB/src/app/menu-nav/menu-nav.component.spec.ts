import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MENUNAVComponent } from './menu-nav.component';

describe('MENUNAVComponent', () => {
  let component: MENUNAVComponent;
  let fixture: ComponentFixture<MENUNAVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MENUNAVComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MENUNAVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
