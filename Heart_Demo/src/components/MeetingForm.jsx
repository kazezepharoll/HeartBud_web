import {useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function MeetingForm() {
  const [purpose, setPurpose] = useState('')
  const [details, setDetails] = useState('');
  const [patients, setPatients] = useState([])
  const [patientId, setPatientId] = useState('');
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate()



  useEffect(() => {
    async function fetchData() {
      try {
        const patientID = await axios.get('http://localhost:3000/patients');
        console.log(patientID.data[0].idpatients);

        setPatients(patientID.data)
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []);
  

  const handleClick = async (e)=>{
    e.preventDefault()
    
    try {

      
      const response = await axios.post("http://localhost:3000/appointment", {purpose, date,  details, patientId});

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
        </div>
      <div className="Main">
      <div className="wrap">
        <label htmlFor="">Patient ID:</label> <b style={{color: 'green', width: '520px'}} >Patient_X00{patientId}</b>
        </div>

          <div className="wrap">
        <label>Patient Name: </label>
        <select className='select' value={patientId} onChange={(e)=> setPatientId(e.target.value)}  style={{width: '500px'}}>
          <option>Patients Name</option>
          {patients.map(patient=>(
            <option value={patient.idpatients} key={patient.idpatients}>{patient.fullnames}</option>
            ))}
        </select>
        </div>
        <div className="wrap">
        <label htmlFor="purpose">Purpose: </label>
        <input type="text" name="purpose" id="purpose" value={purpose} onChange={(e)=> setPurpose(e.target.value)} className='select'/> 
        </div>

<div className="wrap">

<label>Time:</label>
<input type="datetime-local" name="date" className='select' value={date} id="" onChange={(e)=> setDate(e.target.value)}/>

 </div >
        <div className="wrap">
        <label htmlFor="Details">Details: </label>
        <input type="textarea" name="Details" id="Details" value={details} onChange={(e)=> setDetails(e.target.value)} className='select'/>
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
    width: 100%; 
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

`