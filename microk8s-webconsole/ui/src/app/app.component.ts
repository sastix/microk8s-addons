import {Component, OnInit} from '@angular/core';
import {ThemeService} from './core/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isDarkTheme: boolean;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.getTheme();
  }

  onThemeToggle() {
    this.isDarkTheme = this.themeService.getTheme();
  }
}
