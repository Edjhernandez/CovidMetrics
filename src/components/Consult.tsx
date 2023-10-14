import styled from 'styled-components'
import { palete } from '../assets/palete'
const StyledH1 = styled.h1`
    font-family: ${ palete.fontFamilyTitle };
    letter-spacing: 2px;
    text-shadow: 1px 2px 1px rgba(0,0,0,0.69); 
    color: ${ palete.colorPriText };
    margin: 5rem 0 0 1.5rem;
`
function Consult() {
  return (
    <StyledH1>Consult a Country</StyledH1>
  )
}

export default Consult