import {Component, Input} from '@angular/core';
import {Addon} from '@common/graphql.schema';
import {DashboardService} from '../dashboard.service';

@Component({
  selector: 'app-add-on',
  templateUrl: './add-on.component.html'
})
export class AddOnComponent {

  @Input() addOn: Addon;

  constructor(private dashboardService: DashboardService) {
  }

  onClick(addOn: Addon): void {
    this.dashboardService.setAddonStatus(addOn.name, !addOn.enabled);
  }

}
