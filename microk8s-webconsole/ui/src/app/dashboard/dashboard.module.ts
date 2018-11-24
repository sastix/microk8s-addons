import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {AddOnsCardComponent} from './add-ons-card/add-ons-card.component';
import {AddOnComponent} from "./add-ons-card/add-on/add-on.component";
import {AddOnsService} from "./add-ons-card/add-ons.service";

@NgModule({
  declarations: [DashboardComponent, AddOnsCardComponent, AddOnComponent],
  providers: [AddOnsService],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
