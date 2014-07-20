(function() {

  // Global Data.
  var scoreCount = 0;

  // Initialize LinkedIn SDK.
  IN.init({
    api_key: '75z17ew9n8c2pm',
    authorize: true
  });

  // Initial DOM Elements.
  var grid = document.querySelector('#grid');
  var body = document.querySelector('body');
  var title = document.querySelector('.title');
  var score = document.querySelector('.score');
  var centered = document.querySelector('.centered');
  var container = document.querySelector('.container');
  var loginButton = document.querySelector('.btn-linkedin');
  var copyright = document.querySelector('.copyright');

  /**
   * Step 1. Handle Sign-in with LinkedIn.
   */
  loginButton.addEventListener('click', function() {
    IN.UI.Authorize().place();
    IN.Event.on(IN, 'auth', authComplete);
  });

  /**
   * Step 2. User is signed-in.
   */
  function authComplete() {
    getConnections();
    body.style.backgroundColor = '#f3f5f8';
    centered.style.marginTop = '0';
    centered.style.top = '0';
    loginButton.style.display = 'none';
    score.style.display = 'block';
  }

  /**
   * Step 3. Obtain user's connections.
   */
  function getConnections() {
    IN.API.Connections('me')
      .result(function(data) {
        var connections = data.values;

        // Exclude people with missing photos.
        connections = _.filter(connections, function(person) {
          return person.pictureUrl;
        });

        // Get 12 random people.
        connections = _.shuffle(connections);
        connections = connections.slice(0, 12);

        renderTemplate(connections);

        addClickHandlers();

        shuffleTiles();
      });
  }

  /**
   * Step 4. Render a grid with tiles, where each tile is a connection.
   */
  function renderTemplate(connections) {
    // Align DOM elements back to the top.
    centered.classList.remove('centered');

    // Parse and render a template with a grid of people tiles using Lodash.
    var gridTpl = document.querySelector('#grid-template').innerHTML;
    grid.innerHTML = _.template(gridTpl, { connections: connections });

    // Move copyright info at the bottom after the grid.
    container.appendChild(copyright);
  }


  /**
   * Step 5. Attach click handlers to tiles.
   */
  function addClickHandlers() {

    // Each tile is called a flipper because we can flip between front and back.
    var flippers = document.getElementsByClassName('flipper');
    var open = [];

    // For each tile add a click event handler.
    _.each(flippers, function(flipper) {
      flipper.addEventListener('click', function() {

        // Avoid opening the same tile twice or if it's already been matched.
        if (_.contains(open, flipper) || flipper.classList.contains('complete')) {
          return false;
        }

        // Store currently opened tile in the temporary array.
        open.push(flipper);
        flipper.classList.add('open');

        var increaseScore = function() {
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
        };

        var decreaseScore = function() {
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
        };

        // After two tiles are open check if they match. If they do award +10
        // points, otherwise subtract -1 point.
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
            if (scoreCount > 0) decreaseScore();

            // Close tiles after 1 second if there is no match.
            setTimeout(function() {
              first.classList.remove('open');
              second.classList.remove('open');
            }, 1000);
          }
        }

        // Check to see if all tiles have been matched.
        var completeCount = document.getElementsByClassName('complete').length;
        if (completeCount === flippers.length) {
          alert('Game Over. Your score is ' + scoreCount);
        }
      });
    });
  }

  /**
   * Step 6: Randomize tiles order.
   */
  function shuffleTiles() {
    // So, element.children returns something that sort of looks like an array
    // but it isn't. You cannott call slice or splice methods on it. That's why
    // we need to convert it to the real JavaScript array first.
    var divs = Array.prototype.slice.call(grid.children);
    while (divs.length) {
      grid.appendChild(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
  }

})();
