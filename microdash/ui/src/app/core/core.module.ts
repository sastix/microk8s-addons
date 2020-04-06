import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LOCAL_STORAGE, StorageService, StorageServiceModule} from 'ngx-webstorage-service';

export const STORAGE_SERVICE = new InjectionToken<StorageService>('STORAGE_SERVICE');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StorageServiceModule
  ],
  providers: [
    {
      provide: STORAGE_SERVICE,
      useExisting: LOCAL_STORAGE
    }
  ]
})
export class CoreModule { }
