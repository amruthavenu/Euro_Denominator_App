import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Backend response structure
export interface BackendResponse {
  breakdown: { [denomination : string]: number };
  differenceFromPrevious: {[denomination: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class DenominationCalculatorService {
  private apiUrl = 'http://localhost:8080/api/denominations'; 

  constructor(private http: HttpClient) {}

  /**
   * Sends the Euro amount to the backend and receives breakdown + difference.
   * @param amount Euro amount to calculate denomination for
   * @returns Observable<BackendResponse>
   */
  calculate(amount: number): Observable<BackendResponse> {
    return this.http.post<BackendResponse>(this.apiUrl, { amount });
  }
}
