import styled from "styled-components"
import NavBar from "../../components/NavBar"
import Sidebar from "../../components/Sidebar"
import Footer from "../../components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"

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
  
  .appointment{
    width: 90%;
    display: flex;
    align-items: center;
    flex-direction: column
  }

  .item{
    border-bottom: 2px solid black;
    border-top: 2px solid black;
    padding-bottom: 0;
    margin-bottom: 7px;
  }
  .item, .item2{
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 18px;
    font-weight: bold;

  }

  .item2{
    justify-content: space-between;
    background: grey;
    padding: 2px 10px;
    color: white;
    border-radius: 15px;
    margin-top: 3px;
  }
  .item2:hover{
    background: lightblue;

  }
  .item2 > button{
    background: darkred;
    border: none;
    padding: 5px 10px;
  }
  .item2 > button:hover{
    background: red;
  }
`

function Appointments() {

    const [appointments, setAppointments] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the appointments from the API when the component mounts
        const fetchAppointments = async () => {
          try {
            const response = await axios.get("http://localhost:3000/doctor/appointments");
            const data = response.data;
            setAppointments(data.data);
          } catch (error) {
            console.error(error);
          }finally{
            setLoading(false)
          }
        };
    
        fetchAppointments();
      }, []); // Empty dependency array ensures this effect runs only once
    
  
        const handleDelete= async(idappointment) =>{
            try{
                const response = await axios.delete(`http://localhost:3000/deleteappointment/${idappointment}`)
                const data = response.data;

                setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.idappointment !== idappointment));

                // Re-fetch appointments to ensure up-to-date data
                //fetchAppointments();
            }catch(error){
                console.log(error)
            }
        }



  return (
    <Wrapper>
        <NavBar />
        <MainWrapper>        
        <Sidebar />
        <Container>
          <div className="appointment">
            <h1>Available Appointments</h1>
            <div className="item">
                <h3>Date</h3>
                <h3>Purpose</h3>
            </div>
            {loading?(<p>Loading appointments...</p>):(
             appointments.map((appointment) => (
             <div key={appointment.idappointment} className="item2">
                 <p>{appointment.day}</p>
                 <p>{appointment.purpose}</p>
                 <button onClick={()=>{ const id =appointment.idappointment; handleDelete(id)}}>remove</button>
               </div>
             ))
            )}

          </div>
        </Container>
        </MainWrapper>
        <Footer />
    </Wrapper>
  )
}

export default Appointments
