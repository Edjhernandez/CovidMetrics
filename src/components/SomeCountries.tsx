import { ReactElement, useEffect } from "react"
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { RootState } from "../redux/store"
import { getSomeCountriesbydate } from "../redux/features/getSomeCountriesByDateSlice" 
import { datacovid } from "../redux/features/getSomeCountriesByDateSlice"
import styled from "styled-components"
import svgloading from '../assets/loading.svg'

const Section = styled.section`
    text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    & img {
        width: 50px;
        height: auto;
        margin-top: 6rem;
    }
`
const Countriescontainer = styled.div`
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    @media (min-width: 768px) {
        display: grid;
        width: 90%;
        grid-template-columns: 18.5% 18.5% 18.5% 18.5% 18.5%;
        grid-row-gap: 0.5rem;
        grid-column-gap: 1.5rem;
        grid-template-rows: auto auto;
    }
`
const Datacountry = styled.div`
    border: solid 2px white;
    border-radius: 10px;
    margin-bottom: 1rem;
    width: 50%;
    @media (min-width: 768px) {
        width: 100%;
    }
    & h4 {
        font-size: 1rem;
        margin: 0 1rem;
    }
    & p {
        font-size: 0.75rem;
        margin: 0 1rem;
    }
`

const SomeCountries = (): ReactElement => {

    const dispatch = useAppDispatch()
    const loading = useAppSelector((state: RootState) => state.datasomecountries.loading)
    const data = useAppSelector((state: RootState) => state.datasomecountries.somecountries)
    const date = useAppSelector((state: RootState) => state.date.date)
    const error = useAppSelector((state: RootState) => state.datasomecountries.error)

    useEffect(() => {
        dispatch(getSomeCountriesbydate(date))
    },[date])
    
    return(
        <Section>
            {loading ? <img src = {svgloading} alt='loading-icon'/> : 
            error !== null ? <h3>Ooopss! error: {error}, sorry...</h3> :
            <>
                <h3>Several countries Information</h3>
                <Countriescontainer>
                    {data?.map((data: datacovid)  => {
                        return(
                            <Datacountry key = {data.name}>
                                <h4>{data.name}</h4>
                                <p>Confirmed: {data.confirmed}</p>
                                <p>Deaths: {data.deaths}</p>
                                <p>Active: {data.active}</p>
                                <p>Recovered: {data.recovered}</p>
                                </Datacountry>)
                            })}
                </Countriescontainer> 
            </>}
        </Section>
    )
}

export default SomeCountries
