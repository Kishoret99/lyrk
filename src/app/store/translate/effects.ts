import { Effect, actions$, ofType, ACTIONS } from '../core/middlewares';
import { Injectable, Inject} from '@angular/core';
import * as TRANSLATE_ACTIONS from './constants';
import { mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { TranslateService } from './translate.service';

@Injectable()
export class TranslateEffects {
    toDoAsync: any;
    constructor(
        private translateService: TranslateService,
        @Inject(ACTIONS) _actions$
        ) {
        this.toDoAsync = Effect({})(
            _actions$
              .pipe(ofType(TRANSLATE_ACTIONS.SWITCH_LANGUAGE))
              .pipe(mergeMap((action: any) => {
                  return of(this.translateService.setLanguage(action.payload));
                }))
          );
    }
}
