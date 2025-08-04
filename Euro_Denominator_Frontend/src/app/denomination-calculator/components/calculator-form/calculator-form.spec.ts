import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorForm } from './calculator-form';
import { By } from '@angular/platform-browser';

describe('CalculatorForm', () => {
  let component: CalculatorForm;
  let fixture: ComponentFixture<CalculatorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit correct data on Convert click when input is valid', async () => {
  // Arrange
  component.amount = 200;
  component.calculateInBackend = true;
  fixture.detectChanges();

  // Trigger change detection after setting inputs
  await fixture.whenStable(); 

  spyOn(component.calculate, 'emit');

  const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
  inputEl.value = '200';
  inputEl.dispatchEvent(new Event('input'));
  inputEl.dispatchEvent(new Event('blur'));  
  fixture.detectChanges();
  await fixture.whenStable();

  
  const button = fixture.debugElement.query(By.css('button')).nativeElement;
  expect(button.disabled).toBeFalse();
  button.click();

  expect(component.calculate.emit).toHaveBeenCalledWith({
    amount: 200,
    calculateInBackend: true,
  });
});
 it('should show validation message for amount less than minimum', async () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = '-5';
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new Event('blur'));  
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('.error'));
    expect(errorEl.nativeElement.textContent).toContain('greater than 0');
  });
});
