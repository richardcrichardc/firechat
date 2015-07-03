import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link, default as Router } from 'react-router';
import { rooms, logs } from './firebase';

export default class Home extends React.Component {

  componentWillMount(props) {
    this.setState({rooms: []});

    rooms.on("value", function(snapshot, prevChildKey) {
      this.setState({'rooms': snapshot.val()});
      console.log('snap', this.state.rooms);
    }.bind(this));
  }

  componentWillUnmount() {
    rooms.off(); 
  }

  render() {
  
    var rooms = [];
    for (var room in this.state.rooms) {
      rooms.push(<li key={room}><Link to="room" params={{room: room}}>{room}</Link></li>)
    }
  
    return <div>
      <h3>Rooms</h3>
      
      <ul>
        {rooms}
      </ul>
    </div>;
  }
}
