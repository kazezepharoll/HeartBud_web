import { useState } from 'react';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import Home from '../Home';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
// import '../App.css'


const Predictor = () => {
const [fullname, setFullname] = useState('')
const [message, setMessage] = useState('')

  //parameter for testing cardiovascular diseases
  const [prediction, setPrediction] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [cholesterol, setCholesterol] = useState('');
  const [systolicPressure, setSystolicPressure] = useState('');
  const [diastolicPressure, setDiastolicPressure] = useState('');
  const [height, setHeight] =useState('')
  const [weight, setWeight] = useState('')
  const [glucose, setGlucose] = useState('')
  const [takesAlcohol, setTakesAlcohol] = useState(0)
  const [isActive, setIsActive] = useState(0)
  const [smokes, setSmokes] = useState(0)
  const [showPrediction, setShowPrediction] = useState(false);



  const sendEmailToDoctor = async () => {
    try {
      // Prepare the email content
      let sex = '';
      if(gender === '1'){
        sex = 'Male'
      }else{
        sex = 'Female'
      }
      const subject = 'Cardiovascular Disease Alert';
      const content = `Patient Details:\n\nName: ${fullname}\nAge: ${age}\nGender: ${sex}\n Results: HeartBud has 
      predicted that ${fullname} is at risk of cardiovascular diseases,\n Here is their current
      Symptoms:\n\n ${message}`; // Include relevant patient information

      // Send the email
      const response = await fetch('http://localhost:5000/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: 'amacademate29@gmail.com', // Replace with the doctor's email address
          subject,
          content,
        }),
      });

      // Handle the response
      // ...
      console.log(response.json())
    } catch (error) {
      console.log('Error sending email:', error);
    }
  };


  const handlePrediction = async (e) => {
    try {
      e.preventDefault()

      // Create a request body object with the input data

      const requestBody = {
        age: parseInt(age),
        gender: parseInt(gender),
        cholesterol: parseInt(cholesterol),
        diastolicPressure: parseInt(diastolicPressure),
        systolicPressure: parseInt(systolicPressure),
        glucose: parseInt(glucose),
        height: parseInt(height),
        weight: parseFloat(weight),
        smokes: parseInt(smokes),
        takesAlcohol:parseInt(takesAlcohol),
        isActive: parseInt(isActive),
      };

      // Send the API request to the Flask server
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Parse the response as JSON
      const data = await response.json();

      // Set the prediction result
      setPrediction(data.prediction);

      // Set the visibility of the prediction result pop-up to true
      setShowPrediction(true);


      if (data.prediction === 1) {
        await sendEmailToDoctor();
      }
    } catch (error) {
      console.log('Error predicting:', error);
    }
  };


  
  return (
    <div style={styles.wrapContainer}>
      <NavBar />
    <div style={styles.container}>
    <div>
    <nav style={styles.headers}>
        <Link to='/' element={<Home />} style={styles.back}>Back</Link>
        <h1 style={styles.title}>Cardiovascular Disease Predictor</h1>
    </nav>

        </div>
      <p style={styles.description}>
        Use this predictor to predict the likelihood of cardiovascular diseases based on input data. Enter the required
        information below and click the predict button.
      </p>
      <form style={styles.form} method='post' onSubmit={handlePrediction} >
        {/* Add your input fields here */}
        
        <FormContainer>
          <div className="firstwrapper">
          <div style={styles.wrapper}>
          <label style={styles.label}>Your Fullname:</label>
          <input 
          type='text'  
          name="username" 
          style={styles.input} 
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div style={styles.wrapper}>
          <label style={styles.label}>Age:</label>
          <input 
          type='number'  
          name="number" 
          style={styles.input} 
          value={age}
          onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div style={styles.wrapper}>
              <label style={styles.label}>Gender:</label>
              <select style={styles.input} value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value={''}>select</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            </div>
            <div style={styles.wrapper}>
              <label style={styles.label}>Smokes:</label>
              <select style={styles.input} value={smokes} onChange={(e) => setSmokes(e.target.value)}>
                <option value={''}>select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div style={styles.wrapper}>
              <label style={styles.label}>Takes Alcohol:</label>
              <select style={styles.input} value={takesAlcohol} onChange={(e) => setTakesAlcohol(e.target.value)}>
                <option value={''}>select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div style={styles.wrapper}>
              <label style={styles.label}>Active? (Engages in physical exercise):</label>
              <select style={styles.input} value={isActive} onChange={(e) => setIsActive(e.target.value)}>
                <option value={''}>select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            
          </div>
        
        {/* Add more input fields as needed */}
        <div className="secondwrapper">
          <div style={styles.wrapper}>
            <label style={styles.label}>Height:</label>
            <input type='number' name='Height' style={styles.input} value={height} onChange={(e)=> setHeight(e.target.value)}/>
          </div>
          <div style={styles.wrapper}>
            <label style={styles.label}>Weight:</label>
            <input type='number'  name="weight" style={styles.input} value={weight} onChange={(e)=> setWeight(e.target.value)}/>
          </div>
          <div style={styles.wrapper}>
            <label style={styles.label}>Systolic Pressure:</label>
            <input type='number'  name="sysPressure" style={styles.input} value={systolicPressure} onChange={(e)=> setSystolicPressure(e.target.value)}/>
          </div>
          <div style={styles.wrapper}>
            <label style={styles.label}>Diastolic Pressure:</label>
            <input type='number'  name="diaPressure" style={styles.input} value={diastolicPressure} onChange={(e)=> setDiastolicPressure(e.target.value)}/>
          </div>
          <div style={styles.wrapper}>
            <label style={styles.label}>Glucose:</label>
            <input type='number'  name="glucose" style={styles.input} value={glucose} onChange={(e)=> setGlucose(e.target.value)}/>
          </div>
          <div style={styles.wrapper}>
            <label style={styles.label}>Cholesterol:</label>
            <input type='number'  name="cholesterol" style={styles.input} value={cholesterol} onChange={(e)=> setCholesterol(e.target.value)}/>
          </div >
        </div>
         
        </FormContainer>
        
        <div style={styles.wrappermessage}>
        <p style={styles.description}>
          Please fill the box below if you have any condition or you are feeling any illness in your body. Fill free, this information will be
          sent to the doctor or an expert in cardiovascular disease for further analysis.
      </p>
          <label style={styles.label}>Current Symptoms: </label>
          <textarea name="message" rows="20" cols='100' style={styles.message} value={message} onChange={(e)=> setMessage(e.target.value)}/>
        </div >
        <button type='submit'  name="submit" style={styles.button}>
          Predict
        </button>
      </form>

      {showPrediction && (
          <div style={styles.overlay}>
            <div style={styles.modal}>
              <h1 style={styles.resultTitle}>Prediction Result:</h1>
              {(prediction==1)?<p >The results show that you are at risk of cardiovascular diseases. However, do not panic you may Press contact doctor button to 
                send these results and your current Symptoms to the specialist for further analysis. 
              </p>: (
              <p>The Prediction shows that you are not at risk of cardiovascular, Continue to take care of your health</p>)}
              <p >Prediction: {prediction==1? <h3>Positive</h3>: <h3>Negative</h3>}</p>
              <button style={styles.closeBTN} onClick={() => setShowPrediction(false)}>
                Close
              </button>
              <button style={styles.closeBTN} onClick={sendEmailToDoctor}>
                contact doctor
              </button>
            </div>
          </div>
        )}
     
    </div>
     <Footer />
     </div>
  );
};

const FormContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  .firstwrapper, .secondwrapper{
    width: 500px;
    padding: 20px;
  }
`

const styles = {
  wrapContainer: {
    width: '100%',
    backgroundColor: '#6bceaa',

  },
    container: {
      textAlign: 'center',
      width: '90%',
      margin: '20px auto',
      backgroundColor: 'white',
    },
    wrapper:{
        width: '450px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    wrappermessage: {
      width: '80%',
      margin: '30px auto',
     
    },
    headers:{
      width: '95%',
      display: 'inline-block',
    },
    back: {
      padding: '10px 40px',
      backgroundColor: 'green',
      color: 'white',
    },
    title: {
      width: '85%',
      display: 'inline-block',
      fontSize: '34px',
      marginBottom: '20px',
    },
    description: {
      fontSize: '20px',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: '20px',
    },
    label: {
      width: '150px',
      display: 'inline-block',
      fontWeight: 'bold',
    },
    input: {
      width: '300px',
      padding: '15px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: '#6bceaa'
    },
    button: {
      backgroundColor: 'green',
      color: '#fff',
      padding: '15px 10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      width: '200px',
      margin: '10px auto',
      fontSize: '20px',
    },
    result: {
      marginTop: '10px',
      textAlign: 'center',
      fontSize: '50px',
      fontWeight: 'bold'
    },
    resultTitle: {
      fontSize: '20px',
      marginBottom: '10px',
    },
    resultText: {
      fontSize: '16px',
      marginBottom: '5px',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: 'White',
      width: '60%',
      height: '50vh',
      padding: '20px',
      borderRadius: '5px',
      fontSize: '32px',
    },
    closeBTN: {
      marginTop: '10px',
      width: '200px',
      padding: '5px',
      height: '50px',
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: 'red',
      margin: '2px auto',
    },
    message:{
      backgroundColor: '#6bceaa',
      borderRadius: '15px',
    }
}

export default Predictor;
