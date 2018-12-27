import {Component, OnInit} from '@angular/core';
import {ApiService} from "../core/api.service";
import {Observable} from "rxjs";
import {MicroK8sOverview} from "@common/graphql.schema";
import {Version} from "@common/models/version.interface";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})

export class AboutComponent implements OnInit {
  aboutTitle = 'About MicroK8s WebConsole';
  mversion$: Observable<() => Version | Promise<Version>>;

  versionMicrok8s: string;
  versionWebConsole: string;
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.mversion$ = this.api.get('version');
    this.mversion$.subscribe(val => {this.versionMicrok8s = val['microk8s']; this.versionWebConsole = val['webconsole']});
  }

}
