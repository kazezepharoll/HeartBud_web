import styled from "styled-components"
import NavBar from "../../components/NavBar"
import Sidebar from "../../components/Sidebar"
import Footer from "../../components/Footer"
import Graph from "../../components/Graph"
import { Navigate, useNavigate } from "react-router-dom"

const Wrapper = styled.div`
  width: 100%;
  background-color: #6bceaa;
`
const MainWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  
  
`
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  background-color: aliceblue;
  margin-right: 50px;
  margin-top: 50px;
  padding: 20px;
  
  .bar{
    display: inline-block;
    overflow: hidden;
    width: 200px;
    height: 90vh;
    background-color: aliceblue;
    box-shadow: 5px 2px 4px black;
  }

  .button{
    font-size: 22px;
    margin: 30px auto;
    border: none;
    width: 95%;
    background-color: aliceblue;
  }
  .button:focus{
    background-color: grey;
  }
  .button:hover{
    background-color: grey;
  }

 
  .details{
    background-color: #d9d9d9;
    width: 400px;
    padding: 10px;
    margin: 10px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }

  .detailsItem{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .submit{
    width: 250px;
    background-color: #078d46;
    height: 50px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    
  }
  .submit:hover{
    cursor: pointer;
    height: 55px;
    background-color: green;
  }
  .Action{
    width: 800px;
    margin: 3px auto;
  }

  .button{
    width: 300px;
    height: 115px;
    margin: 20px 10px;
    border-radius: 15px;
    background-color: #fff;
    font-size: 22px;
    font-weight: bold;
    box-shadow: 5px 4px 4px black;
  }
  .button:hover{
    background-color: darkred;
    width: 300px;
    height: 130px;
    color: white;
  }
`
const  containerWrapper = styled.div`
  width: 90%;
`

function PatientDetails() {
  const navigate = useNavigate();
  const patientStates = [15, 30, 50, 10, 25, 60, 12, 18, 15, 30, 50, 10, 25, 60, 12, 18];

  return (
    <Wrapper>
        <NavBar />
        <MainWrapper>        
        <Sidebar />
       
        <Container>
        <div className="main">
          <Graph patientStates={patientStates}/>
        </div>

        <div className="details">
        <h1>Patient name stats</h1>
                <h3>Details</h3>
                <div className="detailsItem">
                    <p>Cholesterol: </p>
                    <p>Number</p>
                </div>                
                <div className="detailsItem">
                    <p>Cholesterol: </p>
                    <p>Number</p>
                </div>               
                 <div className="detailsItem">
                    <p>Cholesterol: </p>
                    <p>Number</p>
                </div>                
                <div className="detailsItem">
                    <p>Cholesterol: </p>
                    <p>Number</p>
                </div>                
                <div className="detailsItem">
                    <p>Cholesterol: </p>
                    <p>Number</p>
                </div>                
                <div className="detailsItem">
                    <p>Cholesterol: </p>
                    <p>Number</p>
                </div>                
                <div className="detailsItem">
                    <p>Cholesterol: </p>
                    <p>Number</p>
                </div>                
                <button type="submit" className='submit' onClick={()=> navigate('/docter/appointment')}>SCHEDULE MEETING</button>
            </div>

        </Container>
        </MainWrapper>
        <Footer />
    </Wrapper>
  )
}

export default PatientDetails
