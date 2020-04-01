import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  @Input() logs: string;

  constructor() { }

  ngOnInit(): void {
  }

}
