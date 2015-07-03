var React = require('react');
var Firebase = require("firebase");

var fbRoot = new Firebase("https://amber-heat-5551.firebaseio.com/");
var log = fbRoot.child('log');

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { name: 'ZzzZaaa', inp:null, log: []};

    log.on("child_added", function(snapshot, prevChildKey) {
      console.log('snap', snapshot.val());
      this.state.log.push(snapshot.val());
      this.setState({'log': this.state.log});
      console.log('snap', this.state.log);
    }.bind(this));
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                {this.state.name}
              </a>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <textarea placeholder="Say something" onKeyDown={this.handleKeyDown.bind(this)}/>
              <ul>
                {this.state.log.map(function(entry) {
                  return <li key={entry}>{entry}</li>;
                })}
              </ul>
              </div>
          </div>
        </div>
      </div>
    );
  }

  handleKeyDown(event) {
    console.log(event.key, event.keyCode);
    if (event.keyCode==13) {
      console.log("EEEEEE", event.target.value);
      log.push(event.target.value);
      event.target.value = '';
      event.preventDefault();
    }
  }


}



require("./style.less");

var appNode = document.getElementById('app');
console.log(appNode);
React.render(<App />, appNode);
