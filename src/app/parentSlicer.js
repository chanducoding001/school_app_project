import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    parentData:{}
}
const parentReducer = createSlice({
    name:'parent slicer',
    initialState,
    reducers:{
        addParentData:(state,action)=>{
            state.parentData = action.payload
        }
    }
});

export const {addParentData} = parentReducer.actions;
export default parentReducer.reducer;

export const getParentData = (state)=>state.parentSlicer.parentData;
