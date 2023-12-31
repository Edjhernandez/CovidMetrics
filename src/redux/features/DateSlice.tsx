import { createSlice } from "@reduxjs/toolkit"

/* export interface dateS {
    date: string | null
} */

const initialState: {date: string} = {
    date: '2023-03-01'
}

export const dateSlice = createSlice({
    name: "date", 
    initialState,
    reducers: {
        changeDate: (state, action) => {
            state.date = action.payload
        },
    }
})

export const { changeDate } = dateSlice.actions; 

export default dateSlice.reducer; 