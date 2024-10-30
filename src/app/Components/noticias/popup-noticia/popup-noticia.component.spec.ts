import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNoticiaComponent } from './popup-noticia.component';

describe('PopupNoticiaComponent', () => {
  let component: PopupNoticiaComponent;
  let fixture: ComponentFixture<PopupNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupNoticiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
