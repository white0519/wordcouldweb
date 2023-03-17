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
            sensor: this.state.sensor,
            Distance: this.state.Distance
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
        return (
            <div>
                {Object.keys(this.state.sensor).map(id => {
                    const sensor = this.state.sensor[id];
                    return (
                        <div key={id}>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        거리: {sensor.Distance}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        측정시간: {sensor.Time}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom variant="h6" component="h2">
                                        데이터 수정 여부: {sensor.Button}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Sensor;