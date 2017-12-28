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
    countBox: document.querySelector('.text__box') //count
  },
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
      clickCount = void 0,
      randomTemp = '';

  // private
  var _playSound = function _playSound(sound) {
    new Audio(sound).play();
  };

  var randAddItem = function randAddItem(rand) {
    var randNum = Math.floor(Math.random() * 4) + 1,
        temp = void 0;
    if (rand !== undefined && rand !== '') {
      ao.push(rand);
      temp = rand;
    } else {
      as.push(randNum);
      temp = randNum;
    }

    return temp;
  };

  var addOneStep = function addOneStep() {
    var ide = 0,
        randNumber = void 0;
    if (ide === 0) {
      ide++;
      randNumber = randAddItem();

      //console.log('one step ' + as, ao);
      setTimeout(function () {
        //add sound with randomTemp 
        showShape();
        for (var prop in data) {
          if (data.hasOwnProperty(prop)) {
            var d = data[prop];
            //console.log(ide);
            if (prop === dataGame[randNumber].color && ide === 1) {
              ide++;
              //console.log(prop);
              d.classList.add('active');
              _playSound(dataGame[randNumber].sound);
              data.countBox.textContent = as.length;
              //console.log('i addOneStep ');
            }
          }
        }
      }, 1500); //1s

      setTimeout(function () {
        removeActiveClass();
        showShape();
        emptyDataArray(ao); //delete arrayOppoment
        //console.log(ide);
      }, 2000); //1s
      //return randNumber;
    }
  };

  var _ai = function _ai() {
    var anim = void 0,
        total = 0,
        flag = void 0; //, d = data.arraySimon
    //console.log(as);
    if (as.length === 0) {
      //add a step if arraySimon it's === 0
      addOneStep();
    } else if (as.length > 0 && as.length < 20) {
      for (var i = 0, l = as.length; i < l; i++) {
        var current = as[i],
            prev = as[i - 1];
        if (as.length === ao.length) {
          if (as[i] === ao[i]) {
            //console.log('succes game');
            flag = true;
          } else {
            //console.log('les tab sont diff');
            errorGame(2000);
            flag = false;
          }
        } else {
          //console.log('les tab longueur diff');
          errorGame(2000);
          flag = false;
        }
      }
      if (flag === true) {
        hideShape();
        //console.log(as);
        as.forEach(function (cle, i, origin) {
          anim = setTimeout(function (i) {
            var _loop = function _loop(prop) {
              if (data.hasOwnProperty(prop)) {
                if (prop === dataGame[cle].color) {
                  setTimeout(function () {
                    $('.' + prop + ', .shape__color-' + prop).addClass('active');
                    _playSound(dataGame[cle].sound);
                  }, 2000); //1s
                  setTimeout(function () {
                    //hideShape()
                    removeActiveClass();
                    //showShape()
                  }, 2500); //1s
                }
              }
            };

            // i is replace by j   
            for (var prop in data) {
              _loop(prop);
            } //end forin
          }, i * 1000, i); // we're passing i in the argument of the callBack
          total = i * 1000;
        }); // end foreach

        for (var _i = 0, _l = as.length; _i < _l; _i++) {
          //console.log(i);
          if (as.length - 1 === _i) {
            return setTimeout(function () {
              addOneStep();
            }, total + 2000); //1s
            break;
          }
        }
      }
    } else if (as.length >= 20) {
      alert("you're win");
      emptyDataArray(as); // delete arraySimon
      //start circle - change the circle a rouge
      data.startActive.classList.remove('active');
      //remove class error
      data.countBox.classList.remove('error');
      data.countBox.textContent = '';
      //remove class active
      removeActiveClass();
      clickCount = 0; //used in click
      return false;
    }
    // end else if(as.length > 0)
  }; // end _ai()

  var errorGame = function errorGame(time) {
    var anim = void 0,
        total = 0; //, d = data.arraySimon
    clickCount = 0; //used in click
    _playSound(errorSound);

    data.countBox.textContent = 'err'; //data.countbox === text box
    data.countBox.classList.add('error');
    emptyDataArray(ao); //delete arrayOppoment

    return setTimeout(function () {
      hideShape();
      as.forEach(function (cle, i, origin) {
        //console.log(`cle = ${cle}, val= ${as[cle]}, index = ${i}, origin = ${i}`);
        anim = setTimeout(function (i) {
          var _loop2 = function _loop2(prop) {
            if (data.hasOwnProperty(prop)) {
              if (prop === dataGame[cle].color) {
                setTimeout(function () {
                  //$('.'+prop).addClass('active')
                  $('.' + prop + ', .shape__color-' + prop).addClass('active');
                  //$(this).after( '<div class="shape__color-blue temp">i</div>' )
                  _playSound(dataGame[cle].sound);
                }, 2000); //1s
                setTimeout(function () {
                  //hideShape()
                  removeActiveClass();
                  //showShape()
                }, 2500); //1s
              }
            }
          };

          // i is replace by j   
          for (var prop in data) {
            _loop2(prop);
          } //end forin
        }, i * 1000, i); // we're passing i in the argument of the callBack
        total = i * 1000;
      }); // end foreach
      showShape();
      removeActiveClass();
      data.countBox.textContent = as.length;
      data.countBox.classList.remove('error');
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
        clickCount = 0; //used in click
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
    var numClick = 0,
        num = void 0,
        sound = void 0;
    clickCount = 0;
    $('.shape__color').on('click', function (e) {
      console.log(as);
      console.log(ao);
      numClick = parseInt(this.textContent.trim(), 10); //hold the number clicked
      num = randAddItem(numClick); //push the click in ao (array oppoment)
      clickCount++; //count the click number
      sound = dataGame[parseInt(this.textContent.trim(), 10)].sound; //sound
      console.log(as.length);
      console.log(clickCount);
      if (as.length === 1 && clickCount === 1) {
        _playSound(sound);
        this.classList.add('activeClick');
        setTimeout(function () {
          removeActiveClass();
          //console.log('ai click 1');
          return _ai();
        }, 800); //1s
      } else if (as.length > 1) {
        //console.log('click ' + as, ao);
        loop: for (var i = 0, l = as.length; i < l; i++) {
          //console.log(as, ao);
          //console.log(as[i], ao[i]);
          if (as[i] === ao[i]) {
            //console.log('equal');
            _playSound(sound);
            this.classList.add('activeClick');
            setTimeout(function () {
              removeActiveClass();
            }, 800); //1s
            //console.log('1 valeur dans ao');
            if (as.length === ao.length) {
              //same size the result is complete
              setTimeout(function () {
                //console.log('click same size' + as, ao);
                removeActiveClass();
                return _ai();
              }, 800); //1s
              break loop;
            }
            //continue loop
            break loop;
          } else if (as[i] !== ao[i]) {
            console.log('nope equal');
            break;
          } else {
            console.log('error');
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
    $('.temp, .shape__color').removeClass('active activeClick');
    //$('.temp').removeClass('activeClick')
    //for (let i = 0, l = data.shape.length; i < l; i++) {
    //let current = data.shape[i]
    //if (current.classList.contains('active') === true ) {
    //current.classList.remove('active')
    //} else if(current.classList.contains('activeClick') === true){
    //current.classList.remove('activeClick')

    //} 
    //}
  };

  //main
  var main = function main() {
    //let arr1 = [2,5,7,19]
    //let arr2 = [2,5,9,19]
    //for (let i = 0, l = arr1.length; i < l; i++) {
    //let current = arr1[i], prev = arr1[i-1];
    //if (arr1[i] === arr2[i]) {
    //console.log('a, ' +arr1[i]);     
    //} else{
    //console.log('b, ' +arr2[i]);
    //} 
    //}
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJTdHJpbmciLCJwcm90b3R5cGUiLCJ0cmltIiwicmVwbGFjZSIsIlNpbW9uIiwiZGF0YSIsImNhc2VDb2NoZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0YXJ0Iiwic3RhcnRBY3RpdmUiLCJncmVlbiIsInJlZCIsImJsdWUiLCJ5ZWxsb3ciLCJzaGFwZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzaGFwZVBhcmVudCIsImFycmF5U2ltb24iLCJhcnJheU9wcG9tZW50IiwiY291bnRCb3giLCJkYXRhR2FtZSIsImNvbG9yIiwibnVtIiwic291bmQiLCJlcnJvclNvdW5kIiwicmFuZG9tIiwiYXMiLCJhbyIsImNsaWNrQ291bnQiLCJyYW5kb21UZW1wIiwiX3BsYXlTb3VuZCIsIkF1ZGlvIiwicGxheSIsInJhbmRBZGRJdGVtIiwicmFuZCIsInJhbmROdW0iLCJNYXRoIiwiZmxvb3IiLCJ0ZW1wIiwidW5kZWZpbmVkIiwicHVzaCIsImFkZE9uZVN0ZXAiLCJpZGUiLCJyYW5kTnVtYmVyIiwic2V0VGltZW91dCIsInNob3dTaGFwZSIsInByb3AiLCJoYXNPd25Qcm9wZXJ0eSIsImQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0ZXh0Q29udGVudCIsImxlbmd0aCIsInJlbW92ZUFjdGl2ZUNsYXNzIiwiZW1wdHlEYXRhQXJyYXkiLCJfYWkiLCJhbmltIiwidG90YWwiLCJmbGFnIiwiaSIsImwiLCJjdXJyZW50IiwicHJldiIsImVycm9yR2FtZSIsImhpZGVTaGFwZSIsImZvckVhY2giLCJjbGUiLCJvcmlnaW4iLCIkIiwiYWRkQ2xhc3MiLCJhbGVydCIsInJlbW92ZSIsInRpbWUiLCJhcnJheSIsInBvcCIsIndhdGNoQ2hlY2tib3giLCJhZGRFdmVudExpc3RlbmVyIiwiY2hlY2tlZCIsIl9zdGFydCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImVhY2giLCJpbmRleCIsImlzIiwiYWZ0ZXIiLCJjbGlja1NoYXBlIiwibnVt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R0FGSCxFQUptQixDQU1YO0FBQ1I7QUFDQSxnQkFBRzNCLEdBQUcwQixNQUFILEtBQWN6QixHQUFHeUIsTUFBcEIsRUFBMkI7QUFBQztBQUMxQlIseUJBQVcsWUFBWTtBQUNyQjtBQUNBUztBQUNBLHVCQUFPRSxLQUFQO0FBQ0QsZUFKRCxFQUlHLEdBSkgsRUFEeUIsQ0FLakI7QUFDUixvQkFBTW9DLElBQU47QUFDRDtBQUNEO0FBQ0Esa0JBQU1BLElBQU47QUFDRCxXQWxCRCxNQWtCTyxJQUFHakUsR0FBR2lDLENBQUgsTUFBVWhDLEdBQUdnQyxDQUFILENBQWIsRUFBbUI7QUFDeEI2QixvQkFBUUMsR0FBUixDQUFZLFlBQVo7QUFDQTtBQUNELFdBSE0sTUFHRDtBQUNKRCxvQkFBUUMsR0FBUixDQUFZLE9BQVo7QUFDQTtBQUNBO0FBQ0Q7QUFDRjtBQUNEVixVQUFFQyxjQUFGO0FBQ0E7QUFDRDtBQUNGLEtBcEREO0FBcURELEdBeEREOztBQTBEQSxNQUFJM0Isb0JBQW9CLFNBQXBCQSxpQkFBb0IsR0FBTTtBQUM1QmUsTUFBRSxzQkFBRixFQUEwQndCLFdBQTFCLENBQXNDLG9CQUF0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDRCxHQVpEOztBQWNBO0FBQ0EsTUFBSUMsT0FBUSxTQUFSQSxJQUFRLEdBQU07QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQVI7QUFDQVA7QUFDQXpCO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FmRDs7QUFpQkEsU0FBTztBQUNMd0MsVUFBT0E7QUFERixHQUFQO0FBSUQsQ0E5V1csRUFBWjtBQStXQTFGLE1BQU0wRixJQUFOO0FBQ0EiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9odHRwczovL3RvZGRtb3R0by5jb20vbWFzdGVyaW5nLXRoZS1tb2R1bGUtcGF0dGVybi8jcmV2ZWFsaW5nLW1vZHVsZS1wYXR0ZXJuXG5TdHJpbmcucHJvdG90eXBlLnRyaW0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJylcbn1cbmxldCBTaW1vbiA9ICggKCkgPT4ge1xuICBsZXQgZGF0YSA9IHsgXG4gICAgY2FzZUNvY2hlICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhc2VDb2NoZScpLFxuICAgIHN0YXJ0ICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0X19zdGFydCcpLFxuICAgIHN0YXJ0QWN0aXZlICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0X19idG4nKSwgLy9zdGFydCBidG5cbiAgICBncmVlbiAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hhcGVfX2NvbG9yLWdyZWVuJyksXG4gICAgcmVkICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoYXBlX19jb2xvci1yZWQnKSxcbiAgICBibHVlICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hhcGVfX2NvbG9yLWJsdWUnKSxcbiAgICB5ZWxsb3cgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hhcGVfX2NvbG9yLXllbGxvdycpLFxuICAgIHNoYXBlICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGFwZV9fY29sb3InKSxcbiAgICBzaGFwZVBhcmVudCAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhcGUnKSxcbiAgICBhcnJheVNpbW9uICAgICAgICAgOiBbXSxcbiAgICBhcnJheU9wcG9tZW50ICAgICAgOiBbXSxcbiAgICBjb3VudEJveCAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dF9fYm94JyksLy9jb3VudFxuICB9LFxuICBkYXRhR2FtZSA9IHtcbiAgICAxIDoge2NvbG9yIDonZ3JlZW4nICAsIG51bSA6ICAxLCBzb3VuZDogICdodHRwOi8vYXJ0b3QubmV0L3NvdW5kcy9vdGhlcjEubXAzJyAgICB9LFxuICAgIDIgOiB7Y29sb3IgOidyZWQnICAgICwgbnVtIDogIDIsIHNvdW5kOiAgJ2h0dHA6Ly9hcnRvdC5uZXQvc291bmRzL290aGVyMi5tcDMnICAgIH0sXG4gICAgMyA6IHtjb2xvciA6J2JsdWUnICAgLCBudW0gOiAgMywgc291bmQ6ICAnaHR0cDovL2FydG90Lm5ldC9zb3VuZHMvcGxheS5tcDMnICAgICAgfSxcbiAgICA0IDoge2NvbG9yIDoneWVsbG93JyAsIG51bSA6ICA0LCBzb3VuZDogICdodHRwOi8vYXJ0b3QubmV0L3NvdW5kcy9zb2Z0Lm1wMycgICAgICB9XG4gIH0sXG4gIGVycm9yU291bmQgPSAnaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2ZyZWVjb2RlY2FtcC9zaW1vblNvdW5kMS5tcDMnLCAvL2Zyb20gaHR0cHM6Ly93d3cuZnJlZWNvZGVjYW1wLmNvbS9jaGFsbGVuZ2VzL2J1aWxkLWEtc2ltb24tZ2FtZVxuICBjb2xvciAgICAgICA9ICcnLFxuICByYW5kb20gICAgICA9ICcnLFxuICBhcyA9IGRhdGEuYXJyYXlTaW1vbixcbiAgYW8gPSBkYXRhLmFycmF5T3Bwb21lbnQsXG4gIGNsaWNrQ291bnQsIFxuICByYW5kb21UZW1wICA9ICcnXG5cbiAgLy8gcHJpdmF0ZVxuICBsZXQgX3BsYXlTb3VuZCA9IChzb3VuZCkgPT4ge1xuICAgIG5ldyBBdWRpbyhzb3VuZCkucGxheSgpXG4gIH1cblxuICBsZXQgcmFuZEFkZEl0ZW0gPSAocmFuZCkgPT4ge1xuICAgIGxldCByYW5kTnVtID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpICsgMSksIHRlbXBcbiAgICBpZiAocmFuZCAhPT0gdW5kZWZpbmVkICYmIHJhbmQgIT09ICcnKSB7XG4gICAgICBhby5wdXNoKCByYW5kKVxuICAgICAgdGVtcCA9IHJhbmRcbiAgICB9IGVsc2Uge1xuICAgICAgYXMucHVzaCggcmFuZE51bSApXG4gICAgICB0ZW1wID0gcmFuZE51bVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdGVtcCBcbiAgfVxuXG4gIGxldCBhZGRPbmVTdGVwID0gKCkgPT4ge1xuICAgIGxldCBpZGUgPSAwLCByYW5kTnVtYmVyIFxuICAgIGlmIChpZGUgPT09IDApIHtcbiAgICAgIGlkZSsrXG4gICAgICByYW5kTnVtYmVyID0gcmFuZEFkZEl0ZW0oKVxuXG4gICAgICAvL2NvbnNvbGUubG9nKCdvbmUgc3RlcCAnICsgYXMsIGFvKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAvL2FkZCBzb3VuZCB3aXRoIHJhbmRvbVRlbXAgXG4gICAgICAgIHNob3dTaGFwZSgpXG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gZGF0YSl7XG4gICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgIGxldCBkID1kYXRhW3Byb3BdIFxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpZGUpO1xuICAgICAgICAgICAgaWYgKHByb3AgPT09IGRhdGFHYW1lW3JhbmROdW1iZXJdLmNvbG9yICYmIGlkZSA9PT0gMSkge1xuICAgICAgICAgICAgICBpZGUrK1xuICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHByb3ApO1xuICAgICAgICAgICAgICBkLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgIF9wbGF5U291bmQoZGF0YUdhbWVbcmFuZE51bWJlcl0uc291bmQpXG4gICAgICAgICAgICAgIGRhdGEuY291bnRCb3gudGV4dENvbnRlbnQgPSBhcy5sZW5ndGggXG4gICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2kgYWRkT25lU3RlcCAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIDE1MDApOy8vMXNcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKClcbiAgICAgICAgc2hvd1NoYXBlKClcbiAgICAgICAgZW1wdHlEYXRhQXJyYXkoYW8pLy9kZWxldGUgYXJyYXlPcHBvbWVudFxuICAgICAgICAvL2NvbnNvbGUubG9nKGlkZSk7XG4gICAgICB9LCAyMDAwKTsvLzFzXG4gICAgICAvL3JldHVybiByYW5kTnVtYmVyO1xuICAgIH1cbiAgfVxuXG4gIGxldCBfYWkgPSAoKSA9PiB7XG4gICAgbGV0IGFuaW0sIHRvdGFsPTAsIGZsYWcgLy8sIGQgPSBkYXRhLmFycmF5U2ltb25cbiAgICAvL2NvbnNvbGUubG9nKGFzKTtcbiAgICBpZiAoYXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAvL2FkZCBhIHN0ZXAgaWYgYXJyYXlTaW1vbiBpdCdzID09PSAwXG4gICAgICBhZGRPbmVTdGVwKClcbiAgICB9IGVsc2UgaWYoYXMubGVuZ3RoID4gMCAmJiBhcy5sZW5ndGggPCAyMCl7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGFzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBsZXQgY3VycmVudCA9IGFzW2ldLCBwcmV2ID0gYXNbaS0xXTtcbiAgICAgICAgaWYgKGFzLmxlbmd0aCA9PT0gYW8ubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKGFzW2ldID09PSBhb1tpXSkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnc3VjY2VzIGdhbWUnKTtcbiAgICAgICAgICAgIGZsYWcgPSB0cnVlXG4gICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbGVzIHRhYiBzb250IGRpZmYnKTtcbiAgICAgICAgICAgIGVycm9yR2FtZSgyMDAwKVxuICAgICAgICAgICAgZmxhZyA9IGZhbHNlXG4gICAgICAgICAgfSBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCdsZXMgdGFiIGxvbmd1ZXVyIGRpZmYnKTtcbiAgICAgICAgICBlcnJvckdhbWUoMjAwMClcbiAgICAgICAgICBmbGFnID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZsYWcgPT09IHRydWUpIHtcbiAgICAgICAgaGlkZVNoYXBlKClcbiAgICAgICAgLy9jb25zb2xlLmxvZyhhcyk7XG4gICAgICAgIGFzLmZvckVhY2goZnVuY3Rpb24gKGNsZSwgaSwgb3JpZ2luKSB7XG4gICAgICAgICAgYW5pbSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oaSkgeyAvLyBpIGlzIHJlcGxhY2UgYnkgaiAgIFxuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBkYXRhKXtcbiAgICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcCA9PT0gZGF0YUdhbWVbY2xlXS5jb2xvcikge1xuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy4nK3Byb3ArJywgLnNoYXBlX19jb2xvci0nK3Byb3ApLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICBfcGxheVNvdW5kKGRhdGFHYW1lW2NsZV0uc291bmQpXG4gICAgICAgICAgICAgICAgICB9LCAyMDAwKTsvLzFzXG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9oaWRlU2hhcGUoKVxuICAgICAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmVDbGFzcygpXG4gICAgICAgICAgICAgICAgICAgIC8vc2hvd1NoYXBlKClcbiAgICAgICAgICAgICAgICAgIH0sIDI1MDApOy8vMXNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gLy9lbmQgZm9yaW5cbiAgICAgICAgICB9LCBpICogMTAwMCwgaSk7IC8vIHdlJ3JlIHBhc3NpbmcgaSBpbiB0aGUgYXJndW1lbnQgb2YgdGhlIGNhbGxCYWNrXG4gICAgICAgICAgdG90YWwgPSBpICogMTAwMFxuICAgICAgICB9KTsvLyBlbmQgZm9yZWFjaFxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gYXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhpKTtcbiAgICAgICAgICBpZiAoIChhcy5sZW5ndGgtMSkgPT09IGkpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgYWRkT25lU3RlcCgpXG4gICAgICAgICAgICB9LCB0b3RhbCArIDIwMDApOy8vMXNcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfSBlbHNlIGlmKGFzLmxlbmd0aCA+PSAyMCl7XG4gICAgICAgYWxlcnQoXCJ5b3UncmUgd2luXCIpXG4gICAgICBlbXB0eURhdGFBcnJheShhcykvLyBkZWxldGUgYXJyYXlTaW1vblxuICAgICAgICAvL3N0YXJ0IGNpcmNsZSAtIGNoYW5nZSB0aGUgY2lyY2xlIGEgcm91Z2VcbiAgICAgICAgZGF0YS5zdGFydEFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAvL3JlbW92ZSBjbGFzcyBlcnJvclxuICAgICAgICBkYXRhLmNvdW50Qm94LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJylcbiAgICAgICAgZGF0YS5jb3VudEJveC50ZXh0Q29udGVudCA9ICcnXG4gICAgICAgIC8vcmVtb3ZlIGNsYXNzIGFjdGl2ZVxuICAgICAgICByZW1vdmVBY3RpdmVDbGFzcygpXG4gICAgICAgIGNsaWNrQ291bnQgPSAwLy91c2VkIGluIGNsaWNrXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gXG4gICAgLy8gZW5kIGVsc2UgaWYoYXMubGVuZ3RoID4gMClcbiAgfS8vIGVuZCBfYWkoKVxuXG4gIGxldCBlcnJvckdhbWUgPSAodGltZSkgPT4ge1xuICAgIGxldCBhbmltLCB0b3RhbD0wLy8sIGQgPSBkYXRhLmFycmF5U2ltb25cbiAgICBjbGlja0NvdW50ID0gMC8vdXNlZCBpbiBjbGlja1xuICAgIF9wbGF5U291bmQoZXJyb3JTb3VuZCApXG4gICAgXG4gICAgZGF0YS5jb3VudEJveC50ZXh0Q29udGVudCA9ICdlcnInLy9kYXRhLmNvdW50Ym94ID09PSB0ZXh0IGJveFxuICAgIGRhdGEuY291bnRCb3guY2xhc3NMaXN0LmFkZCgnZXJyb3InKVxuICAgIGVtcHR5RGF0YUFycmF5KGFvKS8vZGVsZXRlIGFycmF5T3Bwb21lbnRcblxuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGhpZGVTaGFwZSgpXG4gICAgICBhcy5mb3JFYWNoKGZ1bmN0aW9uIChjbGUsIGksIG9yaWdpbikge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGBjbGUgPSAke2NsZX0sIHZhbD0gJHthc1tjbGVdfSwgaW5kZXggPSAke2l9LCBvcmlnaW4gPSAke2l9YCk7XG4gICAgICAgIGFuaW0gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKGkpIHsgLy8gaSBpcyByZXBsYWNlIGJ5IGogICBcbiAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGRhdGEpe1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgaWYgKHByb3AgPT09IGRhdGFHYW1lW2NsZV0uY29sb3IpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIC8vJCgnLicrcHJvcCkuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAkKCcuJytwcm9wKycsIC5zaGFwZV9fY29sb3ItJytwcm9wKS5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgIC8vJCh0aGlzKS5hZnRlciggJzxkaXYgY2xhc3M9XCJzaGFwZV9fY29sb3ItYmx1ZSB0ZW1wXCI+aTwvZGl2PicgKVxuICAgICAgICAgICAgICAgICAgX3BsYXlTb3VuZChkYXRhR2FtZVtjbGVdLnNvdW5kKVxuICAgICAgICAgICAgICAgIH0sIDIwMDApOy8vMXNcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIC8vaGlkZVNoYXBlKClcbiAgICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKClcbiAgICAgICAgICAgICAgICAgIC8vc2hvd1NoYXBlKClcbiAgICAgICAgICAgICAgICB9LCAyNTAwKTsvLzFzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IC8vZW5kIGZvcmluXG4gICAgICAgIH0sIGkgKiAxMDAwLCBpKTsgLy8gd2UncmUgcGFzc2luZyBpIGluIHRoZSBhcmd1bWVudCBvZiB0aGUgY2FsbEJhY2tcbiAgICAgICAgdG90YWwgPSBpICogMTAwMFxuICAgICAgfSk7Ly8gZW5kIGZvcmVhY2hcbiAgICAgIHNob3dTaGFwZSgpXG4gICAgICByZW1vdmVBY3RpdmVDbGFzcygpXG4gICAgICBkYXRhLmNvdW50Qm94LnRleHRDb250ZW50ID0gYXMubGVuZ3RoXG4gICAgICBkYXRhLmNvdW50Qm94LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJylcbiAgICAgIFxuICAgIH0sIHRpbWUpOy8vMXNcbiAgfVxuXG4gIC8vcmFuZG9tIGJldHdlZW4gMSBhbmQgNFxuICAvL2xldCBSYW5kb20gPSAoKSA9PiB7XG4gIC8vcmFuZG9tID0gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpICsgMSAgXG4gIC8vcmV0dXJuIHJhbmRvbSBcbiAgLy99XG5cbiAgbGV0IGVtcHR5RGF0YUFycmF5ID0gKGFycmF5KSA9PiB7XG4gICAgd2hpbGUgKGFycmF5Lmxlbmd0aCkgIFxuICAgICAgYXJyYXkucG9wKClcbiAgfVxuXG4gIGxldCB3YXRjaENoZWNrYm94ID0gKCkgPT4ge1xuICAgIGRhdGEuY2FzZUNvY2hlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsZnVuY3Rpb24oKSB7XG4gICAgICAvL2VtcHR5IGFycmF5U2ltb24gXG4gICAgICBlbXB0eURhdGFBcnJheShhcykvLyBkZWxldGUgYXJyYXlTaW1vblxuICAgICAgaWYgKCF0aGlzLmNoZWNrZWQpIHsvL2lmIGNoZWNrZWQgaXMgZmFsc2VcbiAgICAgICAgLy9zdGFydCBjaXJjbGUgLSBjaGFuZ2UgdGhlIGNpcmNsZSBhIHJvdWdlXG4gICAgICAgIGRhdGEuc3RhcnRBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgLy9yZW1vdmUgY2xhc3MgZXJyb3JcbiAgICAgICAgZGF0YS5jb3VudEJveC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpXG4gICAgICAgIGRhdGEuY291bnRCb3gudGV4dENvbnRlbnQgPSAnJ1xuICAgICAgICAvL3JlbW92ZSBjbGFzcyBhY3RpdmVcbiAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MoKVxuICAgICAgICBjbGlja0NvdW50ID0gMC8vdXNlZCBpbiBjbGlja1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0gZWxzZXtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gXG4gICAgfSk7XG4gIH1cblxuICAvLyBwcml2YXRlXG4gIC8vIGRhdGFHYW1lID0gc291bmQsIG51bSwgY29sb3JcbiAgbGV0IF9zdGFydCA9ICgpID0+IHtcbiAgICAvL2NoZWNrZSB0byBmYWxzZVxuICAgIGRhdGEuY2FzZUNvY2hlLmNoZWNrZWQgPSBmYWxzZVxuICAgIC8vdGVzdCBpZiB0aGUgY2hlY2tlZCBcbiAgICB3YXRjaENoZWNrYm94ICgpXG5cbiAgICBkYXRhLnN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGRhdGEuY2FzZUNvY2hlLmNoZWNrZWQgPT09IHRydWUpIHtcbiAgICAgICAgLy9zdGFydCB0aGUgYWlcbiAgICAgICAgYWRkT25lU3RlcCgpIFxuICAgICAgICAvL3N0YXJ0IGJ0blxuICAgICAgICBkYXRhLnN0YXJ0QWN0aXZlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgIC8vcmVtb3ZlIC5lcnJvclxuICAgICAgICBkYXRhLmNvdW50Qm94LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJylcbiAgICAgIH0gXG4gICAgICAvL2VuZCBjaGVja2VkIHRydWVcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTsgLy8gZW5kIGNsaWNrIG9uIHN0YXJ0XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBsZXQgaGlkZVNoYXBlID0gKCkgPT4ge1xuICAgICQoJy5zaGFwZV9fY29sb3InKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZSkge1xuICAgICAgaWYgKCAkKHRoaXMpLmlzKCcuc2hhcGVfX2NvbG9yLWdyZWVuJykgKSB7XG4gICAgICAgICQodGhpcykuYWZ0ZXIoICc8ZGl2IGNsYXNzPVwic2hhcGVfX2NvbG9yLWdyZWVuIHRlbXBcIj5pPC9kaXY+JyApXG4gICAgICB9IGVsc2UgaWYoICQodGhpcykuaXMoJy5zaGFwZV9fY29sb3ItcmVkJykgKXtcbiAgICAgICAgJCh0aGlzKS5hZnRlciggJzxkaXYgY2xhc3M9XCJzaGFwZV9fY29sb3ItcmVkIHRlbXBcIj5pPC9kaXY+JyApXG4gICAgICB9IGVsc2UgaWYoICQodGhpcykuaXMoJy5zaGFwZV9fY29sb3ItYmx1ZScpICl7XG4gICAgICAgICQodGhpcykuYWZ0ZXIoICc8ZGl2IGNsYXNzPVwic2hhcGVfX2NvbG9yLWJsdWUgdGVtcFwiPmk8L2Rpdj4nIClcbiAgICAgIH0gZWxzZSBpZiggJCh0aGlzKS5pcygnLnNoYXBlX19jb2xvci15ZWxsb3cnKSApe1xuICAgICAgICAkKHRoaXMpLmFmdGVyKCAnPGRpdiBjbGFzcz1cInNoYXBlX19jb2xvci15ZWxsb3cgdGVtcFwiPmk8L2Rpdj4nIClcbiAgICAgIH0gXG4gICAgfSk7XG4gIH1cblxuICBsZXQgc2hvd1NoYXBlID0gKCkgPT4ge1xuICAgIHJldHVybiAkKCcudGVtcCcpLnJlbW92ZSgpXG4gIH1cblxuICBsZXQgY2xpY2tTaGFwZSA9ICgpID0+IHtcbiAgICBsZXQgbnVtQ2xpY2sgPSAwICwgbnVtLCBzb3VuZFxuICAgIGNsaWNrQ291bnQgPSAwXG4gICAgJCgnLnNoYXBlX19jb2xvcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyggYXMpO1xuICAgICAgY29uc29sZS5sb2coIGFvKTtcbiAgICAgIG51bUNsaWNrID0gcGFyc2VJbnQodGhpcy50ZXh0Q29udGVudC50cmltKCksMTApLy9ob2xkIHRoZSBudW1iZXIgY2xpY2tlZFxuICAgICAgbnVtID0gcmFuZEFkZEl0ZW0obnVtQ2xpY2spLy9wdXNoIHRoZSBjbGljayBpbiBhbyAoYXJyYXkgb3Bwb21lbnQpXG4gICAgICBjbGlja0NvdW50KysgLy9jb3VudCB0aGUgY2xpY2sgbnVtYmVyXG4gICAgICBzb3VuZCA9IGRhdGFHYW1lW3BhcnNlSW50KHRoaXMudGV4dENvbnRlbnQudHJpbSgpLDEwKV0uc291bmQvL3NvdW5kXG4gICAgICBjb25zb2xlLmxvZyhhcy5sZW5ndGgpO1xuICAgICAgY29uc29sZS5sb2coY2xpY2tDb3VudCk7XG4gICAgICBpZiAoYXMubGVuZ3RoID09PSAxICYmIGNsaWNrQ291bnQgPT09IDEpIHtcbiAgICAgICAgX3BsYXlTb3VuZChzb3VuZClcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmVDbGljaycpXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKClcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhaSBjbGljayAxJyk7XG4gICAgICAgICAgcmV0dXJuIF9haSgpXG4gICAgICAgIH0sIDgwMCk7Ly8xc1xuICAgICAgfSBlbHNlIGlmKGFzLmxlbmd0aCA+IDEpeyBcbiAgICAgICAgLy9jb25zb2xlLmxvZygnY2xpY2sgJyArIGFzLCBhbyk7XG4gICAgICAgIGxvb3A6IGZvciAobGV0IGkgPSAwLCBsID0gYXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhhcywgYW8pO1xuICAgICAgICAgIC8vY29uc29sZS5sb2coYXNbaV0sIGFvW2ldKTtcbiAgICAgICAgICBpZiAoYXNbaV09PT0gYW9baV0pICB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdlcXVhbCcpO1xuICAgICAgICAgICAgX3BsYXlTb3VuZChzb3VuZClcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlQ2xpY2snKVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKClcbiAgICAgICAgICAgIH0sIDgwMCk7Ly8xc1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnMSB2YWxldXIgZGFucyBhbycpO1xuICAgICAgICAgICAgaWYoYXMubGVuZ3RoID09PSBhby5sZW5ndGgpey8vc2FtZSBzaXplIHRoZSByZXN1bHQgaXMgY29tcGxldGVcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY2xpY2sgc2FtZSBzaXplJyArIGFzLCBhbyk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MoKVxuICAgICAgICAgICAgICAgIHJldHVybiBfYWkoKVxuICAgICAgICAgICAgICB9LCA4MDApOy8vMXNcbiAgICAgICAgICAgICAgYnJlYWsgbG9vcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29udGludWUgbG9vcFxuICAgICAgICAgICAgYnJlYWsgbG9vcFxuICAgICAgICAgIH0gZWxzZSBpZihhc1tpXSAhPT0gYW9baV0pe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ25vcGUgZXF1YWwnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgLy9yZXR1cm4gZXJyb3IoKVxuICAgICAgICAgICAgLy9yZXR1cm4gX2FpKClcbiAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlclxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbGV0IHJlbW92ZUFjdGl2ZUNsYXNzID0gKCkgPT4ge1xuICAgICQoJy50ZW1wLCAuc2hhcGVfX2NvbG9yJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZSBhY3RpdmVDbGljaycpXG4gICAgLy8kKCcudGVtcCcpLnJlbW92ZUNsYXNzKCdhY3RpdmVDbGljaycpXG4gICAgLy9mb3IgKGxldCBpID0gMCwgbCA9IGRhdGEuc2hhcGUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgLy9sZXQgY3VycmVudCA9IGRhdGEuc2hhcGVbaV1cbiAgICAvL2lmIChjdXJyZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykgPT09IHRydWUgKSB7XG4gICAgLy9jdXJyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgLy99IGVsc2UgaWYoY3VycmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZUNsaWNrJykgPT09IHRydWUpe1xuICAgIC8vY3VycmVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmVDbGljaycpXG5cbiAgICAvL30gXG4gICAgLy99XG4gIH1cblxuICAvL21haW5cbiAgbGV0IG1haW4gID0gKCkgPT4ge1xuICAgIC8vbGV0IGFycjEgPSBbMiw1LDcsMTldXG4gICAgLy9sZXQgYXJyMiA9IFsyLDUsOSwxOV1cbiAgICAvL2ZvciAobGV0IGkgPSAwLCBsID0gYXJyMS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAvL2xldCBjdXJyZW50ID0gYXJyMVtpXSwgcHJldiA9IGFycjFbaS0xXTtcbiAgICAvL2lmIChhcnIxW2ldID09PSBhcnIyW2ldKSB7XG4gICAgLy9jb25zb2xlLmxvZygnYSwgJyArYXJyMVtpXSk7ICAgICBcbiAgICAvL30gZWxzZXtcbiAgICAvL2NvbnNvbGUubG9nKCdiLCAnICthcnIyW2ldKTtcbiAgICAvL30gXG4gICAgLy99XG4gICAgY2xpY2tTaGFwZSgpXG4gICAgX3N0YXJ0KClcbiAgICByZW1vdmVBY3RpdmVDbGFzcygpXG4gICAgcmV0dXJuIHRydWVcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG1haW4gOiBtYWluXG4gIH07XG5cbn0pKCk7XG5TaW1vbi5tYWluKClcbi8vU2ltb24uYW5vdGhlck1ldGhvZCAoKVxuIl19
