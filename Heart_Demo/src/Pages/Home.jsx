import styled from 'styled-components'
import About from './About';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import GeneralBar from '../components/GeneralBar';


const Wrapper = styled.div`
width: 100%;
font-family: arial,sans-sarif;
h1{
  color: white;
}
`

const Container = styled.div` 
width: 100%;
display: flex;
justify-content: space-around;
flex-direction: column;
align-items: center;
background: url('/cardio.jpg');
background-repeat: no-repeat;
background-size: cover;
background-position: left;

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
  font-size: 150px;
  text-shadow: 0px 10px 5px rgba(0, 0, 0, 0.5);
  text-align: left;
};

h3{
  font-size: 30px;
  text-shadow: 5px 15px 5px rgba(0, 0, 0, 0.5);
  padding: 10px;
  color:#fff;
};

.welcome{
  text-align: center;
  width: 50%;
  margin-bottom: 100px;
}
`

const Home = () => {
  return (
    <>
    <Wrapper>
    <GeneralBar />
      <Container>

      <h1>HeardBud</h1>
      <div className="welcome">
        <h3>
        Get your heart condition monitored and check your risk of contacting cardiovascular disease!!
        </h3>
        <Link to={'/login'} >Get Started</Link>
      </div>

    </Container>
    <About />
    <Footer />
    </Wrapper>

    </>



  );
};



export default Home;
