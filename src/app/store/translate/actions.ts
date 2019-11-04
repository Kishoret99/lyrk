
import * as TRANSLATE_ACTIONS from './constants';

export function switchLanguageAction(language) {
    return {
        type: TRANSLATE_ACTIONS.SWITCH_LANGUAGE,
        payload: language
    };
}
