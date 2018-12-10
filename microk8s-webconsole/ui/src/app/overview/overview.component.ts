import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../dashboard/dashboard.service';
import {Observable} from "rxjs";
import {MicroK8sOverview} from "@common/graphql.schema";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  providers: [DashboardService]

})

export class OverviewComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {
  }
  overviewTitle = 'Overview';
  microK8sOverview$: Observable<() => MicroK8sOverview | Promise<MicroK8sOverview>>;
  ngOnInit(): void {
    this.microK8sOverview$ = this.dashboardService.getMicroK8sOverview();
    console.log('overview - ngOnInit');
  }


}
