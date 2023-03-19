import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const databaseURL = "https://distance3-3c62d-default-rtdb.firebaseio.com";

class Detail extends React.Component {

    componentDidMount() {
        this._get();
    }
    
    _get() {
        fetch(`${databaseURL}/texts.json`).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            
            return res.json();
        }).then(texts => {
            console.log(texts);
            if(texts[this.props.match.params.textID] === undefined){
                throw new Error(res.statusText);
            }else{
                this.setState({
                    textName : texts[this.props.match.params.textID].textName,
                    textContent :texts[this.props.match.params.textID].textContent
                })
            }
            //this.setState({texts: (texts == null ) ? {} : texts[this.props.match.params.textID]})
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            texts: {},
            textContent : "",
            textName : ""
        }
    }
    render() {

        console.log(this.props.match.params)
        return (
            <Card>
                <CardContent>
                    <p>{this.props.match.params.textID}</p>
                    <p>{this.state.textName}</p>
                    <p>{this.state.textContent}</p>
                </CardContent>
            </Card>
        );
    }
}

export default Detail;