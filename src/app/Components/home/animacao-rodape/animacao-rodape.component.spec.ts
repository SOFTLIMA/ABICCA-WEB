import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimacaoRodapeComponent } from './animacao-rodape.component';

describe('AnimacaoRodapeComponent', () => {
  let component: AnimacaoRodapeComponent;
  let fixture: ComponentFixture<AnimacaoRodapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimacaoRodapeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimacaoRodapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
