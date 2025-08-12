import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenominationCalculatorPageComponent } from './denomination-calculator-page.component';
import { DenominationCalculatorService } from '../../services/denomination-calculator.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('DenominationCalculatorPage', () => {
  let component: DenominationCalculatorPageComponent;
  let fixture: ComponentFixture<DenominationCalculatorPageComponent>;
  let mockService: jasmine.SpyObj<DenominationCalculatorService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('DenominationCalculatorService', ['calculate']);
    await TestBed.configureTestingModule({
      imports: [DenominationCalculatorPageComponent, FormsModule],
       providers: [
        { provide: DenominationCalculatorService, useValue: mockService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenominationCalculatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call backend and set currentBreakdown', () => {
    component.amount = 123;
    component.lastBreakdown = {
      amount: 100,
      denominationCounts: { "100": 1 }
    };
    const mockResponse = {
      breakdown: { "10000": 1, "2000": 1, "200": 1, "100": 1 },
      differenceFromPrevious: { "10000": 0 }
    };
    mockService.calculate.and.returnValue(of(mockResponse));

    component.calculateBreakdown();

    expect(mockService.calculate).toHaveBeenCalledWith(123, null);
    expect(component.currentBreakdown?.denominationCounts["10000"]).toBe(1);
    expect(component.diffs["10000"]).toBe(0);
  });

  it('should calculate frontend breakdown when backend mode is off', () => {
    component.amount = 7.5;
    component.calculateInBackend = false;
    component.calculateBreakdown();

    expect(mockService.calculate).toHaveBeenCalledTimes(0);
    expect(component.currentBreakdown).toBeTruthy();
    
    expect(component.currentBreakdown!.denominationCounts[500]).toBe(1);
    expect(component.currentBreakdown!.denominationCounts[200]).toBe(1);
    expect(component.currentBreakdown!.denominationCounts[50]).toBe(1);
  });
});
