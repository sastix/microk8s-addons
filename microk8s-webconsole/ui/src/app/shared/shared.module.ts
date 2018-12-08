import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {RouterModule} from '@angular/router';
import {MaterialModule} from './material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LoadingComponent } from './loading/loading.component';
import {CoreModule} from '../core/core.module';
import {AboutComponent} from "../about/about.component";
import {OverviewComponent} from "../overview/overview.component";
import {MyServicesComponent} from "../myservices/myservices.component";


@NgModule({
  declarations: [NavigationComponent, LoadingComponent, AboutComponent, OverviewComponent, MyServicesComponent],
  imports: [
    CommonModule,
    CoreModule,
    LayoutModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CoreModule,
    CommonModule,
    LayoutModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    NavigationComponent,
    AboutComponent,
    OverviewComponent,
    MyServicesComponent,
    FlexLayoutModule,
    LoadingComponent
  ]
})
export class SharedModule {
}
