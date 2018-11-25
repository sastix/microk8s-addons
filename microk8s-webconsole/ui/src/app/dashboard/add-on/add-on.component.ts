import {Component, Input} from '@angular/core';
import {Addon} from '@common/graphql.schema';
import {DashboardService} from '../dashboard.service';
import {MatSlideToggleChange} from '@angular/material';

@Component({
  selector: 'app-add-on',
  templateUrl: './add-on.component.html'
})
export class AddOnComponent {

  @Input() addOn: Addon;

  constructor(private dashboardService: DashboardService) {
  }

  onToggleChange(event: MatSlideToggleChange, addOn: Addon): void {
    if (event.checked) {
      this.dashboardService.setAddonStatus(addOn.name, true)
        .subscribe(value => this.addOn = value);
    } else if (!event.checked) {
      this.dashboardService.setAddonStatus(addOn.name, false)
        .subscribe(value => this.addOn = value);
    }
  }

}
