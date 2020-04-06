import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ThemeService} from '../../core/theme.service';
import {OverviewComponent} from "../../overview/overview.component";
import {DashboardService} from "../../dashboard/dashboard.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  providers:[OverviewComponent, DashboardService]
})
export class NavigationComponent implements OnInit {

  appTitle = 'MicroDash';
  dashboardLink = 'Dashboard';
  overviewLinkTitle = 'Overview';
  myServicesLinkTitle = 'My Services';
  aboutLinkTitle = 'About';

  @Output() themeToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  isDarkTheme: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private themeService: ThemeService,
              private overviewComponent: OverviewComponent) {
  }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.getTheme();
  }

  onThemeToggle(): void {
    this.themeService.toggleTheme();
    this.isDarkTheme = this.themeService.getTheme();
    this.themeToggle.emit();
  }

  onOverviewClick(): void {
    console.log('onOverviewClick');
    this.overviewComponent.ngOnInit();
  }

}
