import { Component, OnInit } from '@angular/core';
import {Addon} from "@common/models/addon.interface";
import {Observable} from "rxjs";
import {AddOnsService} from "./add-ons.service";

@Component({
  selector: 'app-add-ons-card',
  templateUrl: './add-ons-card.component.html'
})
export class AddOnsCardComponent implements OnInit {

  title: string = 'Add-ons';

  addOns: Observable<Addon[]>;

  constructor(private addOnService: AddOnsService) { }

  ngOnInit(): void {
    this.addOns = this.addOnService.getAddons();
  }

}
