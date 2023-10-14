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
`

const DataInfo = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const H1 = styled.h1`
    font-size: 1.5rem;
    width: 100%;
    text-align: center;
`

const DataContainer = styled.div`
    margin: 10px;
    font-family: Kanit;
    font-size: 1rem;
`

const WorldInformation = (): ReactElement => {
    
    const dispatch = useAppDispatch()
    
    useEffect(()=>{
        dispatch(getDataWorldTotal())
        dispatch(getDataWorldbydate('2021-08-13'))
    },[])

    const dataworldtotal = useAppSelector((state: RootState) => state.dataworldTotal.data)
    const dataworldbydate = useAppSelector((state: RootState) => state.dataworldbydate.data)
    const loadingtotal = useAppSelector((state: RootState) => state.dataworldTotal.loading)
    const loadingbydate = useAppSelector((state: RootState) => state.dataworldbydate.loading)
    
    return(
        <Main>
            <H1>World Covid-19 Metrics</H1>
            <DataInfo>
                {loadingtotal ? <h3>Loading...</h3> : 
                <DataContainer>
                    <h2>World data at: {dataworldtotal.date}</h2>
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