import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {AddOnComponent} from './add-on/add-on.component';
import {DashboardService} from './dashboard.service';
import {DashboardCardComponent} from './dashboard-card/dashboard-card.component';
import { ServiceInfoComponent } from './service-info/service-info.component';

@NgModule({
  declarations: [DashboardComponent, AddOnComponent, DashboardCardComponent, ServiceInfoComponent],
  providers: [DashboardService],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
