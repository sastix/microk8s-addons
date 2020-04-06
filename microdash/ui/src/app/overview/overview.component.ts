import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../dashboard/dashboard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  providers: [DashboardService]

})

export class OverviewComponent implements OnInit {
  overviewTitle = 'Overview';
  microK8sOverview$: Observable<string>;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.microK8sOverview$ = this.dashboardService.getMicroK8sOverview();
  }


}
