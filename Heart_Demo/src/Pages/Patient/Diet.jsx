import styled from "styled-components"
import NavBar from "../../components/NavBar"
import Sidebar from "../../components/Sidebar"

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
  padding-right: 50px;
  margin-right: 50px;
  
  .bar{
    display: inline-block;
    overflow: hidden;
    width: 200px;
    height: 92vh;
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
    margin-top: 10px;
    
  }
  .Item{
    display: flex;
    justify-content space-around;
    align-items: start;
    width: 100%;
    font-size: 22px;
    border: 1px solid black;

  }
  .Item :first-child{
    font-size: 22px;
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

function Diet() {
  return (
    <Wrapper>
        <NavBar />
        <MainWrapper>        
        <Sidebar />
        <Container>
            <div className="bar">
                <button className="button" style={{alignItems: ''}}>BreakFast</button>
                <button className="button">Blunch</button>
                <button className="button">Lunch</button>
                <button className="button">Supper</button>
            </div>
            <div className="main">
                <h1> WEEKLY DIET PLAN</h1>
                <div className="Item">
                    <p>MONDAY</p>
                    <p>put some paragraph here</p>
                    </div>
                <div className="Item">
                    <p>TUESDAY</p>
                    <p>Medicine is the science and practice of caring for a patient, managing the diagnosis, prognosis,
                     </p>
                    </div>
                <div className="Item">
                    <p>WEDNESDAY</p>
                    <p>Medicine is the science and practice of caring for a patient, managing the diagnosis</p>
                    </div>
                    <div className="Item">
                    <p>THURSDAY</p>
                    <p>put some paragraph here</p>
                    </div>
                    <div className="Item">
                    <p>FRIDAY</p>
                    <p>put some paragraph here</p>
                    </div>
                    <div className="Item">
                    <p>SATERDAY</p>
                    <p>put some paragraph here</p>
                    </div>
                    <div className="Item">
                    <p>SUNDAY</p>
                    <p>put some paragraph here</p>
                    </div>
            </div>
        </Container>
        </MainWrapper>

    </Wrapper>
  )
}

export default Diet
