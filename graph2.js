import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
//import { Line } from 'react-chartjs-2';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries } from '@syncfusion/ej2-react-charts';
import firebase from 'firebase/app';
import 'firebase/database';

function App() {
  const [series1, setSeries1] = React.useState([]);

  React.useEffect(() => {
    const firebaseConfig = {
        "apiKey" : "AIzaSyBpDezQXw5UDas7kz3QOt287JrmsEVjNd4" ,
        "authDomain" : "distance3-3c62d.firebaseapp.com" ,
        "databaseURL" : "https://distance3-3c62d-default-rtdb.firebaseio.com" ,
        "storageBucket" : "distance3-3c62d.appspot.com"
    };
    firebase.initializeApp(firebaseConfig);

    const dbRef = firebase.database().ref('data'); // Replace 'data' with your own database reference
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const updatedSeries1 = [];
      let value = 10;
      for (let i = 0; i < 50; i++) {
        if (Math.random() > 0.5) {
          value += Math.random() * 2.0;
        }
        updatedSeries1[i] = { x: i, y: value };
      }
      setSeries1(updatedSeries1);
    });

    return () => {
      dbRef.off();
    };
  }, []);

  var chart;
  var intervalId;
  var value = 10;
  var setTimeoutValue = 100;

  function loaded(args) {
    intervalId = setTimeout(() => {
      if (chart === null) {
        clearInterval(intervalId);
      } else {
        if (Math.random() > 0.5) {
          value += Math.random() * 2.0;
        }
        const updatedSeries1 = series1.map((point, index) => {
          if (index === 49) {
            return { x: point.x, y: value };
          }
          return { x: point.x, y: series1[index + 1].y };
        });
        setSeries1(updatedSeries1);
        args.chart.series[0].dataSource = updatedSeries1;
      }
    }, setTimeoutValue);
  }

  return (
    <ChartComponent id='charts' loaded={loaded.bind(this)}>
      <Inject services={[LineSeries]} />
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={series1} xName='x' yName='y' type='Line'></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}

export default App;
ReactDOM.render(<App />, document.getElementById('charts'));
