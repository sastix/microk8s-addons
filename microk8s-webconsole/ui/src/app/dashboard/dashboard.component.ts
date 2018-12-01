import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Addon, Power, ServiceInfo} from '@common/graphql.schema';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  addOns$: Observable<() => Addon[] | Promise<Addon[]>>;
  services$: Observable<() => ServiceInfo[] | Promise<ServiceInfo[]>>;
  power$: Observable<() => Power | Promise<Power>>;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.addOns$ = this.dashboardService.getAddons();
    this.services$ = this.dashboardService.getSnapInfo();
    this.power$ = this.dashboardService.getMicroK8sStatus();
  }

  onPowerClick(enabled: boolean): void {
    this.power$ = this.dashboardService.setMicroK8sStatus(enabled);
  }

}
