import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ServiceInfo} from '@common/models/service-info.interface.';
import {Apollo} from 'apollo-angular';
import {Addon, Query} from '../core/types';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  addOns$: Observable<Addon[]>;
  services$: Observable<ServiceInfo[]>;

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.addOns$ = this.apollo.watchQuery<Query>(
      {
        query: gql`
          query {
            getAddons {
              name
              enabled
            }
          }
        `
      }
    ).valueChanges.pipe(
      map(result => result.data.getAddons)
    );
    // this.services$ = this.dashboardService.getSnapInfo();
  }
}
