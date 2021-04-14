import React from "react";
import io from "socket.io-client";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      message: '',
      messages: []
    };
      this.socket = io('localhost:8080');
        this.sendMessage = ev => {
          ev.preventDefault();
          this.socket.emit('SEND_MESSAGE', {
              author: this.state.username,
              message: this.state.message
          });
          this.setState({message: ''});
          }

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };
    }
  render(){
    // const { classes } = props;
      return (
          <div className="container">
            <div className="messages">
              {this.state.messages.map(message => {
                return (
                    <div>{message.author}: {message.message}</div>
                )
              })}
            </div>
            <div className="messageBox">
             <Input type="text" placeholder="Username" className="user" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
             <br/>
            <Input type="text" placeholder="Message" className="text" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
            <br/>
            <Button variant="contained" className="button" color="primary" onClick={this.sendMessage}>Send</Button>
            </div>
          </div>
      );
  }
}

export default Chat;
