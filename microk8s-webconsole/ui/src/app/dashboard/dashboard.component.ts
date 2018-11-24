import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Addon} from '@common/models/addon.interface';
import {DashboardService} from './dashboard.service';
import {ServiceInfo} from '@common/models/service-info.interface.';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  addOns$: Observable<Addon[]>;
  services$: Observable<ServiceInfo[]>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.addOns$ = this.dashboardService.getAddons();
    this.services$ = this.dashboardService.getSnapInfo();
  }
}
