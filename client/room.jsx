import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link, default as Router } from 'react-router';
import { rooms, logs } from './base';

export default class Room extends React.Component {

  constructor(props) {
    super(props);

    this.log = logs.child(props.params.room);

    this.state = {
      log: []
    };

    this.log.on("child_added", function(snapshot, prevChildKey) {
      this.state.log.push(snapshot.val());
      this.setState({'log': this.state.log});
    }.bind(this));
  }

  componentWillUnmount() {
    this.log.off();
  }

  render() {
    var room = this.props.params.room;
    return (
      <div>
        <h3>Room: {room}</h3>
        <textarea placeholder="Say something" onKeyDown={this.handleKeyDown.bind(this)}/>
        <ul>
          {this.state.log.map(function(entry) {
            return <li key={entry}>{entry}</li>;
          })}
        </ul>
      </div>
    );
  }

  handleKeyDown(event) {
    console.log(event.key, event.keyCode);
    if (event.keyCode==13) {
      this.log.push(event.target.value);
      event.target.value = '';
      event.preventDefault();
    }
  }

}

