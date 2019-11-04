import { NgModule } from "@angular/core";
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { TranslatePipe } from './translate.pipe';
import { CommonModule } from '@angular/common';
import { TranslateService } from './translate.service';
import { TranslateEffects } from './effects';

@NgModule({
    imports: [CommonModule],
    declarations: [TranslatePipe],
    exports: [TranslatePipe]
})
export class TranslationModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TranslationModule,
            providers: [TranslateService, TranslateEffects]
        };
    }
}
