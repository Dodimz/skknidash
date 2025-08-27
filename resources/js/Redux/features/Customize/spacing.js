import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    top: {
        lg: 0,
        md: 0
    },
    bottom: {
        lg: 0,
        md: 0
    }
}

const spacingSlice = createSlice({
    name: "spacing",
    initialState,
    reducers: {
        updateSpacing(state, action){
            state = action.payload
        }
    }
})
export default spacingSlice.reducer;
export const {updateSpacing} = spacingSlice.actions
