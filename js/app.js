// TODO: code climate + tests
// TODO: Linkedin client auth
// TODO: Linkedin API call to /connections
// TODO: When connections are loaded, replace DOM with grid
// TODO: Add logout button
// TODO: Reset game
// TODO: Score and Achievements

(function() {

  // Initialize LinkedIn SDK
  IN.init({
    api_key: '75z17ew9n8c2pm',
    authorize: true
  });

  // DOM Elements
  var main = document.querySelector('#main');
  var title = document.querySelector('.title');
  var centered = document.querySelector('.centered');
  var loginButton = document.querySelector('.btn-linkedin');
  var copyright = document.querySelector('.copyright');


  // Event Listeners
  loginButton.addEventListener('click', function(e) {
    console.log('click');

    centered.style.marginTop = '0';
    centered.style.top = '0';
    loginButton.style.display = 'none';
    copyright.style.display = 'none';

  });

  function onLinkedInLoad() {

  }
})();

//  IN.UI.Authorize().place();
//  IN.Event.on(IN, 'auth', function() {
//    var source = document.querySelector("#entry-template").innerHTML;
//    document.querySelector('#main').innerHTML = _.template(source, { name: 'pebbles' });
//  });