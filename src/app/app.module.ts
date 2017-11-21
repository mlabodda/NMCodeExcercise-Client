import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {StyleService} from './services/style.service';
import {BeerStylesComponent, StyleModalComponent} from './components/beer-styles/beer-styles.component';
import {BeerSearchComponent} from './components/beer-search/beer-search.component';
import {BeerSearchService} from './services/beer-search.service';
import {Ng2FilterPipeModule} from 'ng2-filter-pipe';
import {SpinnerComponentModule} from 'ng2-component-spinner';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ModalModule} from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    BeerStylesComponent,
    BeerSearchComponent,
    StyleModalComponent
  ],
  imports: [
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    Ng2FilterPipeModule,
    FormsModule,
    SpinnerComponentModule
  ],
  providers: [
    StyleService,
    BeerSearchService,
    BsModalService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    StyleModalComponent
  ]
})
export class AppModule {
}
