import { Routes } from '@angular/router';
import {ConsultaCredito} from './features/creditos/consulta-credito/consulta-credito';

export const routes: Routes = [
  { path: '', redirectTo: '/consulta', pathMatch: 'full' },
  { path: 'consulta', component: ConsultaCredito },
  { path: '**', redirectTo: '/consulta' }
];
