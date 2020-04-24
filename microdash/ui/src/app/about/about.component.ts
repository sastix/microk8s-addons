import {Component, OnInit} from '@angular/core';
import {ApiService} from '../core/api.service';
import {Observable} from 'rxjs';
import {map, tap} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})

export class AboutComponent implements OnInit {
  aboutTitle = 'About MicroDash';
  mversion$: Observable<string>;
  kversion: string;

  versionMicroDash: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.versionMicroDash = environment.VERSION;
    // this.mversion$ = this.apiService.get('k8s/version', null, 'application/json', true)
    //   .pipe(
    //     map((r: HttpResponse<Object>) => r.body.toString())
    //   );

    this.apiService.get('k8s/version', null, 'application/json', true)
      .pipe(
        tap((v: string) => this.kversion = v),
      ).subscribe();

  }

}
