import styled from "styled-components"
import NavBar from "../../components/NavBar"
import Sidebar from "../../components/Sidebar"
import Footer from "../../components/Footer"
import PresriptionForm from "../../components/PrescriptionForm"

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
  width: 80%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  background-color: #6bceaa;
  margin-top: 5px;
  padding: 20px;
  
`

function PrescriptionManagement() {

  return (
    <Wrapper>
        <NavBar />
        <MainWrapper>        
        <Sidebar />
        <Container>
          <PresriptionForm/>

        </Container>
        </MainWrapper>
        <Footer />
    </Wrapper>
  )
}

export default PrescriptionManagement
