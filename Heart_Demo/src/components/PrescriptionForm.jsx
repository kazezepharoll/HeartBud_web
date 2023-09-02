import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


function PrescriptionForm() {
  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptionMedicines, setPrescriptionMedicines] = useState([]);
  const [prescriptionNotes, setPrescriptionNotes] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch patients and medicines from your API endpoints
    const fetchPatients = async () => {
      const response = await axios.get('http://localhost:3000/patients');
      setPatients(response.data);
    };

    const fetchMedicines = async () => {
      const response = await axios.get('http://localhost:3000/medicines');
      setMedicines(response.data);
    };

    fetchPatients();
    fetchMedicines();
  }, []);

  const handleAddMedicine = (medicine) => {
    setPrescriptionMedicines([...prescriptionMedicines, medicine]);
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = [...prescriptionMedicines];
    updatedMedicines.splice(index, 1);
    setPrescriptionMedicines(updatedMedicines);
  };

  const handleSubmitPrescription = async () => {
    if (!selectedPatient || prescriptionMedicines.length === 0) {
      alert('Please select a patient and add medicines.');
      return;
    }

    try {
      const prescriptionData = {
        medicine: prescriptionMedicines,
        details: prescriptionNotes,
        patient_id: selectedPatient.idpatients,
      };

      // Submit prescription data to your API
      await axios.post('http://localhost:3000/prescriptions', prescriptionData);
      alert('Prescription submitted successfully!');
      navigate('/doctor/listPrescriptions');
    } catch (error) {
      console.error('Error submitting prescription:', error);
    }
  };

  return (
    <Container>
      <MainContainer>
      <h1>Prescription Page</h1>
      <MainSection>
        <label>Select Patient:</label>
        <select onChange={(e) => setSelectedPatient(JSON.parse(e.target.value))}>
          <option value={null}>Select a patient</option>
          {patients.map((patient) => (
            <option key={patient.idpatients} value={JSON.stringify(patient)}>
              {patient.fullnames}
            </option>
          ))}
        </select>
      </MainSection>
      <MainSection>
        <h2>Prescribe Medicines:</h2>
        <ul>
          {medicines.map((medicine) => (
            <li key={medicine.idmedicine}>
              {medicine.name} - {medicine.dosage}
              <button onClick={() => handleAddMedicine(medicine)}>Add</button>
            </li>
          ))}
        </ul>
      </MainSection>
      <MainSection>
        <h2>Prescription:</h2>
        {prescriptionMedicines.length > 0 ? (
          <ul>
            {prescriptionMedicines.map((medicine, index) => (
              <li key={index}>
                {medicine.name} - {medicine.dosage}
                <button onClick={() => handleRemoveMedicine(index)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No medicines prescribed yet.</p>
        )}
      </MainSection>
      <MainSection>
        <label>Prescription Details:</label>
        <textarea
          placeholder='Write the details of this prescription, dosage, recommendation and precautions'
          value={prescriptionNotes}
          onChange={(e) => setPrescriptionNotes(e.target.value)}
        />
      </MainSection>
      <Button onClick={handleSubmitPrescription}>Submit Prescription</Button>
      </MainContainer>
    </Container>
  );
}

export default PrescriptionForm;




const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const MainContainer = styled.div`
width: 90;
  background-color: #f0f2f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const MainSection = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    button {
      background-color: #007bff;
      color: #ffffff;
      border: none;
      border-radius: 3px;
      padding: 5px 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  textarea{
    width: 95%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

const Button = styled.button`
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;
