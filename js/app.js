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
  var body = document.querySelector('body');
  var grid = document.querySelector('#grid');
  var title = document.querySelector('.title');
  var score = document.querySelector('.score');
  var centered = document.querySelector('.centered');
  var loginButton = document.querySelector('.btn-linkedin');
  var copyright = document.querySelector('.copyright');


  // Event Listeners
  loginButton.addEventListener('click', function(event) {
    IN.UI.Authorize().place();
    IN.Event.on(IN, 'auth', userAuthorized);


  });

  function userAuthorized() {
    getConnections();

    body.style.backgroundColor = '#f3f5f8';
    centered.style.marginTop = '0';
    centered.style.top = '0';
    loginButton.style.display = 'none';
    copyright.style.display = 'none';
    score.style.display = 'block';
  }

  function getConnections() {
    IN.API.Connections('me')
      .result(function(data) {

        var connections = data.values;

        // Remove people with missing photos
        _.each(connections, function(person, index) {
          if (person && !person.pictureUrl) {
            connections.splice(index, 1);
          }
        });

        connections = _.shuffle(connections);
        connections = connections.slice(0, 15);

        centered.classList.remove('centered');

        var gridTpl = document.querySelector("#entry-template").innerHTML;
        grid.innerHTML = _.template(gridTpl, { connections: connections });

        var flippers = document.getElementsByClassName('flipper');

        var open = [];

        _.each(flippers, function(flipper) {
          flipper.addEventListener('click', function(event) {

            // To avoid opening the same tile twice
            if (_.contains(open, flipper)) {
              return false;
            }

            // Check if pictureUrl's object is equal to name's object


            if (open.length === 2) {
              var second = open.pop();
              var first = open.pop();

              if (first.id === second.id) {
                console.log('IT IS A MATCH');
                open = [];
              } else {
                first.classList.remove('open');
                second.classList.remove('open');
              }
            }
            open.push(flipper);
            flipper.classList.add('open');
          });
        });


        var divs = Array.prototype.slice.call(grid.children);

        while (divs.length) {
          grid.appendChild(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }

      });
  }

})();
