import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {serviceReducer} from './reducer';
import {ServiceStoreEffects} from './effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('services', serviceReducer),
    EffectsModule.forFeature([ServiceStoreEffects])
  ],
  providers: [ServiceStoreEffects]
})
export class ServiceStoreModule {
}
