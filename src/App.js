import React from 'react';
import './App.css';

import { Button, Image } from 'react-bootstrap'

class ButtonElement {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttons: []
        }

        this.getButtonElements().then((result) => {
            this.setState({
                buttons: result
            })
        });

    }

    refresh = () => {
        this.getButtonElements().then((result) => {
            this.setState({
                buttons: result
            })
        });
    }

    getButtonElements = () => {
        return new Promise((resolve) => {

            fetch('http://localhost/getButtons')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    resolve(data["buttons"])
                });
            
        })
    }

    sendPlaySoundRequest = (id) => {

        let xhr = new XMLHttpRequest();

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            console.log(xhr.responseText)
        })

        xhr.open('POST', 'http://localhost/play')
        xhr.send(JSON.stringify({ playId: id }))

    }

    getDOM = () => {
        return this.state.buttons.map((element) => {
            return <Button onClick={() => this.sendPlaySoundRequest(element.id)} className="button">{element.title}</Button>
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Button onClick={this.refresh} style={{ width: 50, height: 50, marginLeft: 10, marginTop: 10 }}>
                        <Image
                            src={require('./assets/img/refresh.png')}
                            style={{ height: '100%', width: '150%', marginLeft: -5 }}
                        />
                    </Button>
                </div>
                {this.getDOM()}
            </div>
        );
    }
}

export default App;
