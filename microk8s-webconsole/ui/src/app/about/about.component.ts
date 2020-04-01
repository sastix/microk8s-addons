import {Component, OnInit} from '@angular/core';
import {ApiService} from '../core/api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})

export class AboutComponent implements OnInit {
  aboutTitle = 'About MicroK8s WebConsole';
  mversion$: Observable<string>;

  versionWebConsole: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.mversion$ = this.apiService.post('version', {callback: 'xyztoken'}, null, 'text');
  }

}
