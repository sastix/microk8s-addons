import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "./material/material.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    LayoutModule,
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
    NavigationComponent
  ]
})
export class SharedModule {
}
