import "./style.less";

import React from 'react';
import Firebase from 'firebase';

import Router from 'react-router';
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var fbRoot = new Firebase("https://amber-heat-5551.firebaseio.com/");
var logs = fbRoot.child('logs');
var rooms = fbRoot.child('rooms');

class App extends React.Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                XYZZY
              </a>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
                <RouteHandler/>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = { rooms: []};

    rooms.on("value", function(snapshot, prevChildKey) {
      this.setState({'rooms': snapshot.val()});
      console.log('snap', this.state.rooms);
    }.bind(this));
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

class Room extends React.Component {

  constructor(props) {
    super(props);

    console.log('pppppp', props);
    this.log = logs.child(props.params.room);
    
    this.state = { 
      log: []
    };

    this.log.on("child_added", function(snapshot, prevChildKey) {
      console.log('snap', snapshot.val());
      this.state.log.push(snapshot.val());
      this.setState({'log': this.state.log});
      console.log('snap', this.state.log);
    }.bind(this));
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
      console.log("EEEEEE", event.target.value);
      this.log.push(event.target.value);
      event.target.value = '';
      event.preventDefault();
    }
  }

}

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Home}/>
    <Route name="room" path="room/:room" handler={Room}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
