import Firebase from 'firebase';
console.log('ff', Firebase);
export var root = new Firebase("https://amber-heat-5551.firebaseio.com/");
export var logs = root.child('logs');
export var rooms = root.child('rooms');
