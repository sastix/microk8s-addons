import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "./material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [NavigationComponent, LoadingComponent],
  imports: [
    CommonModule,
    LayoutModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    LayoutModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    NavigationComponent,
    FlexLayoutModule,
    LoadingComponent
  ]
})
export class SharedModule {
}
