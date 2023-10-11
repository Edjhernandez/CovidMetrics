import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { palete } from '../assets/palete'
//  &:hover {
//   background-color: #add23580;
// }
type navType = {
    color?: string; 
    height?: string;
  };
  
const StyledNavbar = styled.nav<navType>`
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0;
    height: ${(props) => props.height};
    width: 100%;
    font-weight: 400;
    font-size: 1.2rem;
    background-color: ${(props) => props.color};
`

const ContainerImg = styled.div`
    width: 3rem; 
    padding: 0;
    margin: 0;
`

const StyledImg = styled.img`
    width: 100%;  
`
const StyledUl = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 0;
    padding: 0;
    height: ${ palete.headerHeight };
    list-style: none;
`

const StyledInput = styled.input`
    margin: 0;
    padding: 0.2rem;
    border-radius: 5px;
    border-color: transparent;
    height: 1.2rem;
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
    width: 65%;
    text-align: center;

`

const Navbar = () => {
    return (
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//   <div className="container-fluid">
//     <a className="navbar-brand" href="#">Navbar</a>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//         <li className="nav-item">
//           <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/about">About</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/cards">Cards</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/users">User</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/form">Form</Link>
//         </li>
        
//       </ul>
    
//     </div>
//   </div>
// </nav>

    <StyledNavbar color= { palete.backgroundNav } 
                  height = { palete.headerHeight }>
        <StyledUl>
            <li>
                <ContainerImg><StyledImg src="./covid.webp" alt="covid-logo" /></ContainerImg>
            </li>

          
             <StyledLi>
                <StyledInput type="text" placeholder='2023-03-01'/>
                <StyledButton>Enter</StyledButton>
               {/* <Link className="nav-link active" aria-current="page" to="/">Home</Link> */}
             </StyledLi>

             <li >
               <StyledLink to="/consult">Consult a Country</StyledLink>
             </li>
         </StyledUl>
          
        
    </StyledNavbar>
    )
}

export default Navbar;