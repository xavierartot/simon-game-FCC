'use strict';

//https://toddmotto.com/mastering-the-module-pattern/#revealing-module-pattern
var Simon = function () {
  var data = {
    caseCoche: document.querySelector('.caseCoche'),
    start: document.querySelector('.text__start'),
    startActive: document.querySelector('.text__btn'), //start btn
    green: document.querySelector('.shape__color-green'),
    red: document.querySelector('.shape__color-red'),
    blue: document.querySelector('.shape__color-blue'),
    yellow: document.querySelector('.shape__color-yellow'),
    shape: document.querySelectorAll('.shape__color'),
    //arraySimon         : [3,1,2,3,4,1,4,2],
    arraySimon: [],
    arrayOppoment: [],
    countBox: document.querySelector('.text__box') },
      dataGame = {
    1: { color: 'green', num: 1, sound: 'http://artot.net/sounds/other1.mp3' },
    2: { color: 'red', num: 2, sound: 'http://artot.net/sounds/other2.mp3' },
    3: { color: 'blue', num: 3, sound: 'http://artot.net/sounds/play.mp3' },
    4: { color: 'yellow', num: 4, sound: 'http://artot.net/sounds/soft.mp3' }
  },
      errorSound = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
      //from https://www.freecodecamp.com/challenges/build-a-simon-game
  color = '',
      random = '',
      d = data.arraySimon,
      randomTemp = '';

  console.log(d);

  // private
  var _playSound = function _playSound(sound) {
    new Audio(sound).play();
  };

  // the ai start
  var turn = function turn(t) {
    if (data.caseCoche.checked !== false) {
      alert('turn on the game');
      return false;
    }
    return t % 2 === 0 ? console.log(1) : console.log(0);
  };

  var error = function error(time) {
    return setTimeout(function () {
      _playSound(errorSound);
      //data.countbox === text box
      data.countBox.textContent = 'err';
      data.countBox.classList.add('error');
      //send to different ai() ex: _aiError()
      _ai();
    }, time); //1s
  };

  var opponent = function opponent(pawn) {
    var randomTemp = pawn !== undefined ? pawn : randomTemp;
    //d.push( dataGame[randomTemp] )
  };

  var addOneStep = function addOneStep() {

    //console.log('add one step');
    randomTemp = Random();

    setTimeout(function () {
      d.push(dataGame[randomTemp]);

      data.countBox.textContent = d.length;

      //add color with randomTemp 
      for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
          var _d = data[prop];
          if (prop === dataGame[randomTemp].color) {
            _d.classList.add('active');
          }
        }
      }
      //add sound with randomTemp 
      _playSound(dataGame[randomTemp].sound);

      setTimeout(function () {
        removeActiveClass();
      }, 1500); //1s
    }, 2500); //1s
  };

  var _ai = function _ai() {
    var j = 0,
        anim = void 0,
        d = data.arraySimon;
    console.log(j);
    console.log('arraySimon : ' + d);
    console.log('arraySimon length: ' + d.length);
    if (d.length === 0) {
      //add a step if arraySimon it's === 0
      return addOneStep();
    } else {
      //if the array is not empty loop through every seconds
      //then, add a step
      if (d.length > 0 && j <= d.length) {
        anim = setInterval(function () {

          //remove all class active
          removeActiveClass();

          if (j > d.length) {
            console.log('j >= d.length');
            clearInterval(anim);
            j++;
            //add one step
            return addOneStep();
          } else {
            //d.push( dataGame[randomTemp] )
            for (var i = 0, l = d.length; i < l; i++) {
              var current = d[i]; //current object
              //console.log(current);
              //console.log(current.num);
              //console.log(current.color);
              //console.log(data[current.color]);
              //console.log(data[current.color].classList.add('active'));
              data[current.color].classList.add('active');
              //add sound with randomTemp 
              _playSound(current.sound);
            }
            clearInterval(anim);
            setTimeout(function () {
              removeActiveClass();
            }, 700); //1s
            j++;
            addOneStep();
          }
        }, 1000); //1s
      }
    }
    console.log(j);
    console.log('arraySimon : ' + d);
    console.log('arraySimon length: ' + d.length);
  };

  //random between 1 and 4
  var Random = function Random() {
    random = Math.floor(Math.random() * 4) + 1;
    return random;
  };

  var emptyDataArraySimon = function emptyDataArraySimon() {
    while (d.length) {
      d.pop();
    }
  };

  var changeCheckbox = function changeCheckbox() {
    data.caseCoche.addEventListener('change', function () {
      if (this.checked) {
        //if this.checked is true
        //empty arraySimon 
        emptyDataArraySimon();
      } else {
        //empty arraySimon 
        emptyDataArraySimon();

        //start circle
        data.startActive.classList.remove('active');

        //remove class error
        data.countBox.classList.remove('error');
        data.countBox.textContent = '';
        //remove class active
        removeActiveClass();
      }
      return true;
    });
  };
  // private
  // dataGame = sound, num, color
  var _start = function _start() {
    //checke to false
    data.caseCoche.checked = false;
    //test the checked
    changeCheckbox();

    data.start.addEventListener('click', function (e) {
      if (data.caseCoche.checked === true) {
        //start the ai
        _ai();
        //start btn
        data.startActive.classList.add('active');
        //remove .error
        data.countBox.classList.remove('error');
      }
      //end checked true
      e.preventDefault();
    }); // end click on start
    return false;
  };

  var shapeClick = function shapeClick() {
    for (var i = 0, l = data.shape.length; i < l; i++) {
      data.shape[i].addEventListener('click', function (e) {
        console.log('click oppoment');
        // a chaque fois que je clique sur au item, 
        // je stock l'objet dans un tableaux
        data.arrayOppoment.push(dataGame[this.textContent.trim()]);
        //console.log(data.arrayOppoment);
        //console.log(data.arraySimon);
        for (var _i = 0, _l = data.arraySimon.length; _i < _l; _i++) {
          var currentDataSimon = data.arraySimon[_i];
          console.log(data.arrayOppoment);
          console.log(data.arraySimon);
          console.log(data.arrayOppoment[_i]);
          console.log(data.arraySimon[_i]);
          if (data.arraySimon[_i].num === data.arrayOppoment[_i].num) {
            console.log(data.arrayOppoment[_i]);
            console.log(data.arraySimon[_i]);
            this.classList.add('activeClick');
            _playSound(currentDataSimon.sound);
            setTimeout(function () {
              removeActiveClass();
            }, 500); //1s
            //opponent(parseInt(currentShape,10))
          } else {
            //return _ai() with error()
            console.log('error');
            return error();
            //return _ai()
          }
        }

        e.preventDefault();
        return _ai();
      });
    }
  };

  var removeActiveClass = function removeActiveClass() {
    for (var i = 0, l = data.shape.length; i < l; i++) {
      var current = data.shape[i];
      if (current.classList.contains('active') === true) {
        current.classList.remove('active');
      } else if (current.classList.contains('activeClick') === true) {
        current.classList.remove('activeClick');
      }
    }
  };

  //main
  var main = function main() {
    shapeClick();
    _start();
    removeActiveClass();
    return true;
  };

  return {
    main: main
  };
}();
Simon.main();
//Simon.anotherMethod ()
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJTaW1vbiIsImRhdGEiLCJjYXNlQ29jaGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzdGFydCIsInN0YXJ0QWN0aXZlIiwiZ3JlZW4iLCJyZWQiLCJibHVlIiwieWVsbG93Iiwic2hhcGUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYXJyYXlTaW1vbiIsImFycmF5T3Bwb21lbnQiLCJjb3VudEJveCIsImRhdGFHYW1lIiwiY29sb3IiLCJudW0iLCJzb3VuZCIsImVycm9yU291bmQiLCJyYW5kb20iLCJkIiwicmFuZG9tVGVtcCIsImNvbnNvbGUiLCJsb2ciLCJfcGxheVNvdW5kIiwiQXVkaW8iLCJwbGF5IiwidHVybiIsInQiLCJjaGVja2VkIiwiYWxlcnQiLCJlcnJvciIsInRpbWUiLCJzZXRUaW1lb3V0IiwidGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJfYWkiLCJvcHBvbmVudCIsInBhd24iLCJ1bmRlZmluZWQiLCJhZGRPbmVTdGVwIiwiUmFuZG9tIiwicHVzaCIsImxlbmd0aCIsInByb3AiLCJoYXNPd25Qcm9wZXJ0eSIsInJlbW92ZUFjdGl2ZUNsYXNzIiwiaiIsImFuaW0iLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJpIiwibCIsImN1cnJlbnQiLCJNYXRoIiwiZmxvb3IiLCJlbXB0eURhdGFBcnJheVNpbW9uIiwicG9wIiwiY2hhbmdlQ2hlY2tib3giLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlIiwiX3N0YXJ0IiwiZSIsInByZXZlbnREZWZhdWx0Iiwic2hhcGVDbGljayIsInRyaW0iLCJjdXJyZW50RGF0YVNpbW9uIiwiY29udGFpbnMiLCJtYWluIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBSUEsUUFBVSxZQUFNO0FBQ2xCLE1BQUlDLE9BQU87QUFDVEMsZUFBcUJDLFNBQVNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FEWjtBQUVUQyxXQUFxQkYsU0FBU0MsYUFBVCxD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QkFBb0IsU0FBcEJBLGlCQUFvQixHQUFNO0FBQzVCLFNBQUssSUFBSUssSUFBSSxDQUFSLEVBQVdDLElBQUl0RCxLQUFLVSxLQUFMLENBQVdtQyxNQUEvQixFQUF1Q1EsSUFBSUMsQ0FBM0MsRUFBOENELEdBQTlDLEVBQW1EO0FBQ2pELFVBQUlFLFVBQVV2RCxLQUFLVSxLQUFMLENBQVcyQyxDQUFYLENBQWQ7QUFDQSxVQUFJRSxRQUFRbkIsU0FBUixDQUFrQmlDLFFBQWxCLENBQTJCLFFBQTNCLE1BQXlDLElBQTdDLEVBQW1EO0FBQ2pEZCxnQkFBUW5CLFNBQVIsQ0FBa0IwQixNQUFsQixDQUF5QixRQUF6QjtBQUNELE9BRkQsTUFFTyxJQUFHUCxRQUFRbkIsU0FBUixDQUFrQmlDLFFBQWxCLENBQTJCLGFBQTNCLE1BQThDLElBQWpELEVBQXNEO0FBQzNEZCxnQkFBUW5CLFNBQVIsQ0FBa0IwQixNQUFsQixDQUF5QixhQUF6QjtBQUVEO0FBQ0Y7QUFDRixHQVZEOztBQVlBO0FBQ0EsTUFBSVEsT0FBUSxTQUFSQSxJQUFRLEdBQU07QUFDaEJKO0FBQ0FIO0FBQ0FmO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FMRDs7QUFPQSxTQUFPO0FBQ0xzQixVQUFPQTtBQURGLEdBQVA7QUFJRCxDQWxRVyxFQUFaO0FBbVFBdkUsTUFBTXVFLElBQU47QUFDQSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2h0dHBzOi8vdG9kZG1vdHRvLmNvbS9tYXN0ZXJpbmctdGhlLW1vZHVsZS1wYXR0ZXJuLyNyZXZlYWxpbmctbW9kdWxlLXBhdHRlcm5cbmxldCBTaW1vbiA9ICggKCkgPT4ge1xuICBsZXQgZGF0YSA9IHsgXG4gICAgY2FzZUNvY2hlICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhc2VDb2NoZScpLFxuICAgIHN0YXJ0ICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0X19zdGFydCcpLFxuICAgIHN0YXJ0QWN0aXZlICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0X19idG4nKSwgLy9zdGFydCBidG5cbiAgICBncmVlbiAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hhcGVfX2NvbG9yLWdyZWVuJyksXG4gICAgcmVkICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoYXBlX19jb2xvci1yZWQnKSxcbiAgICBibHVlICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hhcGVfX2NvbG9yLWJsdWUnKSxcbiAgICB5ZWxsb3cgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hhcGVfX2NvbG9yLXllbGxvdycpLFxuICAgIHNoYXBlICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGFwZV9fY29sb3InKSxcbiAgICAvL2FycmF5U2ltb24gICAgICAgICA6IFszLDEsMiwzLDQsMSw0LDJdLFxuICAgIGFycmF5U2ltb24gICAgICAgICA6IFtdLFxuICAgIGFycmF5T3Bwb21lbnQgICAgICA6IFtdLFxuICAgIGNvdW50Qm94ICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0X19ib3gnKSwvL2NvdW50XG4gIH0sXG4gIGRhdGFHYW1lID0ge1xuICAgIDEgOiB7Y29sb3IgOidncmVlbicgICwgbnVtIDogIDEsIHNvdW5kOiAgJ2h0dHA6Ly9hcnRvdC5uZXQvc291bmRzL290aGVyMS5tcDMnICAgIH0sXG4gICAgMiA6IHtjb2xvciA6J3JlZCcgICAgLCBudW0gOiAgMiwgc291bmQ6ICAnaHR0cDovL2FydG90Lm5ldC9zb3VuZHMvb3RoZXIyLm1wMycgICAgfSxcbiAgICAzIDoge2NvbG9yIDonYmx1ZScgICAsIG51bSA6ICAzLCBzb3VuZDogICdodHRwOi8vYXJ0b3QubmV0L3NvdW5kcy9wbGF5Lm1wMycgICAgICB9LFxuICAgIDQgOiB7Y29sb3IgOid5ZWxsb3cnICwgbnVtIDogIDQsIHNvdW5kOiAgJ2h0dHA6Ly9hcnRvdC5uZXQvc291bmRzL3NvZnQubXAzJyAgICAgIH1cbiAgfSxcbiAgZXJyb3JTb3VuZCA9ICdodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZnJlZWNvZGVjYW1wL3NpbW9uU291bmQxLm1wMycsIC8vZnJvbSBodHRwczovL3d3dy5mcmVlY29kZWNhbXAuY29tL2NoYWxsZW5nZXMvYnVpbGQtYS1zaW1vbi1nYW1lXG4gIGNvbG9yICAgICAgID0gJycsXG4gIHJhbmRvbSAgICAgID0gJycsXG4gIGQgPSBkYXRhLmFycmF5U2ltb24sXG4gIHJhbmRvbVRlbXAgID0gJydcblxuICBjb25zb2xlLmxvZyhkKTtcblxuICAvLyBwcml2YXRlXG4gIGxldCBfcGxheVNvdW5kID0gKHNvdW5kKSA9PiB7XG4gICAgbmV3IEF1ZGlvKHNvdW5kKS5wbGF5KClcbiAgfVxuXG4gIC8vIHRoZSBhaSBzdGFydFxuICBsZXQgdHVybiA9ICh0KSA9PiB7XG4gICAgaWYgKGRhdGEuY2FzZUNvY2hlLmNoZWNrZWQgIT09IGZhbHNlKSB7XG4gICAgICBhbGVydCgndHVybiBvbiB0aGUgZ2FtZScpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHQgJSAyID09PSAwID8gY29uc29sZS5sb2coMSkgOiBjb25zb2xlLmxvZygwKVxuICB9XG5cbiAgbGV0IGVycm9yID0gKHRpbWUpID0+IHtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBfcGxheVNvdW5kKGVycm9yU291bmQgKVxuICAgICAgLy9kYXRhLmNvdW50Ym94ID09PSB0ZXh0IGJveFxuICAgICAgZGF0YS5jb3VudEJveC50ZXh0Q29udGVudCA9ICdlcnInXG4gICAgICBkYXRhLmNvdW50Qm94LmNsYXNzTGlzdC5hZGQoJ2Vycm9yJylcbiAgICAgIC8vc2VuZCB0byBkaWZmZXJlbnQgYWkoKSBleDogX2FpRXJyb3IoKVxuICAgICAgX2FpKClcbiAgICB9LCB0aW1lKTsvLzFzXG4gIH1cblxuICBsZXQgb3Bwb25lbnQgPSAocGF3bikgPT4ge1xuICAgIGxldCByYW5kb21UZW1wID0gKHBhd24gIT09IHVuZGVmaW5lZCkgPyBwYXduIDogcmFuZG9tVGVtcFxuICAgIC8vZC5wdXNoKCBkYXRhR2FtZVtyYW5kb21UZW1wXSApXG4gIH1cblxuICBsZXQgYWRkT25lU3RlcCA9ICgpID0+IHtcblxuICAgIC8vY29uc29sZS5sb2coJ2FkZCBvbmUgc3RlcCcpO1xuICAgIHJhbmRvbVRlbXAgPSBSYW5kb20oKVxuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBkLnB1c2goIGRhdGFHYW1lW3JhbmRvbVRlbXBdIClcblxuICAgICAgZGF0YS5jb3VudEJveC50ZXh0Q29udGVudCA9IGQubGVuZ3RoIFxuXG4gICAgICAvL2FkZCBjb2xvciB3aXRoIHJhbmRvbVRlbXAgXG4gICAgICBmb3IgKGxldCBwcm9wIGluIGRhdGEpe1xuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgIGxldCBkID1kYXRhW3Byb3BdIFxuICAgICAgICAgIGlmIChwcm9wID09PSBkYXRhR2FtZVtyYW5kb21UZW1wXS5jb2xvcikge1xuICAgICAgICAgICAgZC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy9hZGQgc291bmQgd2l0aCByYW5kb21UZW1wIFxuICAgICAgX3BsYXlTb3VuZChkYXRhR2FtZVtyYW5kb21UZW1wXS5zb3VuZClcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKClcbiAgICAgIH0sIDE1MDApOy8vMXNcblxuICAgIH0sIDI1MDApOy8vMXNcbiAgfVxuXG4gIGxldCBfYWkgPSAoKSA9PiB7XG4gICAgbGV0IGo9MCwgYW5pbSwgZCA9IGRhdGEuYXJyYXlTaW1vblxuICAgIGNvbnNvbGUubG9nKGopO1xuICAgIGNvbnNvbGUubG9nKCdhcnJheVNpbW9uIDogJytkKTtcbiAgICBjb25zb2xlLmxvZygnYXJyYXlTaW1vbiBsZW5ndGg6ICcrZC5sZW5ndGgpO1xuICAgIGlmIChkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy9hZGQgYSBzdGVwIGlmIGFycmF5U2ltb24gaXQncyA9PT0gMFxuICAgICAgcmV0dXJuIGFkZE9uZVN0ZXAoKVxuICAgIH0gZWxzZXtcbiAgICAgIC8vaWYgdGhlIGFycmF5IGlzIG5vdCBlbXB0eSBsb29wIHRocm91Z2ggZXZlcnkgc2Vjb25kc1xuICAgICAgLy90aGVuLCBhZGQgYSBzdGVwXG4gICAgICBpZiAoZC5sZW5ndGggPiAwICYmIGogPD0gZC5sZW5ndGgpIHtcbiAgICAgICAgYW5pbSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIC8vcmVtb3ZlIGFsbCBjbGFzcyBhY3RpdmVcbiAgICAgICAgICByZW1vdmVBY3RpdmVDbGFzcygpXG5cbiAgICAgICAgICBpZiAoaiA+IGQubGVuZ3RoICkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ogPj0gZC5sZW5ndGgnKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoYW5pbSlcbiAgICAgICAgICAgIGorK1xuICAgICAgICAgICAgLy9hZGQgb25lIHN0ZXBcbiAgICAgICAgICAgIHJldHVybiBhZGRPbmVTdGVwKCkgXG4gICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgLy9kLnB1c2goIGRhdGFHYW1lW3JhbmRvbVRlbXBdIClcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBkW2ldIC8vY3VycmVudCBvYmplY3RcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjdXJyZW50KTtcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjdXJyZW50Lm51bSk7XG4gICAgICAgICAgICAgIC8vY29uc29sZS5sb2coY3VycmVudC5jb2xvcik7XG4gICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YVtjdXJyZW50LmNvbG9yXSk7XG4gICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YVtjdXJyZW50LmNvbG9yXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKSk7XG4gICAgICAgICAgICAgIGRhdGFbY3VycmVudC5jb2xvcl0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgLy9hZGQgc291bmQgd2l0aCByYW5kb21UZW1wIFxuICAgICAgICAgICAgICBfcGxheVNvdW5kKGN1cnJlbnQuc291bmQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGFuaW0pXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MoKVxuICAgICAgICAgICAgfSwgNzAwKTsvLzFzXG4gICAgICAgICAgICBqKytcbiAgICAgICAgICAgIGFkZE9uZVN0ZXAoKSBcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDApOy8vMXNcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coaik7XG4gICAgY29uc29sZS5sb2coJ2FycmF5U2ltb24gOiAnK2QpO1xuICAgIGNvbnNvbGUubG9nKCdhcnJheVNpbW9uIGxlbmd0aDogJytkLmxlbmd0aCk7XG4gIH1cblxuICAvL3JhbmRvbSBiZXR3ZWVuIDEgYW5kIDRcbiAgbGV0IFJhbmRvbSA9ICgpID0+IHtcbiAgICByYW5kb20gPSAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCkgKyAxICBcbiAgICByZXR1cm4gcmFuZG9tIFxuICB9XG5cbiAgbGV0IGVtcHR5RGF0YUFycmF5U2ltb24gPSAoKSA9PiB7XG4gICAgd2hpbGUgKGQubGVuZ3RoKSB7IGQucG9wKCk7IH1cbiAgfVxuXG4gIGxldCBjaGFuZ2VDaGVja2JveCA9ICgpID0+IHtcbiAgICBkYXRhLmNhc2VDb2NoZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuY2hlY2tlZCkgey8vaWYgdGhpcy5jaGVja2VkIGlzIHRydWVcbiAgICAgICAgLy9lbXB0eSBhcnJheVNpbW9uIFxuICAgICAgICBlbXB0eURhdGFBcnJheVNpbW9uKClcbiAgICAgIH0gZWxzZXtcbiAgICAgICAgLy9lbXB0eSBhcnJheVNpbW9uIFxuICAgICAgICBlbXB0eURhdGFBcnJheVNpbW9uKClcblxuICAgICAgICAvL3N0YXJ0IGNpcmNsZVxuICAgICAgICBkYXRhLnN0YXJ0QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG5cbiAgICAgICAgLy9yZW1vdmUgY2xhc3MgZXJyb3JcbiAgICAgICAgZGF0YS5jb3VudEJveC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpXG4gICAgICAgIGRhdGEuY291bnRCb3gudGV4dENvbnRlbnQgPSAnJ1xuICAgICAgICAvL3JlbW92ZSBjbGFzcyBhY3RpdmVcbiAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MoKVxuXG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0pO1xuXG4gIH1cbiAgLy8gcHJpdmF0ZVxuICAvLyBkYXRhR2FtZSA9IHNvdW5kLCBudW0sIGNvbG9yXG4gIGxldCBfc3RhcnQgPSAoKSA9PiB7XG4gICAgLy9jaGVja2UgdG8gZmFsc2VcbiAgICBkYXRhLmNhc2VDb2NoZS5jaGVja2VkID0gZmFsc2VcbiAgICAvL3Rlc3QgdGhlIGNoZWNrZWRcbiAgICBjaGFuZ2VDaGVja2JveCgpXG5cbiAgICBkYXRhLnN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGRhdGEuY2FzZUNvY2hlLmNoZWNrZWQgPT09IHRydWUpIHtcbiAgICAgICAgLy9zdGFydCB0aGUgYWlcbiAgICAgICAgX2FpKClcbiAgICAgICAgLy9zdGFydCBidG5cbiAgICAgICAgZGF0YS5zdGFydEFjdGl2ZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAvL3JlbW92ZSAuZXJyb3JcbiAgICAgICAgZGF0YS5jb3VudEJveC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpXG4gICAgICB9IFxuICAgICAgLy9lbmQgY2hlY2tlZCB0cnVlXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7IC8vIGVuZCBjbGljayBvbiBzdGFydFxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgbGV0IHNoYXBlQ2xpY2sgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBkYXRhLnNoYXBlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZGF0YS5zaGFwZVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrIG9wcG9tZW50Jyk7XG4gICAgICAgIC8vIGEgY2hhcXVlIGZvaXMgcXVlIGplIGNsaXF1ZSBzdXIgYXUgaXRlbSwgXG4gICAgICAgIC8vIGplIHN0b2NrIGwnb2JqZXQgZGFucyB1biB0YWJsZWF1eFxuICAgICAgICBkYXRhLmFycmF5T3Bwb21lbnQucHVzaChkYXRhR2FtZVt0aGlzLnRleHRDb250ZW50LnRyaW0oKV0pICAgICAgXG4gICAgICAgIC8vY29uc29sZS5sb2coZGF0YS5hcnJheU9wcG9tZW50KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhLmFycmF5U2ltb24pO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGRhdGEuYXJyYXlTaW1vbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBsZXQgY3VycmVudERhdGFTaW1vbiA9IGRhdGEuYXJyYXlTaW1vbltpXVxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuYXJyYXlPcHBvbWVudCk7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YS5hcnJheVNpbW9uKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmFycmF5T3Bwb21lbnRbaV0pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuYXJyYXlTaW1vbltpXSk7XG4gICAgICAgICAgaWYgKGRhdGEuYXJyYXlTaW1vbltpXS5udW0gPT09IGRhdGEuYXJyYXlPcHBvbWVudFtpXS5udW0gKSAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5hcnJheU9wcG9tZW50W2ldKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuYXJyYXlTaW1vbltpXSk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZUNsaWNrJylcbiAgICAgICAgICAgIF9wbGF5U291bmQoY3VycmVudERhdGFTaW1vbi5zb3VuZClcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZW1vdmVBY3RpdmVDbGFzcygpXG4gICAgICAgICAgICB9LCA1MDApOy8vMXNcbiAgICAgICAgICAgIC8vb3Bwb25lbnQocGFyc2VJbnQoY3VycmVudFNoYXBlLDEwKSlcbiAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAvL3JldHVybiBfYWkoKSB3aXRoIGVycm9yKClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yKClcbiAgICAgICAgICAgIC8vcmV0dXJuIF9haSgpXG4gICAgICAgICAgfSBcbiAgICAgICAgfVxuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIF9haSgpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIGxldCByZW1vdmVBY3RpdmVDbGFzcyA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGRhdGEuc2hhcGUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBsZXQgY3VycmVudCA9IGRhdGEuc2hhcGVbaV1cbiAgICAgIGlmIChjdXJyZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykgPT09IHRydWUpIHtcbiAgICAgICAgY3VycmVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgfSBlbHNlIGlmKGN1cnJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmVDbGljaycpID09PSB0cnVlKXtcbiAgICAgICAgY3VycmVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmVDbGljaycpXG5cbiAgICAgIH0gXG4gICAgfVxuICB9XG5cbiAgLy9tYWluXG4gIGxldCBtYWluICA9ICgpID0+IHtcbiAgICBzaGFwZUNsaWNrKClcbiAgICBfc3RhcnQoKVxuICAgIHJlbW92ZUFjdGl2ZUNsYXNzKClcbiAgICByZXR1cm4gdHJ1ZVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbWFpbiA6IG1haW5cbiAgfTtcblxufSkoKTtcblNpbW9uLm1haW4oKVxuLy9TaW1vbi5hbm90aGVyTWV0aG9kICgpXG4iXX0=
