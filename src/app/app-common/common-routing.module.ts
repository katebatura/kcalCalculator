import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CommonComponent} from './components/common.component';
import {CalculatorComponent} from './components/routes/calculator/calculator.component';

const routes: Routes = [
  {path: '', component: CommonComponent, children: [
    {path: '', component: CalculatorComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonRoutingModule {}
