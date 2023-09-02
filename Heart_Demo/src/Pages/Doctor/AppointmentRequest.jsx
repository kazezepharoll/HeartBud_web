import styled from "styled-components"
import NavBar from "../../components/NavBar"
import Sidebar from "../../components/Sidebar"
import Footer from "../../components/Footer"

const Wrapper = styled.div`
  width: 100%;
  background-color: #6bceaa;
`
const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  
`
const Container = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #d9d9d9;
  margin-right: 50px;

  .bar{
    display: inline-block;
    overflow: hidden;
    width: 200px;
    height: 80vh;
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

  .main{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 80vh;
    width: 80%;
    font-size: 20px;
    
  }
  .Item{
    display: flex;
    justify-content space-around;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    font-size: 22px;
  }
  .Item1{
    display: flex;
    justify-content space-between;
    align-items: start;
    width: 80%;
    font-size: 22px;
  }
  .confirm, .cancel{
    padding: 10px 30px;
    font-size: 20px;
    font-weight: bold;
  }
  .confirm:hover{
    background-color: #078d46;
    color: white;
  }
  .cancel:hover{
    background-color: red;
    color: white;
  }
`

function AppointmentRequest() {
  return (
    <Wrapper>
        <NavBar />
        <MainWrapper>        
        <Sidebar />
        <Container>
            <div className="bar">
                <button className="button" style={{alignItems: ''}}>message Request</button>
                <button className="button">Critical case!</button>
                <button className="button">Emmergency!</button>
                <button className="button">request</button>
            </div>
            <div className="main">
                <h1>Appointment Request</h1>
                <div className="Item">
                    <p>Patient Name: </p>
                    <p>Purpose: </p>
                    <p><b>Details:</b> Medicine is the science and practice of caring for a patient, managing the diagnosis, prognosis,
                         prevention, treatment, palliation of their injury or disease, and promoting their health. Medicine encompa… </p>
                    </div>
                <div className="Item1">
                    <button className="cancel">Decline</button>
                    <button className="confirm">Accept</button>
                    </div>
            </div>
        </Container>
        </MainWrapper>
        <Footer />
    </Wrapper>
  )
}

export default AppointmentRequest
