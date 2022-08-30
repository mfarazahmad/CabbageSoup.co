import React, { useEffect, useState, Suspense, lazy } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import { DatePicker, Space, Button } from 'antd';
import 'antd/dist/antd.css';

const TotalSales = React.lazy(() => import("./Charts/TotalSales"));
const AverageOrderChart = React.lazy(() => import("./Charts/AverageOrderChart"));
const OrderCountChart = React.lazy(() => import("./Charts/OrderCountChart"));


function AnalyticsCharts() {
    const dateFormat = 'YYYY-MM-DD';

    const { RangePicker } = DatePicker;
    const [dateFound, setdateFound] = useState({begdate: moment('2019-12-01', dateFormat), enddate: moment('2019-12-07', dateFormat)});
    const [clicker, setClicker] = useState(0);

    const [totalSaleData, setTotalSaleData] = useState({chartData:{
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: 'Total Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]}});

    const [totalOrders, setTotalOrders] = useState(
      {chartData:{
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: 'Total Orders',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]}});

    const [averageOrder, setAverageOrder] = useState({chartData:{
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: 'Average Order',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]}});

    const start = moment(dateFound.begdate, 'YYYY-MM-DD');
    const current = start.clone();
    const dates_array = [];

    const handleDateChange = () => {
      while (current.isSameOrBefore(dateFound.enddate)) {
        dates_array.push(current.format("YYYY-MM-DD"));
        current.add(1, "day");
      }
      setClicker(clicker + 1)
      
      let i = 0

      let length_dates_array = dates_array.length
      let total_sales_array = []
      let order_count_array = []
      let average_order_array = []

      if (length_dates_array > 0) {
        for (i = 0; i < length_dates_array; i++) {
        let newDate = dates_array[i]
        //console.log(dates_array[i])
        axios.get( process.env.REACT_APP_ANALYTICS_ENGINE + `/analytics/total-sales?order_date=${newDate}`)
        .then((response) => {
          total_sales_array.push(response.data.total_sales)
          order_count_array.push(response.data.order_count)
          average_order_array.push(response.data.average_order)
          //console.log(total_sales_array)
          setTotalSaleData({chartData:{
            labels: dates_array,
            datasets: [{
              label: 'Daily Sales',
              data: total_sales_array,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]}}, 500)

          setTotalOrders({chartData:{
            labels: dates_array,
            datasets: [{
              label: 'Daily Orders',
              data: order_count_array,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]}}, 500)

          setAverageOrder({chartData:{
            labels: dates_array,
            datasets: [{
              label: 'Daily Average Orders',
              data: average_order_array,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]}}, 500)
        });   
        } 
      }
    }

    useEffect(() => {
      console.log(dateFound);
      handleDateChange();
    }, [dateFound]);

    return (
      <section className="analyticsDisplay">
        <RangePicker 
          defaultValue={[moment('2019-12-01', dateFormat), moment('2019-12-07', dateFormat)]}
          disabled={[true, true]}
          className='changeAnalyticsRange' 
          onChange={(dates, dateStrings) => 
              setdateFound({begdate: dateStrings[0], enddate: dateStrings[1]}) 
            } 
          />

        <Suspense fallback={<div>Loading...</div>}>
          <h4>Total Orders</h4>
          <AverageOrderChart data={averageOrder}/>
          <h4>Total Sales</h4>
          <OrderCountChart data={totalOrders}/>
          <h4>Total Average Orders</h4>
          <TotalSales data={totalSaleData}/>
        </Suspense>

      </section>
    );
  }
  
  export default withRouter(AnalyticsCharts);