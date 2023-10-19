import React from 'react'
import styled from 'styled-components'
import { palete } from '../assets/palete'
import countries from '../assets/countries'
import { getDataCountry } from '../redux/features/CountrySlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { RootState } from '../redux/store'
import { data } from '../redux/features/CountrySlice'
import mapimage from '../assets/worldMap.png'
import dateFormat from '../assets/format';

const StyledP = styled.p`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 310px;  
   height: 250px;
`
const StyledMain = styled.main`
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
const StyledH1 = styled.h1`
    font-weight: bolder;
    font-size: 2rem;
    letter-spacing: 2px;
    text-align: center;
    text-shadow: 1px 2px 1px rgba(0,0,0,0.69); 
    color: ${ palete.colorPriText };
    margin: 3rem 0 2rem 0rem;
`

const StyledDiv = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin: 10px; 
  display: flex;
  justify-content: center;
  & select { background-color: ${ palete.colorPriText };
    
    font-family: ${ palete.fontFamily };
    font-size: 1rem;
    padding: .5em;
    padding-right: 1em; 
    border: 0;
    margin: 0;
    border-radius: 3px;
    text-indent: 0.01px;
    text-overflow: '';
  }
  & button {
    background-color: ${ palete.backgroundButton };
    cursor: pointer;
    font-family: ${ palete.fontFamily };
    font-size: 1rem;
    border-radius: 3px;
    border-color: transparent;
    height: 2.6rem;
    width: 260px;
    margin-left: 2px;
  }
`
const StyledInput = styled.input`
  font-family: ${ palete.fontFamily };
  background-color: ${ palete.colorPriText };
  font-size: 1rem;
  width: 260px;
  padding: 0.5em;
  padding-right: 1em; 
  border: 0;
  margin: 0;
  border-radius: 3px;
` 
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
` 
const StyledCountry = styled.div`
  color: ${ palete.colorPriText };
  text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 310px;
  height: 250px;
  border-radius: 5px;
  border: 1px solid ${ palete.colorPriText };
  gap: 0;
  margin-bottom: 1rem;
  padding-left: 1rem;
  & h2 {
    margin: 0rem;
  }
  & p {
    margin: 0;
  }
` 
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0;
  @media (min-width: 768px) {
    flex-direction: row;
  }
` 
const StyledSelect = styled.select`
    background-color: ${ palete.colorPriText };
    font-family: ${ palete.fontFamily };
    font-size: 1rem;
    padding: 0.5rem;
    padding-right: 1em; 
    border: 0;
    margin: 0;
    width: 260px;
    border-radius: 3px;
    text-indent: 0.01px;
    text-overflow: '';
`
 const StyledContainerProv = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height:250px;
    gap: 0.5rem;
 `
function Consult() {
  const country = useAppSelector((state: RootState) => state.country);

const INITIAL: data = {
    date: "",
    country: "", 
    provinces: "", 
    prov: null
  }
const [data, setData] = React.useState<data>(INITIAL) 
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value } = event.target
    setData(prevData => {
        return {
            ...prevData,
            [name]: value
        }
    }      
    )
  }
  const handleChangeProv = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setData(prevData => {
        return {
            ...prevData,
            [name]: value,
            prov: country.provinces.filter((prov) => prov.name === value)[0]
        }
    }   
    )
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement> ) => {
      event.preventDefault()
      if(data.date && data.country){
        dispatch(getDataCountry(data))
        setData(prevData => {
          return {
              ...prevData,
              prov: null,
              provinces: ""
          }
        }   
        )
    }
  }

  return (
<>
<StyledMain>
<StyledH1>Consult a Country</StyledH1>
  <StyledContainer>
      <StyledDiv>
      <StyledForm action="" onSubmit={ handleSubmit}>
          <StyledInput
            type="date"
            value={data.date}
            name= 'date'
            min="2020-01-22"
            max="2023-03-09"
            onChange={ handleChange }
          />
        <select name="country"
        onChange={ handleChange }
        value = { data.country }>
          <option value="" disabled hidden>Choice a Country</option>
        {
          countries.map((country) => {
                    return (
                        <option key = {country.iso} value={country.iso}>{ country.name }</option>
                        )
                })}
        </select>
        <button type='submit'>Search</button>
      </StyledForm>
      </StyledDiv>
      { country.loading ? <StyledP>Loading</StyledP> : !country.date ? <></> :
        <StyledCountry>
        <h2>{ dateFormat(country.date) }</h2>
        <h2>{ country.country }</h2>
        <p>Confirmed cases: { country.confirmed }</p>
        <p>Recovered cases: { country.recovered }</p>
        <p>Actived Cases: { country.actived }</p>
        <p>Deaths: { country.deaths }</p>
        <p>Fatality Rate: { country.fatalityRate }</p>
      </StyledCountry>
      }
    </StyledContainer>
    { country.provinces.length > 1  &&
   
      <StyledContainerProv>
        <StyledSelect name="provinces"
            onChange={ handleChangeProv }
            value = { data.provinces }>
              <option value="" disabled hidden>Choice a province</option>
            {
              country.provinces.map((country) => {
                        return (
                            <option key = {country.name} value={country.name}>{ country.name }</option>
                            )
                    })        
            }
        </StyledSelect>
        { data.provinces != "" &&

        <StyledCountry> 
            <h2>{ data.provinces }</h2>
            <p>Confirmed cases: { data.prov?.confirmed }</p>
            <p>Recovered cases: { data.prov?.recovered }</p>
            <p>Actived Cases: { data.prov?.actived }</p>
            <p>Deaths: { data.prov?.deaths }</p>
            <p>Fatality Rate: { data.prov?.fatalityRate }</p>
        </StyledCountry>
        }
      </StyledContainerProv>
    }

  </StyledMain>
    
</>
  )
}
export default Consult