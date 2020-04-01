import {Component, Input} from '@angular/core';
import {DashboardService} from '../dashboard.service';
import {MatSlideToggleChange} from '@angular/material';
import {filter, map, tap} from 'rxjs/operators';
import {Addon, AddonStatus} from '../../core/models';

@Component({
  selector: 'app-add-on',
  templateUrl: './add-on.component.html'
})
export class AddOnComponent {

  @Input() addOn: Addon;
  logs: string = '';

  constructor(private dashboardService: DashboardService) {
  }

  onToggleChange(event: MatSlideToggleChange, addOn: Addon): void {
    this.dashboardService.setAddonStatus(addOn.name, event.checked)
      .pipe(
        filter((r: AddonStatus) => r.status === 200),
        tap(() => this.addOn.status = (event.checked) ? 'enabled' : 'disabled'),
        map((r: AddonStatus) => this.logs += r.logs)
      ).subscribe();
  }
}
