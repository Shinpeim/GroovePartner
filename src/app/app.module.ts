import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SequencerComponent } from './presentation/sequencer/sequencer.component';

@NgModule({
  declarations: [
    AppComponent,
    SequencerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
