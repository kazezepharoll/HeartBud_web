
import styled from 'styled-components'
import Footer from '../components/Footer';
import GeneralBar from '../components/GeneralBar';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

export default function Login() {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      const userData = response.data;
      console.log(userData); // For debugging purposes

      // Redirect users based on their role
      if (userData.user === 'doctor') {
        navigate('/doctor');
      } else if (userData.user === 'patient') {
        navigate('/patient');
      } else {
        navigate('/notFound')
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.response.data.error)
      // Handle login error here and display a message to the user if needed
    }
  }

  
  return (
    <Wrapper>
        <GeneralBar/>
        <Container>
        <form className="MainContainer" action="" method="post">
        <div className="header">
        {
        error?
        (<p style={{backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '10px'}}>{error}</p>):
        (null)
        }
        <h1>Login Form</h1>
        <p>Fill up the registration form to login in</p>
      </div>
      <div className="Main">
        <div className="wrap">
        <label htmlFor="email">Email: </label>
        <label htmlFor="password">password: </label>
        </div>
        <div className="wrap">
        <input type="email" name="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)}/> 
        <input type="password" name="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <p>Forgot password? You can restore password <b style={{color: 'green', cursor: 'pointer'}} onClick={()=> navigate('/getpasscode')}> reset passwrod</b></p>
        </div>
        
      </div>
      <button type="submit" onClick={handleClick}>LOGIN</button>

      <p>Not registered yet? <b style={{color: 'blue', cursor: 'pointer'}} onClick={()=> navigate('/register')}> click here</b></p>
      </form>
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
`;