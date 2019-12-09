import React, {Component} from 'react';
import './App.css';
import FormBlock from "./components/FormBlock/FormBlock";
import Message from "./components/Message/Message";

class App extends Component {

    state = {
        nickname: '',
        text: '',
        messages: [],
        lastDateTime: 0,
    };

    interval = null;

    componentDidMount() {
        this.getChat()
            .catch(error => console.error(error));
        this.interval = setInterval(() => this.getChat(), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getNickname = event => {
        this.setState({nickname: event.target.value});
    };

    getMessage = event => {
        this.setState({text: event.target.value});
    };

    async getChat() {
        let messagesArray = [...this.state.messages];
        messagesArray = [];

        const url = 'http://146.185.154.90:8000/messages?datetime=' + this.state.lastDateTime;
        const response = await fetch(url);

        if (response.ok) {
            const messages = await response.json();
            messages.forEach(message => {
                let nickname = message.author;
                let text = message.message;
                let id = message._id;

                let date = new Date(message.datetime);
                let hours = date.getUTCHours();
                let minutes = date.getUTCMinutes();
                let seconds = date.getUTCSeconds();
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                let time = hours + ':' + minutes + ':' + seconds;

                messagesArray.push({nickname: nickname, text: text, datetime: time, id: id});
            });

            let lastMessageDate = this.state.lastDateTime;

            if (messagesArray.length > 0) {
                lastMessageDate = messagesArray[(messagesArray.length - 1)].datetime;
                this.setState({messages: messagesArray, lastMessageDate});
                return messagesArray;
            }
        }
    };

    postMessage = event => {
        event.preventDefault();
        clearInterval(this.interval);
        const url = 'http://146.185.154.90:8000/messages';
        const data = new URLSearchParams();
        data.set('message', this.state.text);
        data.set('author', this.state.nickname);
        fetch(url, {
            method: 'post',
            body: data,
        })
            .catch(error => console.error(error));
        this.getChat()
            .catch(error => console.error(error));
        this.interval = setInterval(() => this.getChat(), 2000);
    };


    render() {
        const messages = this.state.messages.map(message => (
            <Message
                key={message.id}
                nickname={message.nickname}
                text={message.text}
                datetime={message.datetime}
            />
        ));

        return (
            <div className="App">
                <div>
                    {messages}
                </div>
                <FormBlock
                    getNickname={this.getNickname}
                    getMessage={this.getMessage}
                    submit={this.postMessage}
                />
            </div>
        );
    }
}

export default App;