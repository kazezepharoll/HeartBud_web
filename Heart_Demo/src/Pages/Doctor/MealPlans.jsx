import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const MealPlanCard = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
`;

const PatientName = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

const DietaryRestrictions = styled.p`
  font-style: italic;
  margin-bottom: 10px;
`;

const MealPlan = styled.div`
  background-color: #e6f7ea;
  padding: 10px;
  border-radius: 5px;

  h2 {
    color: #4caf50;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    background-color: white;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #4caf50;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const GreenButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
`;

function MealPlans() {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    // Make an Axios GET request to fetch meal plans
    axios.get('http://localhost:3000/meal-plans')
      .then((response) => {
        const responseData = response.data
        if (responseData.success) {
          setMealPlans(responseData.mealPlans);
        } else {
          console.error('Error fetching meal plans:', responseData.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching meal plans:', error);
      });
  }, []);

  const renderMealItems = (mealItems) => {
    if (Array.isArray(mealItems)) {
      return mealItems.map((item, index) => (
        <div key={index}>
          <strong>{item.foodItem}</strong> ({item.quantity})
        </div>
      ));
    } else {
      return 'No meal items';
    }
  };
  
  return (
<Container>
  <h1>Meal Plans for Patients</h1>
  {mealPlans.map((mealPlan, index) => (
    <MealPlanCard key={index}>
      <PatientName>Patient: {mealPlan.fullnames}</PatientName>
      <DietaryRestrictions>Dietary Restrictions: {mealPlan.dietary_restrictions}</DietaryRestrictions>
      <MealPlan>
        <h2>Meal Plan</h2>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Meal Type</th>
              <th>Food Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {mealPlan.meal_plan &&
              Object.entries(JSON.parse(mealPlan.meal_plan)).map(([day, mealTypes]) =>
                mealTypes &&
                Object.entries(mealTypes).map(([mealType, mealItems]) =>
                  Array.isArray(mealItems) &&
                  mealItems.map((item, index) => (
                    <tr key={`${day}-${mealType}-${index}`}>
                      {index === 0 && (
                        <td rowSpan={mealItems.length}>{day}</td>
                      )}
                      <td>{mealType}</td>
                      <td>{item.foodItem}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))
                )
              )}
          </tbody>
        </table>
      </MealPlan>
    </MealPlanCard>
  ))}
  <GreenButton>Print Meal Plans</GreenButton>
</Container>


  );
}

export default MealPlans;
