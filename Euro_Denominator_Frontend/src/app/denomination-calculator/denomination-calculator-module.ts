import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DenominationCalculatorRoutingModule } from './denomination-calculator-routing-module';
import { FormsModule } from '@angular/forms';
import { CalculatorForm } from './components/calculator-form/calculator-form';
import { BreakdownResult } from './components/breakdown-result/breakdown-result';
import { DenominationCalculatorPageComponent } from './pages/denomination-calculator-page/denomination-calculator-page.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    DenominationCalculatorRoutingModule,
    CalculatorForm,
    BreakdownResult,
    DenominationCalculatorPageComponent,
    MatSlideToggleModule
  ]
})
export class DenominationCalculatorModule { }
