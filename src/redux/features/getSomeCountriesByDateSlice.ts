import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface datacovid {
    name: string
    confirmed: number
    deaths: number
    active: number
    recovered: number
}

export const getSomeCountriesbydate = createAsyncThunk(
    'fetch/DataCapitals',
    async (date: string, thunkApi) => {
        const response = await fetch(`https://covid-19-statistics.p.rapidapi.com/reports?&date=${date}`,
            {                
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': import.meta.env.VITE_APIKEY,
                    'X-RapidAPI-Host': import.meta.env.VITE_HOST
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

interface responsegetsomecountries {
    loading: boolean
    error: string | null
    somecountries: any
}

const initialState = {
    loading: false,
    error: null,
    somecountries: null
} as responsegetsomecountries

const getSomeCountriesBydateSlice = createSlice({
    name: 'getDataSomeCountries',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getSomeCountriesbydate.pending, (state) => {
            state.loading = true
        })
        .addCase(getSomeCountriesbydate.fulfilled, (state, action) => {
            state.loading = false; 
            const allworld: any[] = action.payload.data
            const arrayofcapitals: string[] = ['VEN','JPN','RUS','KOR','ESP','MEX','IRN','DEU','ARE','IND','BGD','EGY']
            let countriestoshow: datacovid[] = []
            for(let ii = 0; ii < arrayofcapitals.length; ii += 1){
                let namecountry = '';
                let sum_confirmed = 0;
                let sum_deaths = 0;
                let sum_active = 0;
                let sum_recovered = 0;
                allworld.forEach(element => {
                    if(element.region.iso === arrayofcapitals[ii]){
                        namecountry = element.region.name;
                        sum_confirmed = sum_confirmed + element.confirmed;
                        sum_deaths = sum_deaths + element.deaths;
                        sum_active = sum_active + element.active;
                        sum_recovered = sum_recovered + element.recovered;
                    }       
                })
                countriestoshow.push({
                    name: namecountry,
                    confirmed: sum_confirmed,
                    deaths: sum_deaths,
                    active: sum_active,
                    recovered: sum_recovered
                })  
            }; 
           state.somecountries = countriestoshow
        })
        .addCase(getSomeCountriesbydate.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false,
            state.error = action.payload
        })
    }
})

export default getSomeCountriesBydateSlice.reducer
