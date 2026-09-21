import React from 'react';
import styled from 'styled-components';

// Define a styled table component
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

// Define styled header cells
const StyledTh = styled.th`
  background-color: #f2f2f2;
  font-weight: bold;
  padding: 10px;
  text-align: left;
`;

// Define styled data cells
const StyledTd = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

// Define styled rows for even rows
const StyledTrEven = styled.tr`
  background-color: #f5f5f5;
`;

function MedicineTable({ prescription }) {
  return (
    <StyledTable>
      <thead>
        <tr>
          <StyledTh>Name</StyledTh>
          <StyledTh>Dosage</StyledTh>
          <StyledTh>Description</StyledTh>
        </tr>
      </thead>
      <tbody>
        {JSON.parse(prescription.medicine).map((medicine, index) => (
          <StyledTrEven key={medicine.idmedicine} className={index % 2 === 0 ? 'even' : 'odd'}>
            <StyledTd>{medicine.name}</StyledTd>
            <StyledTd>{medicine.dosage}</StyledTd>
            <StyledTd>{medicine.description}</StyledTd>
          </StyledTrEven>
        ))}
      </tbody>
    </StyledTable>
  );
}

export default MedicineTable;
