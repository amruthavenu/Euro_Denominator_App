import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DenominationBreakdown } from '../../models/breakdown.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-calculator-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSlideToggleModule],
  templateUrl: './calculator-form.html',
  styleUrl: './calculator-form.scss'
})

/**
 * Component for entering the amount and choosing between frontend or backend calculation.
 * Emits a calculate event when the user clicks "Convert".
 */
export class CalculatorForm {

  /**
   * The amount in euros entered by the user.
   * Bound via [(ngModel)] from the parent component.
   */
  @Input() amount: number = 0;

  /**
   * Flag to determine whether calculation should be done in the backend.
   * Bound via [(ngModel)] from the parent component.
   */
  @Input() calculateInBackend: boolean = true;

  /**
   * Event emitter that sends the amount and calculation mode to the parent component.
   */
  @Output() calculate = new EventEmitter<{ amount: number; calculateInBackend: boolean }>();

  /**
  * Called when the user clicks the "Convert" button.
  * Emits the current input values to the parent for processing.
  */
  onConvert(): void {
    this.calculate.emit({ amount: this.amount, calculateInBackend: this.calculateInBackend });
  }
}
