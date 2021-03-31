import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentdataComponent } from './components/currentdata/currentdata.component';
import { HistorydataComponent } from './components/historydata/historydata.component';

const routes: Routes = [
  { path: '', redirectTo: '/current', pathMatch: 'full' },
  {  path: 'current', component: CurrentdataComponent },
  {  path: 'history', component: HistorydataComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
