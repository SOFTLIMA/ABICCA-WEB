import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PaginaNaoEncontradaComponent } from './Components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AssocieSeComponent } from './Components/Associese/associe-se/associe-se.component';
import { LoginComponent } from './Administracao/login/login.component';
import { ContatoComponent } from './Components/contato/contato.component';
import { NoticiasComponent } from './Components/noticias/noticias.component';
import { SobreNosComponent } from './Components/sobrenos/sobre-nos.component';
import { CorpoLoginComponent } from './Administracao/corpo-login/corpo-login.component';

export const routes: Routes = [

  {path: 'home', component: HomeComponent, title: 'Home'},
  {path: 'sobrenos', component: HomeComponent, title: 'sobrenos'},
  {path: 'associese', component: AssocieSeComponent, title: 'associe-se'},
  {path: 'contato', component: ContatoComponent, title: 'contato'},
  {path: 'noticias/:id', component: NoticiasComponent, title:'noticias'},
  {path: 'noticias', component: NoticiasComponent, title:'noticias'},
  {path: 'sobre-nos', component: SobreNosComponent, title:'sobre-nos'},

  {path: 'painel', component: CorpoLoginComponent, title:'painel'},

  {path: 'login', component: LoginComponent, title: 'Login'},
  {path: 'login2', component: LoginComponent, title: 'Login'},

  {path: '', redirectTo: '/home', pathMatch: 'full' , title: 'Home'},

  {path: '**', component: PaginaNaoEncontradaComponent, title: '404'},
  // {path: '**', component: PaginaNaoEncontradaComponent, canActivate: [AuthGuard]},
];
