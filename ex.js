import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import moment from "moment";

const Chart = require("react-chartjs-2").Chart;

const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)"
};

//const color = Chart.helpers.color;
const data = {
  datasets: [
    {
      label: "Dataset 1 (linear interpolation)",
      backgroundColor: chartColors.red,
      borderColor: chartColors.red,
      fill: false,
      lineTension: 0,
      borderDash: [8, 4],
      data: []
    }
  ]
};

const options = {
  elements: {
    line: {
      tension: 0.5
    }
  },
  scales: {
    }
};

const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    }
});

const databaseURL = "https://distance3-3c62d-default-rtdb.firebaseio.com";

class Sensor extends React.Component {
    constructor() {
        super();
        this.state = {
            sensor: {},
            dialog: false,
            sensor:'',
            Distance:''
        };
    }
    _get() {
        fetch(`${databaseURL}/sensor.json`).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }

            return res.json();
        }).then(sensor => {
            // 0으로 되어 있는 부분을 moment 모듈에 있는 현재시간 불러오는 함수로 변경해서 실시간으로 차트에 데이터 들어가게 하는 것
            // Firebase에서 데이터가 업데이트 된 이벤트를 감지(Handling) 함수를 파악해서, Firebase에서 실시간으로 업데이트 되었다고 수신받은 값을 y 부분에 들어가게 하는 것
            data.datasets[0].data.push({x : sensor.Time, y : sensor.Distance})
            this.setState({sensor: sensor})
        });
    }
    _post(sensor) {
        return fetch(`${databaseURL}/sensor.json`, {
            method: 'POST',
            body: JSON.stringify(sensor)
        }).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            let nextState = this.state.sensor;
            nextState[data.name] = sensor;
            this.setState({sensor: nextState});
        });
    }
    _delete(id) {
        return fetch(`${databaseURL}/sensor/${id}.json`, {
            method: 'DELETE'
        }).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(() => {
            let nextState = this.state.sensor;
            delete nextState[id];
            this.setState({sensor: nextState});
        })
    }
    componentDidMount() {
        this._get();
    }
    handleDialogToggle = () => this.setState({
        dialog: !this.state.dialog
    })
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    handleSubmit = () => {
        const sensor = {
            Time: this.state.Time,
            Distance: this.state.Distance,
            Button: this.state.Button
        }
        this.handleDialogToggle();
        if (!sensor.Time && !sensor.Time) {
            return;
        }
        this._post(sensor);
    }
    handleDelete = (id) => {
        this._delete(id);
    }
    render() {
        const { classes } = this.props;
        var dataCount = 0

        
        return (
            <div>
                {Object.keys(this.state.sensor).map(id => {
                    const sensor = this.state.sensor[id];
                    dataCount = dataCount + 1
                    if(dataCount <= 1){
                        return (
                            <div key={id}>
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            거리: {sensor.Distance}
                                        </Typography>
                                        <Grid container>
                                            <Grid item xs = {6}>
                                                <Typography gutterBottom variant="h6" component="h2">
                                                    측정시간: {sensor.Time}
                                                </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                                
                                            </Grid>
                                        </Grid>
                                        <Typography color="textSecondary" gutterBottom variant="h6" component="h2">
                                            데이터 수정 여부: {sensor.Button}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    }else{
                        return (
                            <div key={id}>
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            거리: {sensor.Distance}
                                        </Typography>
                                        <Grid container>
                                            <Grid item xs = {6}>
                                                <Typography gutterBottom variant="h6" component="h2">
                                                    측정시간: {sensor.Time}
                                                </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                                <Button variant="contained" color="primary" onClick={() => this.handleDelete(id)}>삭제</Button>
                                            </Grid>
                                        </Grid>
                                        <Typography color="textSecondary" gutterBottom variant="h6" component="h2">
                                            데이터 수정 여부: {sensor.Button}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    }
                })}

                <Line data={data} options={options} />

                <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle}>
                    <AddIcon />
                </Fab>
                <Dialog open={this.state.dialog} onClose={this.handleDialogToggle}>
                    <DialogTitle>단어 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="날짜 및 시간" type="word" name="Time" value={this.state.Time} onChange={this.handleValueChange} /><br />
                        <TextField label="실측거리" type="number" name="Distance" value={this.state.Distance} onChange={this.handleValueChange} /><br />
                        <TextField label="데이터수정 여부(O,X만)" type="word" name="Button" value={this.state.Button} onChange={this.handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleDialogToggle}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(Sensor);