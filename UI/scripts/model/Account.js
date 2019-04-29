const accounts = {
  kikimer: 'greenSlonik228',
};

let loggedIn = (localStorage.getItem('user') !== null
  && JSON.parse(localStorage.getItem('user')).username !== undefined);
