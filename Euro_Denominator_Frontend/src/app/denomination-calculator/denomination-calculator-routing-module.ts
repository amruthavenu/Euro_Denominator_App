import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DenominationCalculatorPageComponent } from './pages/denomination-calculator-page/denomination-calculator-page.component';


const routes: Routes = [
  { path: '', component: DenominationCalculatorPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DenominationCalculatorRoutingModule { }
