import {Component, Input} from '@angular/core';
import {ServiceInfo} from '@common/graphql.schema';
import {DashboardService} from '../dashboard.service';
import {MatSlideToggleChange} from "@angular/material";

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html'
})
export class ServiceInfoComponent {

  @Input() service: ServiceInfo;

  constructor(private dashboardService: DashboardService) {
  }

  onRestartClick(service: ServiceInfo, event: MouseEvent): void {
    event.stopPropagation();
    this.dashboardService.restartService(service.name)
      .subscribe(value => {
        this.service = value;
      });
  }

  onPowerClick(service: ServiceInfo, event: MouseEvent): void {
    event.stopPropagation();
    this.dashboardService.setServiceMode(service.name, (service.mode !== 'enabled'))
      .subscribe(value => {
        this.service = value;
      });
  }

  onToggleChange(service: ServiceInfo, event: MatSlideToggleChange): void {
    this.dashboardService.setServiceStatus(service.name, event.checked)
      .subscribe(value => {
        this.service = value;
        console.log(value);
      });
  }

}
