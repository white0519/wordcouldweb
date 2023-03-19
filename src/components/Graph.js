import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Line } from 'react-chartjs-2';
import './App.css';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'First dataset',
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
    {
      label: 'Second dataset',
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: '#742774',
    },
  ],
};

function App() {
  return (
    <div className="App">
      <Card>
        <CardContent>
          React 및 Firebase 기반의 워드 클라우드 어플리케이션
        </CardContent>
      </Card>
      <Line data={data} />
    </div>
  );
}

export default (App)(Graph);