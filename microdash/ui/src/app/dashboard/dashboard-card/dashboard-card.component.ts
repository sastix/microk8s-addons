import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html'
})
export class DashboardCardComponent implements OnInit {

  @Input() title: string;

  constructor() {
  }

  ngOnInit() {
  }

}
