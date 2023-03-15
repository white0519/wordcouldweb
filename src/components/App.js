import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import AppShell from './Appshell';
import Home from './Home';
import Texts from './Texts';
import Sensor from './Sensor';

class App extends React.Component {
    render() {
        return (
            <Router>
                <AppShell>
                    <div>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/Texts" component={Texts}/>
                        <Route exact path="/Sensor" component={Sensor}/>
                    </div>
                </AppShell>
            </Router>
        );
    }
}

export default App;