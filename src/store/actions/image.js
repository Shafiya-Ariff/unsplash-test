import * as actionTypes from './actionTypes';
import axios from '../../axios';

//Get images
export const getImages = (page) => async (dispatch) => {
    try {
        const images = await axios.get(`photos?page=${page}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`);
        dispatch({
            type: actionTypes.GET_IMAGES,
            images: images.data,
            page: page
        });
    } catch (error) {
        dispatch({
            type: actionTypes.GET_IMAGES_FAIL,
            error: error.response.data
        });
    }
};