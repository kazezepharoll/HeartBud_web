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

  .main{
    display: inline-block;
    height: 90vh;
    width: 80%;
    
  }
  .Item{
    display: flex;
    justify-content space-around;
    align-items: start;
    width: 100%;
    font-size: 22px;

  }
  .Item :first-child{
    font-size: 32px;
    font-weight: bold;
    width: 200px;
    text-align: right;
    margin-right: 30px;
  }
  .Item :last-child{
    width: 600px;
    color: blue;
  }
`

function Prescription() {
  return (
    <Wrapper>
        <NavBar />
        <MainWrapper>        
        <Sidebar />
        <Container>
            <div className="bar">
                <button className="button" style={{alignItems: ''}}>Asprin</button>
                <button className="button">Asprin</button>
                <button className="button">Asprin</button>
                <button className="button">Asprin</button>
            </div>
            <div className="main">
                <div className="Item">
                    <p>Disease Name</p>
                    <p>put some paragraph here</p>
                    </div>
                <div className="Item">
                    <p>Dossage</p>
                    <p>Medicine is the science and practice of caring for a patient, managing the diagnosis, prognosis,
                         prevention, treatment, palliation of their injury or disease, and promoting their health. Medicine encompa… </p>
                    </div>
                <div className="Item">
                    <p>Precaution</p>
                    <p>Medicine is the science and practice of caring for a patient, managing the diagnosis, prognosis, prevention,
                         treatment, palliation of their injury or disease, and promoting their health. Medicine encompa…</p>
                    </div>
            </div>
        </Container>
        </MainWrapper>
        <Footer />
    </Wrapper>
  )
}

export default Prescription
