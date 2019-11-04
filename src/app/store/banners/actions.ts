import * as BANNERS_ACTIONS from './constants';

export function getBannersRequestAction(collectionName) {
    return {
        type: BANNERS_ACTIONS.GET_BANNERS_REQUEST,
        payload: collectionName
    }
}

export function getBannersSuccessAction(banners) {
    return {
        type: BANNERS_ACTIONS.GET_BANNERS_SUCCESS,
        payload: banners
    }
}

export function getBannerFailureAction(error) {
    return {
        type: BANNERS_ACTIONS.GET_BANNERS_FAILURE,
        payload: error
    }
}
