import { root } from './base';

function authHandler(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
};

root.authAnonymously(authHandler);

export var user = null;
