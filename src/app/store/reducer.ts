import * as ToDos from './todos/reducers';
import * as Banners from './banners/reducers';
import * as Translates from './translate/reducers';

import { reducer as routerReducer } from './core/middlewares';
export const reducers = {
    todos: ToDos.reducer,
    banners: Banners.reducer,
    language: Translates.reducer,
    router: routerReducer,
};


import { toDoEffects } from './todos/effects';
import { BannersEffects } from './banners/effects';
import { Injectable, NgModule, ModuleWithProviders } from '@angular/core';
import { TranslateEffects } from './translate/effects';
import { CommonModule } from '@angular/common';
import {
    ACTIONS,
    actions$
} from './core/middlewares';


// export const effects = [toDoEffects, bannersEffects];
@Injectable()
export class EffectsService {
    private effects;
    constructor(
        private bannerEffects: BannersEffects,
        private translateEffects: TranslateEffects
        ) {
        this.effects =  [
            toDoEffects,
            this.bannerEffects,
            this.translateEffects
        ];
    }

    getEffects() {
        return this.effects;
    }
}


@NgModule({
    imports: [
        CommonModule,
    ]
})
export class EffectsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: EffectsModule,
            providers: [
                { provide: ACTIONS, useValue: actions$ },
                EffectsService
            ]
        };
    }
}
