export interface DenominationBreakdown  {
   /**
   * The original amount entered by the user in euros.
   */
  amount: number;

  /**
   * Breakdown of the amount using euro denominations (in cents as keys) 
   * and the count of each denomination.
   * Example: { 2000: 1, 1000: 2 } → 1 × €20, 2 × €10
   */
  denominationCounts: Record<number, number>;
}