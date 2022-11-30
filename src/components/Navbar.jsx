import { Search} from '@material-ui/icons'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
const Container = styled.div`
background: lightgray;
height:50px;
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:10px 100px;
    @media (max-width: 600px) {
      padding: 10px 40px;
    }

`
const Center = styled.div`

`
const Logo = styled.h1`
font-size: 24px;
font-weight: 300;
cursor: pointer;
&:hover{
  color: aqua;
}
@media (max-width: 600px) {
  font-size: 16px;
}
`
const Navbar = () => {
 
  return (
    <Container>
        <Wrapper>
         <Center>
            <Logo>Digi-K Labs</Logo>
         </Center>
         
        </Wrapper>
    </Container>
  )
}

export default Navbar