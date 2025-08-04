import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DenominationBreakdown } from '../../models/breakdown.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breakdown-result',
  imports: [FormsModule, CommonModule],
  templateUrl: './breakdown-result.html',
  styleUrl: './breakdown-result.scss'
})
/**
 * Component responsible for displaying the denomination breakdown results.
 */
export class BreakdownResult {
 /**
   * The current breakdown of denominations in euro format.
   * Required input from the parent component.
   */
  @Input() currentBreakdownEuros!: DenominationBreakdown;

  /**
   * The previous breakdown of denominations for comparison.
   */
  @Input() lastBreakdown!: DenominationBreakdown | null;

  /**
   * An array of objects representing the differences in denomination counts between
   * the current and previous breakdowns.
   */
  @Input() diffs: { denomination: string; change: number }[] = [];

  /**
   * Converts the `denominationCounts` object into a sorted array of entries,
   * each containing the denomination (as number) and its count.
   * Sorted in descending order of denomination.
   *
   * @returns An array of denomination-count objects sorted by denomination.
   */
  getBreakdownEntries() {
    return Object.entries(this.currentBreakdownEuros.denominationCounts)
      .map(([d, c]) => ({ denomination: parseFloat(d), count: c }))
      .sort((a, b) => b.denomination - a.denomination);
  }
}