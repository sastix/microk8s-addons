import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: `${environment.apiUrl}/graphql`}),
      cache: new InMemoryCache()
    });
  }
}
