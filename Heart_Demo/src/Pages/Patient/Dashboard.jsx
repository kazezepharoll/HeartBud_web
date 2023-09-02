import styled from 'styled-components'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

const Wrapper = styled.div`
  width: 100%;
  background-color: #6bceaa;
  height: 102vh;
`
const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: grey;

  .DetailsContainer{
    width: 100%;
    marign: 10px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: aliceblue;

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

function Dashboard() {
  return (
    <Wrapper>
    <NavBar />
    <Container>
        <h1>Dashboard</h1>
        <h3>Welcome Patients name</h3>

        <div className="DetailsContainer">
            <div className="details">
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
                <button type="submit" className='submit'>CHECK CVD STATUS</button>
            </div>
            <div className="Action">
                <button type="button" className='button'>Notifications</button>
                <button type="button" className='button'>Details Stats</button>
                <button type="button" className='button'>See Doctor</button>
                <button type="button" className='button'>Diet Schedule</button>
                <button type="button" className='button' >Set Reminder</button>
                <button type="button" className='button'>Food Preferences</button>
            </div>
        </div>
      
    </Container>
    <Footer />
    </Wrapper>
  )
}

export default Dashboard
