import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {AddOnsCardComponent} from './add-ons-card/add-ons-card.component';
import {AddOnComponent} from "./add-ons-card/add-on/add-on.component";

@NgModule({
  declarations: [DashboardComponent, AddOnsCardComponent, AddOnComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
