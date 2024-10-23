import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoComponent } from './contato.component';
import { EntreEmContatoComponent } from './entre-em-contato/entre-em-contato.component';
import { MapaComponent } from './mapa/mapa.component';

describe('ContatoComponent', () => {
  let component: ContatoComponent;
  let fixture: ComponentFixture<ContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntreEmContatoComponent,MapaComponent,]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
