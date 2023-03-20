import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Line } from 'react-chartjs-2';

const data1 = {
  labels: ['2023yr','2024yr','2025yr','2026yr'],
  
  datasets: [
    {
      label: '연간 진행률',
      data: [10, 57, 91, 100],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,2)',
    },
  ],
};
const data2 = {
    labels: ['JAN','FEB','MAR','APR','MAY','JUNE','JULY','AUG','SEPT','OCT','NOV','DEC'],
    
    datasets: [
      {
        label: '2023yr',
        data: [10, 15, 24, 31, 39, 47, 60, 71, 83, 90, 91, 100],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: '2024yr',
        data: [10, 15, 26, 29, 39, 40, 60, 69, 80, 87, 91, 100],
        fill: false,
        borderColor: '#742774',
    },
    {
        label: '2025yr',
        data: [10, 15, 27, 30, 39, 44, 65, 72, 83, 87, 91, 100],
        fill: false,
        borderColor: '#ffe4e1',
    },
    {
        label: '2026yr',
        data: [10, 15, 24, 34, 39, 42, 60, 71, 85, 87, 91, 100],
        fill: false,
        borderColor: '#800000',
    },
    ],
  };

  class Graph extends React.Component {
    render() {
      const { data } = this.props;
      return (
        <div>
          <Line data={data} options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: '시간'
                }
              },
              y: {
                title: {
                  display: true,
                  text: '시공 진행률(%)'
                }
              }
            }
          }}/>
        </div>
      );
    }
  }
  
  function App() {
    return (
      <Card>
        <CardContent>
          <Graph data={data1} />
        </CardContent>
        <CardContent>
          <Graph data={data2} />
        </CardContent>
      </Card>
    );
  }

export default App;