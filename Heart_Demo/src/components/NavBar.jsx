import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Home from '../Pages/Home'

const Container = styled.div`
width: 100%;
display: flex;
justify-content: space-evenly;
align-items: center;
font-size: 22px;
height: 100px;
background-color: #078d46;
box-shadow: 4px 3px 5px black;

a,li{
    width: 20%;
    list-style: none;
    text-align: center;
    color: aliceblue;
    padding: 20px;
}
a:hover,li:hover{
  cursor: pointer;
  border-bottom: 3px solid yellow;
}
a{
  text-decoration: none;
  color: white;
}
`

function NavBar() {
  return (
    <Container>
        <Link to={'/'} element={<Home />}>Home</Link>
        <li>History</li>
        <li>pages</li>
        <li>Notifications</li>
        <li>See Doctor</li>
        <li>logout</li>
    </Container>
  )
}

export default NavBar
