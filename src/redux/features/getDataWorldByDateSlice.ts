import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getDataWorldbydate = createAsyncThunk(
    'fetch/DataWorldbydate',
    async (date: string, thunkApi) => {
        const response = await fetch(`https://covid-19-statistics.p.rapidapi.com/reports/total?date=${date}`,
            {                
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'b2971a2e54msh4821a568ce0a62fp19e0cdjsne83197fafb21',
                    'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
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
    data: any
}

const initialState = {
    loading: false,
    error: null,
    data: {},
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
        .addCase(getDataWorldbydate.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false,
            state.error = action.payload
        })
    }
})

export default getDataWorldbydateSlice.reducer
