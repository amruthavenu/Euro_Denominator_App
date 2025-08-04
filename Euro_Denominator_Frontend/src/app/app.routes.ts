import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'calculator', loadChildren: () => import('./denomination-calculator/denomination-calculator-module').then(m => m.DenominationCalculatorModule) },
  { path: '', redirectTo: 'calculator', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
