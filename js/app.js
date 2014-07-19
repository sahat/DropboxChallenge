// TODO: code climate + tests
// TODO: Linkedin client auth
// TODO: Linkedin API call to /connections
// TODO: When connections are loaded, replace DOM with grid
// TODO: Add logout button
// TODO: Reset game
// TODO: Score and Achievements

(function() {
  IN.init({
    api_key: '75z17ew9n8c2pm',
    authorize: true
  });

  var loginBtn = document.querySelector('.btn-linkedin');
  loginBtn.addEventListener('click', function() {
    console.log('click')
//  IN.UI.Authorize().place();
//  IN.Event.on(IN, 'auth', function() {
//    var source = document.querySelector("#entry-template").innerHTML;
//    document.querySelector('#main').innerHTML = _.template(source, { name: 'pebbles' });
//  });
  });


  function onLinkedInLoad() {

  }
})();