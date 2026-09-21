import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-top: 10px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
`;

const Input = styled.input`
  width: 97%;
  padding: 10px;
  margin-top: 5px;
`;

const Button = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: green;
  color: white;
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const initialMealPlan = () => ({
  Monday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
  Tuesday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
  Wednesday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
  Thursday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
  Friday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
  Saturday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
  Sunday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
});

const DietPlan = () => {
  const [patientId, setPatientId] = useState('');
  const [patients, setPatients] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [mealPlan, setMealPlan] = useState(initialMealPlan());
  const [mealItem, setMealItem] = useState({ foodItem: '', quantity: '' });
  const [day, setDay] = useState('');
  const [mealType, setMealType] = useState('');
  const [selectedDay, setSelectedDay] = useState('Monday'); // Initialize with a default day
  const navigate = useNavigate();

  useEffect(() => {
    async function getPatients() {
      try {
        const patientData = await axios.get('http://localhost:3000/patients');
        setPatients(patientData.data);
      } catch (error) {
        console.error(error);
      }
    }

    getPatients();
  }, []);

  const handleAddMealItem = (e) => {
    e.preventDefault();

    if (!mealItem.foodItem.trim() || !mealItem.quantity.trim() || !day || !mealType) {
      return;
    }

    setMealPlan((prevMealPlan) => {
      const updatedPlan = { ...prevMealPlan };
      const newMealItem = { foodItem: mealItem.foodItem, quantity: mealItem.quantity };

      if (!updatedPlan[day]) updatedPlan[day] = {};
      if (!updatedPlan[day][mealType]) updatedPlan[day][mealType] = [];

      const isDuplicate = updatedPlan[day][mealType].some(
        (item) => item.foodItem === newMealItem.foodItem && item.quantity === newMealItem.quantity
      );

      if (!isDuplicate) updatedPlan[day][mealType].push(newMealItem);

      return updatedPlan;
    });

    // Clear the input fields
    setMealItem({ foodItem: '', quantity: '' });
  };

  const handleRemoveMealItem = (index) => {
    setMealPlan((prevMealPlan) => {
      const updatedPlan = { ...prevMealPlan };
      if (updatedPlan[day] && updatedPlan[day][mealType]) {
        updatedPlan[day][mealType] = updatedPlan[day][mealType].filter((item, itemIndex) => itemIndex !== index);
      }
      return updatedPlan;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dietData = {
      patientId,
      dietaryRestrictions,
      mealPlan,
    };

    try {
      // Send dietData to your server here
      const dietResponse = await axios.post('http://localhost:3000/setmealplan', dietData);

      const data = dietResponse.data;

      if (data.success) navigate('/Doctor/diet-plans');

      setPatientId('');
      setDietaryRestrictions('');
      setMealPlan(initialMealPlan());
      setMealItem({ foodItem: '', quantity: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <h1>Meal Plan</h1>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="patientId">Select a patient:</Label>
          <Select id="patientId" value={patientId} onChange={(e) => setPatientId(e.target.value)}>
            <option value="">Select a patient's name</option>
            {patients.map((patient) => (
              <option key={patient.idpatients} value={patient.idpatients}>
                {patient.fullnames}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <h2>Meal Plan Builder</h2>
          <Label htmlFor="day">Select a day:</Label>
          <Select id="day" value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </Select>

          <Label htmlFor="mealType">Select a meal type:</Label>
          <Select
            id="mealType"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="">Select a meal type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snacks">Snack</option>
          </Select>

          <Input
            type="text"
            placeholder="Food Item"
            value={mealItem.foodItem}
            onChange={(e) => setMealItem({ ...mealItem, foodItem: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Quantity"
            value={mealItem.quantity}
            onChange={(e) => setMealItem({ ...mealItem, quantity: e.target.value })}
          />
          <Button type="button" onClick={handleAddMealItem}>
            Add
          </Button>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Day</TableHeaderCell>
              <TableHeaderCell>Meal Type</TableHeaderCell>
              <TableHeaderCell>Food Item</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHead>
          <tbody>
            {mealPlan[selectedDay] &&
            mealPlan[selectedDay][mealType] ? (
              mealPlan[selectedDay][mealType].map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{selectedDay}</TableCell>
                  <TableCell>{mealType}</TableCell>
                  <TableCell>{item.foodItem}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <RemoveButton onClick={() => handleRemoveMealItem(index)}>
                      Remove
                    </RemoveButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5">No meal items for this day and meal type.</TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>

        <div>
          <Label htmlFor="dietaryRestrictions">Dietary Restrictions:</Label>
          <Input
            type="text"
            id="dietaryRestrictions"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
          />
        </div>

        <Button type="submit">Create Meal Plan</Button>
      </Form>
    </Container>
  );    
};

export default DietPlan;
