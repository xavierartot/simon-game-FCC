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
    //showShape()
    if (ide === 0) {
      ide++;
      randNumber = randAddItem();

      //console.log('one step ' + as, ao);
      setTimeout(function () {
        //add sound with randomTemp 
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
              console.log('i addOneStep ');
            }
          }
        }
      }, 2000); //1s

      setTimeout(function () {
        removeActiveClass();
        //showShape()
        emptyDataArray(ao); //delete arrayOppoment
        //console.log(ide);
      }, 2600); //1s
      //return randNumber;
    }
  };

  var _ai = function _ai() {
    var anim = void 0,
        total = 0; //, d = data.arraySimon
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
                  removeActiveClass();
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

      console.log(as);
      console.log(total);
      for (var i = 0, l = as.length; i < l; i++) {
        console.log(i);
        if (as.length - 1 === i) {
          //alert(as.length-1)
          //break;
          return setTimeout(function () {
            addOneStep();
          }, total + 2000); //1s
          break;
        }
      }
    } // end else if(as.length > 0)
  }; // end _ai()

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
      //console.log('click ' + as, ao);
      if (as.length === 1 && clickCount === 1) {
        //console.log('click ' + as, ao);
        _playSound(sound);
        this.classList.add('activeClick');
        setTimeout(function () {
          removeActiveClass();
          //console.log('ai click 1');
          _ai();
        }, 800); //1s
        return this;
      } else if (as.length > 1) {
        //console.log('click ' + as, ao);
        for (var i = 0, l = as.length; i < l; i++) {
          if (as[i] === ao[i]) {
            _playSound(sound);
            this.classList.add('activeClick');
            setTimeout(function () {
              removeActiveClass();
            }, 800); //1s
            //console.log('1 valeur dans ao');
            if (as.length === ao.length) {
              setTimeout(function () {
                //console.log('click same size' + as, ao);
                removeActiveClass();
                return _ai();
              }, 800); //1s
              break;
            }
          } else if (as[i] !== ao[i]) {
            //console.log('nope succes');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJTdHJpbmciLCJwcm90b3R5cGUiLCJ0cmltIiwicmVwbGFjZSIsIlNpbW9uIiwiZGF0YSIsImNhc2VDb2NoZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0YXJ0Iiwic3RhcnRBY3RpdmUiLCJncmVlbiIsInJlZCIsImJsdWUiLCJ5ZWxsb3ciLCJzaGFwZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzaGFwZVBhcmVudCIsImFycmF5U2ltb24iLCJhcnJheU9wcG9tZW50IiwiY291bnRCb3giLCJkYXRhR2FtZSIsImNvbG9yIiwibnVtIiwic291bmQiLCJlcnJvclNvdW5kIiwicmFuZG9tIiwiYXMiLCJhbyIsInJhbmRvbVRlbXAiLCJfcGxheVNvdW5kIiwiQXVkaW8iLCJwbGF5IiwicmFuZEFkZEl0ZW0iLCJyYW5kIiwicmFuZE51bSIsIk1hdGgiLCJmbG9vciIsInRlbXAiLCJ1bmRlZmluZWQiLCJwdXNoIiwiYWRkT25lU3RlcCIsImlkZSIsInJhbmROdW1iZXIiLCJzZXRUaW1lb3V0IiwicHJvcCIsImhhc093blByb3BlcnR5IiwiZCIsImNsYXNzTGlzdCIsImFkZCIsInRleHRDb250ZW50IiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsInJlbW92ZUFjdGl2ZUNsYXNzIiwiZW1wdHlEYXRhQXJyYXkiLCJfYWkiLCJhbmltIiwidG90YWwiLCJmb3JFYWNoIiwiY2xlIiwiaSIsIm9yaWdpbiIsIiQiLCJhZGRDbGFzcyIsImwiLCJlcnJvciIsInRpbWUiLCJhcnJheSIsInBvcCIsIndhdGNoQ2hlY2tib3giLCJhZGRFdmVudExpc3RlbmVyIiwiY2hlY2tlZCIsInJlbW92ZSIsIl9zdGFydCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImhpZGVTaGFwZSIsImVhY2giLCJpbmRleCIsImlzIiwiYWZ0ZXIiLCJzaG93U2hhcGUiLCJjbGlja1NoYXBlIiwiY2xpY2tDb3VudCIsIm51bUNsaWNrIiwib24iLCJwYXJzZUludCIsImN1cnJlbnQiLCJjb250YWlucyIsIm1haW4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQUEsT0FBT0MsU0FBUCxDQUFpQkMsSUFBakIsR0FBd0IsWUFBVztBQUMvQixTQUFPLEtBQUtDLE9BQUwsQ0FBYSxZQUFiLEVBQTJCLEVBQTNCLENBQVA7QUFDSCxDQUZEO0FBR0EsSUFBSUMsUUFBVSxZQUFNO0FBQ2xCLE1BQUlDLE9BQU87QUFDVEMsZUFBcUJDLFNBQVNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FEWjtBQUVUQyxXQUFxQkYsU0FBU0MsYUFBVCxDQUF1QixjQUF2QixDQUZaO0FBR1RFLGlCQUFxQkgsU0FBU0MsYUFBVCxDQUF1QixZQUF2QixDQUhaLEVBR2tEO0FBQzNERyxXQUFxQkosU0FBU0MsYUFBVCxDQUF1QixxQkFBdkIsQ0FKWjtBQUtUSSxTQUFxQkwsU0FBU0MsYUFBVCxDQUF1QixtQkFBdkIsQ0FMWjtBQU1USyxVQUFxQk4sU0FBU0MsYUFBVCxDQUF1QixvQkFBdkIsQ0FOWjtBQU9UTSxZQUFxQlAsU0FBU0MsYUFBVCxDQUF1QixzQkFBdkIsQ0FQWjtBQVFUTyxXQUFxQlIsU0FBU1MsZ0JBQVQsQ0FBMEIsZUFBMUIsQ0FSWjtBQVNUQyxpQkFBcUJWLFNBQVNTLGdCQUFULENBQTBCLFFBQTFCLENBVFo7QUFVVEUsZ0JBQXFCLEVBVlo7QUFXVEMsbUJBQXFCLEVBWFo7QUFZVEMsY0FBcUJiLFNBQVNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FaWixFQUFYO0FBQUEsTUFjQWEsV0FBVztBQUNULE9BQUksRUFBQ0MsT0FBTyxPQUFSLEVBQW1CQyxLQUFPLENBQTFCLEVBQTZCQyxPQUFRLG9DQUFyQyxFQURLO0FBRVQsT0FBSSxFQUFDRixPQUFPLEtBQVIsRUFBbUJDLEtBQU8sQ0FBMUIsRUFBNkJDLE9BQVEsb0NBQXJDLEVBRks7QUFHVCxPQUFJLEVBQUNGLE9BQU8sTUFBUixFQUFtQkMsS0FBTyxDQUExQixFQUE2QkMsT0FBUSxrQ0FBckMsRUFISztBQUlULE9BQUksRUFBQ0YsT0FBTyxRQUFSLEVBQW1CQyxLQUFPLENBQTFCLEVBQTZCQyxPQUFRLGtDQUFyQztBQUpLLEdBZFg7QUFBQSxNQW9CQUMsYUFBYSx1REFwQmI7QUFBQSxNQW9Cc0U7QUFDdEVILFVBQWMsRUFyQmQ7QUFBQSxNQXNCQUksU0FBYyxFQXRCZDtBQUFBLE1BdUJBQyxLQUFLdEIsS0FBS2EsVUF2QlY7QUFBQSxNQXdCQVUsS0FBS3ZCLEtBQUtjLGFBeEJWO0FBQUEsTUF5QkFVLGFBQWMsRUF6QmQ7O0FBMkJBO0FBQ0EsTUFBSUMsYUFBYSxTQUFiQSxVQUFhLENBQUNOLEtBQUQsRUFBVztBQUMxQixRQUFJTyxLQUFKLENBQVVQLEtBQVYsRUFBaUJRLElBQWpCO0FBQ0QsR0FGRDs7QUFJQSxNQUFJQyxjQUFjLFNBQWRBLFdBQWMsQ0FBQ0MsSUFBRCxFQUFVO0FBQzFCLFFBQUlDLFVBQVdDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS1YsTUFBTCxLQUFnQixDQUEzQixJQUFnQyxDQUEvQztBQUFBLFFBQW1EWSxhQUFuRDtBQUNBLFFBQUlKLFNBQVNLLFNBQVQsSUFBc0JMLFNBQVMsRUFBbkMsRUFBdUM7QUFDckNOLFNBQUdZLElBQUgsQ0FBU04sSUFBVDtBQUNBSSxhQUFPSixJQUFQO0FBQ0QsS0FIRCxNQUdPO0FBQ0xQLFNBQUdhLElBQUgsQ0FBU0wsT0FBVDtBQUNBRyxhQUFPSCxPQUFQO0FBQ0Q7O0FBRUQsV0FBT0csSUFBUDtBQUNELEdBWEQ7O0FBYUEsTUFBSUcsYUFBYSxTQUFiQSxVQUFhLEdBQU07QUFDckIsUUFBSUMsTUFBTSxDQUFWO0FBQUEsUUFBYUMsbUJBQWI7QUFDQTtBQUNBLFFBQUlELFFBQVEsQ0FBWixFQUFlO0FBQ2JBO0FBQ0FDLG1CQUFhVixhQUFiOztBQUVBO0FBQ0FXLGlCQUFXLFlBQVk7QUFDckI7QUFDQSxhQUFLLElBQUlDLElBQVQsSUFBaUJ4QyxJQUFqQixFQUFzQjtBQUNwQixjQUFJQSxLQUFLeUMsY0FBTCxDQUFvQkQsSUFBcEIsQ0FBSixFQUErQjtBQUM3QixnQkFBSUUsSUFBRzFDLEtBQUt3QyxJQUFMLENBQVA7QUFDQTtBQUNBLGdCQUFJQSxTQUFTeEIsU0FBU3NCLFVBQVQsRUFBcUJyQixLQUE5QixJQUF1Q29CLFFBQVEsQ0FBbkQsRUFBc0Q7QUFDcERBO0FBQ0E7QUFDQUssZ0JBQUVDLFNBQUYsQ0FBWUMsR0FBWixDQUFnQixRQUFoQjtBQUNBbkIseUJBQVdULFNBQVNzQixVQUFULEVBQXFCbkIsS0FBaEM7QUFDQW5CLG1CQUFLZSxRQUFMLENBQWM4QixXQUFkLEdBQTRCdkIsR0FBR3dCLE1BQS9CO0FBQ0FDLHNCQUFRQyxHQUFSLENBQVksZUFBWjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLE9BaEJELEVBZ0JHLElBaEJILEVBTGEsQ0FxQko7O0FBRVRULGlCQUFXLFlBQVk7QUFDckJVO0FBQ0E7QUFDQUMsdUJBQWUzQixFQUFmLEVBSHFCLENBR0g7QUFDbEI7QUFDRCxPQUxELEVBS0csSUFMSCxFQXZCYSxDQTRCSjtBQUNUO0FBQ0Q7QUFDRixHQWxDRDs7QUFvQ0EsTUFBSTRCLE1BQU0sU0FBTkEsR0FBTSxHQUFNO0FBQ2QsUUFBSUMsYUFBSjtBQUFBLFFBQVVDLFFBQU0sQ0FBaEIsQ0FEYyxDQUNJO0FBQ2xCO0FBQ0EsUUFBSS9CLEdBQUd3QixNQUFILEtBQWMsQ0FBbEIsRUFBcUI7QUFDbkI7QUFDQVY7QUFDRCxLQUhELE1BR08sSUFBR2QsR0FBR3dCLE1BQUgsR0FBWSxDQUFmLEVBQWlCO0FBQ3RCO0FBQ0F4QixTQUFHZ0MsT0FBSCxDQUFXLFVBQVVDLEdBQVYsRUFBZUMsQ0FBZixFQUFrQkMsTUFBbEIsRUFBMEI7QUFDbkM7QUFDQUwsZUFBT2IsV0FBVyxVQUFTaUIsQ0FBVCxFQUFZO0FBQUEscUNBQ25CaEIsSUFEbUI7QUFFMUIsZ0JBQUl4QyxLQUFLeUMsY0FBTCxDQUFvQkQsSUFBcEIsQ0FBSixFQUErQjtBQUM3QixrQkFBSUEsU0FBU3hCLFNBQVN1QyxHQUFULEVBQWN0QyxLQUEzQixFQUFrQztBQUNoQ3NCLDJCQUFXLFlBQVk7QUFDckI7QUFDQW1CLG9CQUFFLE1BQUlsQixJQUFOLEVBQVltQixRQUFaLENBQXFCLFFBQXJCO0FBQ0FsQyw2QkFBV1QsU0FBU3VDLEdBQVQsRUFBY3BDLEtBQXpCO0FBQ0QsaUJBSkQsRUFJRyxJQUpILEVBRGdDLENBS3ZCO0FBQ1RvQiwyQkFBVyxZQUFZO0FBQ3JCO0FBQ0FVO0FBQ0QsaUJBSEQsRUFHRyxJQUhILEVBTmdDLENBU3ZCO0FBQ1Y7QUFDRjtBQWR5Qjs7QUFBRTtBQUM5QixlQUFLLElBQUlULElBQVQsSUFBaUJ4QyxJQUFqQixFQUFzQjtBQUFBLGtCQUFid0MsSUFBYTtBQWNyQixXQWYyQixDQWUxQjtBQUNILFNBaEJNLEVBZ0JKZ0IsSUFBSSxJQWhCQSxFQWdCTUEsQ0FoQk4sQ0FBUCxDQUZtQyxDQWtCbEI7QUFDakJILGdCQUFRRyxJQUFJLElBQVo7QUFDRCxPQXBCRCxFQUZzQixDQXNCbkI7O0FBRUhULGNBQVFDLEdBQVIsQ0FBWTFCLEVBQVo7QUFDQXlCLGNBQVFDLEdBQVIsQ0FBWUssS0FBWjtBQUNBLFdBQUssSUFBSUcsSUFBSSxDQUFSLEVBQVdJLElBQUl0QyxHQUFHd0IsTUFBdkIsRUFBK0JVLElBQUlJLENBQW5DLEVBQXNDSixHQUF0QyxFQUEyQztBQUN6Q1QsZ0JBQVFDLEdBQVIsQ0FBWVEsQ0FBWjtBQUNBLFlBQU1sQyxHQUFHd0IsTUFBSCxHQUFVLENBQVgsS0FBa0JVLENBQXZCLEVBQTBCO0FBQ3hCO0FBQ0E7QUFDQSxpQkFBT2pCLFdBQVcsWUFBWTtBQUM1Qkg7QUFDRCxXQUZNLEVBRUppQixRQUFRLElBRkosQ0FBUCxDQUh3QixDQUtQO0FBQ2pCO0FBQ0Q7QUFDRjtBQUNGLEtBM0NhLENBMkNiO0FBQ0YsR0E1Q0QsQ0FsRmtCLENBOEhqQjs7QUFFRCxNQUFJUSxRQUFRLFNBQVJBLEtBQVEsQ0FBQ0MsSUFBRCxFQUFVO0FBQ3BCLFdBQU92QixXQUFXLFlBQVk7QUFDNUJkLGlCQUFXTCxVQUFYO0FBQ0E7QUFDQXBCLFdBQUtlLFFBQUwsQ0FBYzhCLFdBQWQsR0FBNEIsS0FBNUI7QUFDQTdDLFdBQUtlLFFBQUwsQ0FBYzRCLFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLE9BQTVCO0FBQ0E7QUFDQU87QUFDRCxLQVBNLEVBT0pXLElBUEksQ0FBUCxDQURvQixDQVFYO0FBQ1YsR0FURDs7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUlaLGlCQUFpQixTQUFqQkEsY0FBaUIsQ0FBQ2EsS0FBRCxFQUFXO0FBQzlCLFdBQU9BLE1BQU1qQixNQUFiO0FBQ0VpQixZQUFNQyxHQUFOO0FBREY7QUFFRCxHQUhEOztBQUtBLE1BQUlDLGdCQUFnQixTQUFoQkEsYUFBZ0IsR0FBTTtBQUN4QmpFLFNBQUtDLFNBQUwsQ0FBZWlFLGdCQUFmLENBQWdDLFFBQWhDLEVBQXlDLFlBQVc7QUFDbEQ7QUFDQWhCLHFCQUFlNUIsRUFBZixFQUZrRCxDQUVoQztBQUNsQixVQUFJLENBQUMsS0FBSzZDLE9BQVYsRUFBbUI7QUFBQztBQUNsQjtBQUNBbkUsYUFBS0ssV0FBTCxDQUFpQnNDLFNBQWpCLENBQTJCeUIsTUFBM0IsQ0FBa0MsUUFBbEM7QUFDQTtBQUNBcEUsYUFBS2UsUUFBTCxDQUFjNEIsU0FBZCxDQUF3QnlCLE1BQXhCLENBQStCLE9BQS9CO0FBQ0FwRSxhQUFLZSxRQUFMLENBQWM4QixXQUFkLEdBQTRCLEVBQTVCO0FBQ0E7QUFDQUk7QUFDQSxlQUFPLEtBQVA7QUFDRCxPQVRELE1BU007QUFDSixlQUFPLElBQVA7QUFDRDtBQUNGLEtBZkQ7QUFnQkQsR0FqQkQ7O0FBbUJBO0FBQ0E7QUFDQSxNQUFJb0IsU0FBUyxTQUFUQSxNQUFTLEdBQU07QUFDakI7QUFDQXJFLFNBQUtDLFNBQUwsQ0FBZWtFLE9BQWYsR0FBeUIsS0FBekI7QUFDQTtBQUNBRjs7QUFFQWpFLFNBQUtJLEtBQUwsQ0FBVzhELGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLFVBQVNJLENBQVQsRUFBWTtBQUMvQyxVQUFJdEUsS0FBS0MsU0FBTCxDQUFla0UsT0FBZixLQUEyQixJQUEvQixFQUFxQztBQUNuQztBQUNBL0I7QUFDQTtBQUNBcEMsYUFBS0ssV0FBTCxDQUFpQnNDLFNBQWpCLENBQTJCQyxHQUEzQixDQUErQixRQUEvQjtBQUNBO0FBQ0E1QyxhQUFLZSxRQUFMLENBQWM0QixTQUFkLENBQXdCeUIsTUFBeEIsQ0FBK0IsT0FBL0I7QUFDRDtBQUNEO0FBQ0FFLFFBQUVDLGNBQUY7QUFDRCxLQVhELEVBTmlCLENBaUJiO0FBQ0osV0FBTyxLQUFQO0FBQ0QsR0FuQkQ7O0FBcUJBLE1BQUlDLFlBQVksU0FBWkEsU0FBWSxHQUFNO0FBQ3BCZCxNQUFFLGVBQUYsRUFBbUJlLElBQW5CLENBQXdCLFVBQVVDLEtBQVYsRUFBaUJKLENBQWpCLEVBQW9CO0FBQzFDLFVBQUtaLEVBQUUsSUFBRixFQUFRaUIsRUFBUixDQUFXLHFCQUFYLENBQUwsRUFBeUM7QUFDdkNqQixVQUFFLElBQUYsRUFBUWtCLEtBQVIsQ0FBZSw4Q0FBZjtBQUNELE9BRkQsTUFFTyxJQUFJbEIsRUFBRSxJQUFGLEVBQVFpQixFQUFSLENBQVcsbUJBQVgsQ0FBSixFQUFxQztBQUMxQ2pCLFVBQUUsSUFBRixFQUFRa0IsS0FBUixDQUFlLDRDQUFmO0FBQ0QsT0FGTSxNQUVBLElBQUlsQixFQUFFLElBQUYsRUFBUWlCLEVBQVIsQ0FBVyxvQkFBWCxDQUFKLEVBQXNDO0FBQzNDakIsVUFBRSxJQUFGLEVBQVFrQixLQUFSLENBQWUsNkNBQWY7QUFDRCxPQUZNLE1BRUEsSUFBSWxCLEVBQUUsSUFBRixFQUFRaUIsRUFBUixDQUFXLHNCQUFYLENBQUosRUFBd0M7QUFDN0NqQixVQUFFLElBQUYsRUFBUWtCLEtBQVIsQ0FBZSwrQ0FBZjtBQUNEO0FBQ0YsS0FWRDtBQVdELEdBWkQ7O0FBY0EsTUFBSUMsWUFBWSxTQUFaQSxTQUFZLEdBQU07QUFDcEIsV0FBT25CLEVBQUUsT0FBRixFQUFXVSxNQUFYLEVBQVA7QUFDRCxHQUZEOztBQUlBLE1BQUlVLGFBQWEsU0FBYkEsVUFBYSxHQUFNO0FBQ3JCLFFBQUlDLGFBQWEsQ0FBakI7QUFBQSxRQUFvQkMsV0FBVyxDQUEvQjtBQUNBdEIsTUFBRSxlQUFGLEVBQW1CdUIsRUFBbkIsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBVVgsQ0FBVixFQUFhO0FBQzFDO0FBQ0FVLGlCQUFXRSxTQUFTLEtBQUtyQyxXQUFMLENBQWlCaEQsSUFBakIsRUFBVCxFQUFpQyxFQUFqQyxDQUFYO0FBQ0E7QUFDQStCLGtCQUFZb0QsUUFBWixFQUowQyxDQUlyQjtBQUNyQkQsbUJBTDBDLENBSzdCO0FBQ2IsVUFBSTVELFFBQVFILFNBQVNrRSxTQUFTLEtBQUtyQyxXQUFMLENBQWlCaEQsSUFBakIsRUFBVCxFQUFpQyxFQUFqQyxDQUFULEVBQStDc0IsS0FBM0Q7QUFDQTtBQUNBLFVBQUlHLEdBQUd3QixNQUFILEtBQWMsQ0FBZCxJQUFtQmlDLGVBQWUsQ0FBdEMsRUFBeUM7QUFDdkM7QUFDQXRELG1CQUFXTixLQUFYO0FBQ0EsYUFBS3dCLFNBQUwsQ0FBZUMsR0FBZixDQUFtQixhQUFuQjtBQUNBTCxtQkFBVyxZQUFZO0FBQ3JCVTtBQUNBO0FBQ0FFO0FBQ0QsU0FKRCxFQUlHLEdBSkgsRUFKdUMsQ0FRL0I7QUFDUixlQUFPLElBQVA7QUFDRCxPQVZELE1BVU8sSUFBRzdCLEdBQUd3QixNQUFILEdBQVksQ0FBZixFQUFpQjtBQUN0QjtBQUNBLGFBQUssSUFBSVUsSUFBSSxDQUFSLEVBQVdJLElBQUl0QyxHQUFHd0IsTUFBdkIsRUFBK0JVLElBQUlJLENBQW5DLEVBQXNDSixHQUF0QyxFQUEyQztBQUN6QyxjQUFJbEMsR0FBR2tDLENBQUgsTUFBU2pDLEdBQUdpQyxDQUFILENBQWIsRUFBcUI7QUFDbkIvQix1QkFBV04sS0FBWDtBQUNBLGlCQUFLd0IsU0FBTCxDQUFlQyxHQUFmLENBQW1CLGFBQW5CO0FBQ0FMLHVCQUFXLFlBQVk7QUFDckJVO0FBQ0QsYUFGRCxFQUVHLEdBRkgsRUFIbUIsQ0FLWDtBQUNSO0FBQ0EsZ0JBQUczQixHQUFHd0IsTUFBSCxLQUFjdkIsR0FBR3VCLE1BQXBCLEVBQTJCO0FBQ3pCUCx5QkFBVyxZQUFZO0FBQ3JCO0FBQ0FVO0FBQ0EsdUJBQU9FLEtBQVA7QUFDRCxlQUpELEVBSUcsR0FKSCxFQUR5QixDQUtqQjtBQUNSO0FBQ0Q7QUFDRixXQWZELE1BZU8sSUFBRzdCLEdBQUdrQyxDQUFILE1BQVVqQyxHQUFHaUMsQ0FBSCxDQUFiLEVBQW1CO0FBQ3hCO0FBQ0QsV0FGTSxNQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0Q7QUFDRjtBQUNEYyxVQUFFQyxjQUFGO0FBQ0E7QUFDRDtBQUNGLEtBL0NEO0FBZ0RELEdBbEREOztBQW9EQSxNQUFJdEIsb0JBQW9CLFNBQXBCQSxpQkFBb0IsR0FBTTtBQUM1QixTQUFLLElBQUlPLElBQUksQ0FBUixFQUFXSSxJQUFJNUQsS0FBS1UsS0FBTCxDQUFXb0MsTUFBL0IsRUFBdUNVLElBQUlJLENBQTNDLEVBQThDSixHQUE5QyxFQUFtRDtBQUNqRCxVQUFJMkIsVUFBVW5GLEtBQUtVLEtBQUwsQ0FBVzhDLENBQVgsQ0FBZDtBQUNBLFVBQUkyQixRQUFReEMsU0FBUixDQUFrQnlDLFFBQWxCLENBQTJCLFFBQTNCLE1BQXlDLElBQTdDLEVBQW1EO0FBQ2pERCxnQkFBUXhDLFNBQVIsQ0FBa0J5QixNQUFsQixDQUF5QixRQUF6QjtBQUNELE9BRkQsTUFFTyxJQUFHZSxRQUFReEMsU0FBUixDQUFrQnlDLFFBQWxCLENBQTJCLGFBQTNCLE1BQThDLElBQWpELEVBQXNEO0FBQzNERCxnQkFBUXhDLFNBQVIsQ0FBa0J5QixNQUFsQixDQUF5QixhQUF6QjtBQUVEO0FBQ0Y7QUFDRixHQVZEOztBQVlBO0FBQ0EsTUFBSWlCLE9BQVEsU0FBUkEsSUFBUSxHQUFNO0FBQ2hCUDtBQUNBVDtBQUNBcEI7QUFDQSxXQUFPLElBQVA7QUFDRCxHQUxEOztBQU9BLFNBQU87QUFDTG9DLFVBQU9BO0FBREYsR0FBUDtBQUlELENBOVJXLEVBQVo7QUErUkF0RixNQUFNc0YsSUFBTjtBQUNBIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vaHR0cHM6Ly90b2RkbW90dG8uY29tL21hc3RlcmluZy10aGUtbW9kdWxlLXBhdHRlcm4vI3JldmVhbGluZy1tb2R1bGUtcGF0dGVyblxuU3RyaW5nLnByb3RvdHlwZS50cmltID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpXG59XG5sZXQgU2ltb24gPSAoICgpID0+IHtcbiAgbGV0IGRhdGEgPSB7IFxuICAgIGNhc2VDb2NoZSAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlQ29jaGUnKSxcbiAgICBzdGFydCAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dF9fc3RhcnQnKSxcbiAgICBzdGFydEFjdGl2ZSAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dF9fYnRuJyksIC8vc3RhcnQgYnRuXG4gICAgZ3JlZW4gICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoYXBlX19jb2xvci1ncmVlbicpLFxuICAgIHJlZCAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGFwZV9fY29sb3ItcmVkJyksXG4gICAgYmx1ZSAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoYXBlX19jb2xvci1ibHVlJyksXG4gICAgeWVsbG93ICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoYXBlX19jb2xvci15ZWxsb3cnKSxcbiAgICBzaGFwZSAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhcGVfX2NvbG9yJyksXG4gICAgc2hhcGVQYXJlbnQgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoYXBlJyksXG4gICAgYXJyYXlTaW1vbiAgICAgICAgIDogW10sXG4gICAgYXJyYXlPcHBvbWVudCAgICAgIDogW10sXG4gICAgY291bnRCb3ggICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHRfX2JveCcpLC8vY291bnRcbiAgfSxcbiAgZGF0YUdhbWUgPSB7XG4gICAgMSA6IHtjb2xvciA6J2dyZWVuJyAgLCBudW0gOiAgMSwgc291bmQ6ICAnaHR0cDovL2FydG90Lm5ldC9zb3VuZHMvb3RoZXIxLm1wMycgICAgfSxcbiAgICAyIDoge2NvbG9yIDoncmVkJyAgICAsIG51bSA6ICAyLCBzb3VuZDogICdodHRwOi8vYXJ0b3QubmV0L3NvdW5kcy9vdGhlcjIubXAzJyAgICB9LFxuICAgIDMgOiB7Y29sb3IgOidibHVlJyAgICwgbnVtIDogIDMsIHNvdW5kOiAgJ2h0dHA6Ly9hcnRvdC5uZXQvc291bmRzL3BsYXkubXAzJyAgICAgIH0sXG4gICAgNCA6IHtjb2xvciA6J3llbGxvdycgLCBudW0gOiAgNCwgc291bmQ6ICAnaHR0cDovL2FydG90Lm5ldC9zb3VuZHMvc29mdC5tcDMnICAgICAgfVxuICB9LFxuICBlcnJvclNvdW5kID0gJ2h0dHBzOi8vczMuYW1hem9uYXdzLmNvbS9mcmVlY29kZWNhbXAvc2ltb25Tb3VuZDEubXAzJywgLy9mcm9tIGh0dHBzOi8vd3d3LmZyZWVjb2RlY2FtcC5jb20vY2hhbGxlbmdlcy9idWlsZC1hLXNpbW9uLWdhbWVcbiAgY29sb3IgICAgICAgPSAnJyxcbiAgcmFuZG9tICAgICAgPSAnJyxcbiAgYXMgPSBkYXRhLmFycmF5U2ltb24sXG4gIGFvID0gZGF0YS5hcnJheU9wcG9tZW50LFxuICByYW5kb21UZW1wICA9ICcnXG5cbiAgLy8gcHJpdmF0ZVxuICBsZXQgX3BsYXlTb3VuZCA9IChzb3VuZCkgPT4ge1xuICAgIG5ldyBBdWRpbyhzb3VuZCkucGxheSgpXG4gIH1cblxuICBsZXQgcmFuZEFkZEl0ZW0gPSAocmFuZCkgPT4ge1xuICAgIGxldCByYW5kTnVtID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpICsgMSksIHRlbXBcbiAgICBpZiAocmFuZCAhPT0gdW5kZWZpbmVkICYmIHJhbmQgIT09ICcnKSB7XG4gICAgICBhby5wdXNoKCByYW5kKVxuICAgICAgdGVtcCA9IHJhbmRcbiAgICB9IGVsc2Uge1xuICAgICAgYXMucHVzaCggcmFuZE51bSApXG4gICAgICB0ZW1wID0gcmFuZE51bVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdGVtcCBcbiAgfVxuXG4gIGxldCBhZGRPbmVTdGVwID0gKCkgPT4ge1xuICAgIGxldCBpZGUgPSAwLCByYW5kTnVtYmVyIFxuICAgIC8vc2hvd1NoYXBlKClcbiAgICBpZiAoaWRlID09PSAwKSB7XG4gICAgICBpZGUrK1xuICAgICAgcmFuZE51bWJlciA9IHJhbmRBZGRJdGVtKClcblxuICAgICAgLy9jb25zb2xlLmxvZygnb25lIHN0ZXAgJyArIGFzLCBhbyk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9hZGQgc291bmQgd2l0aCByYW5kb21UZW1wIFxuICAgICAgICBmb3IgKGxldCBwcm9wIGluIGRhdGEpe1xuICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICBsZXQgZCA9ZGF0YVtwcm9wXSBcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coaWRlKTtcbiAgICAgICAgICAgIGlmIChwcm9wID09PSBkYXRhR2FtZVtyYW5kTnVtYmVyXS5jb2xvciAmJiBpZGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgaWRlKytcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwcm9wKTtcbiAgICAgICAgICAgICAgZC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgICBfcGxheVNvdW5kKGRhdGFHYW1lW3JhbmROdW1iZXJdLnNvdW5kKVxuICAgICAgICAgICAgICBkYXRhLmNvdW50Qm94LnRleHRDb250ZW50ID0gYXMubGVuZ3RoIFxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaSBhZGRPbmVTdGVwICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgMjAwMCk7Ly8xc1xuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MoKVxuICAgICAgICAvL3Nob3dTaGFwZSgpXG4gICAgICAgIGVtcHR5RGF0YUFycmF5KGFvKS8vZGVsZXRlIGFycmF5T3Bwb21lbnRcbiAgICAgICAgLy9jb25zb2xlLmxvZyhpZGUpO1xuICAgICAgfSwgMjYwMCk7Ly8xc1xuICAgICAgLy9yZXR1cm4gcmFuZE51bWJlcjtcbiAgICB9XG4gIH1cblxuICBsZXQgX2FpID0gKCkgPT4ge1xuICAgIGxldCBhbmltLCB0b3RhbD0wIC8vLCBkID0gZGF0YS5hcnJheVNpbW9uXG4gICAgLy9jb25zb2xlLmxvZyhhcyk7XG4gICAgaWYgKGFzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy9hZGQgYSBzdGVwIGlmIGFycmF5U2ltb24gaXQncyA9PT0gMFxuICAgICAgYWRkT25lU3RlcCgpXG4gICAgfSBlbHNlIGlmKGFzLmxlbmd0aCA+IDApe1xuICAgICAgLy9jb25zb2xlLmxvZyhhcyk7XG4gICAgICBhcy5mb3JFYWNoKGZ1bmN0aW9uIChjbGUsIGksIG9yaWdpbikge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGBjbGUgPSAke2NsZX0sIHZhbD0gJHthc1tjbGVdfSwgaW5kZXggPSAke2l9LCBvcmlnaW4gPSAke2l9YCk7XG4gICAgICAgIGFuaW0gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKGkpIHsgLy8gaSBpcyByZXBsYWNlIGJ5IGogICBcbiAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGRhdGEpe1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgaWYgKHByb3AgPT09IGRhdGFHYW1lW2NsZV0uY29sb3IpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIC8vc2hvd1NoYXBlKClcbiAgICAgICAgICAgICAgICAgICQoJy4nK3Byb3ApLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgX3BsYXlTb3VuZChkYXRhR2FtZVtjbGVdLnNvdW5kKVxuICAgICAgICAgICAgICAgIH0sIDIwMDApOy8vMXNcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIC8vaGlkZVNoYXBlKClcbiAgICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKClcbiAgICAgICAgICAgICAgICB9LCAyNTAwKTsvLzFzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IC8vZW5kIGZvcmluXG4gICAgICAgIH0sIGkgKiAxMDAwLCBpKTsgLy8gd2UncmUgcGFzc2luZyBpIGluIHRoZSBhcmd1bWVudCBvZiB0aGUgY2FsbEJhY2tcbiAgICAgICAgdG90YWwgPSBpICogMTAwMFxuICAgICAgfSk7Ly8gZW5kIGZvcmVhY2hcblxuICAgICAgY29uc29sZS5sb2coYXMpO1xuICAgICAgY29uc29sZS5sb2codG90YWwpO1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgY29uc29sZS5sb2coaSk7XG4gICAgICAgIGlmICggKGFzLmxlbmd0aC0xKSA9PT0gaSkge1xuICAgICAgICAgIC8vYWxlcnQoYXMubGVuZ3RoLTEpXG4gICAgICAgICAgLy9icmVhaztcbiAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhZGRPbmVTdGVwKClcbiAgICAgICAgICB9LCB0b3RhbCArIDIwMDApOy8vMXNcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0vLyBlbmQgZWxzZSBpZihhcy5sZW5ndGggPiAwKVxuICB9Ly8gZW5kIF9haSgpXG5cbiAgbGV0IGVycm9yID0gKHRpbWUpID0+IHtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBfcGxheVNvdW5kKGVycm9yU291bmQgKVxuICAgICAgLy9kYXRhLmNvdW50Ym94ID09PSB0ZXh0IGJveFxuICAgICAgZGF0YS5jb3VudEJveC50ZXh0Q29udGVudCA9ICdlcnInXG4gICAgICBkYXRhLmNvdW50Qm94LmNsYXNzTGlzdC5hZGQoJ2Vycm9yJylcbiAgICAgIC8vc2VuZCB0byBkaWZmZXJlbnQgYWkoKSBleDogX2FpRXJyb3IoKVxuICAgICAgX2FpKClcbiAgICB9LCB0aW1lKTsvLzFzXG4gIH1cblxuICAvL3JhbmRvbSBiZXR3ZWVuIDEgYW5kIDRcbiAgLy9sZXQgUmFuZG9tID0gKCkgPT4ge1xuICAvL3JhbmRvbSA9ICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KSArIDEgIFxuICAvL3JldHVybiByYW5kb20gXG4gIC8vfVxuXG4gIGxldCBlbXB0eURhdGFBcnJheSA9IChhcnJheSkgPT4ge1xuICAgIHdoaWxlIChhcnJheS5sZW5ndGgpICBcbiAgICAgIGFycmF5LnBvcCgpXG4gIH1cblxuICBsZXQgd2F0Y2hDaGVja2JveCA9ICgpID0+IHtcbiAgICBkYXRhLmNhc2VDb2NoZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLGZ1bmN0aW9uKCkge1xuICAgICAgLy9lbXB0eSBhcnJheVNpbW9uIFxuICAgICAgZW1wdHlEYXRhQXJyYXkoYXMpLy8gZGVsZXRlIGFycmF5U2ltb25cbiAgICAgIGlmICghdGhpcy5jaGVja2VkKSB7Ly9pZiBjaGVja2VkIGlzIGZhbHNlXG4gICAgICAgIC8vc3RhcnQgY2lyY2xlIC0gY2hhbmdlIHRoZSBjaXJjbGUgYSByb3VnZVxuICAgICAgICBkYXRhLnN0YXJ0QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIC8vcmVtb3ZlIGNsYXNzIGVycm9yXG4gICAgICAgIGRhdGEuY291bnRCb3guY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKVxuICAgICAgICBkYXRhLmNvdW50Qm94LnRleHRDb250ZW50ID0gJydcbiAgICAgICAgLy9yZW1vdmUgY2xhc3MgYWN0aXZlXG4gICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKClcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9IGVsc2V7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IFxuICAgIH0pO1xuICB9XG5cbiAgLy8gcHJpdmF0ZVxuICAvLyBkYXRhR2FtZSA9IHNvdW5kLCBudW0sIGNvbG9yXG4gIGxldCBfc3RhcnQgPSAoKSA9PiB7XG4gICAgLy9jaGVja2UgdG8gZmFsc2VcbiAgICBkYXRhLmNhc2VDb2NoZS5jaGVja2VkID0gZmFsc2VcbiAgICAvL3Rlc3QgaWYgdGhlIGNoZWNrZWQgXG4gICAgd2F0Y2hDaGVja2JveCAoKVxuXG4gICAgZGF0YS5zdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChkYXRhLmNhc2VDb2NoZS5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICAgIC8vc3RhcnQgdGhlIGFpXG4gICAgICAgIGFkZE9uZVN0ZXAoKSBcbiAgICAgICAgLy9zdGFydCBidG5cbiAgICAgICAgZGF0YS5zdGFydEFjdGl2ZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAvL3JlbW92ZSAuZXJyb3JcbiAgICAgICAgZGF0YS5jb3VudEJveC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpXG4gICAgICB9IFxuICAgICAgLy9lbmQgY2hlY2tlZCB0cnVlXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7IC8vIGVuZCBjbGljayBvbiBzdGFydFxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgbGV0IGhpZGVTaGFwZSA9ICgpID0+IHtcbiAgICAkKCcuc2hhcGVfX2NvbG9yJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGUpIHtcbiAgICAgIGlmICggJCh0aGlzKS5pcygnLnNoYXBlX19jb2xvci1ncmVlbicpICkge1xuICAgICAgICAkKHRoaXMpLmFmdGVyKCAnPGRpdiBjbGFzcz1cInNoYXBlX19jb2xvci1ncmVlbiB0ZW1wXCI+aTwvZGl2PicgKVxuICAgICAgfSBlbHNlIGlmKCAkKHRoaXMpLmlzKCcuc2hhcGVfX2NvbG9yLXJlZCcpICl7XG4gICAgICAgICQodGhpcykuYWZ0ZXIoICc8ZGl2IGNsYXNzPVwic2hhcGVfX2NvbG9yLXJlZCB0ZW1wXCI+aTwvZGl2PicgKVxuICAgICAgfSBlbHNlIGlmKCAkKHRoaXMpLmlzKCcuc2hhcGVfX2NvbG9yLWJsdWUnKSApe1xuICAgICAgICAkKHRoaXMpLmFmdGVyKCAnPGRpdiBjbGFzcz1cInNoYXBlX19jb2xvci1ibHVlIHRlbXBcIj5pPC9kaXY+JyApXG4gICAgICB9IGVsc2UgaWYoICQodGhpcykuaXMoJy5zaGFwZV9fY29sb3IteWVsbG93JykgKXtcbiAgICAgICAgJCh0aGlzKS5hZnRlciggJzxkaXYgY2xhc3M9XCJzaGFwZV9fY29sb3IteWVsbG93IHRlbXBcIj5pPC9kaXY+JyApXG4gICAgICB9IFxuICAgIH0pO1xuICB9XG5cbiAgbGV0IHNob3dTaGFwZSA9ICgpID0+IHtcbiAgICByZXR1cm4gJCgnLnRlbXAnKS5yZW1vdmUoKVxuICB9XG5cbiAgbGV0IGNsaWNrU2hhcGUgPSAoKSA9PiB7XG4gICAgbGV0IGNsaWNrQ291bnQgPSAwLCBudW1DbGljayA9IDAgXG4gICAgJCgnLnNoYXBlX19jb2xvcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAvL2hvbGQgdGhlIG51bWJlciBjbGlja2VkXG4gICAgICBudW1DbGljayA9IHBhcnNlSW50KHRoaXMudGV4dENvbnRlbnQudHJpbSgpLDEwKVxuICAgICAgLy9jb25zb2xlLmxvZyhudW1DbGljayk7XG4gICAgICByYW5kQWRkSXRlbShudW1DbGljaykvL3B1c2ggdGhlIGNsaWNrIGluIGFvIChhcnJheSBvcHBvbWVudClcbiAgICAgIGNsaWNrQ291bnQrKyAvL2NvdW50IHRoZSBjbGljayBudW1iZXJcbiAgICAgIGxldCBzb3VuZCA9IGRhdGFHYW1lW3BhcnNlSW50KHRoaXMudGV4dENvbnRlbnQudHJpbSgpLDEwKV0uc291bmRcbiAgICAgIC8vY29uc29sZS5sb2coJ2NsaWNrICcgKyBhcywgYW8pO1xuICAgICAgaWYgKGFzLmxlbmd0aCA9PT0gMSAmJiBjbGlja0NvdW50ID09PSAxKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2NsaWNrICcgKyBhcywgYW8pO1xuICAgICAgICBfcGxheVNvdW5kKHNvdW5kKVxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZUNsaWNrJylcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MoKVxuICAgICAgICAgIC8vY29uc29sZS5sb2coJ2FpIGNsaWNrIDEnKTtcbiAgICAgICAgICBfYWkoKVxuICAgICAgICB9LCA4MDApOy8vMXNcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgIH0gZWxzZSBpZihhcy5sZW5ndGggPiAxKXsgXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2NsaWNrICcgKyBhcywgYW8pO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGFzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmIChhc1tpXT09PSBhb1tpXSkgIHtcbiAgICAgICAgICAgIF9wbGF5U291bmQoc291bmQpXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZUNsaWNrJylcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZW1vdmVBY3RpdmVDbGFzcygpXG4gICAgICAgICAgICB9LCA4MDApOy8vMXNcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJzEgdmFsZXVyIGRhbnMgYW8nKTtcbiAgICAgICAgICAgIGlmKGFzLmxlbmd0aCA9PT0gYW8ubGVuZ3RoKXtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY2xpY2sgc2FtZSBzaXplJyArIGFzLCBhbyk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MoKVxuICAgICAgICAgICAgICAgIHJldHVybiBfYWkoKVxuICAgICAgICAgICAgICB9LCA4MDApOy8vMXNcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmKGFzW2ldICE9PSBhb1tpXSl7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdub3BlIHN1Y2NlcycpO1xuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAvL3JldHVybiBlcnJvcigpXG4gICAgICAgICAgICAvL3JldHVybiBfYWkoKVxuICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBldmVudCBoYW5kbGVyXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBsZXQgcmVtb3ZlQWN0aXZlQ2xhc3MgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBkYXRhLnNoYXBlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgbGV0IGN1cnJlbnQgPSBkYXRhLnNoYXBlW2ldXG4gICAgICBpZiAoY3VycmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpID09PSB0cnVlKSB7XG4gICAgICAgIGN1cnJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgIH0gZWxzZSBpZihjdXJyZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlQ2xpY2snKSA9PT0gdHJ1ZSl7XG4gICAgICAgIGN1cnJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlQ2xpY2snKVxuXG4gICAgICB9IFxuICAgIH1cbiAgfVxuXG4gIC8vbWFpblxuICBsZXQgbWFpbiAgPSAoKSA9PiB7XG4gICAgY2xpY2tTaGFwZSgpXG4gICAgX3N0YXJ0KClcbiAgICByZW1vdmVBY3RpdmVDbGFzcygpXG4gICAgcmV0dXJuIHRydWVcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG1haW4gOiBtYWluXG4gIH07XG5cbn0pKCk7XG5TaW1vbi5tYWluKClcbi8vU2ltb24uYW5vdGhlck1ldGhvZCAoKVxuIl19
