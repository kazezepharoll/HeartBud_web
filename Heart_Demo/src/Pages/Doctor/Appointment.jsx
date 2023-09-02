import styled from "styled-components"
import NavBar from "../../components/NavBar"
import Sidebar from "../../components/Sidebar"
import Footer from "../../components/Footer"
import MeetingForm from "../../components/MeetingForm"

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
  width: 70%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  background-color: aliceblue;
  margin-right: 100px;
  margin-top: 50px;
  padding: 20px;
  
`

function Appointment() {

  return (
    <Wrapper>
        <NavBar />
        <MainWrapper>        
        <Sidebar />
        <Container>
          <MeetingForm/>
        </Container>
        </MainWrapper>
        <Footer />
    </Wrapper>
  )
}

export default Appointment
