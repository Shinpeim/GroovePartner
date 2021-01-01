import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { SequencerComponent } from './presentation/sequencer/sequencer.component';
import { PlayerComponent } from './presentation/player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    SequencerComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
