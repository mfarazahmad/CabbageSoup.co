import React, {Suspense, lazy } from 'react';

import { Line } from 'react-chartjs-2';

function LineChart(props) {
  
    return (
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Line  data={props.data.chartData}/>
        </Suspense>
    </div>
    );
  }
  
  export default LineChart;


