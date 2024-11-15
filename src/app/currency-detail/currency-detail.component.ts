import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FixerApiService } from '../fixer-api.service';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss']
})
export class CurrencyDetailComponent {

  fromCurrency: string = '';
  toCurrency: string = '';
  historicalData: any = {};
  fullCurrencyNames: { [key: string]: string } = {
    'USD': 'United States Dollar',
    'EUR': 'Euro',
    'GBP': 'British Pound',
    'JPY': 'Japanese Yen',
    'AUD': 'Australian Dollar',
    'CAD': 'Canadian Dollar',
    'CNY': 'Chinese Yuan',
    // Add more currency
  };
  
  popularCurrencies = ['USD', 'GBP', 'JPY', 'AUD'];
  rates: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fixerService: FixerApiService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.fromCurrency = params['from'];
      this.toCurrency = params['to'];
      this.fetchHistoricalData();
      this.fetchExchangeRates();
    });
  }

  fetchHistoricalData() {
    const today = new Date();
    this.fixerService.getHistoricalRates(`${today.getFullYear() - 1}-11-14`).subscribe(data => {
      this.historicalData = {
        lastYear: data.rates[this.fromCurrency],
        lastMonth: data.rates[this.fromCurrency],
        lastDay: data.rates[this.fromCurrency],
      };
        });
  }

  fetchExchangeRates() {
    this.fixerService.getLatestRates().subscribe(data => {
      this.rates = data.rates;
    });
  }

  getFullCurrencyName(currencyCode: string): string {
    return this.fullCurrencyNames[currencyCode] || currencyCode; 
  }

  // Method to get the conversion value for popular currencies
  getPopularConversion(currencyCode: string): number {
    if (this.rates && this.rates[this.fromCurrency]) {
      return (1 / this.rates[this.fromCurrency]) * this.rates[currencyCode];
    }
    return 0; // Return 0 if no rate is available
  }

  goBack() {
    this.router.navigate(['/']);
  }

}