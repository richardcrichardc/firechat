var React = require('react');

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                Project X
              </a>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <Scene wireframe={true} above={true} />
            </div>
            <div className="col-md-6">
              <Scene wireframe={false} above={false} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Scene extends React.Component {
  render() {
    return <div id="sss"></div>;
  }

  componentDidMount() {
    var node = $(React.findDOMNode(this));

    console.log('eeee', React.findDOMNode(this));

    var DEG90 = Math.PI / 2;
    var DEG45 = Math.PI / 4;

    var scene = new THREE.Scene();

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xffffff );
    renderer.setSize( node.width(), node.height() );

    var de = $(renderer.domElement);
    node.append(de);

    de.click(function(e) {
      console.log('clicka', e.clientX, e.clientY);
    });

    var ambientLight = new THREE.AmbientLight( 0x000000 );
    scene.add( ambientLight );

    // lights

    var lights = [];
    lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[1] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[2] = new THREE.PointLight( 0xffffff, 1, 0 );

    lights[0].position.set( 0, 2000, 0 );
    lights[1].position.set( 1000, 2000, 1000 );
    lights[2].position.set( -1000, -2000, -1000 );

    scene.add( lights[0] );
    scene.add( lights[1] );
    scene.add( lights[2] );


    //// objects

    // cube
    var geometry = new THREE.BoxGeometry(200, 200, 600);
    var material = new THREE.MeshLambertMaterial( { color: 0x8a7f6b, wireframe: this.props.wireframe } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.y = 100;
    scene.add( cube );

    // plane
    var geometry = new THREE.PlaneGeometry(1000, 1000);
    var material = new THREE.MeshBasicMaterial( {color: 0x6B4423, side: THREE.DoubleSide, wireframe: this.props.wireframe} );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotation.x = DEG90;
    scene.add( plane );


    // camera
    var origin = new THREE.Vector3(0, 0, 0);
    var camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 10000 );

    if (this.props.above) {
      camera.position.set(0, 1800, 0);
      camera.lookAt(origin);
      console.log(camera.rotation, camera.up);
      camera.rotation.z -= DEG90;
      console.log(camera.rotation, camera.up);
    } else {
      camera.position.set(400, 300, -800);
      camera.lookAt(origin);
    }


    var render = function () {
      requestAnimationFrame( render );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    //render();
    renderer.render(scene, camera);
  }
}


require("./style.less");

var appNode = document.getElementById('app');
console.log(appNode);
React.render(<App />, appNode);