import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PaginaNaoEncontradaComponent } from './Components/pagina-nao-encontrada/pagina-nao-encontrada.component';

export const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'sobrenos', component: HomeComponent},

  {path: '', redirectTo: '/home', pathMatch: 'full'},

  {path: '**', component: PaginaNaoEncontradaComponent},
  // {path: '**', component: PaginaNaoEncontradaComponent, canActivate: [AuthGuard]},
];
