import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00',],
  
  datasets: [
    {
      label: 'First dataset',
      data: ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00',],
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

class Graph extends React.Component {
    render() {
      return (
        <div>
          <Line data={data} />
        </div>
      );
    }
  }
  
  export default Graph;
