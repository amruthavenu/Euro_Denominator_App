import { Component } from '@angular/core';
import { DenominationBreakdown } from '../../models/breakdown.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DenominationCalculatorService } from '../../services/denomination-calculator.service';
import { CalculatorForm } from '../../components/calculator-form/calculator-form';
import { BreakdownResult } from '../../components/breakdown-result/breakdown-result';


@Component({
  selector: 'app-denomination-calculator-page',
  templateUrl: './denomination-calculator-page.html',
  styleUrls: ['./denomination-calculator-page.scss'],
  imports: [CommonModule, FormsModule, CalculatorForm, BreakdownResult]
})

/**
 * Component for handling denomination calculation functionality.
 * Provides both frontend and backend calculation options and manages
 * the state of breakdowns and their differences.
 */
export class DenominationCalculatorPageComponent {

  amount: number = 0;
  convertedAmount: number = 0;
  currentBreakdown: DenominationBreakdown | null = null;
  lastBreakdown: DenominationBreakdown | null = null;
  calculateInBackend: boolean = true;
  diffs: Record<string, number> = {};
  currentBreakdownEuros: DenominationBreakdown | null = null;

  // service injector
  constructor(private calculatorService: DenominationCalculatorService) { }

  /**
 * Handles the calculation request triggered by the form component.
 * Sets the amount and backend flag, then initiates the breakdown calculation.
 * 
 * @param event - Object containing `amount` to convert and `calculateInBackend` flag.
 */
  handleCalculationRequest(event: { amount: number; calculateInBackend: boolean }) {
    this.amount = event.amount;
    this.calculateInBackend = event.calculateInBackend;
    this.calculateBreakdown();
  }
  /**
 * Calculates the denomination breakdown based on the selected calculation mode 
 * (frontend or backend).
 * Updates the current and previous breakdowns object
 */
  calculateBreakdown(): void {
    this.lastBreakdown = this.currentBreakdown;
    if (this.calculateInBackend) {
      //  Backend logic 
      this.calculatorService.calculate(this.amount).subscribe({
        next: (response) => {

          this.currentBreakdown = {
            amount: this.amount,
            denominationCounts: response.breakdown
          };
          this.diffs = response.differenceFromPrevious;
          this.convertCentsToEuros();
        },
        error: (err) => {
          console.error('Backend error:', err);
          alert('Failed to calculate denomination from backend.');
        }
      });
    } else {
      //  Frontend logic
      const denominations = [50000, 20000, 10000, 5000, 2000, 1000, 500,
        200, 100, 50, 20, 10, 5, 2, 1
      ];
      let amount_in_cents = this.amount * 100;
      const breakdown: Record<number, number> = {};

      for (const value of denominations) {
        const count = Math.floor(amount_in_cents / value);
        if (count > 0) {
          breakdown[value] = count;
          amount_in_cents = +(amount_in_cents - count * value);
        }
      }

      this.currentBreakdown = {
        amount: this.amount,
        denominationCounts: breakdown
      };

      this.convertCentsToEuros();
    }
  }

  /**
 * Computes the difference in denomination counts between the current and previous breakdowns.
 * Used to visualize the change in denominations after recalculation.
 * 
 * @returns Array of objects each containing a denomination (in euros) and its change count.
 */
  getBreakdownDiff(): { denomination: string; change: number }[] {
    const diffs: { denomination: string; change: number }[] = [];

    if (this.calculateInBackend) {
      for (const key in this.diffs) {
        const euroStr = (parseInt(key) / 100).toFixed(2);
        diffs.push({ denomination: euroStr, change: this.diffs[key] });
      }
    } else {
      if (!this.lastBreakdown || !this.currentBreakdown) return [];

      const allKeys = new Set([
        ...Object.keys(this.lastBreakdown.denominationCounts),
        ...Object.keys(this.currentBreakdown.denominationCounts)
      ]);

      for (const key of allKeys) {
        const keyNum = parseInt(key);
        const prev = this.lastBreakdown.denominationCounts[keyNum] || 0;
        const curr = this.currentBreakdown.denominationCounts[keyNum] || 0;
        const change = curr - prev;

        const euroStr = (keyNum / 100).toFixed(2);
        diffs.push({ denomination: euroStr, change });

      }
    }
    return diffs.sort((a, b) => parseFloat(b.denomination) - parseFloat(a.denomination));
  }

  /**
 * Converts the denomination keys in cents to formatted euro strings (e.g., "200" → "2.00").
 * Populates the `currentBreakdownEuros` object for UI display purposes.
 */
  convertCentsToEuros(): void {
    if (!this.currentBreakdown) return;

    const formattedDenomination: Record<string, number> = {};

    for (const key in this.currentBreakdown.denominationCounts) {
      const euroStr = (parseInt(key) / 100).toFixed(2);
      formattedDenomination[euroStr] = this.currentBreakdown.denominationCounts[key];
    }

    this.currentBreakdownEuros = {
      amount: this.amount,
      denominationCounts: formattedDenomination
    };
  }
}
