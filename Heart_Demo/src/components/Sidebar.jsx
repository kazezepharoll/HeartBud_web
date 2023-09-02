import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 200px;
  height: 100vh;
  background-color: #078d46;
  box-shadow: 5px 2px 4px black;

  .Item{
    font-size: 22px;
    margin: 30px auto;
    border: none;
    width: 95%;
    background-color: #078d46;
  }
  .Item:focus{
    background-color: grey;
  }
  .Item:hover{
    background-color: grey;
  }
`
export default function Sidebar() {
  return (
    <Container>
      <button className="Item">Dashboard</button>
      <button className="Item"> Notification</button>
      <button className="Item"> Diet</button>
      <button className="Item"> Prescription</button>
    </Container>
  )
}
