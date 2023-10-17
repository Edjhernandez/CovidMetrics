import { ReactElement, useEffect } from "react"
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { RootState } from "../redux/store"
import { getSomeCountriesbydate } from "../redux/features/getSomeCountriesByDateSlice" 
import { datacovid } from "../redux/features/getSomeCountriesByDateSlice"


const SomeCountries = (): ReactElement => {

    const dispatch = useAppDispatch()
    const loading = useAppSelector((state: RootState) => state.datasomecountries.loading)
    const data = useAppSelector((state: RootState) => state.datasomecountries.somecountries)
    const date = useAppSelector((state: RootState) => state.date.date)

    useEffect(() => {
        dispatch(getSomeCountriesbydate(date))
    },[])
    
    return(
        <footer>
            <h3>Major capitals of the world</h3>
            <div>
                {loading ? <h3>Loading...</h3> :
                    <div>
                     {data?.map((data: datacovid)  => {
                        return(
                        <div>
                            <h4>{data.name}</h4>
                            <p>Confirmed: {data.confirmed}</p>
                            <p>Deaths: {data.deaths}</p>
                            <p>Active: {data.active}</p>
                            <p>Recovered: {data.recovered}</p>
                        </div>)
                      })}  
                    </div>
                }
            </div>
        </footer>
    )
}

export default SomeCountries
