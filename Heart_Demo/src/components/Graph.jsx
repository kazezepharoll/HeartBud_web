/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart  } from 'chart.js/auto'
import styled from 'styled-components';

const Graph = ({ patientStates }) => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      if (chartRef.current) {
        const chartInstance = chartRef.current.chartInstance;
        if (chartInstance) {
          chartInstance.destroy();
        }
      }
    }, []);
  
    // // Calculate the state categories
    // const normalCount = patientStates.filter(state => state < 20).length;
    // const mildCount = patientStates.filter(state => state >= 20 && state < 50).length;
    // const criticalCount = patientStates.filter(state => state >= 50).length;
  
    // // Define the data for the graph
    // const data = {
    //   labels: ['Attribute'],
    //   datasets: [
    //     {
    //       label: 'Normal',
    //       data: [normalCount],
    //       borderColor: 'rgba(75, 192, 192, 0.6)',
    //       fill: false,
    //     },
    //     {
    //       label: 'Mild',
    //       data: [mildCount],
    //       borderColor: 'rgba(255, 206, 86, 0.6)',
    //       fill: false,
    //     },
    //     {
    //       label: 'Critical',
    //       data: [criticalCount],
    //       borderColor: 'rgba(255, 99, 132, 0.6)',
    //       fill: false,
    //     },
    //   ],
    // };
  
    // const options = {
    //   scales: {
    //     y: {
    //       beginAtZero: true,
    //       max: Math.max(normalCount, mildCount, criticalCount) + 10, // Adjust the maximum based on the highest count
    //     },
    //   },
    // };
  

//   useEffect(() => {
//     Chart.register(Chart.controllers.bar);
//     Chart.register(Chart.scaleService.getScaleConstructor('linear').extend('myLinearScale'));
//   }, []);

  // Prepare the data for the line graph
  const data = {
    datasets: [
      {
        label: 'Patient States',
        data: patientStates.map((state, index) => ({ x: index + 1, y: state })),
        borderColor: 'rgba(75, 192, 192, 0.6)',
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        display: true,
      },
      y: {
        beginAtZero: true,
        display: true,
        grid: {
          drawBorder: false,
          borderColor: ['rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          borderWidth: [1, 1, 1],
        },
        ticks: {
          callback: (value) => {
            if (value >= 20 && value <= 50) {
              return 'Mild';
            } else if (value > 50) {
              return 'Critical';
            } else {
              return 'Normal';
            }
          },
        },
      },
    },
  };


  return (
    <Container>
    <h2>Attribute Graph</h2>
    <div className="chart-container">
      <Line data={data} options={options} ref={chartRef} />
    </div>
    <h3>KEY:</h3>
    <div className='key'>
    <div className="red"></div><span>Critical</span>
    </div>    
    <div className='key'>
    <div className="yellow"></div><span>Mild</span>
    </div>    
    <div className='key'>
    <div className="green"></div><span>Normal</span>
    </div>

  </Container>
  );
};

const Container = styled.div`

  width: 600px;
  height: 600px;
  color: black;

  .chart-container{
    width: 600px;
    height: 300px;
    background: linear-gradient(to bottom, rgba(255, 0, 0, 1), rgba(255, 255, 0, 0.5), rgba(0, 255, 0, 1));
  }


  .key{
    font-size: 22px;
    font-weight: bold;
    display: block;
  }
  .red, .yellow, .green{
    width: 100px;
    height: 50px;
    display: inline-block;
    margin: 4px 20px 4px 0;
  }
  .red{
    background-color: red;
  }
  .yellow{
    background-color: yellow;
  }
  .green{
    background-color: green;
  }
`
export default Graph;
