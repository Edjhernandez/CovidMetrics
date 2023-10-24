import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface metricsworlddata {
    date: string
    last_update: string
    confirmed: number
    confirmed_diff: number
    deaths: number
    deaths_diff: number
    recovered: number
    recovered_diff: number
    active: number
    active_diff: number
    fatality_rate: number
}

const apikey: string = process.env.VITE_APIKEY ?? ''
const host: string = process.env.VITE_HOST ?? '' 

export const getDataWorldbydate = createAsyncThunk(
    'fetch/DataWorldbydate',
    async (date: string, thunkApi) => {
        const response = await fetch(`https://covid-19-statistics.p.rapidapi.com/reports/total?date=${date}`,
            {                
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apikey,
                    'X-RapidAPI-Host': host
                }
            })
        if(!response.ok){
            return thunkApi.rejectWithValue(response.status)
        } else {
            const data = await response.json()
            return data
        } 
    }
)

export interface responsegetdata {
    loading: boolean
    error: string | null
    data: metricsworlddata
}

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

const getDataWorldbydateSlice = createSlice({
    name: 'getDataWorldbydate',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getDataWorldbydate.pending, (state) => {
            state.loading = true
        })
        .addCase(getDataWorldbydate.fulfilled, (state, action) => {
            state.loading = false; 
            state.data = action.payload.data
        })
        .addCase(getDataWorldbydate.rejected, (state, action: PayloadAction<string | null | any>) => {
            state.loading = false,
            state.error = action.payload
        })
    }
})

export default getDataWorldbydateSlice.reducer

