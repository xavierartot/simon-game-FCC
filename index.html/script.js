'use strict';

//https://toddmotto.com/mastering-the-module-pattern/#revealing-module-pattern
String.prototype.trim = function () {
  return this.replace(/^\s*|\s*$/g, '');
};
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
    shapeParent: document.querySelectorAll('.shape'),
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
      as = data.arraySimon,
      ao = data.arrayOppoment,
      randomTemp = '';

  // private
  var _playSound = function _playSound(sound) {
    new Audio(sound).play();
  };

  var randAddItem = function randAddItem(rand) {
    var random = Math.floor(Math.random() * 4) + 1,
        temp = rand !== undefined ? ao.push(rand) : as.push(random);
    return random;
  };

  var addOneStep = function addOneStep() {

    //showShape()
    var randNumber = randAddItem();
    console.log(randNumber);

    setTimeout(function () {
      //add sound with randomTemp 
      for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
          var d = data[prop];
          if (prop === dataGame[randNumber].color) {
            //console.log(prop);
            d.classList.add('active');
            _playSound(dataGame[randNumber].sound);
            data.countBox.textContent = as.length;
            //console.log('i addOneStep ');
          }
        }
      }
    }, 2000); //1s

    setTimeout(function () {
      removeActiveClass();
      //showShape()
      emptyDataArray(ao); //delete arrayOppoment
    }, 2600); //1s
    console.log(as);
    console.log(randNumber);
    //return randNumber;
  };

  var _ai = function _ai() {
    var anim = void 0; //, d = data.arraySimon
    //console.log(as);
    if (as.length === 0) {
      //add a step if arraySimon it's === 0
      addOneStep();
    } else if (as.length > 0) {
      //console.log(as);
      as.forEach(function (cle, i, origin) {
        //console.log(`cle = ${cle}, val= ${as[cle]}, index = ${i}, origin = ${i}`);
        anim = setTimeout(function (i) {
          var _loop = function _loop(prop) {
            if (data.hasOwnProperty(prop)) {
              if (prop === dataGame[cle].color) {
                setTimeout(function () {
                  //showShape()
                  $('.' + prop).addClass('active');
                  _playSound(dataGame[cle].sound);
                }, 2000); //1s
                setTimeout(function () {
                  //hideShape()
                  //console.log('removeActiveClass');
                  removeActiveClass();
                }, 2500); //1s
              }
            }
          };

          // i is replace by j   
          for (var prop in data) {
            _loop(prop);
          } //end forin
          if (as.length - 1 === i) {
            //console.log(i);
            //console.log('start addOneStep');
            setTimeout(function () {
              //console.log('ai addOneStep');
              addOneStep();
              return this;
            }, 1000); //1s
          }
        }, i * 1000, i); // we're passing i in the argument of the callBack
      });
    }
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

  //random between 1 and 4
  //let Random = () => {
  //random =  Math.floor(Math.random() * 4) + 1  
  //return random 
  //}

  var emptyDataArray = function emptyDataArray(array) {
    while (array.length) {
      array.pop();
    }
  };

  var watchCheckbox = function watchCheckbox() {
    data.caseCoche.addEventListener('change', function () {
      //empty arraySimon 
      emptyDataArray(as); // delete arraySimon
      if (!this.checked) {
        //if checked is false
        //start circle - change the circle a rouge
        data.startActive.classList.remove('active');
        //remove class error
        data.countBox.classList.remove('error');
        data.countBox.textContent = '';
        //remove class active
        removeActiveClass();
        return false;
      } else {
        return true;
      }
    });
  };

  // private
  // dataGame = sound, num, color
  var _start = function _start() {
    //checke to false
    data.caseCoche.checked = false;
    //test if the checked 
    watchCheckbox();

    data.start.addEventListener('click', function (e) {
      if (data.caseCoche.checked === true) {
        //start the ai
        addOneStep();
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

  var hideShape = function hideShape() {
    $('.shape__color').each(function (index, e) {
      if ($(this).is('.shape__color-green')) {
        $(this).after('<div class="shape__color-green temp">i</div>');
      } else if ($(this).is('.shape__color-red')) {
        $(this).after('<div class="shape__color-red temp">i</div>');
      } else if ($(this).is('.shape__color-blue')) {
        $(this).after('<div class="shape__color-blue temp">i</div>');
      } else if ($(this).is('.shape__color-yellow')) {
        $(this).after('<div class="shape__color-yellow temp">i</div>');
      }
    });
  };

  var showShape = function showShape() {
    return $('.temp').remove();
  };

  var clickShape = function clickShape() {
    var clickCount = 0,
        numClick = 0;
    $('.shape__color').on('click', function (e) {
      //hold the number clicked
      numClick = parseInt(this.textContent.trim(), 10);
      //console.log(numClick);
      randAddItem(numClick); //push the click in ao (array oppoment)
      clickCount++; //count the click number
      var sound = dataGame[parseInt(this.textContent.trim(), 10)].sound;
      if (as.length === 1 && clickCount === 1) {
        _playSound(sound);
        this.classList.add('activeClick');
        setTimeout(function () {
          removeActiveClass();
          //console.log('ai click 1');
          _ai();
        }, 800); //1s
        return this;
      } else if (as.length > 1) {
        //console.log(numClick);
        //console.log(as);
        //console.log(ao);
        for (var i = 0, l = as.length; i < l; i++) {
          if (as[i] === ao[i]) {
            //console.log('succes');
            _playSound(sound);
            this.classList.add('activeClick');
            //console.log('1 valeur dans ao');
            if (as.length === ao.length) {
              setTimeout(function () {
                //console.log('ai click');
                removeActiveClass();
                return _ai();
              }, 800); //1s
            }
          } else if (as[i] !== ao[i]) {
            //console.log('nope succes');
            //console.log(as[i]);
            //console.log(ao[i]);
          } else {
              //console.log('error');
              //return error()
              //return _ai()
            }
        }
        e.preventDefault();
        // event handler
      }
    });
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
    clickShape();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJTdHJpbmciLCJwcm90b3R5cGUiLCJ0cmltIiwicmVwbGFjZSIsIlNpbW9uIiwiZGF0YSIsImNhc2VDb2NoZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0YXJ0Iiwic3RhcnRBY3RpdmUiLCJncmVlbiIsInJlZCIsImJsdWUiLCJ5ZWxsb3ciLCJzaGFwZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzaGFwZVBhcmVudCIsImFycmF5U2ltb24iLCJhcnJheU9wcG9tZW50IiwiY291bnRCb3giLCJkYXRhR2FtZSIsImNvbG9yIiwibnVtIiwic291bmQiLCJlcnJvclNvdW5kIiwicmFuZG9tIiwiYXMiLCJhbyIsInJhbmRvbVRlbXAiLCJfcGxheVNvdW5kIiwiQXVkaW8iLCJwbGF5IiwicmFuZEFkZEl0ZW0iLCJyYW5kIiwiTWF0aCIsImZsb29yIiwidGVtcCIsInVuZGVmaW5lZCIsInB1c2giLCJhZGRPbmVTdGVwIiwicmFuZE51bWJlciIsImNvbnNvbGUiLCJsb2ciLCJzZXRUaW1lb3V0IiwicHJvcCIsImhhc093blByb3BlcnR5IiwiZCIsImNsYXNzTGlzdCIsImFkZCIsInRleHRDb250ZW50IiwibGVuZ3RoIiwicmVtb3ZlQWN0aXZlQ2xhc3MiLCJlbXB0eURhdGFBcnJheSIsIl9haSIsImFuaW0iLCJmb3JFYWNoIiwiY2xlIiwiaSIsIm9yaWdpbiIsIiQiLCJhZGRDbGFzcyIsImVycm9yIiwidGltZSIsImFycmF5IiwicG9wIiwid2F0Y2hDaGVja2JveCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjaGVja2VkIiwicmVtb3ZlIiwiX3N0YXJ0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiaGlkZVNoYXBlIiwiZWFjaCIsImluZGV4IiwiaXMiLCJhZnRlciIsInNob3dTaGFwZSIsImNsaWNrU2hhcGUiLCJjbGlja0NvdW50IiwibnVtQ2xpY2siLCJvbiIsInBhcnNlSW50IiwibCIsImN1cnJlbnQiLCJjb250YWlucyIs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ckMsU0FBUixDQUFrQnFCLE1BQWxCLENBQXlCLFFBQXpCO0FBQ0QsT0FGRCxNQUVPLElBQUdnQixRQUFRckMsU0FBUixDQUFrQnNDLFFBQWxCLENBQTJCLGFBQTNCLE1BQThDLElBQWpELEVBQXNEO0FBQzNERCxnQkFBUXJDLFNBQVIsQ0FBa0JxQixNQUFsQixDQUF5QixhQUF6QjtBQUVEO0FBQ0Y7QUFDRixHQVZEOztBQVlBO0FBQ0EsTUFBSWtCLE9BQVEsU0FBUkEsSUFBUSxHQUFNO0FBQ2hCUjtBQUNBVDtBQUNBbEI7QUFDQSxXQUFPLElBQVA7QUFDRCxHQUxEOztBQU9BLFNBQU87QUFDTG1DLFVBQU9BO0FBREYsR0FBUDtBQUlELENBN1FXLEVBQVo7QUE4UUFuRixNQUFNbUYsSUFBTjtBQUNBIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vaHR0cHM6Ly90b2RkbW90dG8uY29tL21hc3RlcmluZy10aGUtbW9kdWxlLXBhdHRlcm4vI3JldmVhbGluZy1tb2R1bGUtcGF0dGVyblxuU3RyaW5nLnByb3RvdHlwZS50cmltID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpXG59XG5sZXQgU2ltb24gPSAoICgpID0+IHtcbiAgbGV0IGRhdGEgPSB7IFxuICAgIGNhc2VDb2NoZSAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlQ29jaGUnKSxcbiAgICBzdGFydCAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dF9fc3RhcnQnKSxcbiAgICBzdGFydEFjdGl2ZSAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dF9fYnRuJyksIC8vc3RhcnQgYnRuXG4gICAgZ3JlZW4gICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoYXBlX19jb2xvci1ncmVlbicpLFxuICAgIHJlZCAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGFwZV9fY29sb3ItcmVkJyksXG4gICAgYmx1ZSAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoYXBlX19jb2xvci1ibHVlJyksXG4gICAgeWVsbG93ICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoYXBlX19jb2xvci15ZWxsb3cnKSxcbiAgICBzaGFwZSAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhcGVfX2NvbG9yJyksXG4gICAgc2hhcGVQYXJlbnQgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoYXBlJyksXG4gICAgYXJyYXlTaW1vbiAgICAgICAgIDogW10sXG4gICAgYXJyYXlPcHBvbWVudCAgICAgIDogW10sXG4gICAgY291bnRCb3ggICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHRfX2JveCcpLC8vY291bnRcbiAgfSxcbiAgZGF0YUdhbWUgPSB7XG4gICAgMSA6IHtjb2xvciA6J2dyZWVuJyAgLCBudW0gOiAgMSwgc291bmQ6ICAnaHR0cDovL2FydG90Lm5ldC9zb3VuZHMvb3RoZXIxLm1wMycgICAgfSxcbiAgICAyIDoge2NvbG9yIDoncmVkJyAgICAsIG51bSA6ICAyLCBzb3VuZDogICdodHRwOi8vYXJ0b3QubmV0L3NvdW5kcy9vdGhlcjIubXAzJyAgICB9LFxuICAgIDMgOiB7Y29sb3IgOidibHVlJyAgICwgbnVtIDogIDMsIHNvdW5kOiAgJ2h0dHA6Ly9hcnRvdC5uZXQvc291bmRzL3BsYXkubXAzJyAgICAgIH0sXG4gICAgNCA6IHtjb2xvciA6J3llbGxvdycgLCBudW0gOiAgNCwgc291bmQ6ICAnaHR0cDovL2FydG90Lm5ldC9zb3VuZHMvc29mdC5tcDMnICAgICAgfVxuICB9LFxuICBlcnJvclNvdW5kID0gJ2h0dHBzOi8vczMuYW1hem9uYXdzLmNvbS9mcmVlY29kZWNhbXAvc2ltb25Tb3VuZDEubXAzJywgLy9mcm9tIGh0dHBzOi8vd3d3LmZyZWVjb2RlY2FtcC5jb20vY2hhbGxlbmdlcy9idWlsZC1hLXNpbW9uLWdhbWVcbiAgY29sb3IgICAgICAgPSAnJyxcbiAgcmFuZG9tICAgICAgPSAnJyxcbiAgYXMgPSBkYXRhLmFycmF5U2ltb24sXG4gIGFvID0gZGF0YS5hcnJheU9wcG9tZW50LFxuICByYW5kb21UZW1wICA9ICcnXG5cbiAgLy8gcHJpdmF0ZVxuICBsZXQgX3BsYXlTb3VuZCA9IChzb3VuZCkgPT4ge1xuICAgIG5ldyBBdWRpbyhzb3VuZCkucGxheSgpXG4gIH1cblxuICBsZXQgcmFuZEFkZEl0ZW0gPSAocmFuZCkgPT4ge1xuICAgIGxldCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KSArIDEsXG4gICAgdGVtcCA9IChyYW5kICE9PSB1bmRlZmluZWQpID8gYW8ucHVzaCggcmFuZCkgOiBhcy5wdXNoKCByYW5kb20gKVxuICAgIHJldHVybiByYW5kb21cbiAgfVxuXG4gIGxldCBhZGRPbmVTdGVwID0gKCkgPT4ge1xuXG4gICAgLy9zaG93U2hhcGUoKVxuICAgIGxldCByYW5kTnVtYmVyID0gcmFuZEFkZEl0ZW0oKVxuICAgIGNvbnNvbGUubG9nKHJhbmROdW1iZXIpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAvL2FkZCBzb3VuZCB3aXRoIHJhbmRvbVRlbXAgXG4gICAgICBmb3IgKGxldCBwcm9wIGluIGRhdGEpe1xuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgIGxldCBkID1kYXRhW3Byb3BdIFxuICAgICAgICAgIGlmIChwcm9wID09PSBkYXRhR2FtZVtyYW5kTnVtYmVyXS5jb2xvcikge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwcm9wKTtcbiAgICAgICAgICAgIGQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgIF9wbGF5U291bmQoZGF0YUdhbWVbcmFuZE51bWJlcl0uc291bmQpXG4gICAgICAgICAgICBkYXRhLmNvdW50Qm94LnRleHRDb250ZW50ID0gYXMubGVuZ3RoIFxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnaSBhZGRPbmVTdGVwICcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDIwMDApOy8vMXNcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MoKVxuICAgICAgLy9zaG93U2hhcGUoKVxuICAgICAgZW1wdHlEYXRhQXJyYXkoYW8pLy9kZWxldGUgYXJyYXlPcHBvbWVudFxuICAgIH0sIDI2MDApOy8vMXNcbiAgICBjb25zb2xlLmxvZyhhcyk7XG4gICAgY29uc29sZS5sb2cocmFuZE51bWJlcik7XG4gICAgLy9yZXR1cm4gcmFuZE51bWJlcjtcbiAgfVxuXG4gIGxldCBfYWkgPSAoKSA9PiB7XG4gICAgbGV0IGFuaW0gLy8sIGQgPSBkYXRhLmFycmF5U2ltb25cbiAgICAvL2NvbnNvbGUubG9nKGFzKTtcbiAgICBpZiAoYXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAvL2FkZCBhIHN0ZXAgaWYgYXJyYXlTaW1vbiBpdCdzID09PSAwXG4gICAgICBhZGRPbmVTdGVwKClcbiAgICB9IGVsc2UgaWYoYXMubGVuZ3RoID4gMCl7XG4gICAgICAvL2NvbnNvbGUubG9nKGFzKTtcbiAgICAgIGFzLmZvckVhY2goZnVuY3Rpb24gKGNsZSwgaSwgb3JpZ2luKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coYGNsZSA9ICR7Y2xlfSwgdmFsPSAke2FzW2NsZV19LCBpbmRleCA9ICR7aX0sIG9yaWdpbiA9ICR7aX1gKTtcbiAgICAgICAgYW5pbSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oaSkgeyAvLyBpIGlzIHJlcGxhY2UgYnkgaiAgIFxuICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gZGF0YSl7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICBpZiAocHJvcCA9PT0gZGF0YUdhbWVbY2xlXS5jb2xvcikge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgLy9zaG93U2hhcGUoKVxuICAgICAgICAgICAgICAgICAgJCgnLicrcHJvcCkuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICBfcGxheVNvdW5kKGRhdGFHYW1lW2NsZV0uc291bmQpXG4gICAgICAgICAgICAgICAgfSwgMjAwMCk7Ly8xc1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgLy9oaWRlU2hhcGUoKVxuICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncmVtb3ZlQWN0aXZlQ2xhc3MnKTtcbiAgICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKClcbiAgICAgICAgICAgICAgICB9LCAyNTAwKTsvLzFzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IC8vZW5kIGZvcmluXG4gICAgICAgICAgaWYgKGFzLmxlbmd0aC0xICA9PT0gaSkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3N0YXJ0IGFkZE9uZVN0ZXAnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhaSBhZGRPbmVTdGVwJyk7XG4gICAgICAgICAgICAgIGFkZE9uZVN0ZXAoKVxuICAgICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICAgICAgfSwgMTAwMCk7Ly8xc1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgaSAqIDEwMDAsIGkpOyAvLyB3ZSdyZSBwYXNzaW5nIGkgaW4gdGhlIGFyZ3VtZW50IG9mIHRoZSBjYWxsQmFja1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbGV0IGVycm9yID0gKHRpbWUpID0+IHtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBfcGxheVNvdW5kKGVycm9yU291bmQgKVxuICAgICAgLy9kYXRhLmNvdW50Ym94ID09PSB0ZXh0IGJveFxuICAgICAgZGF0YS5jb3VudEJveC50ZXh0Q29udGVudCA9ICdlcnInXG4gICAgICBkYXRhLmNvdW50Qm94LmNsYXNzTGlzdC5hZGQoJ2Vycm9yJylcbiAgICAgIC8vc2VuZCB0byBkaWZmZXJlbnQgYWkoKSBleDogX2FpRXJyb3IoKVxuICAgICAgX2FpKClcbiAgICB9LCB0aW1lKTsvLzFzXG4gIH1cblxuICAvL3JhbmRvbSBiZXR3ZWVuIDEgYW5kIDRcbiAgLy9sZXQgUmFuZG9tID0gKCkgPT4ge1xuICAgIC8vcmFuZG9tID0gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpICsgMSAgXG4gICAgLy9yZXR1cm4gcmFuZG9tIFxuICAvL31cblxuICBsZXQgZW1wdHlEYXRhQXJyYXkgPSAoYXJyYXkpID0+IHtcbiAgICB3aGlsZSAoYXJyYXkubGVuZ3RoKSAgXG4gICAgICBhcnJheS5wb3AoKVxuICB9XG5cbiAgbGV0IHdhdGNoQ2hlY2tib3ggPSAoKSA9PiB7XG4gICAgZGF0YS5jYXNlQ29jaGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJyxmdW5jdGlvbigpIHtcbiAgICAgIC8vZW1wdHkgYXJyYXlTaW1vbiBcbiAgICAgIGVtcHR5RGF0YUFycmF5KGFzKS8vIGRlbGV0ZSBhcnJheVNpbW9uXG4gICAgICBpZiAoIXRoaXMuY2hlY2tlZCkgey8vaWYgY2hlY2tlZCBpcyBmYWxzZVxuICAgICAgICAvL3N0YXJ0IGNpcmNsZSAtIGNoYW5nZSB0aGUgY2lyY2xlIGEgcm91Z2VcbiAgICAgICAgZGF0YS5zdGFydEFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAvL3JlbW92ZSBjbGFzcyBlcnJvclxuICAgICAgICBkYXRhLmNvdW50Qm94LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJylcbiAgICAgICAgZGF0YS5jb3VudEJveC50ZXh0Q29udGVudCA9ICcnXG4gICAgICAgIC8vcmVtb3ZlIGNsYXNzIGFjdGl2ZVxuICAgICAgICByZW1vdmVBY3RpdmVDbGFzcygpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSBlbHNle1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHByaXZhdGVcbiAgLy8gZGF0YUdhbWUgPSBzb3VuZCwgbnVtLCBjb2xvclxuICBsZXQgX3N0YXJ0ID0gKCkgPT4ge1xuICAgIC8vY2hlY2tlIHRvIGZhbHNlXG4gICAgZGF0YS5jYXNlQ29jaGUuY2hlY2tlZCA9IGZhbHNlXG4gICAgLy90ZXN0IGlmIHRoZSBjaGVja2VkIFxuICAgIHdhdGNoQ2hlY2tib3ggKClcblxuICAgIGRhdGEuc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZGF0YS5jYXNlQ29jaGUuY2hlY2tlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAvL3N0YXJ0IHRoZSBhaVxuICAgICAgICBhZGRPbmVTdGVwKCkgXG4gICAgICAgIC8vc3RhcnQgYnRuXG4gICAgICAgIGRhdGEuc3RhcnRBY3RpdmUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgLy9yZW1vdmUgLmVycm9yXG4gICAgICAgIGRhdGEuY291bnRCb3guY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKVxuICAgICAgfSBcbiAgICAgIC8vZW5kIGNoZWNrZWQgdHJ1ZVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pOyAvLyBlbmQgY2xpY2sgb24gc3RhcnRcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGxldCBoaWRlU2hhcGUgPSAoKSA9PiB7XG4gICAgJCgnLnNoYXBlX19jb2xvcicpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlKSB7XG4gICAgICBpZiAoICQodGhpcykuaXMoJy5zaGFwZV9fY29sb3ItZ3JlZW4nKSApIHtcbiAgICAgICAgJCh0aGlzKS5hZnRlciggJzxkaXYgY2xhc3M9XCJzaGFwZV9fY29sb3ItZ3JlZW4gdGVtcFwiPmk8L2Rpdj4nIClcbiAgICAgIH0gZWxzZSBpZiggJCh0aGlzKS5pcygnLnNoYXBlX19jb2xvci1yZWQnKSApe1xuICAgICAgICAkKHRoaXMpLmFmdGVyKCAnPGRpdiBjbGFzcz1cInNoYXBlX19jb2xvci1yZWQgdGVtcFwiPmk8L2Rpdj4nIClcbiAgICAgIH0gZWxzZSBpZiggJCh0aGlzKS5pcygnLnNoYXBlX19jb2xvci1ibHVlJykgKXtcbiAgICAgICAgJCh0aGlzKS5hZnRlciggJzxkaXYgY2xhc3M9XCJzaGFwZV9fY29sb3ItYmx1ZSB0ZW1wXCI+aTwvZGl2PicgKVxuICAgICAgfSBlbHNlIGlmKCAkKHRoaXMpLmlzKCcuc2hhcGVfX2NvbG9yLXllbGxvdycpICl7XG4gICAgICAgICQodGhpcykuYWZ0ZXIoICc8ZGl2IGNsYXNzPVwic2hhcGVfX2NvbG9yLXllbGxvdyB0ZW1wXCI+aTwvZGl2PicgKVxuICAgICAgfSBcbiAgICB9KTtcbiAgfVxuXG4gIGxldCBzaG93U2hhcGUgPSAoKSA9PiB7XG4gICAgcmV0dXJuICQoJy50ZW1wJykucmVtb3ZlKClcbiAgfVxuXG4gIGxldCBjbGlja1NoYXBlID0gKCkgPT4ge1xuICAgIGxldCBjbGlja0NvdW50ID0gMCwgbnVtQ2xpY2sgPSAwIFxuICAgICQoJy5zaGFwZV9fY29sb3InKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgLy9ob2xkIHRoZSBudW1iZXIgY2xpY2tlZFxuICAgICAgbnVtQ2xpY2sgPSBwYXJzZUludCh0aGlzLnRleHRDb250ZW50LnRyaW0oKSwxMClcbiAgICAgIC8vY29uc29sZS5sb2cobnVtQ2xpY2spO1xuICAgICAgcmFuZEFkZEl0ZW0obnVtQ2xpY2spLy9wdXNoIHRoZSBjbGljayBpbiBhbyAoYXJyYXkgb3Bwb21lbnQpXG4gICAgICBjbGlja0NvdW50KysgLy9jb3VudCB0aGUgY2xpY2sgbnVtYmVyXG4gICAgICBsZXQgc291bmQgPSBkYXRhR2FtZVtwYXJzZUludCh0aGlzLnRleHRDb250ZW50LnRyaW0oKSwxMCldLnNvdW5kXG4gICAgICBpZiAoYXMubGVuZ3RoID09PSAxICYmIGNsaWNrQ291bnQgPT09IDEpIHtcbiAgICAgICAgX3BsYXlTb3VuZChzb3VuZClcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmVDbGljaycpXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKClcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhaSBjbGljayAxJyk7XG4gICAgICAgICAgX2FpKClcbiAgICAgICAgfSwgODAwKTsvLzFzXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICB9IGVsc2UgaWYoYXMubGVuZ3RoID4gMSl7IFxuICAgICAgICAvL2NvbnNvbGUubG9nKG51bUNsaWNrKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhhcyk7XG4gICAgICAgIC8vY29uc29sZS5sb2coYW8pO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGFzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmIChhc1tpXT09PSBhb1tpXSkgIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3N1Y2NlcycpO1xuICAgICAgICAgICAgX3BsYXlTb3VuZChzb3VuZClcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlQ2xpY2snKVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnMSB2YWxldXIgZGFucyBhbycpO1xuICAgICAgICAgICAgaWYoYXMubGVuZ3RoID09PSBhby5sZW5ndGgpe1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhaSBjbGljaycpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKClcbiAgICAgICAgICAgICAgICByZXR1cm4gX2FpKClcbiAgICAgICAgICAgICAgfSwgODAwKTsvLzFzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmKGFzW2ldICE9PSBhb1tpXSl7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdub3BlIHN1Y2NlcycpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhhc1tpXSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGFvW2ldKTtcbiAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgLy9yZXR1cm4gZXJyb3IoKVxuICAgICAgICAgICAgLy9yZXR1cm4gX2FpKClcbiAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlclxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbGV0IHJlbW92ZUFjdGl2ZUNsYXNzID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gZGF0YS5zaGFwZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGxldCBjdXJyZW50ID0gZGF0YS5zaGFwZVtpXVxuICAgICAgaWYgKGN1cnJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSA9PT0gdHJ1ZSkge1xuICAgICAgICBjdXJyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICB9IGVsc2UgaWYoY3VycmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZUNsaWNrJykgPT09IHRydWUpe1xuICAgICAgICBjdXJyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZUNsaWNrJylcblxuICAgICAgfSBcbiAgICB9XG4gIH1cblxuICAvL21haW5cbiAgbGV0IG1haW4gID0gKCkgPT4ge1xuICAgIGNsaWNrU2hhcGUoKVxuICAgIF9zdGFydCgpXG4gICAgcmVtb3ZlQWN0aXZlQ2xhc3MoKVxuICAgIHJldHVybiB0cnVlXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBtYWluIDogbWFpblxuICB9O1xuXG59KSgpO1xuU2ltb24ubWFpbigpXG4vL1NpbW9uLmFub3RoZXJNZXRob2QgKClcbiJdfQ==
