import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from '../dashboard.service';
import {MatSlideToggleChange} from '@angular/material';
import {ServiceInfo} from '../../core/models';
import {RootStoreState, ServiceStoreActions} from '../../root-store';
import {Store} from '@ngrx/store';
import {interval, Observable} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html'
})
export class ServiceInfoComponent implements OnInit {

  @Input() service: ServiceInfo;
  logs$: Observable<string>;

  constructor(private dashboardService: DashboardService, private store$: Store<RootStoreState.State>) {
  }

  ngOnInit(): void {
    //this.getServiceLogs();
  }

  onRestartClick(service: ServiceInfo, event: MouseEvent): void {
    event.stopPropagation();
    this.store$.dispatch(new ServiceStoreActions.RestartServiceRequestAction(service));
  }

  // onPowerClick(service: ServiceInfo, event: MouseEvent): void {
  //   event.stopPropagation();
  //   this.dashboardService.setServiceMode(service, (service.mode !== 'enabled')).subscribe((r: ServiceInfo) => this.service = r);
  // }

  // onToggleChange(service: ServiceInfo, event: MatSlideToggleChange): void {
  //   this.dashboardService.setServiceStatus(service, event.checked).subscribe((r: ServiceInfo) => this.service = r);
  // }

  // getServiceLogs(): void {
  //   this.logs$ = interval(30000)
  //     .pipe(
  //       concatMap(() => this.dashboardService.getServiceLogs(this.service)),
  //     );
  // }

}
