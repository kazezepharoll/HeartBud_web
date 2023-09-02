import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;

`;

const PrescriptionCard = styled.div`
  background-color: #f1f0f8;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const PatientName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const MedicinesList = styled.ul`
  list-style-type: none;
  padding: 0;

`;

const MedicineItem = styled.li`
  margin-bottom: 5px;
`;

const Recommendation = styled.p`
  font-style: italic;
  background: grey;
  padding: 10px 15px;
`;

function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    // Fetch prescription data from your backend API
    axios
      .get('http://localhost:3000/prescriptionList')
      .then(async (response) => {
        const prescriptionData = response.data.data;

        // Fetch patient names for each prescription
        const prescriptionsWithNames = await Promise.all(
          prescriptionData.map(async (prescription) => {
            const patientResponse = await axios.get(
              `http://localhost:3000/patients/${prescription.patient_id}`
            );
            const patientName = patientResponse.data;

            return {
              ...prescription,
              patient_name: patientName[0].fullnames,
            };
          })
        );

        setPrescriptions(prescriptionsWithNames);
      })
      .catch((error) => {
        console.error('Error fetching prescriptions:', error);
      });
  }, []);

  return (
    <>
    <NavBar />
    <Container>
      
      <h1>Prescription List</h1>
      {prescriptions.map((prescription) => (
        <PrescriptionCard key={prescription.idprescriptions}>
          <PatientName>Patient Name: {prescription.patient_name}</PatientName>
          <h3>Prescribed Medicines:</h3>
          <MedicinesList>
            {JSON.parse(prescription.medicine).map((medicine) => (
              <MedicineItem key={medicine.idmedicine}>
                Name: {medicine.name} - Dosage: {medicine.dosage} - Description: {medicine.description}
              </MedicineItem>
            ))}
          </MedicinesList>

          <Recommendation><b>Recommendation:</b> {prescription.recommendation}</Recommendation>
        </PrescriptionCard>
      ))}
    </Container>
    </>
  );
}

export default PrescriptionList;
