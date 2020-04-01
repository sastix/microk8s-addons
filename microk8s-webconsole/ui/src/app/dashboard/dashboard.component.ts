import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DashboardService} from './dashboard.service';
import {Addon} from '../core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  addOns$: Observable<Addon[]>;
  services$: Observable<Object>;
  power$: Observable<boolean>;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    console.log('dashboard loaded');
    this.addOns$ = this.dashboardService.getAddons();
    this.services$ = this.dashboardService.getSnapInfo();
    this.power$ = this.dashboardService.getMicroK8sStatus();
  }

  onPowerClick(enabled: boolean): void {
    this.power$ = this.dashboardService.setMicroK8sStatus(enabled);
  }

}
