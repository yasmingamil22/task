import { Component } from '@angular/core';
import { FixerApiService } from '../fixer-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent {

  amount: number = 0;
  fromCurrency: string = 'EUR';
  toCurrency: string = 'USD';
  currencies: string[] = [];
  rates: any = {};
  convertedAmount: number | null = null;
  predefinedAmounts = [10, 50, 100, 500];
  quickConversionsFromTo: { amount: number, result: number }[] = [];
  quickConversionsToFrom: { amount: number, result: number }[] = [];

  constructor(private fixerService: FixerApiService, private router: Router) {}

  ngOnInit() {
    this.fixerService.getLatestRates().subscribe(data => {
      this.rates = data.rates;
      this.currencies = Object.keys(this.rates);
      this.calculateQuickConversions();
    });
  }

  swapCurrencies() {
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
    this.calculateQuickConversions();
  }

  convert() {
    this.convertedAmount =
      (this.amount / this.rates[this.fromCurrency]) * this.rates[this.toCurrency];
    this.calculateQuickConversions();
  }

  calculateQuickConversions() {
    this.quickConversionsFromTo = this.predefinedAmounts.map(amount => ({
      amount,
      result: (amount / this.rates[this.fromCurrency]) * this.rates[this.toCurrency]
    }));

    this.quickConversionsToFrom = this.predefinedAmounts.map(amount => ({
      amount,
      result: (amount / this.rates[this.toCurrency]) * this.rates[this.fromCurrency]
    }));
  }


   // Method to handle amount input change
   onAmountChange() {
    if (this.amount > 0) {
      this.convert();
    } else {
      this.convertedAmount = null;
    }
  }


  navigateToDetails() {
    this.router.navigate(['/details'], {
      queryParams: {
        from: this.fromCurrency,
        to: this.toCurrency
      }
    });
  }



  
}


