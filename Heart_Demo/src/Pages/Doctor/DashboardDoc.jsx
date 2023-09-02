import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const Wrapper = styled.div`
  width: 100%;
  background-color: #6bceaa;

`;

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: grey;

  .DetailsContainer {
    width: 100%;
    margin: 10px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: aliceblue;
  }

  .details {
    background-color: #d9d9d9;
    width: 400px;
    padding: 10px;
    margin: 10px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    position: relative;
  }

  .detailsItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }

  .submit {
    width: 250px;
    background-color: #078d46;
    height: 50px;
    font-size: 16px;
    font-weight: bold;
    color: white;
  }

  .submit:hover {
    cursor: pointer;
    height: 55px;
    background-color: green;
  }

  .Action {
    width: 800px;
    margin: 100px;
  }

  .button {
    width: 300px;
    height: 115px;
    margin: 20px 10px;
    border-radius: 15px;
    background-color: #fff;
    font-size: 22px;
    font-weight: bold;
    box-shadow: 5px 4px 7px black;
    border: none;
    position: relative;
    z-index: 1;
  }

  .button:hover {
    background-color: darkred;
    width: 300px;
    height: 120px;
    color: white;
  }

  .detailsItem:hover .item-overlay {
    opacity: 1;
  }

  .item-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .item-overlay-text {
    color: white;
    font-size: 16px;
    font-weight: bold;
  }
`;

function DasboardDoc() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <NavBar />
      <Container>
        <h1>Dashboard</h1>
        <h3>Welcome Doctors name</h3>
        <div className="DetailsContainer">
          <div className="details">
            <h3>Recently Monitored Patients</h3>
            <div className="detailsItem">
              <p>Patient </p>
              <p>Status</p>
              <div className="item-overlay">
                <div className="item-overlay-text">View Patient Details</div>
              </div>
            </div>
            <div className="detailsItem">
              <p>Joseph: </p>
              <p>Number</p>
              <div className="item-overlay">
                <div className="item-overlay-text">View Patient Details</div>
              </div>
            </div>
            <div className="detailsItem">
              <p>Ahmed: </p>
              <p>Number</p>
              <div className="item-overlay">
                <div className="item-overlay-text">View Patient Details</div>
              </div>
            </div>
            {/* ...other detailsItem elements... */}
            <button type="submit" className="submit">
              View Full history
            </button>
          </div>
          <div className="Action">
            <button type="button" className="button">
              Notifications
            </button>
            <button type="button" className="button" onClick={()=> navigate('/doctor/appointment') }>
              Schedule Appointment
            </button>
            <button type="button" className="button" onClick={()=> navigate('/doctor/prescription') }>
              Prescribe Medicine
            </button>
            <button type="button" className="button" onClick={()=> navigate('/doctor/appointment') }>
              Diet Schedule
            </button>
            <button type="button" className="button">
              Set Reminder
            </button>
            <button type="button" className="button" onClick={()=> navigate('/doctor/predict') }>
              Check Patients CVD status
            </button>
          </div>
        </div>
      </Container>
      <Footer />
    </Wrapper>
  );
}

export default DasboardDoc;
