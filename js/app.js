// TODO: code climate + tests
// TODO: Linkedin client auth
// TODO: Linkedin API call to /connections
// TODO: Reset game
// TODO: Score and Achievements

(function() {

  // Global data
  var scoreCount = 0;

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
        connections = _.filter(connections, function(person) {
          return person.pictureUrl;
        });

        connections = _.shuffle(connections);
        connections = connections.slice(0, 12);

        centered.classList.remove('centered');

        var gridTpl = document.querySelector("#entry-template").innerHTML;
        grid.innerHTML = _.template(gridTpl, { connections: connections });

        var flippers = document.getElementsByClassName('flipper');

        var open = [];

        _.each(flippers, function(flipper) {
          flipper.addEventListener('click', function(event) {

            // To avoid opening the same tile twice
            if (_.contains(open, flipper) || flipper.classList.contains('complete')) {
              return false;
            }

            var openCount = document.getElementsByClassName('open').length;
            var completeCount = document.getElementsByClassName('complete').length;

            if (openCount > completeCount + 1) {
              return false;
            }

            if (completeCount === flippers.length) {
              alert('Game Over. Your score is ' + scoreCount);
            }

            open.push(flipper);
            flipper.classList.add('open');

            function increaseScore() {
              var scorePlaceholder = document.querySelector('.score span');
              var scoreTrail = document.querySelector('.score-trail');
              scoreCount = scoreCount + 10;
              scorePlaceholder.innerHTML = scoreCount;

              scoreTrail.innerHTML = '+10';
              scoreTrail.style.color = '#007ee5';
              scoreTrail.style.display = 'inline-block';
              scoreTrail.classList.remove('fadeOut');
              scoreTrail.classList.add('fadeInUp');
              setTimeout(function() {
                scoreTrail.classList.remove('fadeInUp');
                scoreTrail.classList.add('fadeOut');
              }, 1000);
            }

            function decreaseScore() {
              var scorePlaceholder = document.querySelector('.score span');
              var scoreTrail = document.querySelector('.score-trail');
              scoreCount = scoreCount - 1;
              scorePlaceholder.innerHTML = scoreCount;

              scoreTrail.innerHTML = '-1';
              scoreTrail.style.color = '#d80017';
              scoreTrail.style.display = 'inline-block';
              scoreTrail.classList.remove('fadeOut');
              scoreTrail.classList.add('fadeInUp');
              setTimeout(function() {
                scoreTrail.classList.remove('fadeInUp');
                scoreTrail.classList.add('fadeOut');
              }, 1000);
            }

            if (open.length === 2) {
              var second = open.pop();
              var first = open.pop();

              if (first.dataset.id === second.dataset.id) {
                increaseScore();
                first.querySelector('.back').style.backgroundColor = '#007ee5';
                second.querySelector('.back').style.backgroundColor = '#007ee5';
                first.classList.add('complete');
                second.classList.add('complete');
                open = [];
              } else {
                if (scoreCount > 0) {
                  decreaseScore();
                }
                setTimeout(function() {
                  first.classList.remove('open');
                  second.classList.remove('open');
                }, 1000);
              }
            }

          });
        });

        var divs = Array.prototype.slice.call(grid.children);
        while (divs.length) {
          grid.appendChild(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }

      });
  }

})();
