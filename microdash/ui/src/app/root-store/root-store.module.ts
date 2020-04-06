import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceStoreModule } from './service-store';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServiceStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule { }
