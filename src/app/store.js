import {configureStore} from '@reduxjs/toolkit';
import parentSlicer from './parentSlicer';

const store = configureStore({
    reducer:{
        parentSlicer
    }
});

export default store;