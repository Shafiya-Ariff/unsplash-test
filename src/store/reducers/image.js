import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    images: [],
    loading: true,
    page: 1,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_IMAGES:
            return {
                ...state,
                error: null,
                images: state.images.concat(action.images),
                loading: false,
                page: action.page + 1
            }
        case actionTypes.GET_IMAGES_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state;
    }
};

export default reducer;