import { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useEffect } from 'react'
import { getDataWorldbydate } from "../redux/features/getDataWorldByDateSlice";
import { getDataWorldTotal } from "../redux/features/getDataWorldTotalSlice";
import styled from "styled-components";
import mapimage from '../assets/worldMap.webp'
import dateFormat from '../assets/format';
import SomeCountries from "./SomeCountries";

const Main = styled.main`
    background: url(${mapimage});
    background-repeat: no-repeat;
    background-size: 80% auto;
    background-position: center;
    background-position-y: top;
    margin-top: 4rem;
    padding-top: 0.75rem;
    width: 100%;
    background-color: #05aff270;
    min-height: 100vh;
    height: 100%;
`

const DataInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    margin-top: 2rem;
    width: 100%;
    @media (min-width: 768px) {
        justify-content: space-between;
        flex-direction: row;
        width: 90%;
        border: solid 2px white;
        border-radius: 10px;
        margin: 0 auto;
    }
`

const H1 = styled.h1`
    font-size: 1.5rem;
    width: 100%;
    text-align: center;
    font-weight: bolder;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    margin: 0;
`

const DataContainer = styled.div`
    margin: 0 1.5rem 0.5rem 1.5rem;
    font-family: Kanit;
    border: solid 2px white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 600px;
    width: 50%;
    @media (min-width: 768px) {
        width: 40%;
        border: none;
        font-size: 1rem;
    }
    & h2 {
        margin: 0.5rem 0 0 0;
        font-size: 1.2rem;
    }
    & p {
        margin: 0.5rem 0 0 0;
        font-size: 1rem;
    }
`

const WorldInformation = (): ReactElement => {
    
    const dispatch = useAppDispatch()
    const dataworldtotal = useAppSelector((state: RootState) => state.dataworldTotal.data)
    const dataworldbydate = useAppSelector((state: RootState) => state.dataworldbydate.data)
    const loadingtotal = useAppSelector((state: RootState) => state.dataworldTotal.loading)
    const loadingbydate = useAppSelector((state: RootState) => state.dataworldbydate.loading)
    const date = useAppSelector((state: RootState) => state.date.date)
    const errortotal = useAppSelector((state: RootState) => state.dataworldTotal.error)
    const errorbydate = useAppSelector((state: RootState) => state.dataworldbydate.error)
    
    useEffect(()=>{
        dispatch(getDataWorldTotal())
        dispatch(getDataWorldbydate(date))
    },[])

    return(
        <Main>
            <H1>World Covid-19 Metrics</H1>
            <DataInfo>
                {loadingtotal ? <h3>Loading...</h3> : 
                errortotal !== null ? <h3>Ooopss! error: {errortotal}, sorry...</h3> :
                <DataContainer>
                    <h2>World data at last update: {dateFormat(dataworldtotal.date)}</h2>
                    <p>Confirmed Cases: {dataworldtotal.confirmed}</p>
                    <p>Active Cases: {dataworldtotal.active}</p>
                    <p>Deaths: {dataworldtotal.deaths}</p>
                    <p>Recovered: {dataworldtotal.recovered}</p>
                    <p>Fatality rate: {dataworldtotal.fatality_rate}</p>
                </DataContainer>}
                {loadingbydate ? <h3>Loading...</h3> : 
                errorbydate !== null ? <h3>Ooopss! error: {errorbydate}, sorry...</h3> :
                <DataContainer>
                    <h2>Date: {dateFormat(dataworldbydate.date)}</h2>
                    <p>Confirmed Cases: {dataworldbydate.confirmed}</p>
                    <p>Active Cases: {dataworldbydate.active}</p>
                    <p>Deaths: {dataworldbydate.deaths}</p>
                    <p>Recovered: {dataworldbydate.recovered}</p>
                    <p>Fatality rate: {dataworldbydate.fatality_rate}</p>
                </DataContainer>}
            </DataInfo>
            <SomeCountries/>
        </Main>
    )
}

export default WorldInformation