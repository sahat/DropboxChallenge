/**
 * Created by Sahat on 7/18/2014.
 */
// TODO: code climate + tests
// TODO: Linkedin client auth
// TODO: Linkedin API call to /connections
// TODO: When connections are loaded, replace DOM with grid
// TODO: Add logout button
// TODO: Reset game
// TODO: Score and Achievements

IN.init({
  api_key: '75z17ew9n8c2pm',
  authorize: true
});

var loginBtn = document.querySelector('.btn-linkedin');
loginBtn.addEventListener('click', function() {
  IN.UI.Authorize().place();
  IN.Event.on(IN, 'auth', function() {

  });
});


function onLinkedInLoad() {

}