import {Component, Input, OnInit} from '@angular/core';
import {Addon} from "@common/models/addon.interface";

@Component({
  selector: 'app-add-on',
  templateUrl: './add-on.component.html'
})
export class AddOnComponent implements OnInit {

  @Input() addOn: Addon;

  constructor() { }

  ngOnInit() {
  }

}
