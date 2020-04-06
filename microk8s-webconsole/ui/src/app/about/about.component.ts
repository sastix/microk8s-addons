import {Component, OnInit} from '@angular/core';
import {ApiService} from '../core/api.service';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})

export class AboutComponent implements OnInit {
  aboutTitle = 'About MicroDash';
  mversion$: Observable<string>;

  versionWebConsole: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.versionWebConsole = environment.VERSION;
    this.mversion$ = this.apiService.post('version', {callback: 'xyztoken'}, null, 'text')
      .pipe(
        map((r: HttpResponse<Object>) => r.body.toString())
      );
  }

}
