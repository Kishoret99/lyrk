import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { appStateProvider } from './app.store';
import { Config, TRANSLATION_CONFIG, DEFAULT_LANGAUAGE, TranslationModule} from './store/translate';
import { EffectsModule } from './store/reducer';
import { ShellModule } from './containers/shell/shell.module';
import { AngularFireModule, FirebaseOptionsToken } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment.prod';


export function gettranslationConfig(): Config {
  return [
    {
      code: 'en',
      translations: {
        'app.component.footer-tab.home': 'Home',
        'app.component.footer-tab.all': 'All'
      }
    },
    {
      code: 'te',
      translations: {
        'hello': 'హలో'
      }
    }
  ];
}

@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({...environment.firebase}),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    TranslationModule.forRoot(),
    EffectsModule.forRoot(),
    ShellModule
  ],
  providers: [
    appStateProvider,
    {provide: TRANSLATION_CONFIG, useFactory: gettranslationConfig},
    {provide: DEFAULT_LANGAUAGE, useValue: 'en'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
