import { Effect, actions$, ofType, ACTIONS } from '../core/middlewares';
import * as BANNERS_ACTIONS from './constants';
import * as BANNERS_ACTIONS_CREATORS from './actions';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';

@Injectable({
    providedIn: 'root'
})
export class BannersEffects {
    bannerRequest: any;
    constructor(
        private apiService: FirebaseApiService,
        @Inject(ACTIONS) _actions$
    ) {
        this.bannerRequest = Effect({})(
            _actions$
                .pipe(
                    ofType(BANNERS_ACTIONS.GET_BANNERS_REQUEST),
                    switchMap((action: any) => this.apiService.getCollection(action.payload).pipe(
                        switchMap((banners) => of(BANNERS_ACTIONS_CREATORS.getBannersSuccessAction(banners))),
                        catchError(err => of(BANNERS_ACTIONS_CREATORS.getBannerFailureAction({msg: err})))
                    ))
                )
          );
    }
}
