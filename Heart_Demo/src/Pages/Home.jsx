
import styled from 'styled-components'
import About from './About';
import Footer from '../components/Footer';

import { Link } from 'react-router-dom';
import GeneralBar from '../components/GeneralBar';


const Wrapper = styled.div`
width: 100%;
background-color: #078d46;
font-family: arial,sans-sarif;
h1{
  color: white;
}
`
const Container = styled.div` 
display: flex;
justify-content: space-around;
align-items: center;

`
const LeftWrapper = styled.div`
flex: 2;
width: 70vh;
height: 100vh;
background-color: #3E6D9C;
border: 2px solid #000;
box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.5);
`
const LeftContainer = styled.div`
display: flex;
justify-content: space-around;
flex-direction: column;
width: 700px;
margin: 100px auto;
padding: 10px;
color: white;

a{
  width: 200px;
  padding: 15px 5px;
  background: #c60000;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  color: white;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}
h1{
  font-size: 40px;
  text-shadow: 0px 10px 5px rgba(0, 0, 0, 0.5);

};
h3{
  font-size: 60px;
  text-shadow: 5px 15px 5px rgba(0, 0, 0, 0.5);

  padding: 10px;
}
`
const RightContainer = styled.div`
flex: 1.2;
margin-left: 40px;
img{
  width: 500px;
  height: 700px;
};
`
const Home = () => {

  return (
    <>
        {/* <nav >
            <div></div>
          <Link to="/predict" className="logo" element={<Predictor />}>
            Cardio Prediction
          </Link>
        </nav>
        <div>
      <h1 >Welcome to Cardiovascular Disease Predictor</h1>
      <p >Predict the likelihood of cardiovascular disease using machine learning</p>
     <button ><Link to={'/predict'} element={<Predictor />} style={{color: 'white'}} >Go to Predictor</Link></button>
    </div>
    <Footer /> */}
    <Wrapper>
    <GeneralBar />
      <Container>

    <LeftWrapper>
    <LeftContainer>
      <h1>HeardBud</h1>
      <div className="welcome">
        <h3>
        Get your heart condition monitored and check your risk of contacting cardiovascular disease!!
        </h3>
      </div>
      <Link to={'/login'} >Get Started</Link>
    </LeftContainer>
    </LeftWrapper>

    <RightContainer>
      <img src='/stethoscope.png' alt="" />
    </RightContainer>
    </Container>
    </Wrapper>
    <About />
    <Footer />
    </>



  );
};



export default Home;
