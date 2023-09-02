import React, { useState } from 'react';
import styled from 'styled-components';

// Styles pour le conteneur principal
const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
`;

// Styles pour le formulaire
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// Styles pour les étiquettes
const Label = styled.label`
  font-weight: bold;
  margin-top: 10px;
`;

// Styles pour les sélections
const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
`;

// Styles pour les champs de saisie
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
`;

// Styles pour le bouton
const Button = styled.button`
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
`;

// Styles pour le tableau
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

// Styles pour les en-têtes de tableau
const TableHead = styled.thead`
  background-color: #007BFF;
  color: white;
`;

// Styles pour les cellules d'en-tête de tableau
const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;

// Styles pour les lignes de tableau
const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

// Styles pour les cellules de tableau
const TableCell = styled.td`
  padding: 10px;
  text-align: left;
`;

// Styles pour le bouton dans le tableau
const RemoveButton = styled.button`
  background-color: #DC3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

// Structure initiale du plan de repas
const initialMealPlan = {
  Monday: {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
  },
  Tuesday: {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
  },
  Wednesday: {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
  },
  Thursday: {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
  },
  Friday: {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
  },
  Saturday: {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
  },
  Sunday: {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
  }
};

const DietPlan = () => {
  const [patientId, setPatientId] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [mealPlan, setMealPlan] = useState(initialMealPlan);
  const [mealItem, setMealItem] = useState({ foodItem: '', quantity: '' });
  const [day, setDay] = useState('');
  const [mealType, setMealType] = useState('');

  // Function to add a meal item
const handleAddMealItem = (e) => {
  e.preventDefault();

  if (mealItem.foodItem.trim() === '' || mealItem.quantity.trim() === '' || !day || !mealType) {
    return;
  }

  setMealPlan((prevMealPlan) => {
    const updatedPlan = { ...prevMealPlan };

    // Make sure day and mealType are defined before pushing the meal item
    if (!updatedPlan[day]) {
      updatedPlan[day] = {};
    }
    if (!updatedPlan[day][mealType]) {
      updatedPlan[day][mealType] = [];
    }

    updatedPlan[day][mealType].push(mealItem);

    return updatedPlan;
  });

  // Clear the input fields
  setMealItem({ foodItem: '', quantity: '' });
};

  
  

  // Fonction pour supprimer un aliment du repas
  const handleRemoveMealItem = (index, e) => {
    e.preventDefault()
    setMealPlan((prevMealPlan) => {
      const updatedPlan = { ...prevMealPlan };
      updatedPlan[day][mealType].splice(index, 1);
      return updatedPlan;
    });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dietData = {
      patientId,
      dietaryRestrictions,
      mealPlan,
    };

    try {
      // Envoyer dietData à votre serveur ici
      console.log('Données du régime à envoyer :', dietData);

      // Réinitialiser les champs du formulaire et l'état du plan de repas si nécessaire
      setPatientId('');
      setDietaryRestrictions('');
      setMealPlan(initialMealPlan);
      setMealItem({ foodItem: '', quantity: '' });
      setDay('');
      setMealType('');
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  console.log(mealPlan)
  return (
    <Container>
      <h1>Planification du régime</h1>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="patientId">Sélectionnez le patient :</Label>
          <Select
            id="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          >
            <option value="1">Patient 1</option>
            <option value="2">Patient 2</option>
            {/* Ajoutez plus de patients */}
          </Select>
        </div>

        <div>
          <h2>Constructeur de plan de repas</h2>
          <Label htmlFor="day">Sélectionnez le jour :</Label>
          <Select
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="">Sélectionnez un jour</option>
            <option value="Monday">Lundi</option>
            <option value="Tuesday">Mardi</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
            
          </Select>

          <Label htmlFor="mealType">Sélectionnez le type de repas :</Label>
          <Select
            id="mealType"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="">Sélectionnez un type de repas</option>
            <option value="Breakfast">Petit déjeuner</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snacks">Snack</option>
            
          </Select>

          <Input
            type="text"
            placeholder="Aliment"
            value={mealItem.foodItem}
            onChange={(e) => setMealItem({ ...mealItem, foodItem: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Quantité"
            value={mealItem.quantity}
            onChange={(e) => setMealItem({ ...mealItem, quantity: e.target.value })}
          />
          <Button type="button" onClick={handleAddMealItem}>Ajouter</Button>
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
          {mealPlan[day] && mealPlan[day][mealType] ? (
            mealPlan[day][mealType].map((item, index) => (
              <TableRow key={index}>
                <TableCell>{day}</TableCell>
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
          <Label htmlFor="dietaryRestrictions">Restrictions alimentaires :</Label>
          <Input
            type="text"
            id="dietaryRestrictions"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
          />
        </div>

        <Button type="submit">Créer un plan de repas</Button>
      </Form>
    </Container>
  );
};

export default DietPlan;
