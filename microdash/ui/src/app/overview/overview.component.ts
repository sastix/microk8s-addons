import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../dashboard/dashboard.service';
import {Observable} from 'rxjs';
import {K8sOverview} from "../core/models";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  providers: [DashboardService]

})

export class OverviewComponent implements OnInit {
  overviewTitle = 'Overview';
  microK8sOverview$: Observable<string>;
  microK8sOverviewObj$: Observable<K8sOverview>;
  podsColumnsToDisplay = ['namespace', 'name', 'ready', 'restarts', 'age'];
  servicesColumnsToDisplay = ['namespace', 'name', 'type', 'cluster_ip', 'external_ip', 'ports', 'age'];
  deploymentsColumnsToDisplay = ['namespace', 'name', 'ready', 'up_to_date', 'available', 'age'];
  replicaSetsColumnsToDisplay = ['namespace', 'name', 'desired', 'current', 'ready', 'age'];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.microK8sOverview$ = this.dashboardService.getMicroK8sOverview();
    this.microK8sOverviewObj$ = this.dashboardService.getMicroK8sOverviewObj();
  }


}
