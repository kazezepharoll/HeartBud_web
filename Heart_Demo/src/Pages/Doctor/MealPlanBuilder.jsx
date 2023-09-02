import { useState } from 'react';
import styled from 'styled-components';

const MealPlanContainer = styled.div`
  margin-top: 20px;
`;

const MealItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const MealInput = styled.input`
  width: 50%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const MealQuantity = styled.input`
  width: 20%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const AddRemoveButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
`;

// eslint-disable-next-line react/prop-types
const MealPlanBuilder = ({ mealPlan, mealItem, setMealItem, onAddMealItem, onRemoveMealItem}) => {
//   const [mealItem, setMealItem] = useState({ foodItem: '', quantity: '' });

const handleAddMealItem = () => {
    if (mealItem.foodItem.trim() === '' || mealItem.quantity.trim() === '') {
      return;
    }
  
    onAddMealItem(mealItem);
  
    // Clear the mealItem state after adding it
    setMealItem({ foodItem: '', quantity: '' });
  };
  
  console.log(mealPlan)

  return (
    <MealPlanContainer>
      <h2>Meal Plan Builder</h2>
      <div>
      <MealInput
        type="text"
        placeholder="Food Item"
        value={mealItem.foodItem}
        onChange={(e) => setMealItem({ ...mealItem, foodItem: e.target.value })}
      />
      <MealQuantity
        type="text"
        placeholder="Quantity"
        value={mealItem.quantity}
        onChange={(e) => setMealItem({ ...mealItem, quantity: e.target.value })}
      />
      <AddRemoveButton onClick={handleAddMealItem}>Add</AddRemoveButton>
      
      </div>
      {mealPlan.map((item, index) => (
        <MealItem key={index}>
          <div>
            <span>Food Item: {item.foodItem}</span>
            <span>Quantity: {item.quantity}</span>
          </div>
          <AddRemoveButton onClick={() => onRemoveMealItem(index)}>
            Remove
          </AddRemoveButton>
        </MealItem>
      ))}

    </MealPlanContainer>
  );
};

export default MealPlanBuilder;
