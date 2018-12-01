import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule, MatProgressSpinnerModule,
  MatSidenavModule, MatSlideToggleModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  declarations: [],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTooltipModule
  ]
})
export class MaterialModule {
}
