import React, {Suspense, lazy, useState, useEffect } from 'react';
import axios from 'axios'

const Bar = lazy(() => import('react-chartjs-2'));

function Demographics() {
  
const [maleDemographicData, setmaleDemographicData] = useState("");
const [femaleDemographicData, setfemaleDemographicData] = useState("");
const [DemographicData, setDemographicData] = useState({});
const [counter, setCounter] = useState(0);
const [data, setData] = useState({});

const checkAgeAmounts = (data, genderChosen) => {

  let demographics = {
    'count' : 0,
    '13_17' : 0,
    '18_24' : 0,
    '25_34' : 0,
    '35_44' : 0,
    '45_54' : 0,
    '55_65' : 0,
    'older_than_65' : 0
  };
 
  while ( demographics['count'] < data.length) { 
    let gender = data[demographics['count']]['gender']
    let age = data[demographics['count']]['age']
    if (gender == genderChosen) {
      if (age >= 13 && age <=17 ) {
        demographics['13_17']++
      }
      else if (age >= 18 && age <=24 ) {
        demographics['18_24']++
      }
      else if (age >= 25 && age <=34 ) {
        demographics['25_34']++
      }
      else if (age >= 35 && age <=44 ) {
        demographics['35_44']++
      }
      else if (age >= 45 && age <=54 ) {
        demographics['45_54']++
      }
      else if (age >= 55 && age <=65 ) {
        demographics['55_65']++
      }
      else {
        demographics['older_than_65']++
      }
    }
    demographics['count']++  
  }
  return demographics;
}


  useEffect(() => {
    axios.get(process.env.REACT_APP_ANALYTICS_ENGINE + '/query/customer')
    .then((response) => {
            let get_demographicData = {};
            get_demographicData['male'] = checkAgeAmounts( response['data']['data'], 'male');
            get_demographicData['female'] = checkAgeAmounts( response['data']['data'], 'female'); 
            setDemographicData(get_demographicData)
            if (get_demographicData.length = response['data']['data'].length) {
              setDemographicData(get_demographicData)
              console.log(get_demographicData)
              setData({data: {
                labels: ['13-17', '18-24', '25-34', '35-44', '45=54', '55-64', '65+'],
                datasets: [
                  {
                    label: 'Female',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [get_demographicData['female']['13_17'], get_demographicData['female']['18_24'], get_demographicData['female']['25_34'], get_demographicData['female']['35_44'], get_demographicData['female']['45_54'], get_demographicData['female']['55_65'], get_demographicData['female']['older_than_65']]
                  },

                  {
                    label: 'Male',
                    backgroundColor: 'rgba(155,231,91,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [get_demographicData['male']['13_17'], get_demographicData['male']['18_24'], get_demographicData['male']['25_34'], get_demographicData['male']['35_44'], get_demographicData['male']['45_54'], get_demographicData['male']['55_65'], get_demographicData['male']['older_than_65']]
                  }
                ]
            }})

            }
    }, (error) => {
            console.log(error);
    });  
},[])


  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Bar data={data.data} options={{maintainAspectRatio: 10}}/>
      </Suspense>
  </div>

  );
}

export default Demographics;