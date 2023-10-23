import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { palete } from '../assets/palete'
import { changeDate } from '../redux/features/DateSlice'
import { useAppDispatch } from '../redux/hooks'
import { getDataWorldbydate } from '../redux/features/getDataWorldByDateSlice'

type navType = {
    $color?: string; 
    $height?: string;
  };

  type containerM = {
    $s?: string;
  }
  
const StyledNavbar = styled.nav<navType>`
    margin: 0;
    padding: 0;
    position: fixed;
    z-index: 999;
    top: 0;
    height: ${(props) => props.$height};
    width: 100%;
    font-weight: 400;
    font-size: 1.2rem;
    background-color: ${(props) => props.$color};
`

const ContainerImg = styled.div`
    width: 3rem; 
    padding: 0;
    padding-left: 1rem;
    margin: 0;
`

const StyledImg = styled.img`
    width: 100%;  
`
const StyledUl = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;
    height: ${ palete.headerHeight };
    list-style: none;
`
const StyledUl2 = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    gap: 1.2rem;
    height: ${ palete.headerHeight };
    list-style: none;
    & div {
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
    }
    @media (min-width: 768px) {
        justify-content: space-between;
        flex-direction: row;
        width: 100%;
        height: ${ palete.headerHeight };
        background-color: transparent;
         div {
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
        }
    }
`

const StyledInput = styled.input`
    margin: 0;
    padding: 0.2rem;
    border-radius: 5px;
    border-color: transparent;
    height: 1.28rem;
    font-family: ${ palete.fontFamily };
`
const StyledButton = styled.button`
    font-family: ${ palete.fontFamily };
    margin-left: 0.2rem;
    padding: 0.2rem;
    border-radius: 5px;
    border-color: transparent;
    height: 1.9rem;
    width: 3rem;
    background-color: #f2d98d;
    cursor: pointer;
    box-shadow: 0px 5px 10px rgba(darken(dodgerblue, 40%));
    transition: all 0.3s;
    border-bottom: 4px solid lighten(gray, 70%);
    &:hover {
        box-shadow: 0px 15px 25px -5px rgba(darken(dodgerblue, 40%));
        transform: scale(1.03);
    }
    &:active {
        box-shadow: 0px 4px 8px rgba(darken(dodgerblue, 30%));
        transform: scale(.98);
    }
`
const StyledLink = styled(Link)`
    font-family: ${ palete.fontFamily };
    color: ${ palete.colorPriText };
    font-size: 1rem;
    text-decoration: none;
    margin-left: 0.2rem;
    padding: 0.2rem 0.5rem 0.2rem 0;
`

const StyledLi = styled.li`
    text-align: center;

`

const ContainerHamburger = styled.button`
    display: flex;
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
    border: none;
    cursor: pointer;
    background-color: transparent;
    @media (min-width: 768px) {
        display: none;
    }
`
const ContainerMenu = styled.div<containerM>`
    display: ${(props) => props.$s === 'true' ? 'flex' : 'none'};
    position: fixed;
    top: ${ palete.headerHeight };
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10rem;
    background-color: #05c7f2;
    @media (min-width: 768px) {
        display: flex;
        width: 56%;
        right: 0;
        flex-direction: row;
        top: 0;
        height: ${ palete.headerHeight };
        background-color: transparent;
      }
`

const Navbar = () => {
    const dispatch = useAppDispatch();
    interface state {
        date: string;
        show: boolean;
    }
    const INITIAL: state = {
        date: "",
        show: false
      }
   const [data, setData] = useState<state>(INITIAL) 

   const handleClick = () => {
    setData((prevData) => {
        return {
            ...prevData,
            show: !prevData.show
        }
    })
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
         const {name, value } = event.target
        setData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        }      
        )
    }
    function handleSubmit(event: React.FormEvent<HTMLFormElement> ) {
        event.preventDefault()
        dispatch(changeDate(data.date))
        dispatch(getDataWorldbydate(data.date))
        setData(prevData => {
            return {
                ...prevData,
                show: !prevData.show,
                date: ''
            }
        })

      }
    return (

    <StyledNavbar $color= { palete.backgroundNav } 
                  $height = { palete.headerHeight }>
        <StyledUl>
            <li>
                <ContainerImg><StyledImg src="./covid.webp" alt="covid-logo" /></ContainerImg>
            </li>

             <ContainerHamburger onClick={ handleClick }>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" fill="#dce4e5" viewBox="0 -960 960 960" width="48"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
             </ContainerHamburger>
             <ContainerMenu $s = { data.show.toString() }>
                <StyledUl2>
                    <StyledLi>
                        <form action="" onSubmit={ handleSubmit }>
                        <StyledInput
                            type="date"
                            value={data.date}
                            name= 'date'
                            min="2020-01-22"
                            max="2023-03-09"
                            onChange={ handleChange }
                            data-testid="nav-date"
                        />
                            <StyledButton>Enter</StyledButton>
                        </form>
                        
                    </StyledLi>
                    <div>
                        <li>
                            <StyledLink to="/" onClick={ handleClick } >Home</StyledLink>
                        </li>
                        <li>      
                            <StyledLink to="/consult" onClick={ handleClick }>Consult a Country</StyledLink>
                        </li> 
                    </div>
                </StyledUl2>
             </ContainerMenu>
         </StyledUl>
    </StyledNavbar>
    )
}

export default Navbar;