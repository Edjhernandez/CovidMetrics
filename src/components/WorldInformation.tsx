import { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useEffect } from 'react'
import { getDataWorldbydate } from "../redux/features/getDataWorldByDateSlice";
import { getDataWorldTotal } from "../redux/features/getDataWorldTotalSlice";
import styled from "styled-components";
import mapimage from '../assets/worldMap.png'

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
    
`

const DataContainer = styled.div`
    margin: 1.5rem 1.5rem 0 1.5rem;
    font-family: Kanit;
    font-size: 0.75rem;
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
`

const WorldInformation = (): ReactElement => {
    
    const dispatch = useAppDispatch()
    
    
    const dataworldtotal = useAppSelector((state: RootState) => state.dataworldTotal.data)
    const dataworldbydate = useAppSelector((state: RootState) => state.dataworldbydate.data)
    const loadingtotal = useAppSelector((state: RootState) => state.dataworldTotal.loading)
    const loadingbydate = useAppSelector((state: RootState) => state.dataworldbydate.loading)
    const date = useAppSelector((state: RootState) => state.date.date)
    
    useEffect(()=>{
        dispatch(getDataWorldTotal())
        dispatch(getDataWorldbydate(date))
    },[])

    return(
        <Main>
            <H1>World Covid-19 Metrics</H1>
            <DataInfo>
                {loadingtotal ? <h3>Loading...</h3> : 
                <DataContainer>
                    <h2>World data at last update: {dataworldtotal.date}</h2>
                    <p>Confirmed Cases: {dataworldtotal.confirmed}</p>
                    <p>Active Cases: {dataworldtotal.active}</p>
                    <p>Deaths: {dataworldtotal.deaths}</p>
                    <p>Recovered Cases: {dataworldtotal.recovered}</p>
                    <p>Fatality rate: {dataworldtotal.fatality_rate}</p>
                </DataContainer>}
                {loadingbydate ? <h3>Loading...</h3> : 
                <DataContainer>
                    <h2>Date: {dataworldbydate.date}</h2>
                    <p>Confirmed Cases: {dataworldbydate.confirmed}</p>
                    <p>Active Cases: {dataworldbydate.active}</p>
                    <p>Deaths: {dataworldbydate.deaths}</p>
                    <p>Recovered Cases: {dataworldbydate.recovered}</p>
                    <p>Fatality rate: {dataworldbydate.fatality_rate}</p>
                </DataContainer>}
            </DataInfo>
        </Main>
    )
}

export default WorldInformation