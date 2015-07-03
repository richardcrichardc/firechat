import "./style.less";

import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link, default as Router } from 'react-router';
import { rooms, logs } from './base';
import user from './auth';

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

import Home from './home.jsx';
import Room from './room.jsx';

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Home}/>
    <Route name="room" path="room/:room" handler={Room}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
