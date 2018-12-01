import {Component, Input, OnInit} from '@angular/core';
import {ServiceInfo} from '@common/graphql.schema';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html'
})
export class ServiceInfoComponent implements OnInit {

  @Input() service: ServiceInfo;

  constructor() { }

  ngOnInit() {
  }

}
