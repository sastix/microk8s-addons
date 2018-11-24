import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule, MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";

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
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {
}
