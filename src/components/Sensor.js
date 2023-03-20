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

const data = {
    labels: ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00',],
    
    datasets: [
      {
        label: 'Last Day Result',
        data: [124,123,123,125,125,126,126,127,127,127,122,126,122,123,123,122,123,124,123,123,124,122,121,123,124],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      }
    ],
  };

const options = {
    scales: {
    x: {
    title: {
    display: true,
    text: 'Time'
    }
    },
    y: {
    title: {
    display: true,
    text: 'Distance(mm)'
    }
    }
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

    componentDidMount() {
        this._get();
    }

    _get() {
        fetch(`${databaseURL}/sensor.json`).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }

            return res.json();
        }).then(sensor => this.setState({sensor: sensor}));
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
                    if(dataCount <= 2){
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