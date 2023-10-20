import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { responsegetdata } from "./getDataWorldByDateSlice";

const apikey: string = process.env.VITE_APIKEY ?? ''
const host: string = process.env.VITE_HOST ?? '' 

export const getDataWorldTotal = createAsyncThunk(
    'fetch/DataWorldTotal',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`https://covid-19-statistics.p.rapidapi.com/reports/total`,
            {                
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apikey,
                    'X-RapidAPI-Host': host
                }
            })
        if(!response.ok){
            return rejectWithValue(response.status)
        } else {
            const data = await response.json()
            return data
        } 
    }
)

const initialState = {
    loading: false,
    error: null,
    data: {
        date: '',
        last_update: '',
        confirmed: 0,
        confirmed_diff: 0,
        deaths: 0,
        deaths_diff: 0,
        recovered: 0,
        recovered_diff: 0,
        active: 0,
        active_diff: 0,
        fatality_rate: 0
    } 
} as responsegetdata

const getDataWorldTotalSlice = createSlice({
    name: 'getDataWorldTotal',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getDataWorldTotal.pending, (state) => {
            state.loading = true
        })
        .addCase(getDataWorldTotal.fulfilled, (state, action) => {
            state.loading = false; 
            state.data = action.payload.data
        })
        .addCase(getDataWorldTotal.rejected, (state, action: PayloadAction<string | null | any>) => {
            state.loading = false,
            state.error = action.payload
        })
    }
})

export default getDataWorldTotalSlice.reducer
