import {useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function MeetingForm() {
  const [purpose, setPurpose] = useState()
  const [day, setDay] = useState();
  const [details, setDetails] = useState();
  const [error, setError] = useState();

  const [date, setDate] = useState();
  const [amOrPm, setAmOrPm] = useState('');
  const [time, setTime] = useState();
const navigate = useNavigate()



  const handleClick = async (e)=>{
    e.preventDefault()
    
    if (!amOrPm) {
      setError('Please select AM or PM.');
      console.log(error)
      return;
    }
  
    // Combine the selected hour, minute, and amOrPm to create the formatted time
    const formattedTime = `${date} ${amOrPm}`;
  
    try {
      setTime((prevTime) => {
        // Set the formattedTime directly
        return formattedTime;
      });
      
      const response = await axios.post("http://localhost:3000/appointment", {purpose, day, time: formattedTime, details});

      const responseData = response.data;

      console.log(responseData.success)
      if(responseData.success){
        navigate('/Doctor/listappointment');
      }else{
        setError(responseData.message);
      }
    } catch (error) {
      console.error(error)
    }
  }


    return (
    <Container>
      <p style={{colo: 'white', padding: '10px 15px', background: 'red'}}>{error}</p>
        <form className="MainContainer" action="" method="post">
        <div className="header">
        <h1>Schedule Appointment</h1>
        <h3>Patient Name: their names</h3>
        <h3>Patient ID: their Id</h3>
      </div>
      <div className="Main">
        <div className="wrap">
        <label htmlFor="purpose">Purpose: </label>
        <input type="text" name="purpose" id="purpose" value={purpose} onChange={(e)=> setPurpose(e.target.value)} className='purpose'/> 
        </div>
        <div className="wrap">
          <label htmlFor="Day">Date: </label>
          <input type="Date" name="date" id="date" value={day} onChange={(e)=> setDay(e.target.value)} className='purpose'/> 
          {/* <select name="Date" className='day select' value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">Choose a Day</option>
            <option value="Saturday">Saturday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            {/* ...and so on for other days */}
          {/* </select>  */}
         </div>

<div className="wrap">

<label>Time:</label>
<input type="time" name="date" className='select' value={date} id="" onChange={(e)=> setDate(e.target.value)}/>

  <input
  className='time'
    type="radio"
    id="am"
    name="amPm"
    value="AM"
    checked={amOrPm === "AM"}
    onChange={() => setAmOrPm("AM")}
  />
  <label htmlFor="am">AM</label>

  <input
  className='time'
    type="radio"
    id="pm"
    name="amPm"
    value="PM"
    checked={amOrPm === "PM"}
    onChange={() => setAmOrPm("PM")}
  />
  <label htmlFor="pm">PM</label>


 </div >
        <div className="wrap">
        <label htmlFor="Details">Details: </label>
        <input type="textarea" name="Details" id="Details" value={details} onChange={(e)=> setDetails(e.target.value)} className='purpose'/>
        </div>

        </div>
        <div className="Footer">
        <button type="submit">BACK</button>
        <button type="submit" onClick={handleClick}>SEND</button>
      </div>

        </form>


    </Container>
  )
}

const Container = styled.div`
  width: 90%;
  background: aliceblue;
  font-weight: bold;
  
  .MainContainer{
    width:100%; 
    height: 70vh;
    margin: 10px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }
  .Main{
    width:70%; 
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    flex-direction: column;
  }
  .header, .Main, .Footer{
    width: 80%;
  }
  .Footer{
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
  .select, input{
    width: 500px;
    height: 40px;
    background-color: #6bceaa;
    margin: 10px 0;
    padding-left: 10px;
    font-size: 16px;
    border-radius: 20px;
  }

  button{
    padding: 10px 20px;
    width: 100px;
    background-color: green;
    cursor: pointer;
  }

  .time{
    display: inline-block;
    width: 70px;
  }
  .select{
    display: inline-block;
    width: 200px;
  }
  .wrap{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .day{
    width: 450px;
  }
  label{
    margin-right: 30px;
  }
  .purpose{
    width: 460px;
  }

`