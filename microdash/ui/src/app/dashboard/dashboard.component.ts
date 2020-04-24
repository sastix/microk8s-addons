import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DashboardService} from './dashboard.service';
import {Addon, ServiceInfo} from '../core/models';
import {Store} from '@ngrx/store';
import {RootStoreState, ServiceStoreActions, ServiceStoreSelectors} from '../root-store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  addOns$: Observable<Addon[]>;
  services$: Observable<ServiceInfo[]>;
  power$: Observable<boolean>;

  constructor(private dashboardService: DashboardService, private store$: Store<RootStoreState.State>) {
  }

  ngOnInit(): void {
    console.log('dashboard loaded');
    this.addOns$ = this.dashboardService.getAddons();
    this.services$ = this.store$.select(ServiceStoreSelectors.selectServices);
    this.power$ = this.dashboardService.getMicroK8sStatus();

    this.store$.dispatch(new ServiceStoreActions.GetServicesRequestAction());
  }

  // onPowerClick(enabled: boolean): void {
  //   this.power$ = this.dashboardService.setMicroK8sStatus(enabled);
  // }

}
