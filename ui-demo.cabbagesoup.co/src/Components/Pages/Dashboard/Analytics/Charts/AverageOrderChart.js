
import React from 'react';

import { Line } from 'react-chartjs-2';
import { LineElement, PointElement, LinearScale, CategoryScale, Chart } from "chart.js";

function AverageOrderChart(props) {

  Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
  
    return (
      <div className="App">
        <Line  data={props.data.chartData}/>
      </div>
    );
  }
  
  export default AverageOrderChart;