import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakdownResult } from './breakdown-result';

describe('BreakdownResult', () => {
  let component: BreakdownResult;
  let fixture: ComponentFixture<BreakdownResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakdownResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakdownResult);
    component = fixture.componentInstance;

     component.currentBreakdownEuros = {
      amount: 100,
      denominationCounts: { 100: 1 }
    };

    component.lastBreakdown = {
      amount: 80,
      denominationCounts: { 50: 1, 20: 1, 10: 1 }
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   it('should render breakdown entries', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('100');
    expect(compiled.textContent).toContain('1');
  });

  it('should return breakdown entries sorted in descending order', () => {
  component.currentBreakdownEuros = {
    amount: 31,
    denominationCounts: { 5.00: 1, 10.00: 2, 2.00: 3 }
  };

  const result = component.getBreakdownEntries();
  expect(result).toEqual([
    { denomination: 10, count: 2 },
    { denomination: 5, count: 1 },
    { denomination: 2, count: 3 }
  ]);
});
});
