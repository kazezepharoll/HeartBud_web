
import styled from 'styled-components'
import Footer from '../components/Footer';
import GeneralBar from '../components/GeneralBar';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

export default function Registration() {
  const [fullnames, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPWD, setConfirmPWD] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const role = "patient";
    try {
      if(password === confirmPWD && password.length > 8){
        const response = await axios.post("http://localhost:3000/register", {fullnames, email, role, password})
        const data = response.data;
  
        if(data.success === true){
          navigate('/login');
        }else{
          setMessage(data.message);
        }
      }else{
        setMessage(" Please make sure your passwords are matching and are not less than 8 characters!!")
      }

    } catch (error) {
      console.error('Error registering this user:', error);
      setMessage(error.response.data.message)
    }
  }
  return (
    <Wrapper>
        <GeneralBar />
        <Container>
        <div className="MainContainer" action="" method="post" >
        <div className="header">
        {
        message?
        (<p style={{backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '10px'}}>{message}</p>):
        (null)
        }
        <h1>Patient Registration Form</h1>
        <p>Fill up the patient registration form below to access the services offered by our system.</p>
      </div>
      <div className="Main">
        <div className="wrap">
        <label htmlFor="fullname">Fullname: </label>
        <label htmlFor="email">Email: </label>
        <label htmlFor="password">password: </label>
        <label htmlFor="confirmPWD">confirm Password: </label>
        </div>
        <div className="wrap">
        <input onChange={(e)=> setFullname(e.target.value)} value={fullnames} type="text" name="fullname" id="fullname" />
        <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" name="email" id="email" /> 
        <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" name="password" id="password" />
        <input onChange={(e)=> setConfirmPWD(e.target.value)} value={confirmPWD} type="password" name="confirmPWD" id="confirmPWD" />
        </div>
        
      </div>
      <button type="submit" onClick={handleSubmit}>REGISTER</button>
      </div>
        </Container>
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  background-color: #6bceaa;

`;

const Container = styled.div`
  width: 800px;
  margin: 20px auto;
  font-size: 22px;

  .MainContainer{
    margin: 10px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    background-color: white;
    box-shadow: 4px 3px 5px black;
    border-radius: 15px;
    padding: 7px;
  }
  .Main{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header, .Main, .Footer{
    width: 100%;
  }
  .header{
    width: 500px;
    display: inline-block;
    margin: 5px auto;
  }
  .Footer{
    width: 70%;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
  input{
    display: block;
    width: 400px;
    height: 40px;
    background-color: #6bceaa;
    margin: 20px 0;
    padding-left: 10px;
    font-size: 16px;
    border-radius: 20px;
  }
  .item>button{
    display: block;
    margin-top: 10px;
    background-color: white;
    width: 150px;
  }
  .item :first-child:hover{
    background-color:  #6bceaa;
  }

  label{
    display: block;
    font-size: 22px;
    margin: 40px 10px;
  }
  button{
    padding: 15px 20px;
    width: 250px;
    background-color: green;
    cursor: pointer;
    border-radius: 20px;
  }

  button:hover{
    background-color:  #6bceaa;
  }
`