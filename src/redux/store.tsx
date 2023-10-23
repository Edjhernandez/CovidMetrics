import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import getDataWorldbydateSlice from './features/getDataWorldByDateSlice'
import getDataWorldTotalSlice from './features/getDataWorldTotalSlice'
import dateReducer from './features/DateSlice'
import countryReducer from './features/CountrySlice'
import getSomeCountriesByDateSlice from './features/getSomeCountriesByDateSlice'

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
    date: dateReducer,
    dataworldbydate: getDataWorldbydateSlice,
    dataworldTotal: getDataWorldTotalSlice,
    datasomecountries: getSomeCountriesByDateSlice, 
    country: countryReducer,
    // namePlace: namePlaceReducer,
// Create the root reducer separately so we can extract the RootState type
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']