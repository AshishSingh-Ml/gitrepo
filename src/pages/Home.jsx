import React from 'react'
import Navbar from '../components/Navbar'
import Search from '../components/Search'
import styled from 'styled-components'

const Container = styled('div')`
width: 98.8vw;
min-height: 100vh;
background: rgb(54,93,106);
background: linear-gradient(90deg, rgba(54,93,106,1) 38%, rgba(12,194,231,1) 76%);
`
const Home = ({userData}) => {
 
    
  return (
    <>
    <Navbar userData={userData}/>
    <Container>
    <Search/>
    </Container>
    </>
  )
}

export default Home