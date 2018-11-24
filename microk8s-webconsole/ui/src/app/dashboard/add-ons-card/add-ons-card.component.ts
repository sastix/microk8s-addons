import { Component, OnInit } from '@angular/core';
import {Addon} from "@common/models/addon.interface";

@Component({
  selector: 'app-add-ons-card',
  templateUrl: './add-ons-card.component.html'
})
export class AddOnsCardComponent implements OnInit {

  title: string = 'Add-ons';

  addOns: Addon[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 6; i++) {
      const addOn = {
        name: `Add-On ${i}`,
        enabled: (i % 2 === 0)
      };
      this.addOns.push(addOn);
    }
  }

}
