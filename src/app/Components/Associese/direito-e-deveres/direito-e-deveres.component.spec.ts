import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireitoEDeveresComponent } from './direito-e-deveres.component';

describe('DireitoEDeveresComponent', () => {
  let component: DireitoEDeveresComponent;
  let fixture: ComponentFixture<DireitoEDeveresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DireitoEDeveresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DireitoEDeveresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
