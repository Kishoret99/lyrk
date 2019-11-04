import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { APP_STATE_KEY, SAVED_APP_STATE } from './app/store/core/middlewares';
import { Storage } from '@ionic/storage';

if (environment.production) {
  enableProdMode();
}

if (environment.production) {
  enableProdMode();
}
document.addEventListener('DOMContentLoaded', async () => {
  // with ref to the below 
  // https://stackoverflow.com/questions/42534930/angular-2-external-configuration-befor-bootstrap-passing-the-value-to-appmodu/42541778#42541778
  const storage = new Storage({});
  const savedAppState = await storage.get(APP_STATE_KEY);
  platformBrowserDynamic(
    [
      {provide: SAVED_APP_STATE, useValue: {...savedAppState, router: null}},
    ]
  ).bootstrapModule(AppModule)
  .catch(err => console.error(err));
});
