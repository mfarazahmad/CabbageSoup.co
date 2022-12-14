import React, {Suspense, lazy } from 'react';

import { Line } from 'react-chartjs-2';

function OrderCountChart(props) {
  
    return (
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Line  data={props.data.chartData}/>
        </Suspense>
      
    </div>
    );
  }
  
  export default OrderCountChart;