import { Injectable, Inject, InjectionToken, Optional } from "@angular/core";

export type Config = Array<{code: string, translations: object}>
export const TRANSLATION_CONFIG = new InjectionToken<Config>('TRANSLATION_CONFIG');
export const DEFAULT_LANGAUAGE = new InjectionToken<string>('DEFAULT_LANGUAGE');

@Injectable()
export class TranslateService {
    private currentLanguage: string;
    private translations: Map<string, object> = new Map();
    private defaultLanguage: string;

    constructor(
        @Inject(TRANSLATION_CONFIG) config: Config,
        @Optional() @Inject(DEFAULT_LANGAUAGE) defaultLanguage,
    ) {
        this.setTranslationsFromConfig(config);
        this.defaultLanguage = defaultLanguage ? defaultLanguage : 'en';
    }

    private setTranslationsFromConfig(config: Config) {
        config.forEach(language => {
            this.translations.set(language.code, language.translations);
        });
    }

    private getTranslationsForLanguage(language) {
        if (this.translations.has(language)) {
            return this.translations.get(language);
        }
        return this.translations.get(this.defaultLanguage);
    }

    translate(key: string) {
        const translations = this.getTranslationsForLanguage(this.currentLanguage);
        if(!translations[key]) {
            return key;
        }
        return translations[key];
    }

    setLanguage(language) {
        this.currentLanguage = language;
        // window.location.replace(`${this.currentLanguage}/home`)
    }
}
