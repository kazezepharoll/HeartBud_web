import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
width: 100%;
height: 70vh;
background-color: #ffffff;
display: flex;
justify-content: space-around;
align-items: center;
flex-wrap: wrap;
.profile{
    width: 500px;
    height: 500px;
}
img{
    width: 400px;
    height: 400px;
};
p{
    color: #347571;
    font-size: 26px;
    line-height: 30px;
}
h1{
    color: #5ec57e;
    font-size: 50px;
}
`
const Container = styled.div`
width: 100%;
margin-bottom: 200px;
`
const Service = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: #078d44;
font-weight: bold;
h1{
  font-size: 52px;
}

.services{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .card{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    width: 500px;
    height: 500px;
    background-color: #dcf4ce;

  }

  .card:hover{
    
    background-color: #b8e28a;
  }

  h3{
    font-size: 30px;
  }
  p{
    font-size: 20px;
  }

  img{
    width: 50%;
    heigth: 50%;
  }
}

`

function About() {
  return (
    <Container>
        <Wrapper>
      <img src="/medical.png" alt="" sizes="" />
      <div className="profile">
        <h1>HeardBud Profile</h1>
        <p>color palettes generator! Create the perfect palette or get inspired by thousands of beautiful color schemes. 
            Start the generator! Explore trending palettes. We are 4 million users! iOS App. Create, browse and save
        </p>
      </div>
    </Wrapper>
    <Service>
        <h1>Our Services</h1>
        <div className="services">
            <div className="card">
              <img src='/Images/dia.png' alt='No image found' />
              <h3>Early Diagnosis of CVD</h3>
              <p>Explaining this service</p>
            </div>
            <div className="card">
            <img src='/Images/R.png' alt='No image found' />
              <h3>Management of CVDs</h3>
              <p>Explaining this service</p>
            </div>
            <div className="card">
            <img src='/Images/manage.png' alt='No image found' />
              <h3> Appointments with the specialist</h3>
              <p>Explaining this service</p>
            </div>
        </div>
    </Service>

    </Container>

  )
}

export default About
