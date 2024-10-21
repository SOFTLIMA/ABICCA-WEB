import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SejaUmAssociadoComponent } from './seja-um-associado.component';

describe('SejaUmAssociadoComponent', () => {
  let component: SejaUmAssociadoComponent;
  let fixture: ComponentFixture<SejaUmAssociadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SejaUmAssociadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SejaUmAssociadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
