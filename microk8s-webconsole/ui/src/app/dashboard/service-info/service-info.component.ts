import {Component, Input} from '@angular/core';
import {DashboardService} from '../dashboard.service';
import {MatSlideToggleChange} from '@angular/material';
import {ServiceInfo} from '../../core/models';

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
    this.dashboardService.restartService(service).subscribe((r: ServiceInfo) => this.service = r);
  }

  onPowerClick(service: ServiceInfo, event: MouseEvent): void {
    event.stopPropagation();
    this.dashboardService.setServiceMode(service, (service.mode !== 'enabled')).subscribe((r: ServiceInfo) => this.service = r);
  }

  onToggleChange(service: ServiceInfo, event: MatSlideToggleChange): void {
    this.dashboardService.setServiceStatus(service, event.checked).subscribe((r: ServiceInfo) => this.service = r);
  }

}
