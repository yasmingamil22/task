import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';

const routes: Routes = [
  { path: '', component: CurrencyConverterComponent },
  { path: 'details', component: CurrencyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
