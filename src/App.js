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
            buttons: [],
            authenticated: false
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

    stop = () => {
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        fetch(baseUrl + '/stop');
    }

    getButtonElements = () => {
        return new Promise((resolve) => {

            var getUrl = window.location;
            var baseUrl = getUrl.protocol + "//" + getUrl.host;

            fetch(baseUrl + '/getButtons')
                .then(response => response.json())
                .then(data => {
                    console.log(data)

                    let sortedArray = data["buttons"];
                    sortedArray = sortedArray.sort((a, b) => {
                        if (a.title < b.title) { return -1; }
                        if (a.title > b.title) { return 1; }
                        return 0;
                    })

                    resolve(sortedArray);
                });

        })
    }

    sendPlaySoundRequest = (id) => {

        console.log(id)
        let xhr = new XMLHttpRequest();

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            console.log(xhr.responseText)
        })

        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;

        xhr.open('POST', baseUrl + '/play')
        xhr.send(JSON.stringify({ playId: id }))

    }

    random = () => {
        let buttonList = this.state.buttons;
        let numberOfElements = buttonList.length;
        let randomId = buttonList[Math.ceil(Math.random() * numberOfElements) - 1].id;

        this.sendPlaySoundRequest(randomId);
    }

    getDOM = () => {
        return this.state.buttons.map((element) => {
            return <Button onClick={() => this.sendPlaySoundRequest(element.id)} className="button">{element.title}</Button>
        })
    }

    checkPassword(input){
        if(input === "DiesesPasswortWerdetIhrAbsolutNieBruteForcenWeilEsVielZuVieleStellenHat" || input === "ch3lul"){
            this.setState({
                authenticated: true
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.authenticated ? (
                    <div>
                        <div>
                            <Button onClick={this.refresh} style={{ width: 50, height: 50, marginLeft: 10, marginTop: 10 }}>
                                <Image
                                    src={require('./assets/img/refresh.png')}
                                    style={{ height: '100%', width: '150%', marginLeft: -5 }}
                                />
                            </Button>
                            <Button variant="danger" onClick={this.stop} style={{ width: 48, height: 48, marginLeft: 10, marginTop: 10 }}>
                                <Image
                                    src={require('./assets/img/stop_sign.png')}
                                    style={{ height: '100%', width: '150%', marginLeft: -5 }}
                                />
                            </Button>
                            <Button variant="link" onClick={this.random} style={{ width: 50, height: 50, marginLeft: 10, marginTop: 10 }}>
                                <Image
                                    src={require('./assets/img/rand.png')}
                                    style={{ height: '100%', width: '150%', marginLeft: -5 }}
                                />
                            </Button>
                        </div>
                        {this.getDOM()}
                    </div>)
                    :
                    (
                        <input
                            placeholder="Password"
                            type="password"
                            onChange={(p) => this.checkPassword(p.target.value)}
                        />
                    )
                }
            </div>
        );
    }
}

export default App;
