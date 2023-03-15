import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const databaseURL = "https://distance3-3c62d-default-rtdb.firebaseio.com";

class Sensor extends React.Component {
    constructor() {
        super();
        this.state = {
            sensor: {}
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
    shouldComponentUpdate(nextprops, nextState) {
        return nextState.sensor != this.state.sensor;
    }
    componentDidMount() {
        this._get();
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
                                    <Typography color="textSecondary" gutterBottom variant="h5" component="h2">
                                        거리: {sensor.Distance}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        측정시간: {sensor.Time}
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