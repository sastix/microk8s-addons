import {Component, OnInit} from '@angular/core';
import {ThemeService} from './core/theme.service';
import {ApiService} from './core/api.service';
import {HttpResponse} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isDarkTheme: boolean;

  constructor(private themeService: ThemeService, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.getTheme();
    if (environment.devCallbackToken){
       this.apiService.token = environment.devCallbackToken
    }//else {
    //   this.apiService.getToken(null, 'text')
    //     .pipe(
    //       tap((token: string) => this.apiService.token = token),
    //     ).subscribe();
    // }
  }

  onThemeToggle() {
    this.isDarkTheme = this.themeService.getTheme();
  }
}
