import { Routes } from '@angular/router';
import { Form } from './components/form/form';
import { Dashboard } from './components/dashboard/dashboard';
import { dashboardGuard } from './guards/dashboard-guard';

export const routes: Routes = [
  { path: 'form', component: Form },
  { path: 'dashboard', component: Dashboard, canActivate: [dashboardGuard] },
  { path: '**', redirectTo: 'form' },
];
