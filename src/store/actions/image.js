import * as actionTypes from './actionTypes';
import axios from 'axios';

//Get images
export const getImages = (page) => async (dispatch) => {
    try {
        const images = await axios.get('https://api.unsplash.com/photos?page='+page+'&client_id=_QAVE7-kOMm5qYv93p5U1Q19AlL8cnOp5zamA0DFiPE');
        dispatch({
            type: actionTypes.GET_IMAGES,
            images: images.data,
            page: page
        });
    } catch (error) {
        dispatch({
            type: actionTypes.GET_IMAGES_FAIL,
            error: error
        });
    }
};