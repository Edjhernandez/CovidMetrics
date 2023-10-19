import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

 export interface province {
  name: string,
  confirmed: number,
  actived: number,
  deaths: number,
  recovered: number,
  fatalityRate: string, 
}

export interface countryS {
    loading: boolean,
    country: string,
    date: string,
    confirmed: number,
    actived: number,
    deaths: number,
    recovered: number,
    fatalityRate: string,
    provinces: Array<province>,
    error: null | string
}

const initialState: countryS = {
    loading: false,
    country: '',
    date: '',
    confirmed: 0,
    actived: 0,
    deaths: 0,
    recovered: 0,
    fatalityRate: '0%',
    provinces: [],
    error: null
}

export interface data {
  date: string, 
  country: string,
  provinces: string, 
  prov: province | null
}
export const getDataCountry = createAsyncThunk ( 
    'country/getByDate', 
    async (dataI: data, {rejectWithValue}) => {
        const url = `https://covid-19-statistics.p.rapidapi.com/reports?iso=${dataI.country}&date=${ dataI.date }`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3ee66b2e5bmsh7df8ceda469337ap1d519ajsnf7bf982591bd',// import.meta.env.VITE_APIKEY,
                'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'//import.meta.env.VITE_HOST
            }
//3ee66b2e5bmsh7df8ceda469337ap1d519ajsnf7bf982591bd'
//VITE_HOST='covid-19-statistics.p.rapidapi.com'

        };
        
     const response = await fetch(url, options);
      if(!response.ok) {
        const message = `An error has ocurred: ${response.status}`;
        return rejectWithValue(message)
      } else {
        const data = await response.json();
        let conf = 0, rec=0, act=0, dea=0, fatality=0;
        let oneProv: province;
        const provs: Array<province> = [];
        if(!(data.data.length > 1)) {
          for(let ii=0;ii<data.data.length;ii++){
            conf = data.data[ii].confirmed;
            rec = data.data[ii].recovered;
            act = data.data[ii].active;
            dea = data.data[ii].deaths;
            fatality = data.data[ii].fatality_rate
          }
        }
        else {
          for(let ii=0;ii<data.data.length;ii++){
            conf += data.data[ii].confirmed;
            rec += data.data[ii].recovered;
            act += data.data[ii].active;
            dea += data.data[ii].deaths;
            fatality += data.data[ii].fatality_rate
            oneProv = { name: data.data[ii].region.province, confirmed: data.data[ii].confirmed, recovered: data.data[ii].recovered, actived: data.data[ii].active, deaths: data.data[ii].deaths, fatalityRate: (data.data[ii].fatality_rate * 100).toFixed(4).toString() + '%' }
            provs.push(oneProv)
          }
          fatality = fatality / data.data.length
        }
        

       return { 
        date: data.data[0].date, country: data.data[0].region.name,  confirmed: conf, actived: act, deaths: dea, recovered: rec, fatalityRate: (fatality * 100).toFixed(4).toString() + '%', provinces: provs
      }
      }
    }
  )

export const dateSlice = createSlice({
    name: "country", 
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(getDataCountry.pending, (state) => {
            state.loading = true
          })
    
          // Add reducers for additional action types here, and handle loading state as needed
          builder.addCase(getDataCountry.fulfilled, (state, action: PayloadAction<any>) => {
            const { date, country, confirmed, recovered, actived, deaths, fatalityRate, provinces }  = action.payload;
            state.loading = false;
            state.date = date
            state.country = country
            state.confirmed = confirmed
            state.recovered = recovered
            state.deaths = deaths
            state.actived = actived
            state.fatalityRate = fatalityRate
            state.provinces = provinces
          })
          builder.addCase(getDataCountry.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.error = action.payload;
            console.log('error: ', action.payload)
          })
        }
})

export default dateSlice.reducer; 