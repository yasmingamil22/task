import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixerApiService {


  private apiKey = 'a1fa04f892fe4e77a5b3ade0c2b31f3d';  
  private baseUrl = 'https://data.fixer.io/api';

  constructor(private http: HttpClient) {}

  getLatestRates(): Observable<any> {
    return this.http.get(`${this.baseUrl}/latest?access_key=${this.apiKey}`);
  }

  

  getHistoricalRates(date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${date}?access_key=${this.apiKey}`);
  }}
