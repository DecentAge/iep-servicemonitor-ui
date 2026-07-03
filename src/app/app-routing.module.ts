import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorComponent } from './monitor/monitor.component';

const routes: Routes = [
  { path: '', redirectTo: '/monitor', pathMatch: 'full' },
  { path: 'monitor', component: MonitorComponent },
  { path: '**', redirectTo: '/monitor' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
